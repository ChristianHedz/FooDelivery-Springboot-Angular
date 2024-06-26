package com.example.app.exception.address;

import com.example.app.exception.ApplicationExceptionResponse;
import com.example.app.exception.ExceptionUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Order(2)
public class AddressExceptionHandler {

    @ExceptionHandler(AddressNotFoundException.class)
    public ResponseEntity<ApplicationExceptionResponse> addressNotFoundException(AddressNotFoundException ex,
                                                                                 HttpServletRequest req){
        Map<String, String> errors = new HashMap<>(Map.of(ex.getClass().getSimpleName(), ex.getMessage()));
        ApplicationExceptionResponse errorResponse = ExceptionUtils.createResponse(HttpStatus.NOT_FOUND, req, errors);
        return ResponseEntity.status(404).body(errorResponse);
    }

    @ExceptionHandler(AddressLimitException.class)
    public ResponseEntity<ApplicationExceptionResponse> AddressLimitException(AddressLimitException ex, HttpServletRequest req){
        Map<String, String> errors = new HashMap<>(Map.of(ex.getClass().getSimpleName(), ex.getMessage()));
        ApplicationExceptionResponse errorResponse = ExceptionUtils.createResponse(HttpStatus.CONFLICT, req, errors);
        return ResponseEntity.status(409).body(errorResponse);
    }
}
