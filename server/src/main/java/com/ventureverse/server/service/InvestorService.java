package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.model.entity.InvestorDTO;
import com.ventureverse.server.model.entity.InvestorInterestedSectorDTO;
import com.ventureverse.server.repository.IndividualInvestorRepository;
import com.ventureverse.server.repository.IndustrySectorRepository;
import com.ventureverse.server.repository.InvestorInterestedSectorRepository;
import com.ventureverse.server.repository.InvestorRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class InvestorService {
    private final IndividualInvestorRepository individualInvestorRepository;
    private final InvestorInterestedSectorRepository investorInterestedSectorRepository;


    public InvestorService(IndividualInvestorRepository individualInvestorRepository, InvestorInterestedSectorRepository investorInterestedSectorRepository, IndustrySectorRepository industrySectorRepository) {
        this.individualInvestorRepository = individualInvestorRepository;
        this.investorInterestedSectorRepository = investorInterestedSectorRepository;
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
            return null;
        }
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
    public IndividualInvestorDTO save(IndividualInvestorDTO investor) {
        return individualInvestorRepository.save(investor);
    }

   public long countIndividualInvestors (){
        return individualInvestorRepository.count();
   }


}
