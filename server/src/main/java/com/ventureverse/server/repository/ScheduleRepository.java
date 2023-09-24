package com.ventureverse.server.repository;
import com.ventureverse.server.model.entity.InvestorDTO;
import com.ventureverse.server.model.entity.ScheduleDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleDTO, Integer> {

   @Query("""
    SELECT e
    FROM ScheduleDTO e
    WHERE e.investorId =:id
""")
   List<ScheduleDTO> findByInvestorId(InvestorDTO id);

    @Query("""
    SELECT e
    FROM ScheduleDTO e
    WHERE e.entrepreneurId.id =:entrepreneur
""")
    List<ScheduleDTO> findByEntrepreneurId(Integer entrepreneur);
}

