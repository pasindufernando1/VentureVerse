package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.InvestorDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestorRepository extends JpaRepository<InvestorDTO, Integer> {

}
