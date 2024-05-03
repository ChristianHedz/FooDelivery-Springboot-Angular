package com.example.app.exception.address;

public class AddressLimitException extends RuntimeException{

    public AddressLimitException(String message) {
        super(message);
    }
}
