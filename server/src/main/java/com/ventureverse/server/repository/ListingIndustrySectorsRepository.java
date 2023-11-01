package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.InvestorInterestedSectorDTO;
import com.ventureverse.server.model.entity.ListingDTO;
import com.ventureverse.server.model.entity.ListingIndustrySectorsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ListingIndustrySectorsRepository extends JpaRepository<ListingIndustrySectorsDTO, Integer> {

    //Function to get the industry sectors of a listing
    @Query("""
            SELECT l 
            FROM ListingIndustrySectorsDTO l 
            WHERE l.id.listingId = :listing
            """)
    List<ListingIndustrySectorsDTO> findByListingId(ListingDTO listing);

    //Function to get the industry sectors of a listing
    @Query("""
            SELECT l.id.sectorId.sectorName 
            FROM ListingIndustrySectorsDTO l 
            WHERE l.id.listingId = :listing
            """)
    List<String> getListingSectors(ListingDTO listing);

    @Query("""
            SELECT l 
            FROM ListingIndustrySectorsDTO l 
            WHERE l.id.listingId.listingId = :listingId
            """)
    List<ListingIndustrySectorsDTO> findByListingId2(Integer listingId);
}
