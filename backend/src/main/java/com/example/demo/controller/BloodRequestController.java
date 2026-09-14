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

import com.example.demo.dto.BloodRequestRequest;
import com.example.demo.dto.BloodRequestResponse;
import com.example.demo.service.BloodRequestNotFoundException;
import com.example.demo.service.BloodRequestService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/requests")
public class BloodRequestController {

    private final BloodRequestService bloodRequestService;

    public BloodRequestController(BloodRequestService bloodRequestService) {
        this.bloodRequestService = bloodRequestService;
    }

    @GetMapping
    public ResponseEntity<List<BloodRequestResponse>> getAllRequests() {
        return ResponseEntity.ok(bloodRequestService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BloodRequestResponse> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(bloodRequestService.findById(id));
    }

    @PostMapping
    public ResponseEntity<BloodRequestResponse> createRequest(
            @Valid @RequestBody BloodRequestRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bloodRequestService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BloodRequestResponse> updateRequest(
            @PathVariable Long id,
            @Valid @RequestBody BloodRequestRequest request) {
        return ResponseEntity.ok(bloodRequestService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        bloodRequestService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(BloodRequestNotFoundException.class)
    public ResponseEntity<String> handleRequestNotFound(BloodRequestNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }
}
