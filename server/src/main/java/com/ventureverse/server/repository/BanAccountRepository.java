package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.BanAccountDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BanAccountRepository extends JpaRepository<BanAccountDTO, Integer> {
}
