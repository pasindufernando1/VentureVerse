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
@Table(name = "enterpriseinvestor")
public class EnterpriseInvestorDTO extends InvestorDTO {

    private String businessName;
    private String businessRegistration;

}
