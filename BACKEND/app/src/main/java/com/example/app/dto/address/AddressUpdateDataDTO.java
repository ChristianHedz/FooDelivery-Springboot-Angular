package com.example.app.dto.address;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

public record AddressUpdateDataDTO(

        @NotBlank(message = "El numero de su recidencia es requerido")
        @Size(max = 70, message = "La direccion debe contener menos de 70 caracteres")
        String streetNumber,

        @Size(max = 150, message = "El punto de referencia debe contener menos de 150 caracteres")
        String referencePoint

) implements Serializable {
}
