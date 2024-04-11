package com.example.app.service;


import com.example.app.model.Category;
import com.example.app.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Category> findAll() {
        return (List<Category>) categoryRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    @Transactional
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public Optional<Category> update(Long id, Category category) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if(categoryOptional.isPresent()){
            Category categoryDb = categoryOptional.orElseThrow();
            categoryDb.setName(category.getName());
        }
        return categoryOptional;
    }

    @Override
    public Optional<Category> delete(Long id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()){
            Category categoryDb = categoryOptional.orElseThrow();
            categoryRepository.delete(categoryDb);
        }
        return categoryOptional;
    }


}
