package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.ComplainDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplainRepository extends JpaRepository<ComplainDTO, Integer> {
}
