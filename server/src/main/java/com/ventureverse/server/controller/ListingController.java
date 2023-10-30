package com.ventureverse.server.controller;

import com.ventureverse.server.model.entity.*;
import com.ventureverse.server.model.normal.ListingRequestDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.EntrepreneurService;
import com.ventureverse.server.service.InvestorService;
import com.ventureverse.server.service.ListingService;
import org.springframework.core.io.Resource;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
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

    //Get the listing from the listing id
    @GetMapping("/getListingFromListingId/{id}")
    public ResponseEntity<ListingDTO> getListingFromListingId(@PathVariable Integer id) {
        System.out.println(id);
        return ResponseEntity.ok(listingService.getListingFromListingId(id));
    }

    //Get all the listings available in the database with the status "published"
    @GetMapping("/getAllListings")
    public ResponseEntity<List<ListingDTO>> getAllListings() {
        List<ListingDTO> listings=listingService.getAllListings();
        List<ListingDTO> activeListings=new ArrayList<>();

        //Remove listing where status!=Active
        for (int i = 0; i < listings.size(); i++) {
            if(listings.get(i).getStatus().equals("Active")) {
                activeListings.add(listings.get(i));
            }
        }

        for(int i=0;i<activeListings.size();i++){
            int days=activeListings.get(i).getSubscriptionType().getDays();
            Date startDate=activeListings.get(i).getPublishedDate();

            //Get the current date
            Date currentDate=new Date();

            //get the number of days passed since the listing was published
            long diff = currentDate.getTime() - startDate.getTime();
            long diffDays = diff / (24 * 60 * 60 * 1000);

            //If the number of days passed is greater than the number of days in the subscription type, change the status to "Expired"
            if(diffDays>days) {
                activeListings.get(i).setStatus("Expired");
                listingService.updateListing(activeListings.get(i));
            }else{
                activeListings.get(i).setStatus("Active");
                listingService.updateListing(activeListings.get(i));
            }
        }
        List<ListingDTO> newlistings=listingService.getAllListings();
        List<ListingDTO> newactiveListings=new ArrayList<>();

        //Remove listing where status!=Active
        for (int i = 0; i < listings.size(); i++) {
            if(newlistings.get(i).getStatus().equals("Active")) {
                newactiveListings.add(listings.get(i));
            }
        }
        return ResponseEntity.ok(newactiveListings);
    }

    //Send the video relevent to the listing to the frontend using the listing id
    @GetMapping("/getVideo/{videoname}")
    public ResponseEntity<Resource> getVideo(@PathVariable String videoname) {
        System.out.println(videoname);
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

    //Get the videos of all the videonames in the path variable
    @GetMapping("/getVideos")
    public ResponseEntity<List<Resource>> getVideos(@RequestParam List<String> videonames) {
        // Initialize a list to store video resources
        List<Resource> videoResources = new ArrayList<>();

        // Project root directory
        String rootDirectory = System.getProperty("user.dir");

        // Loop through the list of video names and load each video resource
        for (String videoname : videonames) {
            // Construct the path to each video file
            String videoPath = "/static/uploads/videos/" + videoname;

            // Create a Resource object for the current video
            Resource videoResource = new ClassPathResource(videoPath);

            // Set content type based on video file type (e.g., "video/mp4")
            MediaType mediaType = MediaTypeFactory.getMediaType(videoResource).orElse(MediaType.APPLICATION_OCTET_STREAM);

            // Add the video resource to the list
            videoResources.add(videoResource);
        }

        // Set the content type for the response (you can choose to set it based on the first video's type or another logic)
        MediaType mediaType = MediaTypeFactory.getMediaType(videoResources.get(0)).orElse(MediaType.APPLICATION_OCTET_STREAM);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);

        // Return a ResponseEntity containing the list of video resources
        return ResponseEntity.ok()
                .headers(headers)
                .body(videoResources);
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
        return ResponseEntity.ok().body(images);
    }

    //Function to get the thumbnail by the thumbnail name
    @GetMapping("/getThumbnail/{thumbnailname}")
    public ResponseEntity<List<byte[]>> getThumbnail(@PathVariable String thumbnailname) throws IOException {
        List<byte[]> images = new ArrayList<>();
        String rootDirectory = System.getProperty("user.dir");
        String imageUploadPath = rootDirectory + "/src/main/resources/static/uploads/images/thumbnails";

        Path imagePath = Paths.get(imageUploadPath, thumbnailname);
        images.add(Files.readAllBytes(imagePath));

        return ResponseEntity.ok().body(images);
    }

    //Function to return an array of thumbnails by the thumbnail names(Thumbnail names are passed as an array
    @GetMapping("/getThumbnails/{thumbnailnames}")
    public ResponseEntity<List<byte[]>> getThumbnails(@PathVariable List<String> thumbnailnames) throws IOException {
        System.out.println(thumbnailnames);
        List<byte[]> images = new ArrayList<>();
        String rootDirectory = System.getProperty("user.dir");
        String imageUploadPath = rootDirectory + "/src/main/resources/static/uploads/images/thumbnails";

        for (String thumbnailname : thumbnailnames) {
            Path imagePath = Paths.get(imageUploadPath, thumbnailname);
            images.add(Files.readAllBytes(imagePath));
        }

        return ResponseEntity.ok().body(images);
    }

    //Get the subscription
    @GetMapping("/getSubscription/{id}")
    public ResponseEntity<ListingSubscriptionDTO> getSubscriptionType(@PathVariable Integer id) {
        return ResponseEntity.ok(listingService.getSubscriptionType(id));
    }

    @GetMapping("/finalizeListing/{id}")
    public ResponseEntity<List<InvestorInterestedListingDTO>> finalizeListings(@PathVariable Integer id) {
        List<InvestorInterestedListingDTO> finalizedListings = listingService.finalizeListings(id);
        if (finalizedListings == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(finalizedListings);
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

    @GetMapping("/admingetPdf/{doc}")
    public ResponseEntity<List<byte[]>> admingetpdf(@PathVariable List<String> doc) throws IOException {
        List<byte[]> pdfs = new ArrayList<>();
        for ( String name: doc){
            String rootDirectory = System.getProperty("user.dir");
            String imageUploadPath = rootDirectory + "/src/main/resources/static/uploads/images";

            Path entrepreneurPath = Paths.get(imageUploadPath,name);
            pdfs.add(Files.readAllBytes(entrepreneurPath));
        }
        System.out.println("kkkkk");
        return ResponseEntity.ok().body(pdfs);
    }

    @PutMapping("/updateDate/{id}")
    public ResponseEntity<ResponseDTO> updateDate(
            @PathVariable("id") Integer id,
            @RequestBody InvestorInterestedListingDTO investorInterestedListingDTO
    ) {
        return ResponseEntity.ok(listingService.updateDate(id, investorInterestedListingDTO));
    }

    @PostMapping("/addInterestedListing")
    public ResponseEntity<ResponseDTO> addInterestedListing(@RequestBody List<Integer> listingIds) {
        System.out.println(listingIds);
        return ResponseEntity.ok(listingService.addInterestedListing(listingIds));
    }

    @PostMapping("/counterProposal")
    public ResponseEntity<ResponseDTO> counterProposal(@RequestBody CounterProposalDTO counterProposalDTO) {
        return ResponseEntity.ok(listingService.counterProposal(counterProposalDTO));
    }

}