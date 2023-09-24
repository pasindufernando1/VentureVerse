package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.InvestorInterestedListingDTO;
import jakarta.persistence.criteria.CriteriaBuilder;
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

    @Query("""
            SELECT i\s
            FROM InvestorInterestedListingDTO i\s
            WHERE i.id.listingId.listingId = :listingId
            """)
    InvestorInterestedListingDTO findByListingId(Integer listingId);

    @Query("""
            SELECT i\s
            FROM InvestorInterestedListingDTO i\s
            WHERE i.finalizedDate IS NOT NULL
            """)
    List<InvestorInterestedListingDTO> findCompletedListings();

    @Query("""
            SELECT i\s
            FROM InvestorInterestedListingDTO i\s
            WHERE i.finalizedDate IS NULL 
            AND i.id.investorId.id = :id
            """)
    List<InvestorInterestedListingDTO> findPendingListings(Integer id);

    @Query("""
            SELECT i\s
            FROM InvestorInterestedListingDTO i\s
            WHERE i.finalizedDate IS NOT NULL 
            AND i.id.listingId.entrepreneurId.id = :id
            """)
    List<InvestorInterestedListingDTO> findByEntrepreneurId(Integer id);

    @Query("""
            SELECT i\s
            FROM InvestorInterestedListingDTO i\s
            WHERE i.finalizedDate IS NULL 
            AND i.id.listingId.listingId = :id
            """)
    List<InvestorInterestedListingDTO> findByPendingListingId(Integer id);
}
