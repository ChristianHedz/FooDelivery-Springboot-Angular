package com.example.app.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ApplicationExceptionHandler {

    // Validations errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApplicationExceptionResponse> methodArgumentNotValidException(MethodArgumentNotValidException ex, HttpServletRequest req) {
        Map<String, String> errors = getErrorsMap(ex);

        ApplicationExceptionResponse errorResponse = ExceptionUtils.createResponse(HttpStatus.BAD_REQUEST, req, errors);
        return ResponseEntity.status(400).body(errorResponse);

    }

    // DB Integrity Violation
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApplicationExceptionResponse> dataIntegrityViolationException(DataIntegrityViolationException ex, HttpServletRequest req) {

        Map<String, String> errors = new HashMap<>(Map.of(ex.getClass().getSimpleName(), ex.getMessage()));
        ApplicationExceptionResponse errorResponse = ExceptionUtils.createResponse(HttpStatus.BAD_REQUEST, req, errors);
        return ResponseEntity.status(400).body(errorResponse);

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
    }

    private Map<String, String> getErrorsMap(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new LinkedHashMap<>();

        // Iteramos sobre los errores de los campos
        for (FieldError fieldError : ex.getFieldErrors()) {
            String fieldName = fieldError.getField();
            String errorMessage = fieldError.getDefaultMessage();

            // Verificamos si ya hay un mensaje de error para el mismo campo
            if (errors.containsKey(fieldName)) {
                // Si ya hay un mensaje de error, lo concatenamos al mensaje existente
                errorMessage = errors.get(fieldName) + ". " + errorMessage;
            }

            // Agregamos el mensaje de error al mapa
            errors.put(fieldName, errorMessage);
        }

        return errors;
    }

}

