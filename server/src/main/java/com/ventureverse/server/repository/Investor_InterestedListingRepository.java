package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.InvestorInterestedListingDTO;
import com.ventureverse.server.model.entity.ListingDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface Investor_InterestedListingRepository extends JpaRepository<InvestorInterestedListingDTO, Integer> {

    @Query("""
            SELECT investorInterestedListingDTO
            FROM InvestorInterestedListingDTO investorInterestedListingDTO
            WHERE investorInterestedListingDTO.id.investorId.id = :id
            AND investorInterestedListingDTO.amountFinalized IS NULL
            """)
    List<InvestorInterestedListingDTO> findByInvestorId(Integer id);

    @Query("""
            SELECT investorInterestedListingDTO
            FROM InvestorInterestedListingDTO investorInterestedListingDTO
            WHERE investorInterestedListingDTO.id.listingId = :id
            """)
    Optional<InvestorInterestedListingDTO> findByListing(ListingDTO id);

    @Query("""
            SELECT investorInterestedListingDTO
            FROM InvestorInterestedListingDTO investorInterestedListingDTO
            WHERE investorInterestedListingDTO.id.listingId.listingId = :id
            """)
    InvestorInterestedListingDTO findByListingId(Integer id);
}