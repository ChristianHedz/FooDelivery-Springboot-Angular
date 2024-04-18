package com.example.app.service;

import com.example.app.dto.Invoice.InvoiceDto;
import java.util.List;

public interface InvoiceService {
    
    InvoiceDto createInvoice(InvoiceDto invoiceDto);

    InvoiceDto findInvoiceById(Long id);

    List<InvoiceDto> listInvoices();

    InvoiceDto updateInvoice(Long id, InvoiceDto updateInvoice);

    void deleteInvoice(Long id);
}
