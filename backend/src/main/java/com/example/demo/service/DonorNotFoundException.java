package com.example.demo.service;

public class DonorNotFoundException extends RuntimeException {

    public DonorNotFoundException(Long id) {
        super("Donor not found: " + id);
    }
}
