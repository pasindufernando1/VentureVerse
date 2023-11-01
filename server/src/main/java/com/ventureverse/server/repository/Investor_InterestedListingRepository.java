package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface Investor_InterestedListingRepository extends JpaRepository<InvestorInterestedListingDTO, Integer> {
    @Query("""
            SELECT COUNT(e)
            FROM InvestorInterestedSectorDTO e
            WHERE e.id.investorId = :id
                                      
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



    @Query("""
            SELECT MIN(e.finalizedDate)
            FROM InvestorInterestedListingDTO e
            WHERE e.id.investorId = :individualInvestor
    """)
    Date getLastDate(IndividualInvestorDTO individualInvestor);

    @Query("""
            SELECT MIN(e.finalizedDate)
            FROM InvestorInterestedListingDTO e
            WHERE e.id.investorId = :enterpriseInvestor
    """)
    Date getLastDate1(EnterpriseInvestorDTO enterpriseInvestor);
    @Query("""
            SELECT e
            FROM InvestorInterestedListingDTO e
            WHERE e.id.listingId =:id
    """)
    List<InvestorInterestedListingDTO> findAllByListingId(ListingDTO id);
}
