package com.example.app.service;

import com.example.app.dto.order.AddProductInOrderDTO;
import com.example.app.dto.order.OrderCreatedDTO;
import com.example.app.dto.order.OrderRequestDTO;
import com.example.app.model.Order;
import com.example.app.model.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface OrderService {

    ResponseEntity<?> addProductToOrder(AddProductInOrderDTO addProductInOrderDTO);

    List<Order> findAll();

    Optional<Order> findById(Long id);

    Order save(Order order);

    Order update(Long id, Order order);

    Optional<Order> delete(Long id);

    OrderCreatedDTO createOrder(OrderRequestDTO orderRequestDTO);
}
