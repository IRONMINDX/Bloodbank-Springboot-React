package com.example.demo.service;

public class BloodInventoryNotFoundException extends RuntimeException {

    public BloodInventoryNotFoundException(Long id) {
        super("Blood inventory not found: " + id);
    }
}
