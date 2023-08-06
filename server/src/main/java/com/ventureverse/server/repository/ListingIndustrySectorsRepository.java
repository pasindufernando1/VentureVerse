package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.InvestorInterestedSectorDTO;
import com.ventureverse.server.model.entity.ListingIndustrySectorsDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListingIndustrySectorsRepository extends JpaRepository<ListingIndustrySectorsDTO, Integer> {


}
