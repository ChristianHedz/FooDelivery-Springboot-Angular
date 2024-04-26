package com.example.app.dto.Invoice;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.io.Serializable;
import java.time.LocalDateTime;

public record InvoiceDto(
        
        Long id,
        
        @NotNull(message = "El monto es requerido")
        @Positive(message = "El monto debe ser un número positivo")
        Double amount,
        
        @NotNull(message = "El ID de Order es requerido")
        Long idOrder,
        
        @NotNull(message = "El precio total es requerido")
        @Positive(message = "El precio total debe ser un número positivo")
        Double totalPrice,
        
        @NotNull(message = "La fecha y hora son requeridas")
        LocalDateTime dateAndTime,
        
        @NotNull(message = "El método de pago es requerido")
        String payment
            
    ) implements Serializable {

}
