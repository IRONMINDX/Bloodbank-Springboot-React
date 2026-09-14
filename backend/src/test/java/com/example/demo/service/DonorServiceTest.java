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

import com.example.demo.dto.DonorRequest;
import com.example.demo.dto.DonorResponse;
import com.example.demo.entity.Donor;
import com.example.demo.repository.DonorRepository;

@ExtendWith(MockitoExtension.class)
class DonorServiceTest {

    @Mock
    private DonorRepository donorRepository;

    private DonorService donorService;

    @BeforeEach
    void setUp() {
        donorService = new DonorService(donorRepository);
    }

    @Test
    void createMapsRequestAndReturnsResponse() {
        DonorRequest request = validRequest();
        when(donorRepository.save(any(Donor.class))).thenAnswer(invocation -> {
            Donor donor = invocation.getArgument(0);
            return donor;
        });

        DonorResponse response = donorService.create(request);

        assertEquals("A+", response.getBloodGroup());
        assertEquals(25, response.getAge());
        verify(donorRepository).save(any(Donor.class));
    }

    @Test
    void updateChangesExistingDonor() {
        Donor existing = new Donor();
        existing.setFullName("Old Name");
        when(donorRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(donorRepository.save(existing)).thenReturn(existing);

        DonorRequest request = validRequest();
        request.setFullName("Updated Name");

        DonorResponse response = donorService.update(1L, request);

        assertEquals("Updated Name", response.getFullName());
        verify(donorRepository).save(existing);
    }

    @Test
    void deleteRemovesExistingDonor() {
        Donor existing = new Donor();
        when(donorRepository.findById(1L)).thenReturn(Optional.of(existing));

        donorService.delete(1L);

        verify(donorRepository).delete(existing);
    }

    @Test
    void missingDonorThrowsNotFoundException() {
        when(donorRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(DonorNotFoundException.class, () -> donorService.findById(99L));
    }

    private DonorRequest validRequest() {
        DonorRequest request = new DonorRequest();
        request.setFullName("Test Donor");
        request.setBloodGroup("A+");
        request.setAge(25);
        request.setGender("Other");
        request.setPhone("9999999999");
        request.setEmail("donor@example.com");
        request.setCity("Bhopal");
        request.setAvailability("available");
        request.setMessage("Available for emergencies");
        return request;
    }
}
