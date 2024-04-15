package com.example.app.mapper;

import com.example.app.model.Promotion;
import com.example.app.dto.promotion.PromotionDto;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PromotionMapper {

    Promotion toEntity(PromotionDto promotionDto);

    PromotionDto toDto(Promotion promotion);

    List<PromotionDto> entityListToDtoList(List<Promotion> promotions);
}
