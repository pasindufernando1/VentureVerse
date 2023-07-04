package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.BusinessDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessRepository extends JpaRepository<BusinessDTO, Integer> {
}
