package com.ventureverse.server.service;

import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.ListingImagesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FileUploadService {
    public final ListingImagesRepository listingImagesRepository;

    public ResponseDTO updateListingImages() {
        return ResponseDTO.builder()
                .status("success")
                .message("Listing images updated successfully")
                .build();
    }
}
