package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.*;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EntrepreneurService {

    private final EntrepreneurRepository entrepreneurRepository;
    private final ComplainRepository complainRepository;
    private final Investor_InterestedListingRepository investor_interestedListingRepository;

    private final IndividualInvestorRepository individualInvestorRepository;
    private final EnterpriseInvestorRepository enterpriseInvestorRepository;
    private final CounterProposalRepository counterProposalRepository;
    private final ScheduleRepository scheduleRepository;
    private final ListingRepository listingRepository;
    private final ListingIndustrySectorsRepository listingIndustrySectorsRepository;

    public EntrepreneurService(EntrepreneurRepository entrepreneurRepository, ComplainRepository complainRepository, Investor_InterestedListingRepository investorInterestedListingRepository, IndividualInvestorRepository individualInvestorRepository, EnterpriseInvestorRepository enterpriseInvestorRepository, CounterProposalRepository counterProposalRepository, ScheduleRepository scheduleRepository, ListingRepository listingRepository, ListingIndustrySectorsRepository listingIndustrySectorsRepository) {
        this.entrepreneurRepository = entrepreneurRepository;
        this.complainRepository = complainRepository;
        this.investor_interestedListingRepository = investorInterestedListingRepository;
        this.individualInvestorRepository = individualInvestorRepository;
        this.enterpriseInvestorRepository = enterpriseInvestorRepository;
        this.counterProposalRepository = counterProposalRepository;
        this.scheduleRepository = scheduleRepository;
        this.listingRepository = listingRepository;
        this.listingIndustrySectorsRepository = listingIndustrySectorsRepository;
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
        UserDTO user = userRepository.findById(complainDTO.getUserId().getId()).orElse(null);
        if (user == null) {
            return GlobalService.response("Error", "User not found");
        }
        ComplainDTO complain = ComplainDTO.builder()
                .description(complainDTO.getDescription())
                .date(complainDTO.getDate())
                .userId(user) // Set the loaded UserDTO entity
                .complainType(Complain.PENDING)
                .build();

        complainRepository.save(complain);
        return GlobalService.response("Success", "Complain added successfully");
    }

    public List<InvestorInterestedListingDTO> finalizeListings(Integer id) {
        return investor_interestedListingRepository.findByEntreprenuerListingId(id);
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

    public List<Map<String, String>> getOffers(Integer id) {
        List<InvestorInterestedListingDTO> listing=investor_interestedListingRepository.findByPendingListingId(id);
        List<CounterProposalDTO> proposal=counterProposalRepository.findByListingId(id);

        List<Map<String, String>> listingMap = new ArrayList<>();
        for(InvestorInterestedListingDTO list:listing){
            float equity=0;
            float profit=0;
            String investorName="";
            if(list.getReturnEquityPercentage()!=null){
                equity=list.getReturnEquityPercentage();
            }
            if(list.getReturnUnitProfitPercentage()!=null){
                profit=list.getReturnUnitProfitPercentage();
            }
            Role userRole = list.getId().getInvestorId().getRole();
            if(userRole==Role.INDIVIDUAL_INVESTOR){
                investorName=individualInvestorRepository.findById(list.getId().getInvestorId().getId()).orElse(null).getFirstname()+" "+individualInvestorRepository.findById(list.getId().getInvestorId().getId()).orElse(null).getLastname();
            }else {
                investorName = enterpriseInvestorRepository.findById(list.getId().getInvestorId().getId()).orElse(null).getBusinessName();
            }
            Map<String, String> user = Map.of(
                    "Investor", investorName,
                    "amount", list.getId().getListingId().getExpectedAmount().toString(),
                    "type","Interested",
                    "equity",String.valueOf(equity),
                    "profit",String.valueOf(profit)
            );
            listingMap.add(user);
        }
        for(CounterProposalDTO prop:proposal){
            float equity=0;
            float profit=0;
            String investorName="";
            if(prop.getReturnEquityPercentage()!=null){
                equity=prop.getReturnEquityPercentage();
            }
            if(prop.getReturnUnitProfitPercentage()!=null){
                profit=prop.getReturnUnitProfitPercentage();
            }
            Role userRole = prop.getInvestorId().getRole();
            if(userRole==Role.INDIVIDUAL_INVESTOR){
                investorName=individualInvestorRepository.findById(prop.getInvestorId().getId()).orElse(null).getFirstname()+" "+individualInvestorRepository.findById(prop.getInvestorId().getId()).orElse(null).getLastname();
            }else {
                investorName = enterpriseInvestorRepository.findById(prop.getInvestorId().getId()).orElse(null).getBusinessName();
            }
            Map<String, String> user = Map.of(
                    "Investor", investorName,
                    "amount", prop.getAmount().toString(),
                    "type","Counter",
                    "equity",String.valueOf(equity),
                    "profit",String.valueOf(profit)
            );
            listingMap.add(user);
        }
        return listingMap;
}
    public List<EntrepreneurDTO> getAllApprovedEntrepreneurs() {
        return entrepreneurRepository.findByApprovalStatus(Status.APPROVED);
    }



    public EntrepreneurDTO updateEntrepreneur(EntrepreneurDTO updatedEntrepreneur, Integer id) {
        Optional<EntrepreneurDTO> existingEntrepreneurOptional = entrepreneurRepository.findById(id);

        if (existingEntrepreneurOptional.isPresent()) {
            EntrepreneurDTO existingEntrepreneur = existingEntrepreneurOptional.get();

            // Update the fields of the existing entrepreneur with data from updatedEntrepreneur
            existingEntrepreneur.setFirstname(updatedEntrepreneur.getFirstname());
            existingEntrepreneur.setLastname(updatedEntrepreneur.getLastname());
            existingEntrepreneur.setEmail(updatedEntrepreneur.getEmail());
            existingEntrepreneur.setNic(updatedEntrepreneur.getNic());
            existingEntrepreneur.setContactNumber(updatedEntrepreneur.getContactNumber());
            existingEntrepreneur.setBusinessName(updatedEntrepreneur.getBusinessName());
            existingEntrepreneur.setBusinessEmail(updatedEntrepreneur.getBusinessEmail());

            // Save the updated existing entrepreneur to the repository
            entrepreneurRepository.save(existingEntrepreneur);

            // Return the updated entrepreneur
            return existingEntrepreneur;
        } else {
            return null; // Or you can throw an exception indicating that the entrepreneur with the given ID was not found
        }
    }


    public EntrepreneurDTO banEntrepreneur(Integer id) {
        Optional<EntrepreneurDTO> existingEntrepreneurOptional = entrepreneurRepository.findById(id);

        if (existingEntrepreneurOptional.isPresent()) {
            EntrepreneurDTO existingEntrepreneur = existingEntrepreneurOptional.get();

            existingEntrepreneur.setApprovalStatus(Status.BANNED);

            // You can update other fields here if needed...

            // Save the updated entrepreneur entity back to the database
            return entrepreneurRepository.save(existingEntrepreneur);
        } else {
            return null; // You can also throw an exception indicating that the entrepreneur with the given ID was not found
        }
    }
}
