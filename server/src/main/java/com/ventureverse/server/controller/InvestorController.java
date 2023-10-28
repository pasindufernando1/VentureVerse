package com.ventureverse.server.controller;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.CounterProposalDTO;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.model.entity.InvestorInterestedListingDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.InvestorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    @GetMapping("/interestListings/{id}")
    public ResponseEntity<List<InvestorInterestedListingDTO>> getInvestorById(@PathVariable Integer id) {
        List<InvestorInterestedListingDTO> interestedListings = investorService.getListings(id);
        if (interestedListings.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(interestedListings);
    }

    @GetMapping("/getcounters/{id}")
    public ResponseEntity<List<CounterProposalDTO>> getCounters(@PathVariable Integer id) {
        List<CounterProposalDTO> counters = investorService.getCounters(id);
        if (counters.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(counters);
    }

    @PostMapping("/upload")
    public ResponseEntity <ResponseDTO> uploadFile(
            @RequestParam("agreement") MultipartFile agreement
    ) {
        String rootDirectory = System.getProperty("user.dir");

        // Example paths for saving images and videos
        String imageUploadPath = rootDirectory + "/src/main/resources/static/uploads/images";

        try {
            // Save images
            String agreementFileName = agreement.getOriginalFilename();
            Path agreementFilePath = Paths.get(imageUploadPath, agreementFileName);
            Files.write(agreementFilePath, agreement.getBytes());

            return ResponseEntity.ok(new ResponseDTO("Success", "Files uploaded successfully."));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO("Failure", "Error uploading files."));
        }
    }

    @PutMapping("/finalizeListing/{id}")
    public ResponseEntity<ResponseDTO> updateListings(
            @PathVariable List<Integer> id,
            @RequestBody InvestorInterestedListingDTO investorInterestedListingDTO
    ) {
        return ResponseEntity.ok(investorService.updateListing(id, investorInterestedListingDTO));
    }

}
