package com.ventureverse.server.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "individualinvestor")
public class IndividualInvestorDTO extends InvestorDTO {

    private String firstname;
    private String lastname;
    private String nic;
    private String gender;
    private String policeReport;

}
