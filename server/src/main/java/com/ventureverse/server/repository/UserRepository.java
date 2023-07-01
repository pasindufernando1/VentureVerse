package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserDTO, Integer> {

    Optional<UserDTO> findByEmail(String email);

}
