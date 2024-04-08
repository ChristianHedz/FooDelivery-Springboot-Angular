package com.example.app.dto.user;

import com.example.app.model.Role;

import java.io.Serializable;

/**
 * DTO for {@link com.example.app.model.User}
 */
public record SignedUserDTO(
  boolean isError,
  Long id,
  String fullName,
  String phone,
  String email,
  String alias,
  Role role

) implements Serializable {
    public SignedUserDTO {
        isError = false;
    }
}