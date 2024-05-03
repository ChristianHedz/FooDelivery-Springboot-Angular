package com.example.app.mapper;

import com.example.app.dto.promotion.ProductDto;
import com.example.app.dto.promotion.PromoWithProductsDTO;
import com.example.app.model.Promotion;
import com.example.app.dto.promotion.PromotionDto;
import java.util.List;

import org.mapstruct.*;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PromotionMapper {

    Promotion toEntity(PromotionDto promotionDto);

    PromotionDto toDto(Promotion promotion);

    List<PromotionDto> entityListToDtoList(List<Promotion> promotions);

    Promotion toEntity(PromoWithProductsDTO promoWithProductsDTO);

    PromoWithProductsDTO promotionPromoWithProductsDTO(Promotion promotion);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Promotion partialUpdate(PromotionDto promotionDto, @MappingTarget Promotion promotion);

    Promotion toEntity(ProductDto productDto);

    ProductDto toDto1(Promotion promotion);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Promotion partialUpdate(ProductDto productDto, @MappingTarget Promotion promotion);
}
