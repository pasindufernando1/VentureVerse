package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.CounterProposalDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CounterProposalRepository extends JpaRepository<CounterProposalDTO, Integer> {
   @Query("""
            SELECT c
            FROM CounterProposalDTO c
            WHERE c.entrepreneurId.id = :id
            """)
    List<CounterProposalDTO> findByEntrepreneurId(Integer id);

    @Query("""
            SELECT c
            FROM CounterProposalDTO c
            WHERE c.listingId.listingId = :id
            """)
    List<CounterProposalDTO> findByListingId(Integer id);


}
