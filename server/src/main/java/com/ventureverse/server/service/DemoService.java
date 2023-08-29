package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.AdminDTO;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.repository.AdminRepository;
import com.ventureverse.server.repository.ComplainRepository;
import com.ventureverse.server.repository.IndividualInvestorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DemoService {
    private final AdminRepository adminRepository;
    private final ComplainRepository complainRepository;

    public List<AdminDTO> details(){

        return adminRepository.findAll();
    }

    public List<ComplainDTO> findByComplains() {
        return complainRepository.findAll();
    }


}
