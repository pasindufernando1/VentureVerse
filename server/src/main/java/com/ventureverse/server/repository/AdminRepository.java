package com.ventureverse.server.repository;

import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.model.entity.AdminDTO;
import com.ventureverse.server.enumeration.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdminRepository extends JpaRepository<AdminDTO, Integer> {

    @Query("""
        SELECT u
        FROM AdminDTO u
        WHERE u.role = :role AND u.approvalStatus = :status
    """)
    List<AdminDTO> findAllByRole(Role role, Status status);
    AdminDTO findAllById(Integer id);


    @Query("""
        SELECT u
        FROM AdminDTO u
        WHERE u.id = :id
    """)
    AdminDTO findByAdminId(Integer id);


}
