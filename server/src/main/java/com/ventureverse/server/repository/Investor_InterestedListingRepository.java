package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.InvestorInterestedListingDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Investor_InterestedListingRepository extends JpaRepository<InvestorInterestedListingDTO, Integer> {
}
