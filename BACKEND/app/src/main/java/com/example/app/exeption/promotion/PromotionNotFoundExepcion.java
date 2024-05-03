package com.example.app.exeption.promotion;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class PromotionNotFoundExepcion extends RuntimeException {

    public PromotionNotFoundExepcion(String message) {
        super(message);
    }
}
