package com.ventureverse.server.repository;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserDTO, Integer> {

    @Query("""
        SELECT u.salt
        FROM UserDTO u
        WHERE u.email = :email
    """)
    Optional<String> findSaltByEmail(String email);

    @Query("""
        SELECT u.approvalStatus
        FROM UserDTO u
        WHERE u.id = :id
    """)
    Status findApprovalById(Integer id);

    Optional<UserDTO> findByEmail(String email);


}
