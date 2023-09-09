package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.model.entity.InvestorInterestedListingDTO;
import com.ventureverse.server.model.entity.InvestorInterestedSectorDTO;
import com.ventureverse.server.model.entity.ListingDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.IndividualInvestorRepository;
import com.ventureverse.server.repository.IndustrySectorRepository;
import com.ventureverse.server.repository.InvestorInterestedSectorRepository;
import com.ventureverse.server.repository.Investor_InterestedListingRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InvestorService {
    private final IndividualInvestorRepository individualInvestorRepository;
    private final InvestorInterestedSectorRepository investorInterestedSectorRepository;
    private final Investor_InterestedListingRepository investor_interestedListingRepository;


    public InvestorService(IndividualInvestorRepository individualInvestorRepository, InvestorInterestedSectorRepository investorInterestedSectorRepository, IndustrySectorRepository industrySectorRepository, Investor_InterestedListingRepository investorInterestedListingRepository) {
        this.individualInvestorRepository = individualInvestorRepository;
        this.investorInterestedSectorRepository = investorInterestedSectorRepository;
        investor_interestedListingRepository = investorInterestedListingRepository;
    }

    public List<IndividualInvestorDTO> findByApprovalStatus(Status status) {
        return individualInvestorRepository.findByApprovalStatus(status);
    }

    public IndividualInvestorDTO findById(Integer id) {
        return individualInvestorRepository.findById(id).orElse(null);
    }

    public List<String> findInterestedSectors(Integer id) {
        List<InvestorInterestedSectorDTO> interestedSectors= investorInterestedSectorRepository.findByInvestorId(id);
        List<String> sectorNames = new ArrayList<>();
        for (InvestorInterestedSectorDTO interestedSector : interestedSectors) {
            sectorNames.add(interestedSector.getId().getSectorId().getName());
        }
        return sectorNames;
    }

    public IndividualInvestorDTO getInvestorById(int i) {
        return individualInvestorRepository.findById(i).orElse(null);
    }

    public List<InvestorInterestedListingDTO> getListings(Integer id) {
        return investor_interestedListingRepository.findByInvestorId(id);
    }


    public ResponseDTO updateListing(Integer Listingid, InvestorInterestedListingDTO investorInterestedListingDTO) {
        //make the listingid a type of listingDTO
        ListingDTO listingDTO = new ListingDTO();
        listingDTO.setListingId(Listingid);

        Optional<InvestorInterestedListingDTO> listing= investor_interestedListingRepository.findByListing(listingDTO);
        if (listing.isPresent()) {
            InvestorInterestedListingDTO oldListing = listing.get();
            oldListing.setAmountFinalized(investorInterestedListingDTO.getAmountFinalized());
            oldListing.setReturnEquityPercentage(investorInterestedListingDTO.getReturnEquityPercentage());
            oldListing.setReturnUnitProfitPercentage(investorInterestedListingDTO.getReturnUnitProfitPercentage());
            oldListing.setInvestorProofDocument(investorInterestedListingDTO.getInvestorProofDocument());
            oldListing.setStatus(investorInterestedListingDTO.getStatus());
            investor_interestedListingRepository.save(oldListing);
            return GlobalService.response("Success","Listing updated Successfully");
        } else {
            return GlobalService.response("Error","Listing not found");
        }
    }

    public String getdoc(Integer id) {
        return investor_interestedListingRepository.findByListingId(id).getInvestorProofDocument();
    }
}
