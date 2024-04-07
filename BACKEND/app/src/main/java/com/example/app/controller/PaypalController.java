package com.example.app.controller;

import com.example.app.dto.user.DataPayment;
import com.example.app.dto.user.URLPaypalResponse;
import com.example.app.service.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/api/payments")
@AllArgsConstructor
public class PaypalController {

    private PaypalService paypalService;
    private static final String PAYPAL_SUCCESS_URL = "http://localhost:8080/api/payments/success";
    private static final String PAYPAL_CANCEL_URL = "http://localhost:8080/api/payments/cancel";
    private static final String HOME_ROUTE = "http://localhost:4200";

    @PostMapping
    public URLPaypalResponse createPayment(@RequestBody DataPayment dataPayment) throws PayPalRESTException {
        Payment payment = paypalService.createPayment(
                Double.parseDouble(dataPayment.amount()),
                dataPayment.currency(),
                dataPayment.method(),
                "SALE",
                dataPayment.description(),
                PAYPAL_CANCEL_URL,
                PAYPAL_SUCCESS_URL
        );
        return new URLPaypalResponse(payment.getLinks().stream()
                .filter(link -> link.getRel().equals("approval_url"))
                .map(Links::getHref)
                .findFirst()
                .orElse(HOME_ROUTE)
        );
    }

    @GetMapping("/success")
    public RedirectView successPay(@RequestParam String paymentId, @RequestParam String payerId) throws PayPalRESTException {
        Payment payment = paypalService.executePayment(paymentId, payerId);
        if (payment.getState().equals("approved")) {
            return new RedirectView(HOME_ROUTE + "/api/payment/success");
        }
        return new RedirectView(HOME_ROUTE);
    }

    @GetMapping("/cancel")
    public RedirectView cancelPay() {
        return new RedirectView(HOME_ROUTE);
    }


}
