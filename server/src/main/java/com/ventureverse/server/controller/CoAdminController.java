package com.ventureverse.server.controller;
import com.ventureverse.server.model.entity.AdminDTO;
import com.ventureverse.server.service.CoAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coadmin")
@RequiredArgsConstructor
public class CoAdminController {

    private final CoAdminService coAdminService;

    @GetMapping("/view")
    public ResponseEntity<List<AdminDTO>> getAllCoAdmins() {
        List<AdminDTO> coAdmins = coAdminService.getAllCoAdmins();
        System.out.println(coAdmins);
        return ResponseEntity.ok(coAdmins);


    }
    @GetMapping("/update/view/{id}")
    public ResponseEntity<AdminDTO> getCoAdminDetails(@PathVariable Integer id) {
        AdminDTO findCoAdmin =  coAdminService.getDetails(id);
        if (findCoAdmin == null) {
            return ResponseEntity.notFound().build();
        }
        else {
            System.out.println(findCoAdmin);
            return ResponseEntity.ok(findCoAdmin);
        }


    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCoAdmin(@RequestBody AdminDTO updatedAdmin , @PathVariable Integer id) {
        AdminDTO updatedCoAdmin = coAdminService.updateCoAdmin(updatedAdmin, id);
        System.out.println(updatedCoAdmin);

        if (updatedCoAdmin != null) {
            return ResponseEntity.ok("Co-admin updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/ban/{id}")
    public ResponseEntity<String> banCoAdmin(@PathVariable Integer id) {
        AdminDTO updatedCoAdmin = coAdminService.banCoAdmin(id);
        System.out.println(updatedCoAdmin);

        if (updatedCoAdmin != null) {
            return ResponseEntity.ok("Co-admin banned successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }




}