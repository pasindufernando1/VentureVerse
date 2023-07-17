package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.ResetDTO;
import com.ventureverse.server.model.entity.TokenDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResetRepository extends JpaRepository<ResetDTO, Integer> {

    Optional<ResetDTO> findByToken(String token);


}
