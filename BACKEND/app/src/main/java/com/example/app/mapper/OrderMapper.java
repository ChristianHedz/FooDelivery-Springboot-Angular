package com.example.app.mapper;

import com.example.app.dto.order.OrderCreatedDTO;
import com.example.app.dto.order.OrderDto;
import com.example.app.dto.order.OrderRequestDTO;
import com.example.app.model.Order;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {UserMapper.class, PromotionMapper.class, OrderProductMapper.class})
public interface OrderMapper {

    Order toEntity(OrderCreatedDTO orderCreatedDTO);

    OrderCreatedDTO orderToOrderCreatedDTO(Order order);

    Order toEntity(OrderRequestDTO orderRequestDTO);

    OrderRequestDTO orderToOrderRequestDTO(Order order);

    Order toEntity(OrderDto orderDto);

    @Mapping(target = "products", source = "orderProducts")
    OrderDto toDto(Order order);

    @AfterMapping
    default void linkOrderProducts(@MappingTarget Order order) {
        order.getOrderProducts().forEach(orderProduct -> orderProduct.setOrder(order));
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Order partialUpdate(OrderDto orderDto, @MappingTarget Order order);
}