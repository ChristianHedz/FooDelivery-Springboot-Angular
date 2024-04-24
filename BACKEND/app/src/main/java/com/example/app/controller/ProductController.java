package com.example.app.controller;


import com.example.app.dto.product.ProductPromotionMessagesDto;
import com.example.app.dto.product.ProductWithPromoDto;
import com.example.app.model.Category;
import com.example.app.model.Product;
import com.example.app.repository.CategoryRepository;
import com.example.app.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Tag(name = "Products", description = "Manage all endpoints about Products")
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;
    private final CategoryRepository categoryRepository;

    @Operation(
            summary = "List all products.",
            description = "Retrieves a list of all products."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Products list successfully generated",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = Product.class))
                    }),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
                    @Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
                    @Content})
    })
    @GetMapping
    @SecurityRequirements
    public List<Product> list() {
        return service.findAll();
    }

    @Operation(
            summary = "Find a product by ID.",
            description = "Finds a product by its unique identifier."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Product found",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = Product.class))
                    }),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
                    @Content}),
            @ApiResponse(responseCode = "404", description = "Product not found", content = {
                    @Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
                    @Content})
    })
    @GetMapping("/{id}")
    @SecurityRequirements
    public ResponseEntity<?> view(@PathVariable Long id) {
        Optional<Product> productOptional = service.findById(id);
        if (productOptional.isPresent()) {
            return ResponseEntity.ok(productOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(
            summary = "Create a new product.",
            description = "Creates a new product with the provided details."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201", description = "Product created successfully",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = Product.class))
                    }),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
                    @Content}),
            @ApiResponse(responseCode = "400", description = "Invalid request body", content = {
                    @Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
                    @Content})
    })
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Product product, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(product));
    }

    @Operation(
            summary = "Update a product.",
            description = "Updates an existing product with the provided details."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Product updated successfully",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = Product.class))
                    }),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
                    @Content}),
            @ApiResponse(responseCode = "404", description = "Product not found", content = {
                    @Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
                    @Content})
    })
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody Product product, BindingResult result, @PathVariable Long id) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }
        Optional<Product> productOptional = service.update(id, product);
        if (productOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(productOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(
            summary = "Delete a product.",
            description = "Deletes a product by its unique identifier."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Product deleted successfully",
                    content = {
                            @Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
                    @Content}),
            @ApiResponse(responseCode = "404", description = "Product not found", content = {
                    @Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
                    @Content})
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Product> productOptional = service.delete(id);
        if (productOptional.isPresent()) {
            return ResponseEntity.ok(productOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }




    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "The field " + err.getField() + " must not be empty");
        });
        return ResponseEntity.badRequest().body(errors);
    }

    @Operation(
            summary = "Add a promotion to a product.",
            description = "Let an admin add a promotion to a product. Token is required. Only Admin can access this endpoint."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201", description = "Promotion successfully  created.",
                    content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Product not found", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Promotion not found", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @PostMapping("/{idProduct}/promotion/{idPromotion}")
    @Transactional
    public ResponseEntity<ProductPromotionMessagesDto> addPromotionToProduct(
            @PathVariable Long idProduct,
            @PathVariable Long idPromotion
    ) {

        ProductPromotionMessagesDto productPromotionMessagesDto = service.addPromotion(idProduct, idPromotion);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productPromotionMessagesDto);
    }

    @Operation(
            summary = "Remove a promotion from a product.",
            description = "Let an admin remove a promotion from a product. Token is required. Only Admin can access this endpoint."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204", description = "Not content. Promotion successfully remove it.",
                    content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Product not found", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Promotion not found", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @DeleteMapping("/{idProduct}/promotion")
    @Transactional
    public ResponseEntity<ProductPromotionMessagesDto> removePromotionFromProduct(
            @PathVariable Long idProduct
    ) {

        service.removePromotion(idProduct);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @Operation(
            summary = "Get the promotion from a product.",
            description = "Let a user see a promotion from a product."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Promotion successfully found it.",
                    content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Product not found", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Promotion not found", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @GetMapping("/{productId}/promotion")
    @SecurityRequirements()
    public ResponseEntity<ProductWithPromoDto> getProductWithPromotion(@PathVariable Long productId) {
        ProductWithPromoDto productWithPromoDto = service.getProductWithPromotion(productId);
        return ResponseEntity.status(200).body(productWithPromoDto);
    }

    @Operation(
            summary = "Get all products with promotions.",
            description = "Let a user without a token get all products with promotions."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Products with promotions successfully found them.",
                    content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Product not found", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Promotion not found", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @GetMapping("/promotions")
    @SecurityRequirements()
    public ResponseEntity<List<ProductWithPromoDto>> getProductsWithPromotions() {
        return ResponseEntity.status(200).body(service.getProductsWithPromotions());
    }
}
