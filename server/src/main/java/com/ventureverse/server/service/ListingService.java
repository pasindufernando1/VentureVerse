package com.ventureverse.server.service;

import com.ventureverse.server.model.entity.ListingDTO;
import com.ventureverse.server.model.entity.ListingImagesDTO;
import com.ventureverse.server.model.entity.ListingIndustrySectorsDTO;
import com.ventureverse.server.model.entity.ListingSubscriptionDTO;
import com.ventureverse.server.model.normal.ListingRequestDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.*;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static java.lang.System.exit;

@Service
@RequiredArgsConstructor
public class ListingService {

    public final ListingRepository listingRepository;
    private final EntrepreneurRepository entrepreneurRepository;
    private final IndustrySectorRepository industrySectorRepository;
    private final ListingIndustrySectorsRepository listingIndustrySectorsRepository;
    private final ListingImagesRepository listingImagesRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final ListingSubscriptionRepository listingSubscriptionRepository;

    public ResponseDTO addListing(HttpServletResponse response, ListingRequestDTO listingRequestDTO) {
        var entrepreneur = entrepreneurRepository.findById(listingRequestDTO.getEntrepreneurId()).orElseThrow();
        var subscription = subscriptionRepository.findById(listingRequestDTO.getSubscriptionType()).orElseThrow();

        var list = ListingDTO.builder()
                .title(listingRequestDTO.getTitle())
                .description(listingRequestDTO.getDescription())
                .pitchingVideo(listingRequestDTO.getPitchingVideo())
                .intention(listingRequestDTO.getIntention())
                .businessStartDate(listingRequestDTO.getBusinessStartDate())
                .businessDuration(listingRequestDTO.getBusinessDuration())
                .lifetimeSales(listingRequestDTO.getLifetimeSales())
                .lastYearGrossIncome(listingRequestDTO.getLastYearGrossIncome())
                .lastYearNetIncome(listingRequestDTO.getLastYearNetIncome())
                .salesProjectionThisYear(listingRequestDTO.getSalesProjectionThisYear())
                .salesProjectionNextYear(listingRequestDTO.getSalesProjectionNextYear())
                .projectionMethod(listingRequestDTO.getProjectionMethod())
                .outsideSources(listingRequestDTO.getOutsideSources())
                .outsideSourceDescription(listingRequestDTO.getOutsideSourceDescription())
                .attemptsToGrow(listingRequestDTO.getAttemptsToGrow())
                .awards(listingRequestDTO.getAwards())
                .uniqueSellingProposition(listingRequestDTO.getUniqueSellingProposition())
                .stage(listingRequestDTO.getStage())
                .expectedAmount(listingRequestDTO.getExpectedAmount())
                .returnUnitProfitPercentage(listingRequestDTO.getReturnUnitProfitPercentage())
                .returnEquityPercentage(listingRequestDTO.getReturnEquityPercentage())
                .subscriptionType(subscription)
                .publishedDate(listingRequestDTO.getPublishedDate())
                .status(listingRequestDTO.getStatus())
                .entrepreneurId(entrepreneur)
                .build();
        listingRepository.save(list);

        //Get the listing id inserted to the listing table by the above code
        var listingId = listingRepository.findLastInsertedListing();


        var listingSectors = listingRequestDTO.getSectorId();
        for (Integer sectorId : listingSectors) {
            var sector = industrySectorRepository.findById(sectorId).orElseThrow();
            var listingSectorObject = ListingIndustrySectorsDTO.builder()
                    .id(new ListingIndustrySectorsDTO.CompositeKey(listingId, sector))
                    .build();
            listingIndustrySectorsRepository.save(listingSectorObject);
        }

        //Update the listing images table
        var listingImages = listingRequestDTO.getImages();
        for (String image : listingImages) {
            listingImagesRepository.save(ListingImagesDTO.builder()
                    .id(new ListingImagesDTO.CompositeKey(listingId, image))
                    .build());
        }
        return GlobalService.response("Success","Listing added successfully");
    }

    //Function to get the listing details by id
    public ListingDTO getListing(int id) {
        return listingRepository.findById(id).orElseThrow();
    }

    //Function to get the subscriptiontype of a listing
    public ListingSubscriptionDTO getSubscriptionType(int id) {
        //Get the listigDTO object
        var listing = listingRepository.findById(id).orElseThrow();
        return listingSubscriptionRepository.findByListingId(listing).orElseThrow();
    }
}
