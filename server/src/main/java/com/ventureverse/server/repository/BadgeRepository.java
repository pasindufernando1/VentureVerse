package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.BadgeDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<BadgeDTO, Integer> {
}
