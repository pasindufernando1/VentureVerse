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
        return ResponseEntity.ok(demoService.findByComplains1());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<ComplainDTO>> getComplain() {
        List<ComplainDTO> pendingComplain = demoService.findByComplain(Complain.PENDING);
        if (pendingComplain.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pendingComplain);
    }

    @PutMapping ("/IgnoreComplain/{id}")
    public ResponseEntity<String> ignoreComplain(
            @PathVariable Integer id
    ) {
        ComplainDTO IgnoreComplain = demoService.checkComplains(id);

        if(IgnoreComplain !=null){
            return ResponseEntity.ok("Ignore complain done successfully");
        }
        else{
            return ResponseEntity.ok("Invalid Id");
        }
    }

    @PutMapping ("/ActionTaken/{id}")
    public ResponseEntity<String> acceptComplain(
            @RequestBody DetailsDTO complainRequest,
            @PathVariable Integer id
    ) {
 //       System.out.println(complainRequest);
     ComplainDTO IgnoreComplain = demoService.addComplain(id,complainRequest);
//
     if(IgnoreComplain !=null){
            return ResponseEntity.ok("  done successfully");
      }
       else{
         return ResponseEntity.ok("Invalid Id");
       }
    }








}

