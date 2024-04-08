package com.example.app.repository;

import com.example.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Long> {
    UserDetails findByEmailAndActiveTrue(String email);
    UserDetails findByPhoneAndActiveTrue(String phone);
    boolean existsByEmailAndActiveTrue(String email);
    boolean existsByPhoneAndActiveTrue(String phone);
    boolean existsByAliasAndActiveTrue(String userName);
}
