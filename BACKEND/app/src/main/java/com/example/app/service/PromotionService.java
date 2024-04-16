package com.example.app.service;

import com.example.app.dto.promotion.PromoWithProductsDTO;
import com.example.app.dto.promotion.PromotionDto;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PromotionService {

    PromotionDto createPromotion(PromotionDto promotionDto);

    PromotionDto findPromotionById(Long id);

    List<PromotionDto> listPromotions();

    PromotionDto updatePromotion(Long id, PromotionDto updatePromotion);

    void deletePromotion(Long id);
    
    void cancelPromotion(Long id);
    
    Page<PromotionDto> findAllByActiveTrue(Pageable pageable);

    PromoWithProductsDTO getPromotionWithProducts(Long id);
}
