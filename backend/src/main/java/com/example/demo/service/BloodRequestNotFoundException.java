package com.example.demo.service;

public class BloodRequestNotFoundException extends RuntimeException {

    public BloodRequestNotFoundException(Long id) {
        super("Blood request not found: " + id);
    }
}
