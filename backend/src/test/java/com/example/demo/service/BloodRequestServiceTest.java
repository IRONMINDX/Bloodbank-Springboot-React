package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.dto.BloodRequestRequest;
import com.example.demo.dto.BloodRequestResponse;
import com.example.demo.entity.BloodRequest;
import com.example.demo.repository.BloodRequestRepository;

@ExtendWith(MockitoExtension.class)
class BloodRequestServiceTest {

    @Mock
    private BloodRequestRepository bloodRequestRepository;

    private BloodRequestService bloodRequestService;

    @BeforeEach
    void setUp() {
        bloodRequestService = new BloodRequestService(bloodRequestRepository);
    }

    @Test
    void createMapsRequestAndReturnsResponse() {
        BloodRequestRequest request = validRequest();
        when(bloodRequestRepository.save(any(BloodRequest.class))).thenAnswer(invocation ->
                invocation.getArgument(0));

        BloodRequestResponse response = bloodRequestService.create(request);

        assertEquals("A+", response.getBloodGroup());
        assertEquals(2, response.getUnitsRequired());
        verify(bloodRequestRepository).save(any(BloodRequest.class));
    }

    @Test
    void updateChangesExistingRequest() {
        BloodRequest existing = new BloodRequest();
        existing.setStatus("Pending");
        when(bloodRequestRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(bloodRequestRepository.save(existing)).thenReturn(existing);

        BloodRequestRequest request = validRequest();
        request.setStatus("Approved");

        BloodRequestResponse response = bloodRequestService.update(1L, request);

        assertEquals("Approved", response.getStatus());
        verify(bloodRequestRepository).save(existing);
    }

    @Test
    void deleteRemovesExistingRequest() {
        BloodRequest existing = new BloodRequest();
        when(bloodRequestRepository.findById(1L)).thenReturn(Optional.of(existing));

        bloodRequestService.delete(1L);

        verify(bloodRequestRepository).delete(existing);
    }

    @Test
    void missingRequestThrowsNotFoundException() {
        when(bloodRequestRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(BloodRequestNotFoundException.class, () -> bloodRequestService.findById(99L));
    }

    private BloodRequestRequest validRequest() {
        BloodRequestRequest request = new BloodRequestRequest();
        request.setRequesterName("Priya Sharma");
        request.setBloodGroup("A+");
        request.setUnitsRequired(2);
        request.setHospitalName("Central Hospital");
        request.setCity("Bhopal");
        request.setUrgency("High");
        request.setStatus("Pending");
        request.setRequestedDate(LocalDate.now());
        return request;
    }
}
