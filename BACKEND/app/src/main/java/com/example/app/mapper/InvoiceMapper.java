package com.example.app.mapper;

import com.example.app.dto.Invoice.InvoiceDto;
import com.example.app.model.Invoice;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface InvoiceMapper {

    @Mappings({
        @Mapping(source = "dateAndTime", target = "dateAndTime",
                dateFormat = "yyyy-MM-dd HH:mm:ss")
    })

    Invoice toEntity(InvoiceDto invoiceDto);

    InvoiceDto ToDto(Invoice invoice);

    List<InvoiceDto> entityListToDtoList(List<Invoice> invoiceList);
}
