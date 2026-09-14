package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.BloodRequestRequest;
import com.example.demo.dto.BloodRequestResponse;
import com.example.demo.entity.BloodRequest;
import com.example.demo.repository.BloodRequestRepository;

@Service
public class BloodRequestService {

    private final BloodRequestRepository bloodRequestRepository;

    public BloodRequestService(BloodRequestRepository bloodRequestRepository) {
        this.bloodRequestRepository = bloodRequestRepository;
    }

    @Transactional
    public BloodRequestResponse create(BloodRequestRequest request) {
        BloodRequest bloodRequest = new BloodRequest();
        copyRequestToEntity(request, bloodRequest);
        return toResponse(bloodRequestRepository.save(bloodRequest));
    }

    @Transactional(readOnly = true)
    public List<BloodRequestResponse> findAll() {
        return bloodRequestRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public BloodRequestResponse findById(Long id) {
        return toResponse(findEntityById(id));
    }

    @Transactional
    public BloodRequestResponse update(Long id, BloodRequestRequest request) {
        BloodRequest bloodRequest = findEntityById(id);
        copyRequestToEntity(request, bloodRequest);
        return toResponse(bloodRequestRepository.save(bloodRequest));
    }

    @Transactional
    public void delete(Long id) {
        bloodRequestRepository.delete(findEntityById(id));
    }

    private BloodRequest findEntityById(Long id) {
        return bloodRequestRepository.findById(id)
                .orElseThrow(() -> new BloodRequestNotFoundException(id));
    }

    private void copyRequestToEntity(BloodRequestRequest request, BloodRequest bloodRequest) {
        bloodRequest.setRequesterName(request.getRequesterName());
        bloodRequest.setBloodGroup(request.getBloodGroup());
        bloodRequest.setUnitsRequired(request.getUnitsRequired());
        bloodRequest.setHospitalName(request.getHospitalName());
        bloodRequest.setCity(request.getCity());
        bloodRequest.setUrgency(request.getUrgency());
        bloodRequest.setStatus(request.getStatus());
        bloodRequest.setRequestedDate(request.getRequestedDate());
    }

    private BloodRequestResponse toResponse(BloodRequest bloodRequest) {
        BloodRequestResponse response = new BloodRequestResponse();
        response.setId(bloodRequest.getId());
        response.setRequesterName(bloodRequest.getRequesterName());
        response.setBloodGroup(bloodRequest.getBloodGroup());
        response.setUnitsRequired(bloodRequest.getUnitsRequired());
        response.setHospitalName(bloodRequest.getHospitalName());
        response.setCity(bloodRequest.getCity());
        response.setUrgency(bloodRequest.getUrgency());
        response.setStatus(bloodRequest.getStatus());
        response.setRequestedDate(bloodRequest.getRequestedDate());
        return response;
    }
}
