package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.ScheduleDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<ScheduleDTO, Integer> {
    @Query("""
        SELECT l
        FROM ScheduleDTO l
        WHERE l.investorId.id = :id
    """)
    List<ScheduleDTO> findMeetings(Integer id);

    @Query("""
        SELECT l
        FROM ScheduleDTO l
        WHERE l.entrepreneurId.id = :id
    """)
    List<ScheduleDTO> findEntrepreneurMeetings(Integer id);
}
