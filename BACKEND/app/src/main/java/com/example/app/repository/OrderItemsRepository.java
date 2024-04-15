package com.example.app.repository;

import com.example.app.model.OrderItems;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderItemsRepository extends CrudRepository<OrderItems, Long> {

   Optional<OrderItems> findByProductIdAndOrderIdAndUserId(Long productId, Long orderId, Long userId);
}
