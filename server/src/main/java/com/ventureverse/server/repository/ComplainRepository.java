package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.ComplainDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplainRepository extends JpaRepository<ComplainDTO, Integer> {


}
