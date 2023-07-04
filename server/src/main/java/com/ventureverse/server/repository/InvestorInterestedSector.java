package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.InvestorInterestedSectorDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestorInterestedSector extends JpaRepository<InvestorInterestedSectorDTO, Integer> {
}
