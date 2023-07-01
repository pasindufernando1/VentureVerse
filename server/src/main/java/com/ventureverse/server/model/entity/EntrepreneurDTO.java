package com.ventureverse.server.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "entrepreneur")
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

}
