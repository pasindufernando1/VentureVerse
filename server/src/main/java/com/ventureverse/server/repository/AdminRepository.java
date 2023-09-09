package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.AdminDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdminRepository extends JpaRepository<AdminDTO, Integer> {

    @Query("""
        SELECT u
        FROM AdminDTO u
        WHERE u.id = :id
    """)
    AdminDTO findByAdminId(Integer id);


}
