package com.example.app.controller;

import com.example.app.dto.order.OrderDto;
import com.example.app.dto.order.OrderRequestDTO;
import com.example.app.dto.user.SignedUserDTO;
import com.example.app.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(
      summary = "Create a new order.",
      description = "Let a user with token create a new order."
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "200", description = "Order created successfully",
        content = {
          @Content(mediaType = "application/json",
            schema = @Schema(implementation = OrderDto.class))
        }),
      @ApiResponse(responseCode = "404", description = "Not Found", content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @PostMapping
    @Transactional
    public ResponseEntity<OrderDto> createOrder(@RequestBody @Valid OrderRequestDTO orderRequestDTO){
        return ResponseEntity
          .status(201)
          .body(orderService.createOrder(orderRequestDTO));
    }

    @Operation(
      summary = "Get all orders.",
      description = "Get all the orders in a paginated list. Token is required. Only Admin can access this endpoint."
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "201", description = "Orders list successfully generated",
        content = {
          @Content(mediaType = "application/json",
            schema = @Schema(implementation = OrderDto.class))
        }),
      @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
      @ApiResponse(responseCode = "404", description = "Orders Not Found", content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @Parameters({
      @Parameter(name = "page", description = "Page number", required = false, example = "0"),
      @Parameter(name = "size", description = "Size of the page", required = false, example = "10"),
      @Parameter(name = "sort", description = "Sort the page", required = false, example = "id,desc")
    })
    @GetMapping
    public ResponseEntity<Page<OrderDto>> getAllOrdersByAdmin(Pageable pageable) {
        return ResponseEntity.status(200).body(orderService.getAllOrdersByAdmin(pageable));
    }

    @Operation(
      summary = "Let a User gets its orders using auth token.",
      description = "Let a logged user get its orders data using the authorization token."
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "200", description = "Orders found successfully.",
        content = {
          @Content(mediaType = "application/json",
            schema = @Schema(implementation = OrderDto.class))
        }),
      @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
      @ApiResponse(responseCode = "404", description = "User Not Found", content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @GetMapping("/user")
    public ResponseEntity<List<OrderDto>> getUserOrder(HttpServletRequest request) {
        return ResponseEntity.status(200).body(orderService.getUserOrder(request));
    }

    @Operation(
      summary = "Let a User Admin get orders.",
      description = "Let a user admin gets orders of others users using the authorization token. Only for admins."
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "200", description = "Orders found successfully.",
        content = {
          @Content(mediaType = "application/json",
            schema = @Schema(implementation = OrderDto.class))
        }),
      @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
      @ApiResponse(responseCode = "404", description = "User Not Found", content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @GetMapping("/user/{id}")
    public ResponseEntity<List<OrderDto>> getUserOrderByAdmin(HttpServletRequest request, @PathVariable Long id) {
        return ResponseEntity.status(200).body(orderService.getUserOrderByAdmin(request, id));
    }

}
