package com.example.app.service;

import com.example.app.dto.category.CategoryDTO;
import com.example.app.dto.category.CategoryUpdateDTO;
import com.example.app.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CategoryService {


    Page<CategoryDTO> findAll(Pageable pageable);

    Optional<CategoryDTO> findById(Long id);

    CategoryDTO save(CategoryDTO categoryDTO);

    Optional<Category> update(Long id, CategoryUpdateDTO categoryUpdateDTO);

    void delete(Long id);
}
