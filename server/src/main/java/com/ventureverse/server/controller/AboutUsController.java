package com.ventureverse.server.controller;

import com.ventureverse.server.service.EntrepreneurService;
import com.ventureverse.server.service.InvestorService;
import com.ventureverse.server.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor

public class AboutUsController {

    private final EntrepreneurService entrepreneurService;
//get total entrepreneurs
    @GetMapping("/getCountEntrepreneurs")
    public long getEntrepreneurCount (

    ) {long entrepreneurCount = entrepreneurService.countEntrepreneurs(); return entrepreneurCount;}

    //get total investors
    private final InvestorService investorService;
    @GetMapping("/getCountIndividualInvestors")
    public long getIndividualInvestorCount (

    ) {long individualInvestorCount = investorService.countIndividualInvestors(); return individualInvestorCount;}

    //get total listings
    private final ListingService listingService;
    @GetMapping("/getCountListings")
    public long getListingCount (

    ) {long listingCount = listingService.countListings(); return listingCount;}

}
