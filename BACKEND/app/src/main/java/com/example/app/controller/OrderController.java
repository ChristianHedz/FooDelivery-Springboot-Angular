package com.example.app.controller;

import com.example.app.dto.order.AddProductInOrderDTO;
import com.example.app.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<?> addProductToOrder(@RequestBody AddProductInOrderDTO addProductInOrderDTO){
        return orderService.addProductToOrder(addProductInOrderDTO);
    }

}
