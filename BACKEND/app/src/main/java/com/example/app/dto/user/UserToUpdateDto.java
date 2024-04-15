package com.example.app.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

/**
 * DTO for {@link com.example.app.model.User}
 */
public record UserToUpdateDto(

  @Pattern(regexp = "^[a-zA-Z]+(\\s[a-zA-Z]+)+$", message = "El nombre debe contener solo letras y espacios, y debe incluir un nombre y un apellido")
  @Size(min = 3, message = "El nombre debe tener al menos 3 caracteres")
  @Size(max = 30, message = "El nombre debe tener como máximo 30 caracteres")
  String fullName,

  @Size(min = 3, message = "El alias debe tener al menos 3 caracteres")
  @Size(max = 30, message = "El alias debe tener como máximo 30 caracteres")
  @Pattern(regexp = "^$|^\\w+$", message = "El username debe estar vacío o contener solo caracteres alfanuméricos y _")
    String alias

) implements Serializable {
}