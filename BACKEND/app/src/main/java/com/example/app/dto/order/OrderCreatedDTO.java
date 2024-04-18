package com.example.app.dto.order;

import com.example.app.dto.user.SignedUserDTO;
import com.example.app.dto.user.UserWithAddressDTO;
import com.example.app.model.PaymentMethod;
import com.example.app.model.StatusOrder;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * DTO for {@link com.example.app.model.Order}
 */
public record OrderCreatedDTO(

  Long id,
  BigDecimal totalPrice,
  StatusOrder status,
  PaymentMethod paymentMethod,
  Date createdAt,
  Date updatedAt,
  UserWithAddressDTO user

) implements Serializable {
}