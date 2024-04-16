package com.example.app.service;

import com.example.app.dto.product.ProductPromotionMessagesDto;
import com.example.app.dto.product.ProductWithPromoDto;
import com.example.app.model.Product;


import java.util.List;
import java.util.Optional;

public interface ProductService {


    List<Product> findAll();

    Optional<Product> findById(Long id);

    Product save(Product product);

    Optional<Product> update(Long id, Product product);

    Optional<Product> delete(Long id);

    ProductPromotionMessagesDto addPromotion(Long idProduct, Long promotionId);

    void removePromotion(Long idProduct);

    ProductWithPromoDto getProductWithPromotion(Long idProduct);

}
