package com.example.app.dto.order;

import com.example.app.model.PaymentMethod;
import com.example.app.model.StatusOrder;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

/**
 * DTO for {@link com.example.app.model.Order}
 */
public record OrderRequestDTO(

  @NotNull(message = "El total de la orden es requerido") BigDecimal totalPrice,
  @NotNull(message = "El estatus de la orden es requerido") StatusOrder status,
  @NotNull(message = "El metodo de pago de la orden es requerido") PaymentMethod paymentMethod,
  @NotNull(message = "La fecha de creacion de la orden es requerida") Date createdAt,

  @Valid
  @NotNull(message = "El ID del usuario es requerido") UserToSaveOrder user,

  PromotionToSaveOrder promotion,
  Set<ProductToSaveOrder> products

) implements Serializable {
}