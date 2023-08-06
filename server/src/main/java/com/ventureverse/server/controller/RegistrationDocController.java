package com.ventureverse.server.controller;

import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.EntrepreneurService;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class RegistrationDocController {
    private final EntrepreneurService entrepreneurService;

    public RegistrationDocController(EntrepreneurService entrepreneurService) {
        this.entrepreneurService = entrepreneurService;
    }

    @PostMapping("/upload")
    public ResponseEntity <ResponseDTO> uploadFile(
            @RequestParam("policeReport") MultipartFile policeReport,
            @RequestParam("bankStatement") MultipartFile bankStatement,
            @RequestParam("businessregdoc") MultipartFile businessRegistration
    ) {
        String rootDirectory = System.getProperty("user.dir");

        // Example paths for saving images and videos
        String imageUploadPath = rootDirectory + "/src/main/resources/static/uploads/images/regImages";

        try {
            // Save images
            String policeReportFileName = policeReport.getOriginalFilename();
            Path policeReportFilePath = Paths.get(imageUploadPath, policeReportFileName);
            Files.write(policeReportFilePath, policeReport.getBytes());

            String bankStatementFileName = bankStatement.getOriginalFilename();
            Path bankStatementFilePath = Paths.get(imageUploadPath, bankStatementFileName);
            Files.write(bankStatementFilePath, bankStatement.getBytes());

            String businessRegistrationFileName = businessRegistration.getOriginalFilename();
            Path businessRegistrationFilePath = Paths.get(imageUploadPath, businessRegistrationFileName);
            Files.write(businessRegistrationFilePath, businessRegistration.getBytes());

            return ResponseEntity.ok(new ResponseDTO("Success", "Files uploaded successfully."));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO("Failure", "Error uploading files."));
        }
    }

    @PostMapping("/uploadenterprice")
    public ResponseEntity <ResponseDTO> uploadFileEnterprice(
            @RequestParam("bankStatement") MultipartFile bankStatement,
            @RequestParam("businessregdoc") MultipartFile businessRegistration
    ) {
        String rootDirectory = System.getProperty("user.dir");

        // Example paths for saving images and videos
        String imageUploadPath = rootDirectory + "/src/main/resources/static/uploads/images/regImages";
        System.out.println("imageUploadPath: " + imageUploadPath);

        try {
            // Save images
            String bankStatementFileName = bankStatement.getOriginalFilename();
            Path bankStatementFilePath = Paths.get(imageUploadPath, bankStatementFileName);
            Files.write(bankStatementFilePath, bankStatement.getBytes());

            String businessRegistrationFileName = businessRegistration.getOriginalFilename();
            Path businessRegistrationFilePath = Paths.get(imageUploadPath, businessRegistrationFileName);
            Files.write(businessRegistrationFilePath, businessRegistration.getBytes());

            return ResponseEntity.ok(new ResponseDTO("Success", "Files uploaded successfully."));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO("Failure", "Error uploading files."));
        }
    }

    @PostMapping("/uploadindividual")
    public ResponseEntity <ResponseDTO> uploadFileIndividual(
            @RequestParam("policeReport") MultipartFile policeReport,
            @RequestParam("bankStatement") MultipartFile bankStatement
    ) {
        String rootDirectory = System.getProperty("user.dir");

        // Example paths for saving images and videos
        String imageUploadPath = rootDirectory + "/src/main/resources/static/uploads/images/regImages";

        try {
            // Save images
            String policeReportFileName = policeReport.getOriginalFilename();
            Path policeReportFilePath = Paths.get(imageUploadPath, policeReportFileName);
            Files.write(policeReportFilePath, policeReport.getBytes());

            String bankStatementFileName = bankStatement.getOriginalFilename();
            Path bankStatementFilePath = Paths.get(imageUploadPath, bankStatementFileName);
            Files.write(bankStatementFilePath, bankStatement.getBytes());

            return ResponseEntity.ok(new ResponseDTO("Success", "Files uploaded successfully."));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO("Failure", "Error uploading files."));
        }
    }

    @GetMapping("/get-pdf/{id}")
    public ResponseEntity <List<UrlResource>> getPDF(@PathVariable Integer id) {
        List<UrlResource> urlResources = entrepreneurService.getPDF(id);
        for(UrlResource urlResource : urlResources) {
            System.out.println(urlResource);
        }
        if(urlResources == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }else{
            return ResponseEntity.ok(urlResources);
        }
    }
}