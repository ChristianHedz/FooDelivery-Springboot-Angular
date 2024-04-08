package com.example.app.mapper;

import com.example.app.promotion.dto.PromotionDto;
import com.example.app.model.Promotion;

public class PromotionMapping {

    public static PromotionDto mapper_promotion(Promotion promotion) {
        return new PromotionDto(
                promotion.getId(),
                promotion.getDescription(),
                promotion.getCode(),
                promotion.getPercentage()
        );
    }

    public static Promotion mapper_PromotionDto(PromotionDto promotionDto) {
        return new Promotion(
                promotionDto.getId(),
                promotionDto.getDescription(),
                promotionDto.getCode(),
                promotionDto.getPercentage()
        );
    }

}
