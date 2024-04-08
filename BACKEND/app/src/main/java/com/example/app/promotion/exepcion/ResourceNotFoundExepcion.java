package com.example.app.promotion.exepcion;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundExepcion extends RuntimeException {

    public ResourceNotFoundExepcion(String message) {
        super(message);
    }
}
