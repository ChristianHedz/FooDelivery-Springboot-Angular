package com.example.app.service.impl;

import com.example.app.dto.Invoice.InvoiceDto;
import com.example.app.exception.Invoice.InvoiceNotFoundExepcion;
import com.example.app.mapper.InvoiceMapper;
import com.example.app.model.Invoice;
import com.example.app.repository.InvoiceRepository;
import com.example.app.service.InvoiceService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class InvoiceServiceImp implements InvoiceService{

    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;

    @Override
    @Transactional
    public InvoiceDto createInvoice(InvoiceDto invoiceDto) {
        Invoice invoice = invoiceMapper.toEntity(invoiceDto);
        Invoice invoiceSaved = invoiceRepository.save(invoice);
        return invoiceMapper.ToDto(invoiceSaved);
    }

    @Override
    @Transactional(readOnly = true)
    public InvoiceDto findInvoiceById(Long id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(() -> new InvoiceNotFoundExepcion("This invoice Does Not Exist with that ID: " + id));
        return invoiceMapper.ToDto(invoice);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceDto> listInvoices() {
        List<Invoice> invoices = (List<Invoice>) invoiceRepository.findAll();
        return invoiceMapper.entityListToDtoList(invoices);
    }

    @Override
    @Transactional
    public InvoiceDto updateInvoice(Long id, InvoiceDto updateInvoice) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(() -> new InvoiceNotFoundExepcion("This invoice Does Not Exist with that ID: " + id));
        
        invoice.setAmount(updateInvoice.amount());
        invoice.setIdOrder(updateInvoice.idOrder());
        invoice.setTolalPrice(updateInvoice.tolalPrice());
        invoice.setDateAndTime(updateInvoice.dateAndTime());
        invoice.setPayment(updateInvoice.payment());
        
        return invoiceMapper.ToDto(invoiceRepository.save(invoice));
    }

    @Override
    @Transactional
    public void deleteInvoice(Long id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(() -> new InvoiceNotFoundExepcion("This invoice Does Not Exist with that ID: " + id));
        invoiceRepository.delete(invoice);
    }
    
    
    
}
