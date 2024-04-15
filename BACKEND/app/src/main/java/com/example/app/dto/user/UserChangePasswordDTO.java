package com.example.app.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

/**
 * DTO for {@link com.example.app.model.User}
 */
public record UserChangePasswordDTO(

  @NotBlank(message = "La contraseña anterior es requerida")
  @Size(min = 8, message = "La contraseña anterior debe tener al menos 8 caracteres")
  @Size(max = 16, message = "La contraseña anterior debe tener como máximo 16 caracteres")
  String oldPassword,

  @NotBlank(message = "La nueva contraseña es requerida")
  @Size(min = 8, message = "La nueva contraseña debe tener al menos 8 caracteres")
  @Size(max = 16, message = "La nueva contraseña debe tener como máximo 16 caracteres")
  String newPassword

) implements Serializable {
}