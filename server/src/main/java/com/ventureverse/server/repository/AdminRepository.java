package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.AdminDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<AdminDTO, Integer> {



}
