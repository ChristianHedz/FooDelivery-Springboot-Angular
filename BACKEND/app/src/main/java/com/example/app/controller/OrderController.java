package com.example.app.controller;

import com.example.app.dto.order.AddProductInOrderDTO;
import com.example.app.dto.order.OrderCreatedDTO;
import com.example.app.dto.order.OrderRequestDTO;
import com.example.app.service.OrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Orders", description = "Manage all endpoints about Orders")
@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @Transactional
    public ResponseEntity<OrderCreatedDTO> createOrder(@RequestBody @Valid OrderRequestDTO orderRequestDTO){
        return ResponseEntity
          .status(201)
          .body(orderService.createOrder(orderRequestDTO));
    }

}
