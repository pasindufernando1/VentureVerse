package com.ventureverse.server.service;

import com.ventureverse.server.model.entity.ListingDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.ListingRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ListingService {

    public final ListingRepository listingRepository;

    public ResponseDTO addListing(HttpServletResponse response, ListingDTO listingDTO) {
        listingRepository.save(listingDTO);
        return GlobalService.response("Success","Listing added successfully");
    }
}
