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

    @Query("SELECT investorInterestedListingDTO " +
            "FROM InvestorInterestedListingDTO investorInterestedListingDTO " +
            "WHERE investorInterestedListingDTO.id.listingId = :listingId " +  // Use 'listingId' instead of 'id'
            "AND investorInterestedListingDTO.id.investorId.id = :investorId")
    Optional<InvestorInterestedListingDTO> findByListingInvestor(@Param("listingId") ListingDTO listingId, @Param("investorId") Integer investorId);

    @Query("""
            SELECT i\s
            FROM InvestorInterestedListingDTO i\s
            WHERE i.status='Investor_Finalized'
            AND i.id.listingId.listingId = :id
            """)
    List<InvestorInterestedListingDTO> findByEntreprenuerListingId(Integer id);

    @Query("""
            SELECT i\s
            FROM InvestorInterestedListingDTO i\s
            WHERE i.id.listingId.listingId = :id
            AND i.entrepreneurProofDocument IS NOT NULL
            AND i.investorProofDocument IS NOT NULL
            """)
    List<InvestorInterestedListingDTO> finalizeListings(Integer id);

    @Query("""
            SELECT i.entrepreneurProofDocument
            FROM InvestorInterestedListingDTO i\s
            WHERE i.id.listingId.listingId = :listingId
            AND i.id.investorId.id = :investorId
            AND i.entrepreneurProofDocument IS NOT NULL
            """)
    String findByEntrepreneurFinalizeDoc(@Param("listingId") Integer listingId, @Param("investorId") Integer investorId);

    @Query("""
            SELECT i.investorProofDocument
            FROM InvestorInterestedListingDTO i\s
            WHERE i.id.listingId.listingId = :listingId
            AND i.id.investorId.id = :investorId
            AND i.investorProofDocument IS NOT NULL
            """)
    String findByListingInvestorId(@Param("listingId") Integer listingId, @Param("investorId") Integer investorId);
}