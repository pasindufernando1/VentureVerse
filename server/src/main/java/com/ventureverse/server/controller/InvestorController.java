package com.ventureverse.server.controller;

import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.EnterpriseInvestorDTO;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.service.InvestorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/investors")
@RequiredArgsConstructor
public class InvestorController {

    private final InvestorService investorService;


    @GetMapping("/pending")
    public ResponseEntity<List<IndividualInvestorDTO>> getPendingUsers() {
        List<IndividualInvestorDTO> pendingRegisterRequests = investorService.findByApprovalStatus(Status.PENDING);
        if (pendingRegisterRequests.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pendingRegisterRequests);
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
    @GetMapping("/IndividualInvestor/view")
    public ResponseEntity<List<IndividualInvestorDTO>> getAllIndividualInvestors() {
        List<IndividualInvestorDTO> individualInvestors = investorService.getAllIndividualInvestors();
        System.out.println(individualInvestors);
        return ResponseEntity.ok(individualInvestors);

    }
    @GetMapping("/EnterpriseInvestor/view")
    public ResponseEntity<List<EnterpriseInvestorDTO>> getAllEnterpriseInvestors() {
        List<EnterpriseInvestorDTO> enterpriseInvestors = investorService.getAllEnterpriseInvestors();
        System.out.println(enterpriseInvestors);
        return ResponseEntity.ok(enterpriseInvestors);

    }
    @GetMapping("/IndividualInvestor/view/{id}")
    public ResponseEntity<IndividualInvestorDTO> getIndividualInvestorById(@PathVariable Integer id) {
        IndividualInvestorDTO individualInvestor = investorService.getIndividualInvestorById(id);
        System.out.println(individualInvestor);
        return ResponseEntity.ok(individualInvestor);

    }

    @PutMapping("/IndividualInvestor/update/{id}")
    public ResponseEntity<IndividualInvestorDTO> updateIndividualInvestor(@RequestBody IndividualInvestorDTO updatedIndividualInvestor, @PathVariable Integer id) {
        IndividualInvestorDTO individualInvestor = investorService.updateIndividualInvestor(updatedIndividualInvestor, id);
        System.out.println(individualInvestor);
        return ResponseEntity.ok(individualInvestor);

    }
    @GetMapping("EnterpriseInvestor/view/{id}")
        public ResponseEntity<EnterpriseInvestorDTO> getEnterpriseInvestorById(@PathVariable Integer id) {
            EnterpriseInvestorDTO enterpriseInvestor = investorService.getEnterpriseInvestorById(id);
            System.out.println(enterpriseInvestor);
            return ResponseEntity.ok(enterpriseInvestor);

        }
@PutMapping("/EnterpriseInvestor/update/{id}")
    public ResponseEntity<EnterpriseInvestorDTO> updateEnterpriseInvestor(@RequestBody EnterpriseInvestorDTO updatedEnterpriseInvestor, @PathVariable Integer id) {
        EnterpriseInvestorDTO enterpriseInvestor = investorService.updateEnterpriseInvestor(updatedEnterpriseInvestor, id);
        System.out.println(enterpriseInvestor);
        return ResponseEntity.ok(enterpriseInvestor);

    }
    @PutMapping("/IndividualInvestor/ban/{id}")
    public ResponseEntity<IndividualInvestorDTO> banIndividualInvestor(@PathVariable Integer id) {
        IndividualInvestorDTO individualInvestor = investorService.banIndividualInvestor(id);
        System.out.println(individualInvestor);
        return ResponseEntity.ok(individualInvestor);

    }


}
