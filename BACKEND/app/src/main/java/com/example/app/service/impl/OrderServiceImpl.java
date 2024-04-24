package com.example.app.service.impl;

import com.example.app.dto.order.OrderDto;
import com.example.app.dto.order.OrderRequestDTO;
import com.example.app.exception.order.OrderNotFoundException;
import com.example.app.exception.product.ProductNotFoundException;
import com.example.app.exception.promotion.PromotionNotFoundException;
import com.example.app.exception.user.UserNotFoundException;
import com.example.app.mapper.OrderMapper;
import com.example.app.model.*;
import com.example.app.repository.OrderRepository;
import com.example.app.repository.ProductRepository;
import com.example.app.repository.PromotionRepository;
import com.example.app.repository.UserRepository;
import com.example.app.service.OrderService;
import com.example.app.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final OrderMapper orderMapper;
    private final PromotionRepository promotionRepository;
    private final ProductRepository productRepository;
    private final UserService userService;

    @Override
    @Transactional
    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id: " + id));
        orderRepository.delete(order);
    }

    @Override
    public List<OrderDto> getOrdersByStatusByAdmin(String status) {

        try {
            StatusOrder statusOrder = Arrays.stream(StatusOrder.values())
              .filter(statusOrder1 -> statusOrder1.name().equals( status ))
              .findFirst()
              .orElseThrow(() -> new OrderNotFoundException("Status not found in the database"));

            return this.orderRepository.findAllByStatus(statusOrder).stream().map(orderMapper::toDto).toList();
        } catch (OrderNotFoundException e) {
            return this.orderRepository.findAll().stream().map(orderMapper::toDto).toList();
        }
    }

    @Override
    public OrderDto createOrder(OrderRequestDTO orderRequestDTO) {
        User user = userRepository.findById(orderRequestDTO.user().id())
          .orElseThrow(() -> new UserNotFoundException("User not found in the database"));
        user.getOrders().size();

        Promotion promotion = null;
        if( orderRequestDTO.promotion() != null) {
            promotion = promotionRepository.findById(orderRequestDTO.promotion().id())
              .orElseThrow(() -> new PromotionNotFoundException("Promotion not found in the database"));

            promotion.getOrders().size();
        }

        Order order = orderMapper.toEntity(orderRequestDTO);

        user.addOrder(order);

        if( promotion != null)
            promotion.addOrder(order);

        /*Find orderProducts by Id and add them to OrderProduct */
        orderRequestDTO.products().forEach( product -> {

            Product productEntity = productRepository.findById(product.id())
              .orElseThrow(() -> new ProductNotFoundException("Product not found in the database"));

            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setProduct(productEntity);
            orderProduct.setQuantity(product.quantity());
            order.addOrderProducts(orderProduct);
            productEntity.addOrderProducts(orderProduct);
        });

        return orderMapper.toDto(orderRepository.save(order));
    }

    @Override
    public Page<OrderDto> getAllOrdersByAdmin(Pageable pageable) {
        return orderRepository.findAll(pageable).map(orderMapper::toDto);
    }

    @Override
    public List<OrderDto> getUserOrder(HttpServletRequest request) {
        User user = userService.getUserByPhoneFromDatabase(request);

        return orderRepository.findAllByUser(user).stream().map(orderMapper::toDto).toList();
    }

    @Override
    public List<OrderDto> getUserOrderByAdmin(HttpServletRequest request, Long id) {
        User user = userRepository.findById(id)
          .orElseThrow(() -> new UserNotFoundException("User not found in the database"));

        return orderRepository.findAllByUser(user).stream().map(orderMapper::toDto).toList();
    }

    @Override
    public void updateStatusLatestOrder() {
        Order order = orderRepository.findTopByOrderByIdDesc();
        if (order != null) {
            order.setStatus(StatusOrder.IN_PROGRESS);
            orderRepository.save(order);
        }
    }
}
