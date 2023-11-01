package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.InvestorInterestedListingDTO;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
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

// public interface Investor_InterestedListingRepository extends JpaRepository<InvestorInterestedListingDTO, Integer> {

//     @Query("""
//             SELECT investorInterestedListingDTO
//             FROM InvestorInterestedListingDTO investorInterestedListingDTO
//             WHERE investorInterestedListingDTO.id.investorId.id = :id
//             AND investorInterestedListingDTO.amountFinalized IS NULL
//             """)
//     List<InvestorInterestedListingDTO> findByInvestorId(Integer id);

    @Query("""
            SELECT investorInterestedListingDTO
            FROM InvestorInterestedListingDTO investorInterestedListingDTO
            WHERE investorInterestedListingDTO.id.listingId = :id
            """)
    Optional<InvestorInterestedListingDTO> findByListing(ListingDTO id);

//     @Query("""
//             SELECT investorInterestedListingDTO
//             FROM InvestorInterestedListingDTO investorInterestedListingDTO
//             WHERE investorInterestedListingDTO.id.listingId.listingId = :id
//             """)
//     InvestorInterestedListingDTO findByListingId(Integer id);

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

    @Query("""
            SELECT i
            FROM InvestorInterestedListingDTO i 
            WHERE
            i.id.listingId.listingId = :listingId 
            AND i.id.investorId.id = :investorId
            """)
    InvestorInterestedListingDTO findByInvestorIdAndListingId(@Param("investorId") Integer investorId, @Param("listingId") int listingId);
    
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


    //Function to get the amount of investment completed for a listing.It is the sum of all the finalized amounts of the investors related to the listing
    @Query("""
            SELECT SUM(i.amountFinalized)
            FROM InvestorInterestedListingDTO i
            WHERE i.id.listingId = :listing AND i.status='Finalized'
            """)
    Integer getCompletedInvestment(ListingDTO listing);

    //Get the interested investors of a listing
    @Query("""
            SELECT i
            FROM InvestorInterestedListingDTO i
            WHERE i.id.listingId = :listing
            """)
    List<InvestorInterestedListingDTO> getInterestedInvestors(ListingDTO listing);
}
