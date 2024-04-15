package com.example.app.service;

import com.example.app.dto.GeneralResponseDTO;
import com.example.app.dto.user.*;
import com.example.app.exception.user.UserAlreadyExistsException;
import com.example.app.exception.user.UserDataLoginException;
import com.example.app.exception.user.UserNotFoundException;
import com.example.app.mapper.UserMapper;
import com.example.app.model.Role;
import com.example.app.model.User;
import com.example.app.repository.UserRepository;
import com.example.app.security.PasswordEncoder;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    public SignedUserDTO signUp(UserToSignUpDto userToSignUpDto, HttpServletRequest request) {

        //Check if the user already exists: email, phone or username
        if (userRepository.existsByEmailAndActiveTrue(userToSignUpDto.email()))
            throw new UserAlreadyExistsException("Ya existe un usuario con ese email");

        if (userRepository.existsByPhoneAndActiveTrue(userToSignUpDto.phone()))
            throw new UserAlreadyExistsException("Ya existe un usuario con ese teléfono");

        if (userToSignUpDto.alias() != null && userRepository.existsByAliasAndActiveTrue(userToSignUpDto.alias()))
            throw new UserAlreadyExistsException("Ya existe un usuario con ese username");

        // Get the plain password
        String plainPassword = userToSignUpDto.password();

        // Generate the password hash
        String hashedPassword = PasswordEncoder.generatePasswordHash(plainPassword);

        // Map the DTO data to the entity
        User user = userMapper.toEntity(userToSignUpDto);

        // Assign the password hash to the entity
        user.setPassword(hashedPassword);

        /* Set the user role */
        String token = null;

        //Check if the role in DTO is ADMIN or DELIVERY_PERSON
        if (userToSignUpDto.role().name().equals(Role.ADMIN.name()) || userToSignUpDto.role().name().equals(Role.DELIVERY_PERSON.name())) {
            token = tokenService.getTokenFromHeader(request); //Get token from the header
        }

        if (token != null) { //there is a token
            boolean isUserAdmin = tokenService.getVerifier(token).getClaim("ROLE").asString().equals(Role.ADMIN.name()); //Check if the user is ADMIN
            user.setRole( isUserAdmin && userToSignUpDto.role().name().equals(Role.ADMIN.name()) ? Role.ADMIN :
                          isUserAdmin && userToSignUpDto.role().name().equals(Role.DELIVERY_PERSON.name()) ? Role.DELIVERY_PERSON : Role.CUSTOMER);
        } else {
            user.setRole(Role.CUSTOMER);
        }
        /*user role end*/

        // Save the user in the database
        User userDB = userRepository.save(user);

        // Map the entity data to a DTO and return it
        return userMapper.userToSignedUserDTO(userDB);

    }

    public LoggedUserDto login(UserToLoginDto userToLoginDto) {
        // Get the user email
        String userEmail = userToLoginDto.email();

        // Check if the user exists
        if (!userRepository.existsByEmailAndActiveTrue(userEmail))
            throw new UserNotFoundException("El email o la contraseña es incorrecta.");

        // Get hashed password from the database
        String hashedPassword = userRepository.findByEmailAndActiveTrue(userEmail).getPassword();

        // Check if the password is correct
        boolean passwordMatches = PasswordEncoder.verifyPassword(userToLoginDto.password(), hashedPassword);

        if (!passwordMatches)
            throw new UserDataLoginException("El email o la contraseña es incorrecta.");

        // Auth Credentials
        Authentication auth = new UsernamePasswordAuthenticationToken(
          userToLoginDto.email(),
          userToLoginDto.password()
        );

        // Generate the token
        User authUser = (User) authenticationManager.authenticate(auth).getPrincipal();
        String token = tokenService.generateToken(authUser);

        return new LoggedUserDto(
          false,
          authUser.getId(),
          authUser.getFullName(),
          authUser.getEmail(),
          token
        );
    }

    public SignedUserDTO getUser(HttpServletRequest request) {
        User user = getUserByPhoneFromDatabase(request);

        return userMapper.userToSignedUserDTO(user);
    }

    public SignedUserDTO updateUser(UserToUpdateDto userToUpdateDto, HttpServletRequest request) {

        if (userToUpdateDto.alias() != null && userRepository.existsByAliasAndActiveTrue(userToUpdateDto.alias()))
            throw new UserAlreadyExistsException("Ya existe un usuario con ese username");

        User user = getUserByPhoneFromDatabase(request);

        return userMapper.userToSignedUserDTO(user.update(userToUpdateDto));
    }

    public GeneralResponseDTO changePassword(UserChangePasswordDTO userChangePasswordDTO, HttpServletRequest request) {
        User user = getUserByPhoneFromDatabase(request);

        // Get the old plain password
        String oldPlainPassword = userChangePasswordDTO.oldPassword();

        // Get hashed password from the database
        String hashedPassword = userRepository.findByEmailAndActiveTrue(user.getEmail()).getPassword();

        // Check if the password is correct
        boolean passwordMatches = PasswordEncoder.verifyPassword(oldPlainPassword, hashedPassword);

        if (!passwordMatches)
            throw new UserDataLoginException("La contraseña anterior es incorrecta.");

        // Get the new plain password
        String newPlainPassword = userChangePasswordDTO.newPassword();

        // Generate the password hash
        String newHashedPassword = PasswordEncoder.generatePasswordHash(newPlainPassword);

        // Assign the new password hash to the entity
        user.setPassword(newHashedPassword);

        return new GeneralResponseDTO(false, "Contraseña actualizada correctamente.");

    }

    /** Get the user by phone from the database
     *
     * @param request HttpServletRequest
     * @return User
     */
    private User getUserByPhoneFromDatabase(HttpServletRequest request) {
        String token = tokenService.getTokenFromHeader(request); //Get token from the header
        String userPhone = tokenService.getVerifier(token).getSubject(); //Get the user phone from the token

        boolean existsUser = userRepository.existsByPhoneAndActiveTrue(userPhone);

        if (!existsUser) {
            throw new UserNotFoundException("User not found in the database");
        }

        return (User) userRepository.findByPhoneAndActiveTrue(userPhone);
    }
}
