package com.example.app.dto.address;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

/**
 * DTO for {@link com.example.app.model.Address}
 */
public record AddressDTO(

        @Valid
        @NotNull(message = "El usuario es requerido")
        UserToSaveAddress user,

        @NotBlank(message = "La provincia es requerida")
        @Size(max = 30, message = "La provincia debe contener menos de 30 caracteres")
        String province,

        @NotBlank(message = "La localidad es requerida")
        @Size(max = 50, message = "La localidad debe contener menos de 50 caracteres")
        String locality,

        @NotBlank(message = "El numero de su recidencia es requerido")
        @Size(max = 70, message = "La direccion debe contener menos de 70 caracteres")
        String streetNumber,

        @Size(max = 150, message = "El punto de referencia debe contener menos de 150 caracteres")
        String referencePoint

) implements Serializable {
}