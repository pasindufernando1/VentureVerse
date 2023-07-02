package com.ventureverse.server.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "individualinvestor")
@PrimaryKeyJoinColumn(name = "individualinvestorId")
public class IndividualInvestorDTO extends UserDTO {

    private String firstname;
    private String lastname;
    private String nic;
    private String gender;
    private String policeReport;
    private String financialDocument;

}
