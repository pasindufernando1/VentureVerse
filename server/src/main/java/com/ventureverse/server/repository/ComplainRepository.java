package com.ventureverse.server.repository;


import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ComplainRepository extends JpaRepository<ComplainDTO, Integer> {
    Optional<ComplainDTO> findByComplainId(Integer id);
}
