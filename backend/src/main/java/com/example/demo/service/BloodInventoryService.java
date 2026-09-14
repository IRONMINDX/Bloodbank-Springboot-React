package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.BloodInventoryRequest;
import com.example.demo.dto.BloodInventoryResponse;
import com.example.demo.entity.BloodInventory;
import com.example.demo.repository.BloodInventoryRepository;

@Service
public class BloodInventoryService {

    private final BloodInventoryRepository inventoryRepository;

    public BloodInventoryService(BloodInventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Transactional
    public BloodInventoryResponse create(BloodInventoryRequest request) {
        BloodInventory inventory = new BloodInventory();
        copyRequestToEntity(request, inventory);
        return toResponse(inventoryRepository.save(inventory));
    }

    @Transactional(readOnly = true)
    public List<BloodInventoryResponse> findAll() {
        return inventoryRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public BloodInventoryResponse findById(Long id) {
        return toResponse(findEntityById(id));
    }

    @Transactional
    public BloodInventoryResponse update(Long id, BloodInventoryRequest request) {
        BloodInventory inventory = findEntityById(id);
        copyRequestToEntity(request, inventory);
        return toResponse(inventoryRepository.save(inventory));
    }

    @Transactional
    public void delete(Long id) {
        inventoryRepository.delete(findEntityById(id));
    }

    private BloodInventory findEntityById(Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new BloodInventoryNotFoundException(id));
    }

    private void copyRequestToEntity(BloodInventoryRequest request, BloodInventory inventory) {
        inventory.setBloodGroup(request.getBloodGroup());
        inventory.setAvailableUnits(request.getAvailableUnits());
        inventory.setRequiredUnits(request.getRequiredUnits());
        inventory.setHospitalName(request.getHospitalName());
        inventory.setCity(request.getCity());
        inventory.setStatus(request.getStatus());
        inventory.setLastUpdated(request.getLastUpdated());
    }

    private BloodInventoryResponse toResponse(BloodInventory inventory) {
        BloodInventoryResponse response = new BloodInventoryResponse();
        response.setId(inventory.getId());
        response.setBloodGroup(inventory.getBloodGroup());
        response.setAvailableUnits(inventory.getAvailableUnits());
        response.setRequiredUnits(inventory.getRequiredUnits());
        response.setHospitalName(inventory.getHospitalName());
        response.setCity(inventory.getCity());
        response.setStatus(inventory.getStatus());
        response.setLastUpdated(inventory.getLastUpdated());
        return response;
    }
}
