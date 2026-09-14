package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.example.demo.dto.BloodInventoryRequest;
import com.example.demo.dto.BloodInventoryResponse;
import com.example.demo.service.BloodInventoryNotFoundException;
import com.example.demo.service.BloodInventoryService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/inventory")
public class BloodInventoryController {

    private final BloodInventoryService inventoryService;

    public BloodInventoryController(BloodInventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public ResponseEntity<List<BloodInventoryResponse>> getAllInventory() {
        return ResponseEntity.ok(inventoryService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BloodInventoryResponse> getInventoryById(@PathVariable Long id) {
        return ResponseEntity.ok(inventoryService.findById(id));
    }

    @PostMapping
    public ResponseEntity<BloodInventoryResponse> createInventory(
            @Valid @RequestBody BloodInventoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(inventoryService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BloodInventoryResponse> updateInventory(
            @PathVariable Long id,
            @Valid @RequestBody BloodInventoryRequest request) {
        return ResponseEntity.ok(inventoryService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable Long id) {
        inventoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(BloodInventoryNotFoundException.class)
    public ResponseEntity<String> handleInventoryNotFound(BloodInventoryNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }
}
