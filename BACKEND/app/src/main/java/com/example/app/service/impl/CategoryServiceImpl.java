package com.example.app.service.impl;


import com.example.app.dto.category.CategoryDTO;
import com.example.app.dto.category.CategoryUpdateDTO;
import com.example.app.mapper.CategoryMapper;
import com.example.app.model.Category;
import com.example.app.repository.CategoryRepository;
import com.example.app.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    @Transactional(readOnly = true)
    public Page<CategoryDTO> findAll(Pageable pageable) {
        Page<Category> categoriesPage = categoryRepository.findAll(pageable);
        return categoriesPage.map(categoryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CategoryDTO> findById(Long id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        return categoryOptional.map(this::mapToDTO);
    }

    private CategoryDTO mapToDTO(Category category) {
        Long categoryId = category.getId().longValue();
        return new CategoryDTO(categoryId, category.getName());
    }


    @Override
    @Transactional
    public CategoryDTO save(CategoryDTO categoryDTO) {
        Category category = categoryMapper.toEntity(categoryDTO);
        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toDto(savedCategory);
    }

    @Override
    @Transactional
    public Optional<Category> update(Long id, CategoryUpdateDTO categoryUpdateDTO) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        categoryOptional.ifPresent(category -> {
            category.setName(categoryUpdateDTO.name());
            categoryRepository.save(category);
        });
        return categoryOptional;
    }

    @Override
    @Transactional
    public void delete(Long id) {
                Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        categoryRepository.delete(category);
    }
}
