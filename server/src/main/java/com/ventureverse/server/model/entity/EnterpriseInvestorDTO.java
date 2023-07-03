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
@Table(name = "enterprise-investor")
@PrimaryKeyJoinColumn(name = "enterpriseinvestorId")
public class EnterpriseInvestorDTO extends InvestorDTO {

    private String businessName;
    private String businessRegistration;

}
