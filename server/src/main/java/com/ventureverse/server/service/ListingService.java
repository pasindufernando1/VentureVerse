package com.ventureverse.server.service;

import com.ventureverse.server.model.entity.ListingDTO;
import com.ventureverse.server.model.entity.ListingIndustrySectorsDTO;
import com.ventureverse.server.model.normal.ListingRequestDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.EntrepreneurRepository;
import com.ventureverse.server.repository.IndustrySectorRepository;
import com.ventureverse.server.repository.ListingIndustrySectorsRepository;
import com.ventureverse.server.repository.ListingRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ListingService {

    public final ListingRepository listingRepository;
    private final EntrepreneurRepository entrepreneurRepository;
    private final IndustrySectorRepository industrySectorRepository;
    private final ListingIndustrySectorsRepository listingIndustrySectorsRepository;

    public ResponseDTO addListing(HttpServletResponse response, ListingRequestDTO listingRequestDTO) {
        var entrepreneur = entrepreneurRepository.findById(listingRequestDTO.getEntrepreneurId()).orElseThrow();

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
                .subscriptionType(listingRequestDTO.getSubscriptionType())
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




        return GlobalService.response("Success","Listing added successfully");
    }
}
