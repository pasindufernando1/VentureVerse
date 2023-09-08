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

@Service
public class InvestorService {
    private final IndividualInvestorRepository individualInvestorRepository;
    private final InvestorInterestedSectorRepository investorInterestedSectorRepository;

    private final EnterpriseInvestorRepository EnterpriseInvestorRepository;


    public InvestorService(IndividualInvestorRepository individualInvestorRepository, InvestorInterestedSectorRepository investorInterestedSectorRepository, IndustrySectorRepository industrySectorRepository, com.ventureverse.server.repository.EnterpriseInvestorRepository enterpriseInvestorRepository) {
        this.individualInvestorRepository = individualInvestorRepository;
        this.investorInterestedSectorRepository = investorInterestedSectorRepository;
        EnterpriseInvestorRepository = enterpriseInvestorRepository;
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

    public List<IndividualInvestorDTO> getAllIndividualInvestors() {
        return individualInvestorRepository.findByRole(Role.INDIVIDUAL_INVESTOR);
    }

    public List<IndividualInvestorDTO> getAllEnterpriseInvestors() {
        return individualInvestorRepository.findByRole(Role.ENTERPRISE_INVESTOR);
    }
//    public IndividualInvestorDTO findAllByRole(){
//        return individualInvestorRepository.findAllByRole(Role.INDIVIDUAL_INVESTOR);
//    }
}
