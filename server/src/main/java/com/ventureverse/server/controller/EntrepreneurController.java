package com.ventureverse.server.controller;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.EntrepreneurService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/view")
    public ResponseEntity<List<EntrepreneurDTO>> getAllApprovedEntrepreneurs() {
        List<EntrepreneurDTO> approvedEntrepreneurs = entrepreneurService.getAllApprovedEntrepreneurs();
        System.out.println(approvedEntrepreneurs);
        return ResponseEntity.ok(approvedEntrepreneurs);
    }
    @GetMapping("/view/{id}")
    public ResponseEntity<EntrepreneurDTO> getEntrepreneurDetails(@PathVariable Integer id) {
        EntrepreneurDTO findEntrepreneur = entrepreneurService.getEntrepreneurById(id);
        if (findEntrepreneur == null) {
            return ResponseEntity.notFound().build();
        } else {
            System.out.println(findEntrepreneur);
            return ResponseEntity.ok(findEntrepreneur);
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateEntrepreneur(@RequestBody EntrepreneurDTO updatedEntrepreneur , @PathVariable Integer id) {
        EntrepreneurDTO updatedEntrepreneur1 = entrepreneurService.updateEntrepreneur(updatedEntrepreneur, id);
        System.out.println(updatedEntrepreneur1);

        if (updatedEntrepreneur1 != null) {
            return ResponseEntity.ok("Entrepreneur updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/ban/{id}")
    public ResponseEntity<String> banEntrepreneur(@PathVariable Integer id) {
        EntrepreneurDTO bannedEntrepreneur = entrepreneurService.banEntrepreneur(id);
        if (bannedEntrepreneur != null) {
            return ResponseEntity.ok("Entrepreneur banned successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

