package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.enumeration.Status;
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
import java.util.Optional;

@Service
public class InvestorService {
    private final IndividualInvestorRepository individualInvestorRepository;

    private final InvestorInterestedSectorRepository investorInterestedSectorRepository;

    private final EnterpriseInvestorRepository enterpriseInvestorRepository;


    public InvestorService(IndividualInvestorRepository individualInvestorRepository, EnterpriseInvestorRepository enterpriseInvestorRepository, InvestorInterestedSectorRepository investorInterestedSectorRepository, IndustrySectorRepository industrySectorRepository) {
        this.individualInvestorRepository = individualInvestorRepository;
        this.investorInterestedSectorRepository = investorInterestedSectorRepository;
        this.enterpriseInvestorRepository = enterpriseInvestorRepository;
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

    public IndividualInvestorDTO getInvestorById(int i) {
        return individualInvestorRepository.findById(i).orElse(null);
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
    public IndividualInvestorDTO updateIndividualInvestor(IndividualInvestorDTO updatedIndividualInvestor, Integer id) {
        Optional<IndividualInvestorDTO> existingIndividualInvestorOptional = individualInvestorRepository.findById(id);

        IndividualInvestorDTO existingIndividualInvestor = individualInvestorRepository.findById(id).orElse(null);

        if (existingIndividualInvestor != null) {
            existingIndividualInvestor.setFirstname(updatedIndividualInvestor.getFirstname());
            existingIndividualInvestor.setLastname(updatedIndividualInvestor.getLastname());
            existingIndividualInvestor.setEmail(updatedIndividualInvestor.getEmail());
            existingIndividualInvestor.setNic(updatedIndividualInvestor.getNic());
            existingIndividualInvestor.setContactNumber(updatedIndividualInvestor.getContactNumber());

        }
        if (existingIndividualInvestor != null) {
            return individualInvestorRepository.save(existingIndividualInvestor);
        } else {
            return null;
        }
    }


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
            existingEnterpriseInvestor.setFirstLineAddress(updatedEnterpriseInvestor.getFirstLineAddress());
            existingEnterpriseInvestor.setSecondLineAddress(updatedEnterpriseInvestor.getSecondLineAddress());
            existingEnterpriseInvestor.setTown(updatedEnterpriseInvestor.getTown());

            enterpriseInvestorRepository.save(existingEnterpriseInvestor);
            return existingEnterpriseInvestor;

        }


        else{
            return null;
        }
    }

    public IndividualInvestorDTO banIndividualInvestor(Integer id) {
        Optional<IndividualInvestorDTO> existingIndividualInvestorOptional = individualInvestorRepository.findById(id);

        if (existingIndividualInvestorOptional.isPresent()) {
            IndividualInvestorDTO existingIndividualInvestor = existingIndividualInvestorOptional.get();

            existingIndividualInvestor.setApprovalStatus(Status.PENDING);

            // Update other fields as needed...

            // Save the updated co-admin entity back to the database
            return individualInvestorRepository.save(existingIndividualInvestor);
        } else {
            return null;
        }
    }
}
