package com.example.app.service.impl;

import com.example.app.dto.order.AddProductInOrderDTO;
import com.example.app.dto.order.OrderCreatedDTO;
import com.example.app.dto.order.OrderRequestDTO;
import com.example.app.exception.promotion.PromotionNotFoundException;
import com.example.app.exception.user.UserNotFoundException;
import com.example.app.mapper.OrderMapper;
import com.example.app.model.*;
import com.example.app.repository.OrderRepository;
import com.example.app.repository.PromotionRepository;
import com.example.app.repository.UserRepository;
import com.example.app.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final OrderMapper orderMapper;
    private final PromotionRepository promotionRepository;


    @Override
    public ResponseEntity<?> addProductToOrder(AddProductInOrderDTO addProductInOrderDTO) {
        return null;
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

    @Override
    public OrderCreatedDTO createOrder(OrderRequestDTO orderRequestDTO) {
        User user = userRepository.findById(orderRequestDTO.user().id())
          .orElseThrow(() -> new UserNotFoundException("User not found in the database"));

        Promotion promotion = promotionRepository.findById(orderRequestDTO.promotion().id())
          .orElseThrow(() -> new PromotionNotFoundException("Promotion not found in the database"));

        Order order = orderMapper.toEntity(orderRequestDTO);

        user.addOrder(order);
        promotion.addOrder(order);

        return orderMapper.orderToOrderCreatedDTO(orderRepository.save(order));
    }
}
