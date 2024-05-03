package com.example.app.dto.product;

import com.example.app.dto.promotion.PromotionDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link com.example.app.model.Product}
 */
public record ProductWithPromoDto(
  boolean isError,

  Long id,

  @NotBlank
  String name,

  @NotBlank
  String img,

  @NotBlank
  String description,

  @NotNull
  BigDecimal price,

  PromotionDto promotion

) implements Serializable {

  public ProductWithPromoDto {
    isError = false;
  }
}