package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.entity.InvestorDTO;
import com.ventureverse.server.model.entity.InvestorInterestedListingDTO;
import com.ventureverse.server.model.entity.ListingDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Investor_InterestedListingRepository extends JpaRepository<InvestorInterestedListingDTO, Integer> {
    @Query("""
            SELECT COUNT(e)
            FROM InvestorInterestedListingDTO e
            WHERE e.id.listingId = :id
    """)
    int getCountByID(ListingDTO id);
    //Long getCountByID(ListingDTO listingDTO);


    @Query("""
            SELECT COUNT(e)
            FROM InvestorInterestedListingDTO e
            WHERE e.id.investorId = :id
    """)

    Long getCountByInvestorId(InvestorDTO id);

    @Query("""
            SELECT e
            FROM InvestorInterestedListingDTO e
            WHERE e.id.investorId = :id
    """)
    List<InvestorInterestedListingDTO> findAllByInvestorId(InvestorDTO id);
}
