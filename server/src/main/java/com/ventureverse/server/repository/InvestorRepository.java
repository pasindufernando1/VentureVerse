package com.ventureverse.server.repository;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.InvestorDTO;
import com.ventureverse.server.model.normal.RegisterRequestDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvestorRepository extends JpaRepository<InvestorDTO, Integer> {

}
