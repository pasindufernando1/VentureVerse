package com.ventureverse.server.repository;


import com.ventureverse.server.enumeration.Complain;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ComplainRepository extends JpaRepository<ComplainDTO, Integer> {
    Optional<ComplainDTO> findByComplainId(Integer id);

    List<ComplainDTO> findByComplainType(Complain complain);

    @Query("""
            SELECT e
            FROM ComplainDTO e
            WHERE e.userId = :id
    """)
    List<ComplainDTO> findByUserId(UserDTO id);
}
