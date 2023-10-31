package com.ventureverse.server.controller;

import com.ventureverse.server.model.entity.ListingDTO;
import com.ventureverse.server.model.entity.ListingSubscriptionDTO;
import com.ventureverse.server.model.normal.ListingRequestDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.ListingService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/entrepreneur")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;

    @PostMapping("/addListing")
    public ResponseEntity<ResponseDTO> addListing(
            HttpServletResponse response,
            @RequestBody ListingRequestDTO listingRequestDTO
    ) {
        System.out.println(listingRequestDTO);
        return ResponseEntity.ok(listingService.addListing(response, listingRequestDTO));
    }

    //Get listing by id
    @GetMapping("/getListing/{id}")
    public ResponseEntity<ListingDTO> getListing(@PathVariable Integer id) {
        return ResponseEntity.ok(listingService.getListing(id));
    }

    //Get the subscription
    @GetMapping("/getSubscription/{id}")
    public ResponseEntity<ListingSubscriptionDTO> getSubscriptionType(@PathVariable Integer id) {
        return ResponseEntity.ok(listingService.getSubscriptionType(id));
    }

    @GetMapping("/userGains")
    public ResponseEntity<List<Map<String, String>>> getUserGains() {
        List<Map<String, String>> users = listingService.getUserGains();
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping("/getalllistings")
    public ResponseEntity<List<Map<String, String>>> getAllListings() {
        List<Map<String, String>> users = listingService.getAllListings();
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(users);
    }

}