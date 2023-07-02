package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserDTO, Integer> {

    @Query("""
        SELECT u.salt
        FROM UserDTO u
        WHERE u.email = :email
    """)
    Optional<String> findSaltByEmail(String email);

    Optional<UserDTO> findByEmail(String email);

}
