package com.example.app.dto.user;

import com.example.app.model.Role;
import java.io.Serializable;

public record UserToSignUpGoogleDto(
        String firstName,
        String lastName,
        String alias,
        String email,
        Role role,
        String password,
        boolean active
) implements Serializable { }
