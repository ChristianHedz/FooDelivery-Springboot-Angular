package com.example.app.dto.order;

import com.example.app.dto.product.ProductWithPromoDto;

import java.io.Serializable;

/**
 * DTO for {@link com.example.app.model.OrderProduct}
 */
public record OrderProductDto(

  Long id,
  ProductWithPromoDto product,
  int quantity

) implements Serializable {
}