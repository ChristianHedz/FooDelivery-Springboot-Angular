package com.example.app.service.impl;

import com.example.app.dto.order.AddProductInOrderDTO;
import com.example.app.model.Order;
import com.example.app.model.OrderItems;
import com.example.app.model.Product;
import com.example.app.model.User;
import com.example.app.repository.OrderItemsRepository;
import com.example.app.repository.OrderRepository;
import com.example.app.repository.ProductRepository;
import com.example.app.repository.UserRepository;
import com.example.app.service.OrderService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private ProductRepository productRepository;

    public ResponseEntity<?> addProductToOrder(AddProductInOrderDTO addProductInOrderDTO) {
        Order activeOrder = orderRepository.findByUserId(addProductInOrderDTO.getUserId());
        Optional<OrderItems> optionalOrderItems = orderItemsRepository.findByProductIdAndOrderIdAndUserId
                (addProductInOrderDTO.getProductId(), activeOrder.getId(), addProductInOrderDTO.getUserId());

        if (optionalOrderItems.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } else {
            Optional<Product> optionalProduct = productRepository.findById(addProductInOrderDTO.getProductId());
            Optional<User> optionalUser = userRepository.findById(addProductInOrderDTO.getProductId());

            if(optionalProduct.isPresent() && optionalUser.isPresent()){
                OrderItems order = new OrderItems();
                order.setProduct(optionalProduct.get());
                order.setPrice(optionalProduct.get().getPrice());
                order.setQuantity(1L);
                order.setUser(optionalUser.get());
                order.setOrder(activeOrder);

                OrderItems updatedOrder = orderItemsRepository.save(order);

                activeOrder.setTotalPrice(activeOrder.getTotalPrice().add(order.getPrice()));
                activeOrder.setQuantity(activeOrder.getQuantity() + 1L);
                activeOrder.getOrderItems().add(order);

                orderRepository.save(activeOrder);

                return ResponseEntity.status(HttpStatus.CREATED).body(order);


            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or product not fond");
            }

        }

    }


    @Override
    @Transactional(readOnly = true)
    public List<Order> findAll() {
        return (List<Order>) orderRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    @Transactional
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order update(Long id, Order order) {
        return null;
    }

    @Override
    public Optional<Order> delete(Long id) {
        return Optional.empty();
    }
}
