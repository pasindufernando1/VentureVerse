package com.ventureverse.server.repository;

import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.EnterpriseInvestorDTO;
import com.ventureverse.server.model.entity.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.User;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserDTO, Integer> {

    @Query("""
        SELECT u.approvalStatus
        FROM UserDTO u
        WHERE u.id = :id
    """)
    Status findApprovalById(Integer id);

    @Query("""
        SELECT u.approvalStatus
        FROM UserDTO u
        WHERE u.email = :email
    """)
    Status findApprovalByEmail(String email);

    Optional<UserDTO> findByEmail(String email);

    @Query("""
        SELECT u.role
        FROM UserDTO u
        WHERE u.id = :id
    """)
    Role findRoleById(Integer id);

    @Query("""
        SELECT u.profileImage
        FROM UserDTO u
        WHERE u.id = :id
    """)
    String getimage(Integer id);

    @Query("""
        SELECT u
        FROM UserDTO u
        WHERE u.id = :id
    """)
    Optional<UserDTO> findByEnterprice(Integer id);

    @Query("""
        SELECT u
        FROM UserDTO u
        WHERE u.id = :id
    """)
    UserDTO findByUserID(Integer id);
}
