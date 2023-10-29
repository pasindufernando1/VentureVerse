package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.entity.ListingDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ListingRepository extends JpaRepository<ListingDTO, Integer> {
    //Find the latest listingId in the database
    @Query("""
            SELECT l 
            FROM ListingDTO l 
            ORDER BY l.listingId 
            DESC LIMIT 1
            """)
    ListingDTO findLastInsertedListing();

    //Find the latest listing from an entrepreneur using the entrepreneurId
    @Query("""
            SELECT l 
            FROM ListingDTO l 
            WHERE l.entrepreneurId = :id 
            ORDER BY l.listingId 
            DESC LIMIT 1
            """)
    ListingDTO findLatestListing(EntrepreneurDTO id);

    @Query("""
            SELECT l.entrepreneurId
            FROM ListingDTO l 
            WHERE l.listingId = :id
            """)
    EntrepreneurDTO getEntrepreneur(Integer id);

    //Get the listings where it has an entry in the investor_interested_listing table and entrepreneur_proof_document and investor_proof_document is not null
    @Query("""
            SELECT l 
            FROM ListingDTO l 
            WHERE l.listingId IN (
                SELECT i.id.listingId.listingId 
                FROM InvestorInterestedListingDTO i 
                WHERE i.id.listingId.listingId = l.listingId 
                AND i.entrepreneurProofDocument IS NOT NULL 
                AND i.investorProofDocument IS NOT NULL
            )
            """)
    List<ListingDTO> getAllFinalizedListings();
}
