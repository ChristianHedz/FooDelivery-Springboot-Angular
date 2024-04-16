package com.example.app.exception.product;

import com.example.app.exception.ApplicationExceptionResponse;
import com.example.app.exception.ExceptionUtils;
import com.example.app.exception.user.UserAlreadyExistsException;
import com.example.app.exception.user.UserDataLoginException;
import com.example.app.exception.user.UserNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Order(3)
public class ProductExceptionHandler {

    // Product not found
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ApplicationExceptionResponse> productNotFoundException(ProductNotFoundException ex, HttpServletRequest req) {
        Map<String, String> errors = new HashMap<>(Map.of(ex.getClass().getSimpleName(), ex.getMessage()));
        ApplicationExceptionResponse errorResponse = ExceptionUtils.createResponse(HttpStatus.NOT_FOUND, req, errors);

        return ResponseEntity.status(404).body(errorResponse);

    }

}