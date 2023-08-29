package com.ventureverse.server.controller;

import com.ventureverse.server.enumeration.Complain;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.AdminDTO;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.model.normal.DetailsDTO;
import com.ventureverse.server.service.DemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class DemoController {

    private final DemoService demoService;

    @GetMapping("/details")
    public ResponseEntity<List<AdminDTO>> getDetails(
    ) {
        return ResponseEntity.ok(demoService.details());
    }


    @GetMapping("/pendingComplains")
    public ResponseEntity<List<ComplainDTO>> pendingComplains() {
//        List<ComplainDTO> pendingComplains = demoService.findByComplains();
//        if (pendingComplains.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }
        return ResponseEntity.ok(demoService.findByComplains());
    }


}

