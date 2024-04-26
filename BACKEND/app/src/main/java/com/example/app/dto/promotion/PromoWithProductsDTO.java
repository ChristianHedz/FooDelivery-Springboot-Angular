package com.example.app.dto.promotion;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.example.app.model.Promotion}
 */
public record PromoWithProductsDTO(

  Boolean isError,
  Long id,
  String description,
  String code,
  Double percentage,
  Boolean active,
  List<ProductDto> products

) implements Serializable {

    public PromoWithProductsDTO {
        isError = false;
    }
}