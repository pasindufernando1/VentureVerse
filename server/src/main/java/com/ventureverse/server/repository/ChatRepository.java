package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.ChatDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<ChatDTO, Integer> {

}