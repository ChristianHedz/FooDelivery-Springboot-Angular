package com.example.app.controller;

import com.example.app.model.Category;
import com.example.app.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService service;

    @GetMapping
    public List<Category> list() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> view(@PathVariable Long id) {
        Optional<Category> categoryOptional = service.findById(id);
        if (categoryOptional.isPresent()) {
            return ResponseEntity.ok(categoryOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Category category, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody Category category, BindingResult result, @PathVariable Long id) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }
        Optional<Category> categoryOptional = service.update(id, category);
        if (categoryOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(categoryOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> delete(@PathVariable Long id) {
//        Optional<Category> categoryOptional = service.findById(id);
//        if (categoryOptional.isPresent()) {
//            Category category = categoryOptional.get();
//
//            // Check if the category has associated products
//            if (!category.getProducts().isEmpty()) {
//                // Return a message indicating that the category cannot be deleted because it has associated products
//                Map<String, String> error = new HashMap<>();
//                error.put("message", "Cannot be removed, has products");
//                return ResponseEntity.badRequest().body(error);
//            }
//
//            service.delete(id);
//            return ResponseEntity.ok().build();
//        }
//        return ResponseEntity.notFound().build();
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Category> categoryOptional = service.delete(id);
        if (categoryOptional.isPresent()) {
            return ResponseEntity.ok(categoryOptional.orElseThrow());
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

}
