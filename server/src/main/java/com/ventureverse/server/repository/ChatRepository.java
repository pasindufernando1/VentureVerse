package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.ChatDTO;
import com.ventureverse.server.model.entity.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatDTO, Integer> {

    @Query("""
        SELECT c
        FROM ChatDTO c
        WHERE c.sender = :user OR c.receiver = :user
    """)
    List<ChatDTO> findBySenderReceiver(UserDTO user);

}