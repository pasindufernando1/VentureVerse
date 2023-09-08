package com.ventureverse.server.repository;

import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.model.entity.AdminDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminRepository extends JpaRepository<AdminDTO, Integer> {
    List<AdminDTO> findAllByRole(Role role);
    AdminDTO findAllById(Integer id);




}
