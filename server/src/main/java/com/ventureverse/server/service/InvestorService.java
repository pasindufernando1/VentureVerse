package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.*;
import com.ventureverse.server.repository.*;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class InvestorService {
    private final IndividualInvestorRepository individualInvestorRepository;
    private final InvestorInterestedSectorRepository investorInterestedSectorRepository;
    private final Investor_InterestedListingRepository investorInterestedListingRepository;
    private final ListingIndustrySectorsRepository listingIndustrySectorsRepository;
    private final ScheduleRepository scheduleRepository;

    private final CounterProposalRepository counterProposalRepository;


    public InvestorService(IndividualInvestorRepository individualInvestorRepository, InvestorInterestedSectorRepository investorInterestedSectorRepository, IndustrySectorRepository industrySectorRepository, Investor_InterestedListingRepository investorInterestedListingRepository, ListingIndustrySectorsRepository listingIndustrySectorsRepository, ScheduleRepository scheduleRepository, CounterProposalRepository counterProposalRepository) {
        this.individualInvestorRepository = individualInvestorRepository;
        this.investorInterestedSectorRepository = investorInterestedSectorRepository;
        this.investorInterestedListingRepository = investorInterestedListingRepository;
        this.listingIndustrySectorsRepository = listingIndustrySectorsRepository;
        this.scheduleRepository = scheduleRepository;
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

    public List<Map<String, String>> getUserInterest() {
        System.out.println("Inside getUserInterest");
        List<InvestorInterestedListingDTO> interests = investorInterestedListingRepository.findAll();
        List<Map<String, String>> userMap = new ArrayList<>();

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -12);

        for(InvestorInterestedListingDTO interest : interests) {
            if(interest.getInterestedDate().after(calendar.getTime())){
                SimpleDateFormat dateFormat = new SimpleDateFormat("MMM yyyy", Locale.ENGLISH);
                String publishDate = dateFormat.format(interest.getInterestedDate());
                Map<String, String> user = Map.of(
                        "id", String.valueOf(interest.getId().getInvestorId().getId()),
                        "inerestedDate", publishDate
                );
                userMap.add(user);
            }
        }
        System.out.println("userMap: " + userMap);
        return userMap;
    }

    public List<Map<String, String>> getInvestedAmount(Integer id) {
        List<InvestorInterestedListingDTO> interests = investorInterestedListingRepository.findByInvestorId(id);
        List<Map<String, String>> userMap = new ArrayList<>();

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -12);

        for(InvestorInterestedListingDTO interest : interests) {
            if(interest.getInterestedDate().after(calendar.getTime())){
                SimpleDateFormat dateFormat = new SimpleDateFormat("MMM yyyy", Locale.ENGLISH);
                String publishDate = dateFormat.format(interest.getFinalizedDate());
                Map<String, String> user = Map.of(
                        "id", String.valueOf(interest.getId().getInvestorId().getId()),
                        "finalizeDate", publishDate,
                        "amount", String.valueOf(interest.getAmountFinalized())
                );
                userMap.add(user);
            }
        }
        return userMap;
    }


    public List<Map<String, String>> getProjects(Integer id) {
        List<InvestorInterestedListingDTO> interests = investorInterestedListingRepository.findAllByInvestorId(id);
        List<Map<String, String>> userMap = new ArrayList<>();

        for(InvestorInterestedListingDTO interest : interests) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("MMM yyyy", Locale.ENGLISH);
                //handle null pointer exception for finalized date
                String FinalizeDate = "";
                if(interest.getFinalizedDate() != null){
                    FinalizeDate = dateFormat.format(interest.getFinalizedDate());
                }else {
                    FinalizeDate= "Not Finalized";
                }
                String publishDate = dateFormat.format(interest.getInterestedDate());
                Map<String, String> user = Map.of(
                        "listingId", String.valueOf(interest.getId().getListingId().getListingId()),
                        "interestedDate", publishDate,
                        "finalizeDate", FinalizeDate
                );
                userMap.add(user);
        }
        return userMap;
    }

    public List<Map<String, String>> getInterestSectors() {
        List<InvestorInterestedListingDTO> interests = investorInterestedListingRepository.findAll();

        Map<Integer, List<Integer>> listingInvestorMap = new HashMap<>();
        for(InvestorInterestedListingDTO interest : interests){
            int listingId = interest.getId().getListingId().getListingId();
            int investorId = interest.getId().getInvestorId().getId();
            if(listingInvestorMap.containsKey(listingId)){
                List<Integer> investors = listingInvestorMap.get(listingId);
                investors.add(investorId);
                listingInvestorMap.put(listingId, investors);
            }else{
                List<Integer> investors = new ArrayList<>();
                investors.add(investorId);
                listingInvestorMap.put(listingId, investors);
            }
        }

        System.out.println("listingInvestorMap: " + listingInvestorMap);
        List<Map<String, String>> userMap = new ArrayList<>();

        for(Map.Entry<Integer, List<Integer>> entry : listingInvestorMap.entrySet()){
            int listingId = entry.getKey();
            List<Integer> investors = entry.getValue();

            //for each investor get the sector
            for(Integer investorId : investors){
                //check whether that is completed or not
                InvestorInterestedListingDTO interest = investorInterestedListingRepository.findByInvestorIdAndListingId(investorId, listingId);
                if(interest.getFinalizedDate() == null){
                    continue;
                }
                int amount = interest.getAmountFinalized();

                List<ListingIndustrySectorsDTO> sectors = listingIndustrySectorsRepository.findAll();
                for(ListingIndustrySectorsDTO sector : sectors){
                    if(sector.getId().getListingId().getListingId() == listingId){
                        Map<String, String> user = Map.of(
                                "listingId", String.valueOf(listingId),
                                "sectorName", sector.getId().getSectorId().getName(),
                                "amount", String.valueOf(amount)
                        );
                        userMap.add(user);
                    }
                }
            }

        }
        return userMap;
    }

    public List<Map<String, String>> getMeetings(Integer id) {
        List<ScheduleDTO> meetings=scheduleRepository.findMeetings(id);

        List<Map<String, String>> userMap = new ArrayList<>();
        for (ScheduleDTO meeting:meetings) {
            Map<String, String> user = Map.of(
                    "date",meeting.getDate().toString(),
                    "time",meeting.getTime().toString(),
                    "title",meeting.getTitle()
            );
            userMap.add(user);
        }
        return userMap;
    }

    public List<Map<String, String>> getInterestedListings(Integer id) {
        List<InvestorInterestedListingDTO> listings=investorInterestedListingRepository.findPendingListings(id);
        List<CounterProposalDTO> proposals=counterProposalRepository.findAll();
        List<InvestorInterestedListingDTO> completedListings=investorInterestedListingRepository.findByInvestorId(id);

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
}
