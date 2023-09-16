package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.InvestorInterestedSectorDTO;
import com.ventureverse.server.model.entity.ListingIndustrySectorsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ListingIndustrySectorsRepository extends JpaRepository<ListingIndustrySectorsDTO, Integer> {


    @Query("""
            SELECT l 
            FROM ListingIndustrySectorsDTO l 
            WHERE l.id.listingId.listingId = :listingId
            """)
    List<ListingIndustrySectorsDTO> findByListingId(Integer listingId);
}
