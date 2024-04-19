package com.example.app.service;

import com.example.app.dto.product.ProductPromotionMessagesDto;
import com.example.app.dto.product.ProductWithPromoDto;
import com.example.app.exception.product.ProductNotFoundException;
import com.example.app.exception.promotion.PromotionNotFoundException;
import com.example.app.mapper.ProductMapper;
import com.example.app.model.Product;
import com.example.app.model.Promotion;
import com.example.app.repository.ProductRepository;
import com.example.app.repository.PromotionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductMapper productMapper;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private PromotionRepository promotionRepository;

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
        return productRepository.save(product);
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
