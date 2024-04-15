package com.example.app.controller;

import com.example.app.dto.GeneralResponseDTO;
import com.example.app.dto.user.*;
import com.example.app.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
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

    @PutMapping("/auth")
    @Transactional
    public ResponseEntity<GeneralResponseDTO> updateUser(
      @RequestBody @Valid UserChangePasswordDTO userChangePasswordDTO, HttpServletRequest request) {

        return ResponseEntity
          .status(HttpStatus.OK)
          .body(userService.changePassword(userChangePasswordDTO, request));

    }
   
}
