package com.example.app.exception.promotion;

public class PromotionNotFoundException extends RuntimeException {

    public PromotionNotFoundException() {
        super();
    }

    public PromotionNotFoundException(String message) {
        super(message);
    }

    public PromotionNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public PromotionNotFoundException(Throwable cause) {
        super(cause);
    }

    protected PromotionNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
