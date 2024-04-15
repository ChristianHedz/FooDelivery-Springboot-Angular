package com.example.app.service.impl;

import com.example.app.mapper.PromotionMapper;
import com.example.app.service.PromotionService;
import com.example.app.model.Promotion;
import com.example.app.dto.promotion.PromotionDto;
import com.example.app.exeption.promotion.PromotionNotFoundExepcion;
import java.util.List;
import org.springframework.stereotype.Service;
import com.example.app.repository.PromotionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor

@Service
public class PromotionServiceImp implements PromotionService {

    private final PromotionRepository promotionRepository;
    private final PromotionMapper promotionMapper;

    @Override
    @Transactional
    public PromotionDto createPromotion(PromotionDto promotionDto) {
        Promotion promotion = promotionMapper.toEntity(promotionDto);
        Promotion promotionSaved = promotionRepository.save(promotion);
        return promotionMapper.toDto(promotionSaved);
    }

    @Override
    @Transactional(readOnly = true)
    public PromotionDto findPromotionById(Long id) {
        Promotion promotion = promotionRepository.findById(id).orElseThrow(() -> new PromotionNotFoundExepcion("This Promotion Does Not Exist with that ID: " + id));
        return promotionMapper.toDto(promotion);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PromotionDto> listPromotions() {
        List<Promotion> promotions = (List<Promotion>) promotionRepository.findAll();
        return promotionMapper.entityListToDtoList(promotions);
    }

    @Override
    @Transactional
    public PromotionDto updatePromotion(Long id, PromotionDto updatePromotion) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new PromotionNotFoundExepcion("This Promotion Does Not Exist with that ID: " + id));

        promotion.setDescription(updatePromotion.description());
        promotion.setCode(updatePromotion.code());
        promotion.setPercentage(updatePromotion.percentage());

        return promotionMapper.toDto(promotionRepository.save(promotion));
    }

    @Override
    @Transactional
    public void deletePromotion(Long id) {
        Promotion promotion = promotionRepository.findById(id).orElseThrow(() -> new PromotionNotFoundExepcion("This Promotion Does Not Exist with that ID: " + id));

        promotionRepository.delete(promotion);
    }

    @Override
    @Transactional
    public void cancelPromotion(Long id) {
        Promotion promotion = promotionRepository.findById(id).orElseThrow(() -> new PromotionNotFoundExepcion("This Promotion Does Not Exist with that ID: " + id));

        promotion.setActive(Boolean.FALSE);

        promotionRepository.save(promotion);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PromotionDto> findAllByActiveTrue(Pageable pageable) {
        return promotionRepository.findAllByActiveTrue(pageable).map(promotionMapper::toDto);
    }

}
