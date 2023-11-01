package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.*;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.*;
import com.ventureverse.server.model.entity.EnterpriseInvestorDTO;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.model.entity.InvestorInterestedSectorDTO;
import com.ventureverse.server.repository.EnterpriseInvestorRepository;
import com.ventureverse.server.repository.IndividualInvestorRepository;
import com.ventureverse.server.repository.IndustrySectorRepository;
import com.ventureverse.server.repository.InvestorInterestedSectorRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class InvestorService {
    private final IndividualInvestorRepository individualInvestorRepository;

    private final InvestorInterestedSectorRepository investorInterestedSectorRepository;
    private final Investor_InterestedListingRepository investor_interestedListingRepository;
    private final CounterProposalRepository counterProposalRepository;
    private final UserRepository userRepository;

    private final EnterpriseInvestorRepository enterpriseInvestorRepository;

    public InvestorService(IndividualInvestorRepository individualInvestorRepository, InvestorInterestedSectorRepository investorInterestedSectorRepository, IndustrySectorRepository industrySectorRepository, Investor_InterestedListingRepository investorInterestedListingRepository, CounterProposalRepository counterProposalRepository, UserRepository userRepository, EnterpriseInvestorRepository enterpriseInvestorRepository) {
        this.individualInvestorRepository = individualInvestorRepository;
        this.investorInterestedSectorRepository = investorInterestedSectorRepository;
        this.investor_interestedListingRepository = investorInterestedListingRepository;
        this.counterProposalRepository = counterProposalRepository;
        this.userRepository = userRepository;
        this.enterpriseInvestorRepository = enterpriseInvestorRepository;
    }




    public IndividualInvestorDTO updateIndividualInvestor(IndividualInvestorDTO updatedInvestor, Integer id) {
        Integer individualInvestorId = updatedInvestor.getId();

        Optional<IndividualInvestorDTO> existingIndividualInvestoroptional = individualInvestorRepository.findById(id);

        if (existingIndividualInvestoroptional.isPresent()) {
            IndividualInvestorDTO existingIndividualInvestor = existingIndividualInvestoroptional.get();
            // Update the existing individual investor fields with the values from updatedAdmin
            existingIndividualInvestor.setFirstname(updatedInvestor.getFirstname());
            existingIndividualInvestor.setLastname(updatedInvestor.getLastname());
            existingIndividualInvestor.setFirstLineAddress(updatedInvestor.getFirstLineAddress());
            existingIndividualInvestor.setSecondLineAddress(updatedInvestor.getSecondLineAddress());
            existingIndividualInvestor.setTown(updatedInvestor.getTown());
            existingIndividualInvestor.setDistrict(updatedInvestor.getDistrict());
            existingIndividualInvestor.setContactNumber(updatedInvestor.getContactNumber());
            //save to backend
            return individualInvestorRepository.save(existingIndividualInvestor);
        }else{
            //return the existing individual investor
            return individualInvestorRepository.save(updatedInvestor);
        }
    }

    public List<IndividualInvestorDTO> findByApprovalStatus(Status status) {
        return individualInvestorRepository.findByApprovalStatus(status);
    }

    public IndividualInvestorDTO findById(Integer id) {
        return individualInvestorRepository.findById(id).orElse(null);
    }

    public List<String> findInterestedSectors(Integer id) {
        List<InvestorInterestedSectorDTO> interestedSectors = investorInterestedSectorRepository.findByInvestorId(id);
        List<String> sectorNames = new ArrayList<>();
        for (InvestorInterestedSectorDTO interestedSector : interestedSectors) {
            sectorNames.add(interestedSector.getId().getSectorId().getName());
        }
        return sectorNames;
    }

    public List<Integer> findInterestedSectorsId(Integer id) {
        List<InvestorInterestedSectorDTO> interestedSectors= investorInterestedSectorRepository.findByInvestorId(id);
        List<Integer> sectorIds = new ArrayList<>();
        for (InvestorInterestedSectorDTO interestedSector : interestedSectors) {
            sectorIds.add(interestedSector.getId().getSectorId().getSectorId());
        }
        return sectorIds;
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
    
    public List<Map<String, String>> getInterestedListings(Integer id) {
        List<InvestorInterestedListingDTO> listings=investor_interestedListingRepository.findPendingListings(id);
        List<CounterProposalDTO> proposals=counterProposalRepository.findAll();
        List<InvestorInterestedListingDTO> completedListings=investor_interestedListingRepository.findByInvestorId(id);

        //take completed listing ids to a list
        List<Integer> completedListingIds = new ArrayList<>();
        for(InvestorInterestedListingDTO completedListing : completedListings){
            completedListingIds.add(completedListing.getId().getListingId().getListingId());
        }

        List<Map<String, String>> userMap = new ArrayList<>();
        for(InvestorInterestedListingDTO listing:listings) {
            float equity=0;
            float profit=0;
            if(listing.getReturnEquityPercentage()!=null){
                equity=listing.getReturnEquityPercentage();
            }
            if(listing.getReturnUnitProfitPercentage()!=null){
                profit=listing.getReturnUnitProfitPercentage();
            }
            Map<String, String> user = Map.of(
                    "Entrepreneur", listing.getId().getListingId().getEntrepreneurId().getFirstname()+" "+listing.getId().getListingId().getEntrepreneurId().getLastname(),
                    "id",listing.getId().getListingId().getEntrepreneurId().getId().toString(),
                    "amount", listing.getId().getListingId().getExpectedAmount().toString(),
                    "type","Interested",
                    "equity",String.valueOf(equity),
                    "profit",String.valueOf(profit),
                    "date",listing.getInterestedDate().toString()
            );
            userMap.add(user);
        }
        for(CounterProposalDTO proposal:proposals) {
            if(!completedListingIds.contains(proposal.getListingId().getListingId())){
                float equity=0;
                float profit=0;
                if(proposal.getReturnEquityPercentage()!=null){
                    equity=proposal.getReturnEquityPercentage();
                }
                if(proposal.getReturnUnitProfitPercentage()!=null){
                    profit=proposal.getReturnUnitProfitPercentage();
                }
                Map<String, String> user = Map.of(
                        "Entrepreneur", proposal.getEntrepreneurId().getFirstname() + " " + proposal.getEntrepreneurId().getLastname(),
                        "id", proposal.getEntrepreneurId().getId().toString(),
                        "amount", proposal.getAmount().toString(),
                        "type", "Counter",
                        "equity", String.valueOf(equity),
                        "profit", String.valueOf(profit),
                        "date", proposal.getDate().toString()
                );
                userMap.add(user);
            }
        }
        return userMap;
    }
    
    public List<IndividualInvestorDTO> getAllIndividualInvestors() {
        return individualInvestorRepository.findByRole(Role.INDIVIDUAL_INVESTOR);
    }

    public List<EnterpriseInvestorDTO> getAllEnterpriseInvestors() {
        return enterpriseInvestorRepository.findByRole(Role.ENTERPRISE_INVESTOR);
    }

    public IndividualInvestorDTO getIndividualInvestorById(Integer id) {
        return individualInvestorRepository.findById(id).orElse(null);
    }

    //Individual Investor Update
//    public IndividualInvestorDTO updateIndividualInvestor(IndividualInvestorDTO updatedIndividualInvestor, Integer id) {
//        Optional<IndividualInvestorDTO> existingIndividualInvestorOptional = individualInvestorRepository.findById(id);
//
//        IndividualInvestorDTO existingIndividualInvestor = individualInvestorRepository.findById(id).orElse(null);
//
//        if (existingIndividualInvestor != null) {
//            existingIndividualInvestor.setFirstname(updatedIndividualInvestor.getFirstname());
//            existingIndividualInvestor.setLastname(updatedIndividualInvestor.getLastname());
//            existingIndividualInvestor.setEmail(updatedIndividualInvestor.getEmail());
//            existingIndividualInvestor.setNic(updatedIndividualInvestor.getNic());
//            existingIndividualInvestor.setContactNumber(updatedIndividualInvestor.getContactNumber());
//
//        }
//        if (existingIndividualInvestor != null) {
//            return individualInvestorRepository.save(existingIndividualInvestor);
//        } else {
//            return null;
//        }
//    }


    public EnterpriseInvestorDTO getEnterpriseInvestorById(Integer id) {
        return enterpriseInvestorRepository.findById(id).orElse(null);
    }

    public EnterpriseInvestorDTO updateEnterpriseInvestor(EnterpriseInvestorDTO updatedEnterpriseInvestor, Integer id) {
        Optional<EnterpriseInvestorDTO> existingEnterpriseInvestorOptional = enterpriseInvestorRepository.findById(id);

        EnterpriseInvestorDTO existingEnterpriseInvestor = enterpriseInvestorRepository.findById(id).orElse(null);

        if (existingEnterpriseInvestor != null) {
            existingEnterpriseInvestor.setEmail(updatedEnterpriseInvestor.getEmail());
            existingEnterpriseInvestor.setContactNumber(updatedEnterpriseInvestor.getContactNumber());
            existingEnterpriseInvestor.setBusinessName(updatedEnterpriseInvestor.getBusinessName());

        }
        if(existingEnterpriseInvestor != null) {
            return enterpriseInvestorRepository.save(existingEnterpriseInvestor);
        }
        else{
            return null;
        }
    }

    public String getadmindoc(Integer investorId, Integer listingId) {
        return investor_interestedListingRepository.findByListingInvestorId(listingId,investorId);
    }
    public IndividualInvestorDTO save(IndividualInvestorDTO investor) {
        return individualInvestorRepository.save(investor);
    }

   public long countIndividualInvestors (){
        return individualInvestorRepository.count();
   }


}
