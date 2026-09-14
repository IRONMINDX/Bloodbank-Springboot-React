package com.example.demo.dto;

public class UserResponse {

    private String message;
    private String email;

    public UserResponse(String message, String email) {
        this.message = message;
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public String getEmail() {
        return email;
    }
}
