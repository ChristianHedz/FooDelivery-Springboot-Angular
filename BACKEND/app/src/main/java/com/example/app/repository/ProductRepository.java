package com.example.app.repository;

import com.example.app.model.Product;
import com.example.app.model.Promotion;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductRepository extends CrudRepository <Product, Long> {
    @Query("SELECT p FROM Product p WHERE p.promotion IS NOT NULL")
    List<Product> findAllWithPromotion();
}
