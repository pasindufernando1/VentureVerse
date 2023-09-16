package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Complain;
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

@Service
public class EntrepreneurService {

    private final EntrepreneurRepository entrepreneurRepository;
    private final ComplainRepository complainRepository;
    private final UserRepository userRepository;
    private final Investor_InterestedListingRepository investor_interestedListingRepository;
    private final IndividualInvestorRepository individualInvestorRepository;
    private final EnterpriseInvestorRepository enterpriseInvestorRepository;
    private final CounterProposalRepository counterProposalRepository;
    private final ScheduleRepository scheduleRepository;
    private final ListingRepository listingRepository;
    private final ListingIndustrySectorsRepository listingIndustrySectorsRepository;
    public EntrepreneurService(EntrepreneurRepository entrepreneurRepository, ComplainRepository complainRepository, UserRepository userRepository, Investor_InterestedListingRepository investorInterestedListingRepository, IndividualInvestorRepository individualInvestorRepository, EnterpriseInvestorRepository enterpriseInvestorRepository, CounterProposalRepository counterProposalRepository, ScheduleRepository scheduleRepository, ListingRepository listingRepository, ListingIndustrySectorsRepository listingIndustrySectorsRepository) {
        this.entrepreneurRepository = entrepreneurRepository;
        this.complainRepository = complainRepository;
        this.userRepository = userRepository;
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

    public List <Map<String, String>> getComplains() {
        List<ComplainDTO> complains = complainRepository.findAll();
        List<Map<String, String>> complainMap = new ArrayList<>();
        for (ComplainDTO complain : complains) {
            UserDTO user = userRepository.findById(complain.getUserId().getId()).orElse(null);
            if (user == null) {
                return null;
            }else{
                complainMap.add(Map.of(
                        "complainType", complain.getComplainType().toString(),
                        "userRole", user.getRole().toString(),
                        "date", complain.getDate().toString()
                ));
            }
        }
        return complainMap;
    }

    public List<Map<String, String>> getListings(Integer id) {
        List<InvestorInterestedListingDTO> listings = investor_interestedListingRepository.findByEntrepreneurId(id);
        List<CounterProposalDTO> counterProposals = counterProposalRepository.findByEntrepreneurId(id);
        List<Map<String, String>> listingMap = new ArrayList<>();
        for(InvestorInterestedListingDTO listing:listings) {
            float equity=0;
            float profit=0;
            String investorName="";
            if(listing.getReturnEquityPercentage()!=null){
                equity=listing.getReturnEquityPercentage();
            }
            if(listing.getReturnUnitProfitPercentage()!=null){
                profit=listing.getReturnUnitProfitPercentage();
            }
            Role userRole = listing.getId().getInvestorId().getRole();
            if(userRole==Role.INDIVIDUAL_INVESTOR){
                investorName=individualInvestorRepository.findById(listing.getId().getInvestorId().getId()).orElse(null).getFirstname()+" "+individualInvestorRepository.findById(listing.getId().getInvestorId().getId()).orElse(null).getLastname();
            }else {
                investorName = enterpriseInvestorRepository.findById(listing.getId().getInvestorId().getId()).orElse(null).getBusinessName();
            }
            Map<String, String> user = Map.of(
                    "Investor", investorName,
                    "amount", listing.getId().getListingId().getExpectedAmount().toString(),
                    "type","Interested",
                    "equity",String.valueOf(equity),
                    "profit",String.valueOf(profit),
                    "date",listing.getInterestedDate().toString(),
                    "title",listing.getId().getListingId().getTitle()
            );
            listingMap.add(user);
        }
        for(CounterProposalDTO proposal:counterProposals){
            float equity=0;
            float profit=0;
            String investorName="";
            if(proposal.getReturnEquityPercentage()!=null){
                equity=proposal.getReturnEquityPercentage();
            }
            if(proposal.getReturnUnitProfitPercentage()!=null){
                profit=proposal.getReturnUnitProfitPercentage();
            }
            Role userRole = proposal.getInvestorId().getRole();
            if(userRole==Role.INDIVIDUAL_INVESTOR){
                investorName=individualInvestorRepository.findById(proposal.getInvestorId().getId()).orElse(null).getFirstname()+" "+individualInvestorRepository.findById(proposal.getInvestorId().getId()).orElse(null).getLastname();
            }else {
                investorName = enterpriseInvestorRepository.findById(proposal.getInvestorId().getId()).orElse(null).getBusinessName();
            }
            Map<String, String> user = Map.of(
                    "Investor", investorName,
                    "amount", proposal.getAmount().toString(),
                    "type","Counter",
                    "equity",String.valueOf(equity),
                    "profit",String.valueOf(profit),
                    "date",proposal.getDate().toString(),
                    "title",proposal.getListingId().getTitle()
            );
            listingMap.add(user);
        }
        return listingMap;
    }

    public List<Map<String, String>> getSchedules(Integer id) {
        List<ScheduleDTO> meetings=scheduleRepository.findEntrepreneurMeetings(id);

        List<Map<String, String>> userMap = new ArrayList<>();
        for (ScheduleDTO meeting:meetings) {
            Map<String, String> user = Map.of(
                    "date",meeting.getDate().toString(),
                    "time",meeting.getTime().toString()
            );
            userMap.add(user);
        }
        return userMap;

    }

    public List<Map<String, String>> getInterests(Integer id) {
        List<ListingDTO> listings = listingRepository.findByEntrepreneurId(id);
        List<Map<String, String>> listingMap = new ArrayList<>();

        for(ListingDTO listing:listings) {
            //sectors that investor is interested in
            List<ListingIndustrySectorsDTO> sectors = listingIndustrySectorsRepository.findByListingId(listing.getListingId());
            for (ListingIndustrySectorsDTO sector:sectors) {
                Map<String, String> user = Map.of(
                        "sector", sector.getId().getSectorId().getSectorName(),
                        "amount", listing.getExpectedAmount().toString()
                );
                listingMap.add(user);
            }
        }
        return listingMap;
    }

    public List<Map<String, String>> getCompletedListings(Integer id) {
        List<InvestorInterestedListingDTO> listings = investor_interestedListingRepository.findByEntrepreneurId(id);
        List<Map<String, String>> listingMap = new ArrayList<>();

        for(InvestorInterestedListingDTO listing:listings){
            List<ListingIndustrySectorsDTO> sectors = listingIndustrySectorsRepository.findByListingId(listing.getId().getListingId().getListingId());
            for (ListingIndustrySectorsDTO sector:sectors) {
                Map<String, String> user = Map.of(
                        "sector", sector.getId().getSectorId().getSectorName(),
                        "amount", listing.getId().getListingId().getExpectedAmount().toString()
                );
                listingMap.add(user);
            }
        }
        return listingMap;
    }
}