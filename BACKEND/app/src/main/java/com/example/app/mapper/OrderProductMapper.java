package com.example.app.mapper;

import com.example.app.dto.order.OrderProductDto;
import com.example.app.model.OrderProduct;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface OrderProductMapper {
    OrderProduct toEntity(OrderProductDto orderProductDTO);

    OrderProductDto toDto(OrderProduct orderProduct);
}