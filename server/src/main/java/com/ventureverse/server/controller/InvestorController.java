package com.ventureverse.server.controller;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.model.normal.RegisterRequestDTO;
import com.ventureverse.server.service.InvestorService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/investors")
@RequiredArgsConstructor
public class InvestorController {

    private final InvestorService investorService;

    @GetMapping("/pending")
    public ResponseEntity<List<RegisterRequestDTO>> getPendingUsers() {
        List<IndividualInvestorDTO> pendingRegisterRequests = investorService.findByApprovalStatus(Status.PENDING);
        if (pendingRegisterRequests.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        RegisterRequestDTO registerRequestDTO = new RegisterRequestDTO();
        return ResponseEntity.ok(registerRequestDTO.toInvesorRegisterRequestDTO(pendingRegisterRequests));
    }

    @GetMapping("/pending-details/{id}")
    public ResponseEntity<IndividualInvestorDTO> getPendingUserDetails(@PathVariable Integer id) {
        IndividualInvestorDTO pendingRegisterRequest = investorService.findById(id);
        if (pendingRegisterRequest == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pendingRegisterRequest);
    }

    @GetMapping("/interested-sectors/{id}")
    public ResponseEntity<List<String>> getInterestedSectors(@PathVariable Integer id) {
        List<String> interestedSectors = investorService.findInterestedSectors(id);
        if (interestedSectors.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(interestedSectors);
    }

    @GetMapping("/userInterest")
    public ResponseEntity<List<Map<String,String>>> getUserInterest() {
        List<Map<String,String>> interestedSectors = investorService.getUserInterest();
        if (interestedSectors.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(interestedSectors);
    }

    @GetMapping("/interestSectors")
    public ResponseEntity<List<Map<String,String>>> getInterestSectors() {
        List<Map<String,String>> interestedSectors = investorService.getInterestSectors();
        if (interestedSectors.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(interestedSectors);
    }

    @GetMapping("/InvestedAmount/{id}")
    public ResponseEntity<List<Map<String,String>>> getInvestedAmount(@PathVariable Integer id) {
        List<Map<String,String>> investedAmount = investorService.getInvestedAmount(id);
        if (investedAmount.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(investedAmount);
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<List<Map<String,String>>> getProjects(@PathVariable Integer id) {
        List<Map<String,String>> projects = investorService.getProjects(id);
        if (projects.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(projects);
    }
    @GetMapping("/schedules/{id}")
    public ResponseEntity<List<Map<String,String>>> getMeetings(@PathVariable Integer id){
        List<Map<String,String>> meetings= investorService.getMeetings(id);
        if(meetings.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(meetings);
    }

    @GetMapping("/interestedListings/{id}")
    public ResponseEntity<List<Map<String,String>>> getInterestedListings(@PathVariable Integer id){
        List<Map<String,String>> interestedListings= investorService.getInterestedListings(id);
        if(interestedListings.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(interestedListings);
    }

}
