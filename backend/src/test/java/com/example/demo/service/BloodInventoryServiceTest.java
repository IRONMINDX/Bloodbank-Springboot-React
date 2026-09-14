package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.dto.BloodInventoryRequest;
import com.example.demo.dto.BloodInventoryResponse;
import com.example.demo.entity.BloodInventory;
import com.example.demo.repository.BloodInventoryRepository;

@ExtendWith(MockitoExtension.class)
class BloodInventoryServiceTest {

    @Mock
    private BloodInventoryRepository inventoryRepository;

    private BloodInventoryService inventoryService;

    @BeforeEach
    void setUp() {
        inventoryService = new BloodInventoryService(inventoryRepository);
    }

    @Test
    void createMapsRequestAndReturnsResponse() {
        BloodInventoryRequest request = validRequest();
        when(inventoryRepository.save(any(BloodInventory.class))).thenAnswer(invocation -> {
            BloodInventory inventory = invocation.getArgument(0);
            return inventory;
        });

        BloodInventoryResponse response = inventoryService.create(request);

        assertEquals("O+", response.getBloodGroup());
        assertEquals(12, response.getAvailableUnits());
        verify(inventoryRepository).save(any(BloodInventory.class));
    }

    @Test
    void updateChangesExistingInventory() {
        BloodInventory existing = new BloodInventory();
        existing.setStatus("Stable");
        when(inventoryRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(inventoryRepository.save(existing)).thenReturn(existing);

        BloodInventoryRequest request = validRequest();
        request.setStatus("Urgent");

        BloodInventoryResponse response = inventoryService.update(1L, request);

        assertEquals("Urgent", response.getStatus());
        verify(inventoryRepository).save(existing);
    }

    @Test
    void deleteRemovesExistingInventory() {
        BloodInventory existing = new BloodInventory();
        when(inventoryRepository.findById(1L)).thenReturn(Optional.of(existing));

        inventoryService.delete(1L);

        verify(inventoryRepository).delete(existing);
    }

    @Test
    void missingInventoryThrowsNotFoundException() {
        when(inventoryRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(BloodInventoryNotFoundException.class, () -> inventoryService.findById(99L));
    }

    private BloodInventoryRequest validRequest() {
        BloodInventoryRequest request = new BloodInventoryRequest();
        request.setBloodGroup("O+");
        request.setAvailableUnits(12);
        request.setRequiredUnits(18);
        request.setHospitalName("Central Hospital");
        request.setCity("Bhopal");
        request.setStatus("Urgent");
        return request;
    }
}
