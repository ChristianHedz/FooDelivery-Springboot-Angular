package com.example.app.controller;

import com.example.app.dto.user.DataPayment;
import com.example.app.dto.user.URLPaypalResponse;
import com.example.app.service.PaypalService;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaypalController {

    private final PaypalService paypalService;
    @Value("${paypal.successUrl}")
    private String PAYPAL_SUCCESS_URL;
    @Value("${paypal.cancelUrl}")
    private String PAYPAL_CANCEL_URL;
    @Value("${paypal.homeUrl}")
    private String HOME_URL;

    @PostMapping
    public URLPaypalResponse createPayment(@RequestBody DataPayment dataPayment) throws PayPalRESTException{
            Payment payment = paypalService.createPayment(
                    Double.valueOf(dataPayment.amount()),
                    dataPayment.currency(),
                    dataPayment.method(),
                    "sale",
                    dataPayment.description(),
                    PAYPAL_CANCEL_URL,
                    PAYPAL_SUCCESS_URL
            );
            return payment.getLinks().stream()
                .filter(links -> "approval_url".equals(links.getRel()))
                .findFirst()
                .map(links -> new URLPaypalResponse(links.getHref()))
                .orElse(new URLPaypalResponse(HOME_URL));
    }

    @GetMapping("/success")
    public RedirectView paymentSuccess(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId)
            throws PayPalRESTException{
            Payment payment = paypalService.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")){
                return new RedirectView(HOME_URL + "/purchase");
            }
        return new RedirectView(HOME_URL);
    }

    @GetMapping("/cancel")
    public RedirectView cancelPay() {
        return new RedirectView(HOME_URL);
    }


}
