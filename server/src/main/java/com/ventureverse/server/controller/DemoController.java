package com.ventureverse.server.controller;

import com.ventureverse.server.enumeration.Complain;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.AdminDTO;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.model.normal.DetailsDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.DemoService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.ok(demoService.findByComplains());
    }

    @GetMapping("/IgnoreComplain/{id}")
    public ResponseEntity<ResponseDTO> ignoreComplain(@PathVariable Integer id) {
        return ResponseEntity.ok(demoService.checkDetails(id));
    }

    @GetMapping("/Actiontaken")
    public ResponseEntity<ResponseDTO> addComplaint(
            @PathVariable Integer id,
            @RequestBody ComplainDTO complainDTO,
            HttpServletResponse response
    ) {
        var message = "ow meka sirawatama gon";
        System.out.println(complainDTO);
        return ResponseEntity.ok(demoService.addComplain(id,message));

    }








}

