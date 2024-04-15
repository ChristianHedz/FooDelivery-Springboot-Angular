package com.example.app.repository;

import com.example.app.model.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository <Product, Long> {


}
