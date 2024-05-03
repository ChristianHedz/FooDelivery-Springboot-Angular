package com.example.app.dto.order;

import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

public record UserToSaveOrder(

        @NotNull(message = "El id del usuario es requerido para guardar la orden")
        Long id

)implements Serializable {
}
