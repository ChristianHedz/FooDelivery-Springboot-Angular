package com.example.app.repository;

import com.example.app.model.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order, Long> {

    Order findByUserId(Long userId);

}
