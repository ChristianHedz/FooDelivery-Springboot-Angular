package com.example.app.service;

import com.example.app.dto.order.OrderDto;
import com.example.app.dto.order.OrderRequestDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {

    OrderDto createOrder(OrderRequestDTO orderRequestDTO);

    Page<OrderDto> getAllOrdersByAdmin(Pageable pageable);

    List<OrderDto> getUserOrder(HttpServletRequest request);

    List<OrderDto> getUserOrderByAdmin(HttpServletRequest request, Long id);

    void deleteOrder(Long id);

}
