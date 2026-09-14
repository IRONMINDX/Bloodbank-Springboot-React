package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.DonorRequest;
import com.example.demo.dto.DonorResponse;
import com.example.demo.entity.Donor;
import com.example.demo.repository.DonorRepository;

@Service
public class DonorService {

    private final DonorRepository donorRepository;

    public DonorService(DonorRepository donorRepository) {
        this.donorRepository = donorRepository;
    }

    @Transactional
    public DonorResponse create(DonorRequest request) {
        Donor donor = new Donor();
        copyRequestToEntity(request, donor);
        return toResponse(donorRepository.save(donor));
    }

    @Transactional(readOnly = true)
    public List<DonorResponse> findAll() {
        return donorRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public DonorResponse findById(Long id) {
        return toResponse(findEntityById(id));
    }

    @Transactional
    public DonorResponse update(Long id, DonorRequest request) {
        Donor donor = findEntityById(id);
        copyRequestToEntity(request, donor);
        return toResponse(donorRepository.save(donor));
    }

    @Transactional
    public void delete(Long id) {
        donorRepository.delete(findEntityById(id));
    }

    private Donor findEntityById(Long id) {
        return donorRepository.findById(id).orElseThrow(() -> new DonorNotFoundException(id));
    }

    private void copyRequestToEntity(DonorRequest request, Donor donor) {
        donor.setFullName(request.getFullName());
        donor.setBloodGroup(request.getBloodGroup());
        donor.setAge(request.getAge());
        donor.setGender(request.getGender());
        donor.setPhone(request.getPhone());
        donor.setEmail(request.getEmail());
        donor.setCity(request.getCity());
        donor.setLastDonation(request.getLastDonation());
        donor.setAvailability(request.getAvailability());
        donor.setMessage(request.getMessage());
    }

    private DonorResponse toResponse(Donor donor) {
        DonorResponse response = new DonorResponse();
        response.setId(donor.getId());
        response.setFullName(donor.getFullName());
        response.setBloodGroup(donor.getBloodGroup());
        response.setAge(donor.getAge());
        response.setGender(donor.getGender());
        response.setPhone(donor.getPhone());
        response.setEmail(donor.getEmail());
        response.setCity(donor.getCity());
        response.setLastDonation(donor.getLastDonation());
        response.setAvailability(donor.getAvailability());
        response.setMessage(donor.getMessage());
        return response;
    }
}
