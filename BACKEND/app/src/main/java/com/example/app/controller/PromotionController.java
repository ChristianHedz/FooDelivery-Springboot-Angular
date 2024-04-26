package com.example.app.controller;

import com.example.app.dto.promotion.PromoWithProductsDTO;
import com.example.app.dto.promotion.PromotionDto;
import com.example.app.exeption.promotion.PromotionNotFoundExepcion;
import java.util.List;

import io.swagger.v3.oas.annotations.security.SecurityRequirements;
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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Tag(name = "Promotions", description = "Manage all endpoints about Promotions")
@RestController
@RequestMapping("/promotions")
@RequiredArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    @Operation(
            summary = "Create a new promotion.",
            description = "Creates a new promotion with the provided details."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "201", description = "Promotion created successfully",
                content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PromotionDto.class))
                }),
        @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
            @Content}),
        @ApiResponse(responseCode = "400", description = "Invalid request body", content = {
            @Content}),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
            @Content})
    })
    @PostMapping("/save")
    public ResponseEntity<PromotionDto> createPromotion(@RequestBody PromotionDto promotionDto) {
        PromotionDto savePromotion = promotionService.createPromotion(promotionDto);
        return new ResponseEntity<>(savePromotion, HttpStatus.CREATED);
    }

    @Operation(
            summary = "Find a promotion by ID.",
            description = "Finds a promotion by its unique identifier."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200", description = "Promotion found",
                content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PromotionDto.class))
                }),
        @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
            @Content}),
        @ApiResponse(responseCode = "404", description = "Promotion not found", content = {
            @Content}),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
            @Content})
    })
    @GetMapping("/search/{id}")
    public ResponseEntity<?> findPromotionById(@PathVariable("id") Long id) {
        try {
            PromotionDto promotionDto = promotionService.findPromotionById(id);
            return ResponseEntity.ok(promotionDto);
        } catch (PromotionNotFoundExepcion ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @Operation(
            summary = "List all promotions.",
            description = "Retrieves a list of all promotions."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200", description = "Promotions list successfully generated",
                content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PromotionDto.class))
                }),
        @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
            @Content}),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
            @Content})
    })
    @GetMapping("/list")
    public ResponseEntity<List<PromotionDto>> listPromotions() {
        List<PromotionDto> promotionDto = promotionService.listPromotions();
        return ResponseEntity.ok(promotionDto);
    }

    @Operation(
            summary = "Update a promotion.",
            description = "Updates an existing promotion with the provided details."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200", description = "Promotion updated successfully",
                content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PromotionDto.class))
                }),
        @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
            @Content}),
        @ApiResponse(responseCode = "404", description = "Promotion not found", content = {
            @Content}),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
            @Content})
    })
    @PutMapping("/update/{id}")
    public ResponseEntity<PromotionDto> updatePromotionX(@PathVariable("id") Long id, @RequestBody PromotionDto updatePromotion) {
        PromotionDto promotionDto = promotionService.updatePromotion(id, updatePromotion);
        return ResponseEntity.ok(promotionDto);
    }

    @Operation(
            summary = "Delete a promotion.",
            description = "Deletes a promotion by its unique identifier."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200", description = "Promotion deleted successfully",
                content = {
                    @Content}),
        @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
            @Content}),
        @ApiResponse(responseCode = "404", description = "Promotion not found", content = {
            @Content}),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
            @Content})
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePromotion(@PathVariable("id") Long id) {
        promotionService.deletePromotion(id);
        return ResponseEntity.ok("The Promotion was eliminated");
    }

    @Operation(
            summary = "Cancel a promotion.",
            description = "Cancels a promotion by its unique identifier."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200", description = "Promotion canceled successfully",
                content = {
                    @Content}),
        @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
            @Content}),
        @ApiResponse(responseCode = "404", description = "Promotion not found", content = {
            @Content}),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
            @Content})
    })
    @PutMapping("/cancel/{id}")
    public ResponseEntity<String> cancelPromotion(@PathVariable("id") Long id) {
        promotionService.cancelPromotion(id);
        return ResponseEntity.ok("The Promotion was canceled");
    }

    @Operation(
            summary = "Get all active promotions.",
            description = "Get all active promotions in a paginated list. Token is required. Only Admin can access this endpoint."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200", description = "Promotion list successfully generated",
                content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PromotionDto.class))
                }),
        @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
            @Content}),
        @ApiResponse(responseCode = "404", description = "Promotions Not Found", content = {
            @Content}),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
            @Content})
    })
    @Parameters({
        @Parameter(name = "page", description = "Page number", required = false, example = "0"),
        @Parameter(name = "size", description = "Size of the page", required = false, example = "10"),
        @Parameter(name = "sort", description = "Sort the page", required = false, example = "id,desc")
    })
    @GetMapping("/actives")
    public ResponseEntity<Page<PromotionDto>> getAllActivePromotions(Pageable pageable) {
        Page<PromotionDto> promotionsPage = promotionService.findAllByActiveTrue(pageable);
        return ResponseEntity.status(200).body(promotionsPage);
    }

    @Operation(
      summary = "Get all orderProducts from one promotion.",
      description = "Get all orderProducts with the same promotion."
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "200", description = "Promotion with product list successfully generated",
        content = {
          @Content(mediaType = "application/json",
            schema = @Schema(implementation = PromotionDto.class))
        }),
      @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
        @Content}),
      @ApiResponse(responseCode = "404", description = "Promotion Not Found", content = {
        @Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
        @Content})
    })
    @GetMapping("/{id}/products")
    @SecurityRequirements()
    public ResponseEntity<PromoWithProductsDTO> getPromotionWithProducts(@PathVariable Long id) {
        PromoWithProductsDTO promoWithProductsDTO = promotionService.getPromotionWithProducts(id);
        return ResponseEntity.ok(promoWithProductsDTO);
    }

}
