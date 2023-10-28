package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.*;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InvestorService {
    private final IndividualInvestorRepository individualInvestorRepository;
    private final InvestorInterestedSectorRepository investorInterestedSectorRepository;
    private final Investor_InterestedListingRepository investor_interestedListingRepository;
    private final CounterProposalRepository counterProposalRepository;


    public InvestorService(IndividualInvestorRepository individualInvestorRepository, InvestorInterestedSectorRepository investorInterestedSectorRepository, IndustrySectorRepository industrySectorRepository, Investor_InterestedListingRepository investorInterestedListingRepository, CounterProposalRepository counterProposalRepository) {
        this.individualInvestorRepository = individualInvestorRepository;
        this.investorInterestedSectorRepository = investorInterestedSectorRepository;
        this.investor_interestedListingRepository = investorInterestedListingRepository;
        this.counterProposalRepository = counterProposalRepository;
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


    public ResponseDTO updateListing(List<Integer> id, InvestorInterestedListingDTO investorInterestedListingDTO) {
        //make the listingid a type of listingDTO
        var Listingid= id.get(0);
        var investorId= id.get(1);
        ListingDTO listingDTO = new ListingDTO();
        listingDTO.setListingId(Listingid);

        InvestorDTO investorDTO = new InvestorDTO();
        investorDTO.setId(investorId);

        Optional<InvestorInterestedListingDTO> listing= investor_interestedListingRepository.findByListingInvestor(listingDTO,investorId);
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
            Optional<CounterProposalDTO> counterProposal= counterProposalRepository.findByListingInvestorId(Listingid,investorId);
            if(counterProposal.isPresent()){
                InvestorInterestedListingDTO newListing = new InvestorInterestedListingDTO();
                newListing.setId(new InvestorInterestedListingDTO.CompositeKey(investorDTO, listingDTO));
                newListing.setAmountFinalized(investorInterestedListingDTO.getAmountFinalized());
                newListing.setReturnEquityPercentage(investorInterestedListingDTO.getReturnEquityPercentage());
                newListing.setReturnUnitProfitPercentage(investorInterestedListingDTO.getReturnUnitProfitPercentage());
                newListing.setInvestorProofDocument(investorInterestedListingDTO.getInvestorProofDocument());
                newListing.setStatus(investorInterestedListingDTO.getStatus());
                newListing.setInterestedDate(counterProposal.get().getDate());
                investor_interestedListingRepository.save(newListing);
                //delete the counter proposal
                counterProposalRepository.delete(counterProposal.get());
                return GlobalService.response("Success","Listing updated Successfully");
            }else{
                return GlobalService.response("Error","Listing not found");
            }
        }
    }

    public String getdoc(Integer id) {
        return investor_interestedListingRepository.findByListingId(id).getInvestorProofDocument();
    }

    public List<CounterProposalDTO> getCounters(Integer id) {
        return counterProposalRepository.findByInvestorId(id);
    }
}
