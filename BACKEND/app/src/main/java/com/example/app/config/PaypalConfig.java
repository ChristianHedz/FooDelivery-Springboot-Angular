package com.example.app.config;

import com.paypal.base.rest.APIContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PaypalConfig {
    @Value("${paypal.clientId}")
    String paypalClientId;
    @Value("${paypal.client.secret}")
    String paypalClientSecret;
    @Value("${paypal.mode}")
    String paypalMode;

    @Bean
    public APIContext apiContext() {
        return new APIContext(paypalClientId, paypalClientSecret, paypalMode);
    }
}
