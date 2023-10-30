package com.ventureverse.server.service;

import com.ventureverse.server.model.entity.*;
import com.ventureverse.server.model.normal.ListingRequestDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.*;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.LogManager;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
    private final Investor_InterestedListingRepository investor_interestedListingRepository;
    private final CounterProposalRepository counterProposalRepository;

    public ResponseDTO addListing(HttpServletResponse response, ListingRequestDTO listingRequestDTO) {
        var entrepreneur = entrepreneurRepository.findById(listingRequestDTO.getEntrepreneurId()).orElseThrow();
        var subscription = subscriptionRepository.findById(listingRequestDTO.getSubscriptionType()).orElseThrow();

        var list = ListingDTO.builder()
                .title(listingRequestDTO.getTitle())
                .description(listingRequestDTO.getDescription())
                .thumbnail(listingRequestDTO.getThumbnail())
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

    //Function to get the latest listing of an entrepreneur
    public ListingDTO getLatestListing(int id) {
        //Get the entrepreneur object
        var entrepreneur = entrepreneurRepository.findById(id).orElseThrow();

        //Get the latest listing of the entrepreneur
        var listing = listingRepository.findLatestListing(entrepreneur);
        if (listing == null) {
            exit(0);
        }
        return listing;
    }

    //Function to get the listing from the listing id
    public ListingDTO getListingFromListingId(int id) {
        return listingRepository.findById(id).orElseThrow();
    }

    //Function to get the listing video
    public String getVideo(int id) {
        //Get the listing object
        var listing = listingRepository.findById(id).orElseThrow();
        return listing.getPitchingVideo();
    }

    public InvestorInterestedListingDTO finalizeListing(Integer id) {
        return investor_interestedListingRepository.findByListingId(id);
    }

    public ResponseDTO updateDate(Integer id,InvestorInterestedListingDTO i) {
        ListingDTO listingDTO = new ListingDTO();
        listingDTO.setListingId(id);

        Optional<InvestorInterestedListingDTO> listing= investor_interestedListingRepository.findByListing(listingDTO);
        if (listing.isPresent()) {
            InvestorInterestedListingDTO oldListing = listing.get();
            oldListing.setFinalizedDate(i.getFinalizedDate());
            investor_interestedListingRepository.save(oldListing);
            return GlobalService.response("Success","Listing updated successfully");
        } else {
            return GlobalService.response("Error","Listing not found");
        }
    }

    public List<String> getListingImages(ListingDTO i) {
        return listingImagesRepository.getListingImages(i);
    }

    public List<ListingDTO> getAllListings() {
        var basicDetails = listingRepository.findAll();
        //Print the list of listingDTO objects nicely
//        for (ListingDTO listing : basicDetails) {
//            System.out.println(listing);
//        }
//        //Get the industry sectors of each listing and append to the listingDTO object
//        for (ListingDTO listing : basicDetails) {
//            //Get the listing DTO object related to the listing id
//            var listingSectors = listingIndustrySectorsRepository.findByListingId(listing);
//            //Get the list of sector names
//            var sectorNames = new ArrayList<String>();
//            for (ListingIndustrySectorsDTO listingSector : listingSectors) {
//                sectorNames.add(listingSector.getId().getSectorId().getName());
//            }
//            //Append the sector names to the listingDTO object as a list
//            listing.setSectorNames(sectorNames);
//        }

        return basicDetails;
    }

    public ResponseDTO addInterestedListing(List<Integer> listingIds) {
        var listingid= listingIds.get(0);
        var investorid= listingIds.get(1);
        var returnEquityPercentage= listingIds.get(2);
        var returnUnitProfitPercentage= listingIds.get(3);

        ListingDTO listingDTO = new ListingDTO();
        listingDTO.setListingId(listingid);

        InvestorDTO investorDTO = new InvestorDTO();
        investorDTO.setId(investorid);

        Date date = new Date();

        InvestorInterestedListingDTO investorInterestedListingDTO = new InvestorInterestedListingDTO();
        investorInterestedListingDTO.setId(new InvestorInterestedListingDTO.CompositeKey(investorDTO, listingDTO));
        investorInterestedListingDTO.setInterestedDate(date);
        investorInterestedListingDTO.setStatus("PENDING");
        investorInterestedListingDTO.setReturnEquityPercentage(returnEquityPercentage);
        investorInterestedListingDTO.setReturnUnitProfitPercentage(returnUnitProfitPercentage);

        investor_interestedListingRepository.save(investorInterestedListingDTO);

        if(investor_interestedListingRepository.findByListingId(listingid)!=null){
            return GlobalService.response("Success","Interested listing added successfully");
        }
        else {
            return GlobalService.response("Error", "Interested listing not added");
        }
    }

    public ResponseDTO counterProposal(CounterProposalDTO counterProposalDTO) {
        ListingDTO listingDTO = counterProposalDTO.getListingId();
        EntrepreneurDTO EntrepreneurDTO = listingRepository.getEntrepreneur(listingDTO.getListingId());
        Date date = new Date();

        CounterProposalDTO counterProposalDTO1 = new CounterProposalDTO();
        counterProposalDTO1.setListingId(listingDTO);
        counterProposalDTO1.setEntrepreneurId(EntrepreneurDTO);
        counterProposalDTO1.setInvestorId(counterProposalDTO.getInvestorId());
        counterProposalDTO1.setDate(date);
        counterProposalDTO1.setReturnEquityPercentage(counterProposalDTO.getReturnEquityPercentage());
        counterProposalDTO1.setReturnUnitProfitPercentage(counterProposalDTO.getReturnUnitProfitPercentage());
        counterProposalDTO1.setAmount(counterProposalDTO.getAmount());

        counterProposalRepository.save(counterProposalDTO1);

        return GlobalService.response("Success","Counter proposal added successfully");
    }


    public List<String> getListingSectors(ListingDTO listing) {
        return listingIndustrySectorsRepository.getListingSectors(listing);
    }

    //Function to get the finalized investment amount of a listing
    public Integer getCompletedInvestment(ListingDTO listing) {
        return investor_interestedListingRepository.getCompletedInvestment(listing);
    }

    public List<ListingDTO> getAllFinalizedListings() {
        return listingRepository.getAllFinalizedListings();
    }

    public List<InvestorInterestedListingDTO> getInterestedInvestors(ListingDTO listing) {
        return investor_interestedListingRepository.getInterestedInvestors(listing);
    }
}