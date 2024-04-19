package com.example.app.controller;

import com.example.app.dto.order.OrderDto;
import com.example.app.dto.order.OrderRequestDTO;
import com.example.app.service.OrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Orders", description = "Manage all endpoints about Orders")
@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @Transactional
    public ResponseEntity<OrderDto> createOrder(@RequestBody @Valid OrderRequestDTO orderRequestDTO){
        return ResponseEntity
          .status(201)
          .body(orderService.createOrder(orderRequestDTO));
    }

    @GetMapping
    public ResponseEntity<Page<OrderDto>> getAllOrdersByAdmin(Pageable pageable) {
        return ResponseEntity.status(200).body(orderService.getAllOrdersByAdmin(pageable));
    }

    @GetMapping("/user")
    public ResponseEntity<List<OrderDto>> getUserOrder(HttpServletRequest request) {
        return ResponseEntity.status(200).body(orderService.getUserOrder(request));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<OrderDto>> getUserOrderByAdmin(HttpServletRequest request, @PathVariable Long id) {
        return ResponseEntity.status(200).body(orderService.getUserOrderByAdmin(request, id));
    }

}
