package com.example.app.service.impl;

import com.example.app.dto.product.ProductPromotionMessagesDto;
import com.example.app.dto.product.ProductWithPromoDto;
import com.example.app.exception.product.ProductNotFoundException;
import com.example.app.exception.promotion.PromotionNotFoundException;
import com.example.app.mapper.ProductMapper;
import com.example.app.model.Category;
import com.example.app.model.Product;
import com.example.app.model.Promotion;
import com.example.app.repository.CategoryRepository;
import com.example.app.repository.ProductRepository;
import com.example.app.repository.PromotionRepository;
import com.example.app.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductMapper productMapper;
    private final ProductRepository productRepository;
    private final PromotionRepository promotionRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Product> findAll() {
        return (List<Product>) productRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    @Transactional
    public Product save(Product product) {
        if (product.getCategory() != null && product.getCategory().getId() != null) {
            Long categoryId = product.getCategory().getId().longValue();
            Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
            if (categoryOptional.isPresent()) {
                product.setCategory(categoryOptional.get());
                return productRepository.save(product);
            } else {
                throw new IllegalArgumentException("Specified category does not exist");
            }
        } else {
            throw new IllegalArgumentException("Category is required for the product");
        }
    }

    @Override
    @Transactional
    public Optional<Product> update(Long id, Product product) {
        Optional<Product> productOptional = productRepository.findById(id);
        if(productOptional.isPresent()){
            Product productDb = productOptional.orElseThrow();
            productDb.setName(product.getName());
            productDb.setImg(product.getImg());
            productDb.setDescription(product.getDescription());
            productDb.setPrice(product.getPrice());
            productDb.setCategory(product.getCategory());
        }
        return productOptional;
    }

    @Override
    @Transactional
    public Optional<Product> delete(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isPresent()){
            Product productDb = productOptional.orElseThrow();
            productRepository.delete(productDb);
        }
        return productOptional;
    }

    @Override
    public ProductPromotionMessagesDto addPromotion(Long idProduct, Long promotionId) {
        Product product = productRepository.findById(idProduct).orElseThrow(
                () -> new ProductNotFoundException("Product not found with id: " + idProduct)
        );

        Promotion promotion = promotionRepository.findById(promotionId).orElseThrow(
                () -> new PromotionNotFoundException("Promotion not found with id: " + promotionId)
        );

        promotion.addProduct(product);

        return new ProductPromotionMessagesDto(
          false,
            "Promotion added to product successfully"
        );
    }

    @Override
    public void removePromotion(Long idProduct) {
        Product product = productRepository.findById(idProduct).orElseThrow(
          () -> new ProductNotFoundException("Product not found with id: " + idProduct)
        );

        if (product.getPromotion() != null) {
            product.getPromotion().removeProduct(product);
        }
    }

    @Override
    public ProductWithPromoDto getProductWithPromotion(Long idProduct) {
        Product product = productRepository.findById(idProduct).orElseThrow(
          () -> new ProductNotFoundException("Product not found with id: " + idProduct)
        );

        return productMapper.productToProductWithPromosDto(product);
    }

    @Override
    public List<ProductWithPromoDto> getProductsWithPromotions() {
        return productRepository.findAllWithPromotion().stream()
          .map(productMapper::productToProductWithPromosDto)
          .toList();
    }
}
