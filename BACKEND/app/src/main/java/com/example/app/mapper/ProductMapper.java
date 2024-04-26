package com.example.app.mapper;

import com.example.app.dto.product.ProductWithPromoDto;
import com.example.app.model.Product;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {PromotionMapper.class})
public interface ProductMapper {
    Product toEntity(ProductWithPromoDto productWithPromoDto);


    ProductWithPromoDto productToProductWithPromosDto(Product product);

}