package com.ventureverse.server.model.normal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DetailsDTO {

    // ALL USERS
    private String email;
    private String contactNumber;
    private String firstLineAddress;
    private String secondLineAddress;
    private String town;
    private String district;
    private byte[] profileImage;

    // ADMIN | ENTREPRENEUR |INDIVIDUAL INVESTOR
    private String firstname;
    private String lastname;
    private String nic;
    private String gender;

    // ENTREPRENEUR |INDIVIDUAL INVESTOR | ENTERPRISE INVESTOR
    private String policeReport;
    private String incomeStatement;
    private String collaboratorDetails;
    private String felony;
    private String lawSuit;
    private String felonyDescription;

    // INDIVIDUAL INVESTOR | ENTERPRISE INVESTOR
    private String financialDocument;


    // ENTERPRISE INVESTOR | ENTREPRENEUR
    private String businessName;
    private String businessRegistration;

    // ENTREPRENEUR
    private String businessContact;
    private String bfirstLineAddress;
    private String bsecondLineAddress;
    private String btown;
    private String bdistrict;
    private String businessWebsite;
    private String businessEmail;
    private String businessDescription;
    private String businessRegDoc;
    private List<Integer> sectorId;

    //HOME
    private String title;
    private String description;
    private byte[] thumbnail;
    private String video;
    private Integer expectedAmount;
    private Integer returnEquityPercentage;
    private Integer returnUnitProfitPercentage;
    private Float investmentPercentage;
    private String investorName;
    private String investorQuote;
    private String investorType;

}
