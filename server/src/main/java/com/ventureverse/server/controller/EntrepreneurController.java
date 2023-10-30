package com.ventureverse.server.controller;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.entity.InvestorInterestedListingDTO;
import com.ventureverse.server.model.entity.ListingDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.EntrepreneurService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/entrepreneurs")
@RequiredArgsConstructor
public class EntrepreneurController {

    private final EntrepreneurService entrepreneurService;

    @GetMapping("/pending")
    public ResponseEntity<List<EntrepreneurDTO>> getPendingUsers() {
        List<EntrepreneurDTO> pendingEntrepreneurs = entrepreneurService.findByApprovalStatus(Status.PENDING);
        if (pendingEntrepreneurs.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pendingEntrepreneurs);
    }

    @GetMapping("/pending-details/{id}")
    public ResponseEntity<EntrepreneurDTO> getPendingUserDetails(@PathVariable Integer id) {
        EntrepreneurDTO pendingEntrepreneur = entrepreneurService.findById(id);
        if (pendingEntrepreneur == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pendingEntrepreneur);
    }

    @PostMapping("/addcomplaint/{id}")
    public ResponseEntity<ResponseDTO> addComplaint(
            @PathVariable Integer id,
            @RequestBody ComplainDTO complainDTO,
            HttpServletResponse response
    ) {
        System.out.println("id = " + id);
        return ResponseEntity.ok(entrepreneurService.addComplain(response, complainDTO));
    }

    @GetMapping("/finalizeListings/{id}")
    public ResponseEntity<List<InvestorInterestedListingDTO>> finalizeListings(@PathVariable Integer id) {
        List<InvestorInterestedListingDTO> finalizedListings = entrepreneurService.finalizeListings(id);
        if (finalizedListings == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(finalizedListings);
    }

    @PutMapping("/updatefinalizeListing/{id}")
    public ResponseEntity<ResponseDTO> updateListings(
            @PathVariable("id") Integer id,
            @RequestBody InvestorInterestedListingDTO investorInterestedListingDTO
    ) {
        return ResponseEntity.ok(entrepreneurService.updateListing(id, investorInterestedListingDTO));
    }

    @GetMapping("/offers/{id}")
    public ResponseEntity<List<Map<String, String>>> getOffers(@PathVariable Integer id) {
        List<Map<String, String>> offers = entrepreneurService.getOffers(id);
        if (offers.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(offers);
    }

    @GetMapping("/getEntrepreneurPic/{id}")
    public ResponseEntity<List<byte[]>> getEntrepreneurPic(@PathVariable List<Integer> id) throws IOException {
        System.out.println("id = " + id);
        List<byte[]> img = new ArrayList<>();
        for ( Integer i : id) {
            System.out.println("i = " + i);
            String entrepreneurPic = entrepreneurService.getEntrepreneurPic(i);

            String rootDirectory = System.getProperty("user.dir");
            String imageUploadPath = rootDirectory + "/src/main/resources/static/uploads/images/profileImages";

            Path entrepreneurPath = Paths.get(imageUploadPath,entrepreneurPic);
            img.add(Files.readAllBytes(entrepreneurPath));
        }
        if (img.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(img);
    }

    @GetMapping("/getInvestorName/{id}")
    public ResponseEntity<List<String>> getInvestorName(@PathVariable List<Integer> id) {
        List<String> investorName = entrepreneurService.getInvestorName(id);
        if (investorName.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(investorName);
    }

    @GetMapping("/getListingDetails/{id}")
    public ResponseEntity<ListingDTO> getListingDetails(@PathVariable Integer id) {
        ListingDTO listingDTO = entrepreneurService.getListingDetails(id);
        System.out.println("listingDTO = " + listingDTO);
        if (listingDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(listingDTO);
    }
}

