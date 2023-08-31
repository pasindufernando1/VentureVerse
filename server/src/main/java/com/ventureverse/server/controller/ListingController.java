package com.ventureverse.server.controller;

import com.ventureverse.server.model.entity.ListingDTO;
import com.ventureverse.server.model.entity.ListingSubscriptionDTO;
import com.ventureverse.server.model.normal.ListingRequestDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.ListingService;
import org.springframework.core.io.Resource;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static java.lang.System.exit;

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

    //Get the latest listing of the entrepreneur
    @GetMapping("/getLatestListing/{id}")
    public ResponseEntity<ListingDTO> getLatestListing(@PathVariable Integer id) {
        return ResponseEntity.ok(listingService.getLatestListing(id));
    }

    //Send the video relevent to the listing to the frontend using the listing id
    @GetMapping("/getVideo/{videoname}")
    public ResponseEntity<Resource> getVideo(@PathVariable String videoname) {
        // Project root directory
        String rootDirectory = System.getProperty("user.dir");
        // Load the video file from resources/static/uploads folder
        Resource videoResource = new ClassPathResource("/static/uploads/videos/" + videoname);
//        ClassPathResource videoResource = new ClassPathResource("C:\\Users\\Pasindu\\Desktop\\3rd year group project\\IMPLEMENTATION\\VentureVerse\\server\\src\\main\\resources\\static\\uploads\\videos\\video1693371839383_74twk.mp4");

        // Set content type based on video file type (e.g., "video/mp4")
        MediaType mediaType = MediaTypeFactory.getMediaType(videoResource).orElse(MediaType.APPLICATION_OCTET_STREAM);
        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(videoResource);
    }

    //Get the subscription
    @GetMapping("/getSubscription/{id}")
    public ResponseEntity<ListingSubscriptionDTO> getSubscriptionType(@PathVariable Integer id) {
        return ResponseEntity.ok(listingService.getSubscriptionType(id));
    }

}