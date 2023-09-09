package com.ventureverse.server.controller;

import com.ventureverse.server.model.entity.InvestorInterestedListingDTO;
import com.ventureverse.server.model.entity.ListingDTO;
import com.ventureverse.server.model.entity.ListingImagesDTO;
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
        System.out.println(videoResource);
        // Set content type based on video file type (e.g., "video/mp4")
        MediaType mediaType = MediaTypeFactory.getMediaType(videoResource).orElse(MediaType.APPLICATION_OCTET_STREAM);
        System.out.println(mediaType);
        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(videoResource);
    }

    //Function to get the images
    @GetMapping("/getListingImages/{id}")
    public ResponseEntity<List<byte[]>> getListingImages(@PathVariable Integer id) throws IOException {
        List<byte[]> images = new ArrayList<>();
        String rootDirectory = System.getProperty("user.dir");
        String imageUploadPath = rootDirectory + "/src/main/resources/static/uploads/images";

        //Get the listing object using the listing id
        ListingDTO listing = listingService.getListing(id);

        //Get the listing names related to the listing
        List<String> listingImages = listingService.getListingImages(listing);
        System.out.println((long) listingImages.size());

        //Add the images to send to the frontend
        for (String listingImage : listingImages) {
            Path imagePath = Paths.get(imageUploadPath, listingImage);
            images.add(Files.readAllBytes(imagePath));
        }
        System.out.println(images);

        //Get the images of the listing
//        for (int i = 1; i <= numberOfImages; i++) {
//            String imageName = listingImagesRepository.getListingImages(listing, i);
//            Path imagePath = Paths.get(imageUploadPath, imageName);
//            pdfs.add(Files.readAllBytes(imagePath));
//        }

        return ResponseEntity.ok().body(images);

//        Path bankStatementFilePath = Paths.get(imageUploadPath, bankStatementFileName);
//        Path policeReportFilePath = Paths.get(imageUploadPath, policeReportFileName);
//
//        pdfs.add(Files.readAllBytes(policeReportFilePath));
//        pdfs.add(Files.readAllBytes(bankStatementFilePath));

//        return ResponseEntity.ok().body(pdfs);
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