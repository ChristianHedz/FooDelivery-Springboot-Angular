package com.example.app.dto.user;

import lombok.Data;

@Data
public class SignedUserGoogleDto{
    private boolean isError;
    private Long id;
    private String firstName;
    private String lastName;
    private String alias;
    private String email;
    private String role;
    private String token;
    private boolean active;
}