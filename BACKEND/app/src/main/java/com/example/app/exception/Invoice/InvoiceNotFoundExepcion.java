package com.example.app.exception.Invoice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class InvoiceNotFoundExepcion extends RuntimeException {

    public InvoiceNotFoundExepcion(String message) {
        super(message);
    }
}
