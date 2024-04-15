package com.example.app.service.impl;

import com.example.app.service.PromotionService;
import com.example.app.promotion.dto.PromotionDto;
import com.example.app.model.Promotion;
import com.example.app.mapper.PromotionMapping;
import com.example.app.promotion.exepcion.ResourceNotFoundExepcion;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.app.repository.PromotionRepository;

@Service
@AllArgsConstructor
public class PromotionServiceImp implements PromotionService {

    private PromotionRepository promotionRepository;

    @Override
    public PromotionDto createPromotion(PromotionDto promotionDto) {
        Promotion promotion = PromotionMapping.mapper_PromotionDto(promotionDto);
        Promotion promotionSaved = promotionRepository.save(promotion);
        return PromotionMapping.mapper_promotion(promotionSaved);
    }

    @Override
    public PromotionDto findPromotionById(Long id) {
        Promotion promotion = promotionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundExepcion("This Promotion Does Not Exist with that ID: " + id));
        return PromotionMapping.mapper_promotion(promotion);
    }

    @Override
    public List<PromotionDto> listPromotions() {
        List<Promotion> promotions = (List<Promotion>) promotionRepository.findAll();
        return promotions.stream()
                .map(promotion -> PromotionMapping.mapper_promotion(promotion))
                .collect(Collectors.toList());
    }

    @Override
    public PromotionDto updatePromotion(Long id, PromotionDto updatePromotion) {
        Promotion promotion = promotionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundExepcion("This Promotion Does Not Exist with that ID: " + id));

        promotion.setDescription(updatePromotion.getDescription());
        promotion.setCode(updatePromotion.getCode());
        promotion.setPercentage(updatePromotion.getPercentage());

        Promotion promotionUpdated = promotionRepository.save(promotion);

        return PromotionMapping.mapper_promotion(promotionUpdated);
    }

    @Override
    public void deletePromotion(Long id) {
        Promotion promotion = promotionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundExepcion("This Promotion Does Not Exist with that ID: " + id));

        promotionRepository.delete(promotion);
    }

}
