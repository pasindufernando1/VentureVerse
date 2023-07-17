package com.ventureverse.server.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "entrepreneur")
@PrimaryKeyJoinColumn(name = "entrepreneurId")
public class EntrepreneurDTO extends UserDTO {

    private String firstname;
    private String lastname;
    private String nic;
    private String gender;
    private String policeReport;
    private String incomeStatement;
    private String collaboratorDetails;
    private Boolean felony;
    private Boolean lawSuit;
    private String felonyDescription;

    @OneToMany(mappedBy = "entrepreneurId")
    List<ListingDTO> listing;

}
