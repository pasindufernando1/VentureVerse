package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.model.entity.InvestorInterestedListingDTO;
import com.ventureverse.server.model.entity.InvestorInterestedSectorDTO;
import com.ventureverse.server.repository.IndividualInvestorRepository;
import com.ventureverse.server.repository.IndustrySectorRepository;
import com.ventureverse.server.repository.InvestorInterestedSectorRepository;
import com.ventureverse.server.repository.Investor_InterestedListingRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class InvestorService {
    private final IndividualInvestorRepository individualInvestorRepository;
    private final InvestorInterestedSectorRepository investorInterestedSectorRepository;
    private final Investor_InterestedListingRepository investorInterestedListingRepository;


    public InvestorService(IndividualInvestorRepository individualInvestorRepository, InvestorInterestedSectorRepository investorInterestedSectorRepository, IndustrySectorRepository industrySectorRepository, Investor_InterestedListingRepository investorInterestedListingRepository) {
        this.individualInvestorRepository = individualInvestorRepository;
        this.investorInterestedSectorRepository = investorInterestedSectorRepository;
        this.investorInterestedListingRepository = investorInterestedListingRepository;
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
}
