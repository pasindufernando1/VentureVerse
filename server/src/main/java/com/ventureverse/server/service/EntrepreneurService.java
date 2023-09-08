package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.entity.InvestorInterestedListingDTO;
import com.ventureverse.server.model.entity.ListingDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.ComplainRepository;
import com.ventureverse.server.repository.EntrepreneurRepository;
import com.ventureverse.server.repository.Investor_InterestedListingRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntrepreneurService {

    private final EntrepreneurRepository entrepreneurRepository;
    private final ComplainRepository complainRepository;
    private final Investor_InterestedListingRepository investor_interestedListingRepository;

    public EntrepreneurService(EntrepreneurRepository entrepreneurRepository, ComplainRepository complainRepository, Investor_InterestedListingRepository investorInterestedListingRepository) {
        this.entrepreneurRepository = entrepreneurRepository;
        this.complainRepository = complainRepository;
        this.investor_interestedListingRepository = investorInterestedListingRepository;
    }

    public List<EntrepreneurDTO> findByApprovalStatus(Status status) {
        return entrepreneurRepository.findByApprovalStatus(status);
    }

    public EntrepreneurDTO findById(Integer id) {
        return entrepreneurRepository.findById(id).orElse(null);
    }

    public EntrepreneurDTO getEntrepreneurById(Integer id) {
        return entrepreneurRepository.findById(id).orElse(null);
    }


    public ResponseDTO addComplain(HttpServletResponse response, ComplainDTO complainDTO) {
        var complain = ComplainDTO.builder()
                .description(complainDTO.getDescription())
                .date(complainDTO.getDate())
                .userId(complainDTO.getUserId())
                .build();

        complainRepository.save(complain);
        return GlobalService.response("Success", "Complain added successfully");
    }

    public InvestorInterestedListingDTO finalizeListings(Integer id) {
        return investor_interestedListingRepository.findByListingId(id);
    }

    public ResponseDTO updateListing(Integer Listingid, InvestorInterestedListingDTO investorInterestedListingDTO) {
        ListingDTO listingDTO = new ListingDTO();
        listingDTO.setListingId(Listingid);

        Optional<InvestorInterestedListingDTO> listing= investor_interestedListingRepository.findByListing(listingDTO);
        if (listing.isPresent()) {
            InvestorInterestedListingDTO oldListing = listing.get();
            oldListing.setEntrepreneurProofDocument(investorInterestedListingDTO.getEntrepreneurProofDocument());
            investor_interestedListingRepository.save(oldListing);
            return GlobalService.response("Success","Listing updated Successfully");
        }else{
            return GlobalService.response("Failed","Listing not found");
        }
    }

    public String getdoc(Integer id) {
        return investor_interestedListingRepository.findByListingId(id).getEntrepreneurProofDocument();
    }
}
