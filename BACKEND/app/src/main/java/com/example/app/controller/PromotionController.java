package com.example.app.controller;

import com.example.app.promotion.dto.PromotionDto;
import com.example.app.promotion.exepcion.ResourceNotFoundExepcion;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.app.service.PromotionService;

@AllArgsConstructor
@RestController
@RequestMapping("/promotion")
public class PromotionController {

    private final PromotionService promotionService;

    @PostMapping(value = "save")
    public ResponseEntity<PromotionDto> createPromotion(@RequestBody PromotionDto promotionDto) {
        PromotionDto savePromotion = promotionService.createPromotion(promotionDto);
        return new ResponseEntity<>(savePromotion, HttpStatus.CREATED);
    }

    @GetMapping(value = "findById/{id}")
    public ResponseEntity<?> findPromotionById(@PathVariable("id") Long id) {
        try {
            PromotionDto promotionDto = promotionService.findPromotionById(id);
            return ResponseEntity.ok(promotionDto);
        } catch (ResourceNotFoundExepcion ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping(value = "list")
    public ResponseEntity<List<PromotionDto>> listPromotions() {
        List<PromotionDto> promotionDto = promotionService.listPromotions();
        return ResponseEntity.ok(promotionDto);
    }

    @PutMapping(value = "update/{id}")
    public ResponseEntity<PromotionDto> updatePromotionX(@PathVariable("id") Long id, @RequestBody PromotionDto updatePromotion) {
        PromotionDto promotionDto = promotionService.updatePromotion(id, updatePromotion);
        return ResponseEntity.ok(promotionDto);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<String> deletePromotion(@PathVariable("id") Long id) {
        promotionService.deletePromotion(id);
        return ResponseEntity.ok("The Promotion was eliminated");
    }

}
