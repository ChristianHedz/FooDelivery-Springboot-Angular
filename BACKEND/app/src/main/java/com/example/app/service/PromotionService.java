package com.example.app.service;

import com.example.app.promotion.dto.PromotionDto;
import java.util.List;

public interface PromotionService {

    PromotionDto createPromotion(PromotionDto promotionDto);

    PromotionDto findPromotionById(Long id);

    List<PromotionDto> listPromotions();

    PromotionDto updatePromotion(Long id, PromotionDto updatePromotion);

    void deletePromotion(Long id);
}
