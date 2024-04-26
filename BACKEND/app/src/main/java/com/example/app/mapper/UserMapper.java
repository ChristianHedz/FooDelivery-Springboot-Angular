package com.example.app.mapper;

import com.example.app.dto.user.*;
import com.example.app.model.User;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    User toEntity(UserToSignUpDto userToSignUpDto);

    UserToSignUpDto userToSignUpDtoToUser(User user);

    User toEntity(SignedUserDTO signedUserDTO);

    User toEntity(UserToSignUpGoogleDto userToSignGoogleUpDto);

    SignedUserDTO userToSignedUserDTO(User user);

    SignedUserGoogleDto userToSignedUserGoogleDto(User user);

    User toEntity(UserToLoginDto userToLoginDto);

    UserToLoginDto userToUserToLoginDto(User user);

    User toEntity(LoggedUserDto loggedUserDto);

    LoggedUserDto userToLoggedUserDto(User user);

    User toEntity(UserToUpdateDto userToUpdateDto);

    UserToUpdateDto userToUserToUpdateDto(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User partialUpdate(SignedUserDTO signedUserDTO, @MappingTarget User user);
}