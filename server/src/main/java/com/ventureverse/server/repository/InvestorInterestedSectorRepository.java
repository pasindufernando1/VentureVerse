package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.InvestorInterestedSectorDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface InvestorInterestedSectorRepository extends JpaRepository<InvestorInterestedSectorDTO, Integer> {

    @Query("SELECT i FROM InvestorInterestedSectorDTO i WHERE i.id.investorId.id = :investorId")
    List<InvestorInterestedSectorDTO> findByInvestorId(Integer investorId);

}
