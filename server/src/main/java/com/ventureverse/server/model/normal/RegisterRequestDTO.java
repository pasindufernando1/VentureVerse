package com.ventureverse.server.model.normal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDTO {

    // ALL USERS
    private String email;
    private String password;
    private String contactNumber;
    private String firstLineAddress;
    private String secondLineAddress;
    private String town;
    private String district;

    // ADMIN | ENTREPRENEUR |INDIVIDUAL INVESTOR
    private String firstname;
    private String lastname;
    private String nic;
    private String gender;

    // ENTREPRENEUR |INDIVIDUAL INVESTOR | ENTERPRISE INVESTOR
    private String policeReport;
    private String incomeStatement;
    private String collaboratorDetails;
    private Boolean felony;
    private Boolean lawSuit;
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


}
