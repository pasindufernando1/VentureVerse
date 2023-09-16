package com.ventureverse.server.controller;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.normal.RegisterRequestDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.EntrepreneurService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/entrepreneurs")
@RequiredArgsConstructor
public class EntrepreneurController {

    private final EntrepreneurService entrepreneurService;

    @GetMapping("/pending")
    public ResponseEntity<List<RegisterRequestDTO>> getPendingUsers() {
        List<EntrepreneurDTO> pendingEntrepreneurs = entrepreneurService.findByApprovalStatus(Status.PENDING);
        if (pendingEntrepreneurs.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        RegisterRequestDTO registerRequestDTO = new RegisterRequestDTO();
        return ResponseEntity.ok(registerRequestDTO.toRegisterRequestDTO(pendingEntrepreneurs));
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
        return ResponseEntity.ok(entrepreneurService.addComplain(response, complainDTO));
    }

    @GetMapping("/getcomplains")
    public ResponseEntity<List<Map<String, String>>> getComplains() {
        List<Map<String, String>> complains = entrepreneurService.getComplains();
        if (complains.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(complains);
    }

    @GetMapping("/listingsCounter/{id}")
    public ResponseEntity<List<Map<String, String>>> getCounterListings(@PathVariable Integer id) {
        List<Map<String, String>> schedules = entrepreneurService.getListings(id);
        if (schedules.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/schedules/{id}")
    public ResponseEntity<List<Map<String, String>>> getMeetings(@PathVariable Integer id) {
        List<Map<String, String>> schedules = entrepreneurService.getSchedules(id);
        if (schedules.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/listingsInterests/{id}")
    public ResponseEntity<List<Map<String, String>>> getInterests(@PathVariable Integer id) {
        List<Map<String, String>> interests = entrepreneurService.getInterests(id);
        if (interests.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(interests);
    }

    @GetMapping("/completedListings/{id}")
    public ResponseEntity<List<Map<String, String>>> getCompletedListings(@PathVariable Integer id) {
        List<Map<String, String>> completedListings = entrepreneurService.getCompletedListings(id);
        if (completedListings.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(completedListings);
    }


}

