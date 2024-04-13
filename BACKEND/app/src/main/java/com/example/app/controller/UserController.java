package com.example.app.controller;

import com.example.app.dto.GeneralResponseDTO;
import com.example.app.dto.user.*;
import com.example.app.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.io.IOException;
import java.net.URI;

@Tag(name = "Users", description = "Manage all endpoints about Users")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(
      summary = "Sign up a new User.",
      description = "Let a user sign up."
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "200", description = "User created successfully",
        content = {
          @Content(mediaType = "application/json",
            schema = @Schema(implementation = SignedUserDTO.class))
        }),
      @ApiResponse(responseCode = "400", description = "User Already Exists", content = {@Content}),
      @ApiResponse(responseCode = "404", description = "Not Found", content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @SecurityRequirements()
    @PostMapping
    @Transactional
    public ResponseEntity<SignedUserDTO> signUp(
      @RequestBody @Valid UserToSignUpDto userToSignUpDto,
      UriComponentsBuilder uriComponentsBuilder,
      HttpServletRequest request
    ) {

        // Sign up the user
        SignedUserDTO userSignedUpDto = userService.signUp(userToSignUpDto, request);

        // Build the location URI
        URI location = uriComponentsBuilder
          .path("/users/{id}")
          .buildAndExpand(userSignedUpDto.id())
          .toUri();

        // Return the response
        return ResponseEntity
          .created(location)
          .body(userSignedUpDto);
    }

    @Operation(
      summary = "User Login section.",
      description = "Let a user login with the email account. Return a token"
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "200", description = "User logged successfully",
        content = {
          @Content(mediaType = "application/json",
            schema = @Schema(implementation = LoggedUserDto.class))
        }),
      @ApiResponse(responseCode = "400", description = "User data login incorrect", content = {@Content}),
      @ApiResponse(responseCode = "404", description = "User Not Found", content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @SecurityRequirements()
    @PostMapping("/auth")
    @Transactional
    public ResponseEntity<LoggedUserDto> login(@RequestBody @Valid UserToLoginDto userToLoginDto) {

        return ResponseEntity
          .status(HttpStatus.OK)
          .body(userService.login(userToLoginDto));
    }

    @Operation(
      summary = "User gets its data using auth token.",
      description = "Let a logged user get its data using the authorization token."
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "200", description = "User found successfully.",
        content = {
          @Content(mediaType = "application/json",
            schema = @Schema(implementation = SignedUserDTO.class))
        }),
      @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
      @ApiResponse(responseCode = "404", description = "User Not Found", content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @GetMapping("/me")
    public ResponseEntity<SignedUserDTO> getUser(HttpServletRequest request) {
        return ResponseEntity
          .status(HttpStatus.OK)
          .body(userService.getUser(request));
    }

    @Operation(
      summary = "Update data user using token.",
      description = "Let a User update data using the Token."
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "200", description = "User updated successfully.",
        content = {
          @Content(mediaType = "application/json",
            schema = @Schema(implementation = SignedUserDTO.class))
        }),
      @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
      @ApiResponse(responseCode = "404", description = "User Not Found", content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @PutMapping
    @Transactional
    public ResponseEntity<SignedUserDTO> updateUser(
      @RequestBody @Valid UserToUpdateDto userToUpdateDto, HttpServletRequest request) {

        return ResponseEntity
          .status(HttpStatus.OK)
          .body(userService.updateUser(userToUpdateDto, request));

    }

    @Operation(
      summary = "Change user password using token.",
      description = "Let a User change the password using the Token."
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "200", description = "Password changed successfully.",
        content = {
          @Content(mediaType = "application/json",
            schema = @Schema(implementation = SignedUserDTO.class))
        }),
      @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
      @ApiResponse(responseCode = "404", description = "User Not Found", content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @PutMapping("/auth")
    @Transactional
    public ResponseEntity<GeneralResponseDTO> updateUser(
      @RequestBody @Valid UserChangePasswordDTO userChangePasswordDTO, HttpServletRequest request) {

        return ResponseEntity
          .status(HttpStatus.OK)
          .body(userService.changePassword(userChangePasswordDTO, request));

    } 

    @PostMapping("/authGoogle")
    public ResponseEntity<SignedUserGoogleDto> loginGoogle(@RequestBody TokenDto tokenDto) throws IOException {
        SignedUserGoogleDto userGoogleDto = userService.loginGoogle(tokenDto);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userGoogleDto);
    }

    @Operation(
      summary = "Get all users.",
      description = "Get all users in a paginated list. Token is required. Only Admin can access this endpoint."
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "201", description = "User list successfully generated",
        content = {
          @Content(mediaType = "application/json",
            schema = @Schema(implementation = SignedUserDTO.class))
        }),
      @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
      @ApiResponse(responseCode = "404", description = "Users Not Found", content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @Parameters({
      @Parameter(name = "page", description = "Page number", required = false, example = "0"),
      @Parameter(name = "size", description = "Size of the page", required = false, example = "10"),
      @Parameter(name = "sort", description = "Sort the page", required = false, example = "id,desc")
    })
    @GetMapping
    public ResponseEntity<Page<SignedUserDTO>> getAllUsersByAdmin(Pageable pageable) {
        return ResponseEntity.status(200).body(userService.getAllUsersByAdmin(pageable));
    }

    @Operation(
      summary = "Delete a user by admin.",
      description = "Let an admin set active false a user. Token is required. Only Admin can access this endpoint."
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "204", description = "Not content. User deleted successfully.",
        content = {@Content}),
      @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
      @ApiResponse(responseCode = "404", description = "User Not Found", content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deleteByAdmin(@PathVariable Long id) {
        userService.deleteByAdmin(id);
        return ResponseEntity.status(204).build();
    }

    @Operation(
      summary = "Admin get a user data.",
      description = "Let an admin get a data from a user using the authorization token."
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "200", description = "User found successfully.",
        content = {
          @Content(mediaType = "application/json",
            schema = @Schema(implementation = SignedUserDTO.class))
        }),
      @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
      @ApiResponse(responseCode = "404", description = "User Not Found", content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @GetMapping("/me/{id}")
    public ResponseEntity<SignedUserDTO> getUserByAdmin(@PathVariable Long id) {
        return ResponseEntity
          .status(HttpStatus.OK)
          .body(userService.getUserByAdmin(id));
    }

    @Operation(
      summary = "Update data user by an Admin.",
      description = "Let an Admin update another user data. Token is required. Only Admin can access this endpoint"
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "200", description = "User updated successfully.",
        content = {
          @Content(mediaType = "application/json",
            schema = @Schema(implementation = SignedUserDTO.class))
        }),
      @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
      @ApiResponse(responseCode = "404", description = "User Not Found", content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @PutMapping("/me/{id}")
    @Transactional
    public ResponseEntity<SignedUserDTO> updateUserByAdmin(@PathVariable Long id, @RequestBody @Valid UserToUpdateDto userToUpdateDto) {

        return ResponseEntity
          .status(HttpStatus.OK)
          .body(userService.updateByAdmin(userToUpdateDto, id));

    }
}
