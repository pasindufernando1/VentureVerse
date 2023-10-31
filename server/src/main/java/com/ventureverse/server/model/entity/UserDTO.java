package com.ventureverse.server.model.entity;

import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.enumeration.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class UserDTO {

    @Id
    @GeneratedValue
    private Integer id;
    private String email;
    private String profileImage = "profileImage.jpg";
    private String contactNumber;
    private String firstLineAddress;
    private String secondLineAddress;
    private String town;
    private String district;
    private Date registeredDate;

    @Enumerated(EnumType.STRING)
    private Status approvalStatus = Status.PENDING;

    @Enumerated(EnumType.STRING)
    private Role role;

}
