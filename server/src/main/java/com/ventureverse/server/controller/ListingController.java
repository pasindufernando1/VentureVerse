package com.ventureverse.server.controller;

import com.ventureverse.server.model.entity.InvestorInterestedListingDTO;
import com.ventureverse.server.model.entity.ListingDTO;
import com.ventureverse.server.model.entity.ListingSubscriptionDTO;
import com.ventureverse.server.model.normal.ListingRequestDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.EntrepreneurService;
import com.ventureverse.server.service.InvestorService;
import com.ventureverse.server.service.ListingService;
import org.springframework.core.io.Resource;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import static java.lang.System.exit;

@RestController
@RequestMapping("/api/entrepreneur")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;
    private final EntrepreneurService entrepreneurService;
    private final InvestorService investorService;

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

    @GetMapping("/finalizeListing/{id}")
    public ResponseEntity<InvestorInterestedListingDTO> finalizeListing(@PathVariable Integer id) {
        InvestorInterestedListingDTO finalizedListing = listingService.finalizeListing(id);
        if (finalizedListing == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(finalizedListing);
    }

    @GetMapping("/getpdf/{id}")
    public ResponseEntity<List<byte[]>> getpdf(@PathVariable Integer id) throws IOException {
        List<byte[]> pdfs = new ArrayList<>();
        String rootDirectory = System.getProperty("user.dir");
        String imageUploadPath = rootDirectory + "/src/main/resources/static/uploads/images";

        String entrepreneurdoc=entrepreneurService.getdoc(id);
        String investorDoc=investorService.getdoc(id);

        Path entrepreneurPath = Paths.get(imageUploadPath,entrepreneurdoc);
        Path investorPath = Paths.get(imageUploadPath,investorDoc);

        pdfs.add(Files.readAllBytes(entrepreneurPath));
        pdfs.add(Files.readAllBytes(investorPath));

        return ResponseEntity.ok().body(pdfs);
    }

    @PutMapping("/updateDate/{id}")
    public ResponseEntity<ResponseDTO> updateDate(
            @PathVariable("id") Integer id,
            @RequestBody InvestorInterestedListingDTO investorInterestedListingDTO
    ) {
        return ResponseEntity.ok(listingService.updateDate(id, investorInterestedListingDTO));
    }
}