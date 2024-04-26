package com.example.app.controller;

import com.example.app.dto.category.CategoryDTO;
import com.example.app.dto.category.CategoryUpdateDTO;
import com.example.app.mapper.CategoryMapper;
import com.example.app.model.Category;
import com.example.app.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Tag(name = "Categories", description = "Manage all endpoints about Categories")
@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Operation(summary = "Create a new category", description = "Create a new category.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201", description = "Category created successfully",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = CategoryDTO.class))
                    }),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
                    @Content}),
            @ApiResponse(responseCode = "400", description = "Invalid request body", content = {
                    @Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
                    @Content})
    })
    @PostMapping
    public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryDTO categoryDTO, BindingResult result) {
        if (result.hasFieldErrors()) {
            return ResponseEntity.badRequest().build();
        }
        CategoryDTO savedCategoryDTO = categoryService.save(categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCategoryDTO);
    }

    @Operation(summary = "List all categories", description = "Retrieves a list of all categories")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Categories list successfully generated",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = CategoryDTO.class))
                    }),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
                    @Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
                    @Content})
    })
    @GetMapping
    @SecurityRequirements
    public Page<CategoryDTO> listCategories(Pageable pageable) {
        return categoryService.findAll(pageable);
    }

    @Operation(summary = "Get category by ID", description = "Get a category by its ID.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Category found successfully",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = CategoryDTO.class))
                    }),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
                    @Content}),
            @ApiResponse(responseCode = "404", description = "Category not found", content = {
                    @Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
                    @Content})
    })
    @GetMapping("/{id}")
    @SecurityRequirements
    public ResponseEntity<?> findCategoriesById(@PathVariable Long id) {
        Optional<CategoryDTO> categoryOptional = categoryService.findById(id);
        if (categoryOptional.isPresent()) {
            return ResponseEntity.ok(categoryOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Update category by ID", description = "Update a category by its ID.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Category updated successfully",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = CategoryUpdateDTO.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Invalid request body", content = {
                    @Content}),
            @ApiResponse(responseCode = "404", description = "Category not found", content = {
                    @Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
                    @Content})
    })
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryUpdateDTO categoryDTO, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }

        Optional<Category> updatedCategory = categoryService.update(id, categoryDTO);
        if (updatedCategory.isPresent()) {
            return ResponseEntity.ok().body(updatedCategory.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Delete category by ID", description = "Delete a category by its ID.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204", description = "Category deleted successfully",
                    content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
                    @Content}),
            @ApiResponse(responseCode = "404", description = "Category not found", content = {
                    @Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
                    @Content})
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.delete(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "The field " + err.getField() + " must not be empty");
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
