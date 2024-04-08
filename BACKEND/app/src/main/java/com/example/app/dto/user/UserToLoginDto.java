package com.example.app.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

/**
 * DTO for {@link com.example.app.model.User}
 */
public record UserToLoginDto(
  @NotBlank(message = "El email es requerido")
  @Pattern(regexp = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}+$", message = "El email no es válido")
  String email,

  @NotBlank(message = "El password es requerido")
  @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
  @Size(max = 16, message = "La contraseña debe tener como máximo 16 caracteres")
  String password

) implements Serializable {
}