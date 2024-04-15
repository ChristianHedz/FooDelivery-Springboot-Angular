package com.example.app.dto.promotion;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

public record PromotionDto(
        
        Long id,
        
        @NotBlank(message = "La descripción es requerida")
        @Size(max = 100, message = "La descripción debe contener menos de 100 caracteres")
        String description,
        
        @NotBlank(message = "El código es requerido")
        @Size(max = 20, message = "El código debe contener menos de 20 caracteres")
        String code,
        
        @NotNull(message = "El porcentaje es requerido")
        @Positive(message = "El porcentaje debe ser un número positivo")
        Double percentage,
        
        @NotNull(message = "El estado es requerido")
        Boolean active
        
    ) implements Serializable {
    }
