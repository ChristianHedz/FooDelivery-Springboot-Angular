package com.example.app.controller;

import com.example.app.dto.Invoice.InvoiceDto;
import com.example.app.exception.Invoice.InvoiceNotFoundExepcion;
import com.example.app.service.InvoiceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Invoices", description = "Manage all endpoints about Invoices")
@RestController
@RequestMapping("/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService InvoiceService;
    
    @Operation(
            summary = "Create a new invoice.",
            description = "Creates a new invoice with the provided details."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "201", description = "Invoice created successfully",
                content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = InvoiceDto.class))
                }),
        @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
            @Content}),
        @ApiResponse(responseCode = "400", description = "Invalid request body", content = {
            @Content}),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
            @Content})
    })
    @PostMapping("/save")
    public ResponseEntity<InvoiceDto> createInvoice(@RequestBody InvoiceDto invoiceDto) {
        InvoiceDto saveInvoice = InvoiceService.createInvoice(invoiceDto);
        return new ResponseEntity<>(saveInvoice, HttpStatus.CREATED);
    }
    
    @Operation(
            summary = "Find an invoice by ID.",
            description = "Finds a invoice by its unique identifier."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200", description = "Invoice found",
                content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = InvoiceDto.class))
                }),
        @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
            @Content}),
        @ApiResponse(responseCode = "404", description = "Invoice not found", content = {
            @Content}),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
            @Content})
    })
    @GetMapping("/search/{id}")
    public ResponseEntity<?> findInvoiceById(@PathVariable("id") Long id) {
        try {
            InvoiceDto invoiceDto = InvoiceService.findInvoiceById(id);
            return ResponseEntity.ok(invoiceDto);
        } catch (InvoiceNotFoundExepcion ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
    
    @Operation(
            summary = "List all invoices.",
            description = "Retrieves a list of all invoices."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200", description = "Invoices list successfully generated",
                content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = InvoiceDto.class))
                }),
        @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
            @Content}),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
            @Content})
    })
    @GetMapping("/list")
    public ResponseEntity<List<InvoiceDto>> listInvoices() {
        List<InvoiceDto> invoiceDto = InvoiceService.listInvoices();
        return ResponseEntity.ok(invoiceDto);
    }
    
    @Operation(
            summary = "Update an invoice.",
            description = "Updates an existing invoice with the provided details."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200", description = "Invoice updated successfully",
                content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = InvoiceDto.class))
                }),
        @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
            @Content}),
        @ApiResponse(responseCode = "404", description = "Invoice not found", content = {
            @Content}),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
            @Content})
    })
    @PutMapping("/update/{id}")
    public ResponseEntity<InvoiceDto> updateInvoiceX(@PathVariable("id") Long id, @RequestBody InvoiceDto updateInvoice) {
        InvoiceDto invoiceDto = InvoiceService.updateInvoice(id, updateInvoice);
        return ResponseEntity.ok(invoiceDto);
    }
    
    @Operation(
            summary = "Delete a invoice.",
            description = "Deletes a invoice by its unique identifier."
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200", description = "Invoice deleted successfully",
                content = {
                    @Content}),
        @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {
            @Content}),
        @ApiResponse(responseCode = "404", description = "Invoice not found", content = {
            @Content}),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
            @Content})
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInvoice(@PathVariable("id") Long id) {
        InvoiceService.deleteInvoice(id);
        return ResponseEntity.ok("The Invoice was eliminated");
    }

}
