package com.example.app.repository;

import com.example.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepository extends JpaRepository<User, Long> {
    UserDetails findByEmailAndActiveTrue(String email);
    UserDetails findByPhoneAndActiveTrue(String phone);
    boolean existsByEmailAndActiveTrue(String email);
    boolean existsByPhoneAndActiveTrue(String phone);
    boolean existsByAliasAndActiveTrue(String userName);
    User findByEmail(String email);
    Page<User> findAllByActiveTrue(Pageable pageable);
}
