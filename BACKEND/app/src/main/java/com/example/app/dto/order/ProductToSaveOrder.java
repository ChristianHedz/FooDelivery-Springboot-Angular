package com.example.app.dto.order;

import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

public record ProductToSaveOrder(

        @NotNull(message = "El id del producto es requerido para guardar la orden")
        Long id,

        @NotNull(message = "La cantidad del producto es requerida para guardar la orden")
        int quantity

)implements Serializable {
}
