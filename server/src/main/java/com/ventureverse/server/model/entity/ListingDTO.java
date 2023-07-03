package com.ventureverse.server.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "listing")
public class ListingDTO {
    @Id
    @GeneratedValue
    private Integer listingId;
    private String title;
    private String description;
    private String pitchingVideo;
    private String intention;
    private Timestamp businessStartDate;
    private Integer businessDuration;
    private Integer lifetimeSales;
    private Integer lastYearGrossIncome;
    private Integer lastYearNetIncome;
    private Integer salesProjectionThisYear;
    private Integer salesProjectionNextYear;
    private String projectionMethod;
    private String outsideSources;
    private String outsideSourceDescription;
    private String attemptsToGrow;
    private String awards;
    private String uniqueSellingProposition;
    private String stage;
    private Integer expectedAmount;
    private Integer returnUnitProfitPercentage;
    private Integer returnEquityPercentage;
    private String subscriptionType;
    private Timestamp publishedDate;
    private String status;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "entrepreneurId", referencedColumnName = "id")
    private EntrepreneurDTO entrepreneurId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sectorId", referencedColumnName = "sectorId")
    private IndustrySectorDTO sectorId;

}