package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.Investor_InterestedListingDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Investor_InterestedListingRepository extends JpaRepository<Investor_InterestedListingDTO, Integer> {
}
