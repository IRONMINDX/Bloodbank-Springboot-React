package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Donor;

public interface DonorRepository extends JpaRepository<Donor, Long> {
}
