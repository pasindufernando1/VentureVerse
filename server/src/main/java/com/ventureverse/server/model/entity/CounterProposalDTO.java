package com.ventureverse.server.model.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "counter-proposal")
@PrimaryKeyJoinColumn(name = "Id")

public class CounterProposalDTO {
    @Id
    @GeneratedValue
    private Integer Id;
    private Integer amount;
    private Integer returnEquityPercentage;
    private Integer returnUnitProfitPercentage;

    @ManyToOne
    @JoinColumn(name = "entrepreneurId", referencedColumnName = "id")
    private EntrepreneurDTO entrepreneurId;

    @ManyToOne
    @JoinColumn(name="investorId",referencedColumnName = "id")
    private InvestorDTO investorId;
}
