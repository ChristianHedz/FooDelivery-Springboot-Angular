package com.example.app.repository;

import com.example.app.dto.order.OrderDto;
import com.example.app.model.Order;
import com.example.app.model.StatusOrder;
import com.example.app.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findByUserId(Long userId);

    List<Order> findAllByUser(User user);

    List<Order> findAllByStatus(StatusOrder status);
}
