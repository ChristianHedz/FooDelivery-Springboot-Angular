package com.example.app.dto.address;

import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

public record UserToSaveAddress(

        @NotNull(message = "El id del usuario es requerido para guardar una direccion")
        Long id

)implements Serializable {
}
