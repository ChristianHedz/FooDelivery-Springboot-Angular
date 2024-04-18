package com.example.app.mapper;

import com.example.app.dto.order.OrderCreatedDTO;
import com.example.app.dto.order.OrderRequestDTO;
import com.example.app.model.Order;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {UserMapper.class})
public interface OrderMapper {

    Order toEntity(OrderCreatedDTO orderCreatedDTO);

    OrderCreatedDTO orderToOrderCreatedDTO(Order order);

    Order toEntity(OrderRequestDTO orderRequestDTO);

    OrderRequestDTO orderToOrderRequestDTO(Order order);
}