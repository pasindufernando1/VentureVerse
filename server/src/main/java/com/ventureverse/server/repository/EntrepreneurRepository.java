package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.EntrepreneurDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EntrepreneurRepository extends JpaRepository<EntrepreneurDTO, Integer> {
    //check whether there are two business emails or not
    Optional<EntrepreneurDTO> findByBusinessEmail(String businessEmail);

}
