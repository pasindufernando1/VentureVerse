package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.model.entity.InvestorDTO;
import com.ventureverse.server.model.normal.RegisterRequestDTO;
import com.ventureverse.server.repository.IndividualInvestorRepository;
import com.ventureverse.server.repository.InvestorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvestorService {
    private final IndividualInvestorRepository individualInvestorRepository;

    public InvestorService(IndividualInvestorRepository individualInvestorRepository) {
        this.individualInvestorRepository = individualInvestorRepository;
    }

    public List<IndividualInvestorDTO> findByApprovalStatus(Status status) {
        return individualInvestorRepository.findByApprovalStatus(status);
    }
}
