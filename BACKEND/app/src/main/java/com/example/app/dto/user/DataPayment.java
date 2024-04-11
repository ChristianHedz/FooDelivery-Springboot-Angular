package com.example.app.dto.user;

public record DataPayment(
        String method,
        String amount,
        String currency,
        String description
) {
}
