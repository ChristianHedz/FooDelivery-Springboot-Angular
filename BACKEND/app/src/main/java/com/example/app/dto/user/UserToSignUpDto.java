package com.example.app.dto.user;

import com.example.app.model.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

/**
 * DTO for {@link com.example.app.model.User}
 */
public record UserToSignUpDto(
  @NotBlank(message = "El nombre completo es requerido")
  @Pattern(regexp = "^[a-zA-Z]+(\\s[a-zA-Z]+)+$", message = "El nombre completo debe contener solo letras y espacios, y debe incluir un nombre y un apellido")
  @Size(min = 3, message = "El nombre completo debe tener al menos 3 caracteres")
  @Size(max = 30, message = "El nombre completo debe tener como máximo 30 caracteres")
  String fullName,
  @NotBlank(message = "El numero de teléfono es requerido")
  @Pattern(regexp = "^[0-9]{10,15}$", message = "El número de teléfono deben ser dígitos y longitud entre 10-15")
  String phone,
  @NotBlank(message = "El email es requerido")
  @Pattern(regexp = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}+$", message = "El email no es válido")
  String email,
  @NotBlank(message = "La contraseña es requerida")
  @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
  @Size(max = 16, message = "La contraseña debe tener como máximo 16 caracteres")
  String password,

  @Size(min = 3, message = "El alias debe tener al menos 3 caracteres")
  @Size(max = 30, message = "El alias debe tener como máximo 30 caracteres")
  @Pattern(regexp = "^$|^\\w+$", message = "El username debe estar vacío o contener solo caracteres alfanuméricos y _")
  String alias,

  @JsonIgnore
  Role role,

  @JsonIgnore
  boolean active

) implements Serializable {

  public UserToSignUpDto {

    active = true;

    if (role == null) {
      role = Role.CUSTOMER;
    }

  }
}