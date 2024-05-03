package com.example.app.dto.user;

import com.example.app.dto.address.AddressPublicDataDTO;
import com.example.app.model.Role;

import java.io.Serializable;

/**
 * DTO for {@link com.example.app.model.User}
 */
public record UserWithAddressDTO(
  Long id,
  String fullName,
  String phone,
  String email,
  String alias,
  Role role,
  boolean active,
  AddressPublicDataDTO address

) implements Serializable {}