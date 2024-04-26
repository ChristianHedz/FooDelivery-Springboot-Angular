package com.example.app.controller;

import com.example.app.dto.user.DataPayment;
import com.example.app.dto.user.URLPaypalResponse;
import com.example.app.service.OrderService;
import com.example.app.service.PaypalService;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@Tag(name = "payments", description = "Manage all endpoints about Paypal Payments")
@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaypalController {

    private final PaypalService paypalService;
    private final OrderService orderService;
    @Value("${paypal.successUrl}")
    private String PAYPAL_SUCCESS_URL;
    @Value("${paypal.cancelUrl}")
    private String PAYPAL_CANCEL_URL;
    @Value("${paypal.homeUrl}")
    private String HOME_URL;

    @Operation(
      summary = "Create a Paypal payment.",
      description = "Create a new Paypal payment with the provided data. Returns a URL for the payment approval."
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "200", description = "Payment created successfully",
        content = {
          @Content(mediaType = "application/json",
            schema = @Schema(implementation = URLPaypalResponse.class))
        }),
      @ApiResponse(responseCode = "400", description = "Invalid payment data", content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
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

    @Operation(
      summary = "Handle Paypal payment success.",
      description = "Handle the successful Paypal payment. Redirects to the purchase page if the payment is approved."
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "302", description = "Redirect to the url purchase page",
        content = {@Content}),
      @ApiResponse(responseCode = "302", description = "Redirect to the home page", content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @GetMapping("/success")
    public RedirectView paymentSuccess(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId)
            throws PayPalRESTException{
            Payment payment = paypalService.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")){
                orderService.updateStatusLatestOrder();
                return new RedirectView(HOME_URL + "/purchase");
            }
        return new RedirectView(HOME_URL);
    }

    @Operation(
      summary = "Handle Paypal payment cancellation.",
      description = "Handle the cancellation of a Paypal payment. Redirects to the home page."
    )
    @ApiResponses(value = {
      @ApiResponse(
        responseCode = "302", description = "Redirect to the url home page",
        content = {@Content}),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @GetMapping("/cancel")
    public RedirectView cancelPay() {
        return new RedirectView(HOME_URL);
    }


}
