package com.example.app.service;

import com.example.app.model.Category;
import com.example.app.model.Product;

import java.util.List;
import java.util.Optional;

public interface CategoryService {


    List<Category> findAll();

    Optional<Category> findById(Long id);

    Category save(Category category);

    Optional<Category> update(Long id, Category category);

    Optional<Category> delete(Long id);
}
