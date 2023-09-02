package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.InvestorInterestedListingDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Investor_InterestedListingRepository extends JpaRepository<InvestorInterestedListingDTO, Integer> {
      @Query("""
            SELECT i 
            FROM InvestorInterestedListingDTO i 
            WHERE i.id.investorId.id = :investor
            AND i.finalizedDate IS NOT NULL
            """)
    List<InvestorInterestedListingDTO> findByInvestorId(Integer investor);

    @Query("""
            SELECT i 
            FROM InvestorInterestedListingDTO i 
            WHERE i.id.investorId.id = :id
            """)
      List<InvestorInterestedListingDTO> findAllByInvestorId(Integer id);
}
