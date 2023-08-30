package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.entity.ListingDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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
}
