package com.ventureverse.server.controller;

import com.ventureverse.server.model.normal.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/auth")
public class RegistrationDocController {


    @PostMapping("/upload")
    public ResponseEntity <ResponseDTO> uploadFile(
            @RequestParam("policeReport") MultipartFile policeReport,
            @RequestParam("bankStatement") MultipartFile bankStatement,
            @RequestParam("businessregdoc") MultipartFile businessRegistration
    ) {
        String rootDirectory = System.getProperty("user.dir");

        // Example paths for saving images and videos
        String imageUploadPath = rootDirectory + "/src/main/resources/static/uploads/images/regImages";
        System.out.println("imageUploadPath: " + imageUploadPath);

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
        System.out.println("imageUploadPath: " + imageUploadPath);

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

}