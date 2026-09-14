package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.BloodInventory;

public interface BloodInventoryRepository extends JpaRepository<BloodInventory, Long> {
}
