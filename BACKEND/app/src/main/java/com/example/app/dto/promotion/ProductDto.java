package com.example.app.dto.promotion;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link com.example.app.model.Product}
 */
public record ProductDto(
  Long id, @NotBlank
  String name, @NotBlank
  String img, @NotBlank
  String description,
  @NotNull BigDecimal price

) implements Serializable {
}