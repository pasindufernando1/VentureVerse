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
@Table(name = "individual_investor")
@PrimaryKeyJoinColumn(name = "individualinvestorId")
public class IndividualInvestorDTO extends InvestorDTO{

    private String firstname;
    private String lastname;
    private String nic;
    private String gender;
    private String policeReport;

}
