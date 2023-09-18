package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.entity.ListCountDTO;
import com.ventureverse.server.model.entity.ListingDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

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

    @Query("""
           SELECT entrepreneurId,count(*)   
            from ListingDTO 
           group by entrepreneurId
            """)
    List<Object[]> entrepreneurLeaderboard();

    @Query("""
            SELECT COUNT(e)
            FROM ListingDTO e
            WHERE e.entrepreneurId = :id
    """)
    Long getCountById(EntrepreneurDTO id);


    List<ListingDTO> findAllByEntrepreneurId(EntrepreneurDTO entrepreneurId);
}
