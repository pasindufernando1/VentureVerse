package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Complain;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.AdminDTO;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.model.normal.DetailsDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.AdminRepository;
import com.ventureverse.server.repository.ComplainRepository;
import com.ventureverse.server.repository.IndividualInvestorRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DemoService {
    private final AdminRepository adminRepository;
    private final ComplainRepository complainRepository;

    public List<AdminDTO> details(){

        return adminRepository.findAll();
    }

    public List<ComplainDTO> findByComplains1() {
        return complainRepository.findAll();
    }

    public List<ComplainDTO> findByComplain(Complain complain) {
        return complainRepository.findByComplainType(complain);
    }


    public ComplainDTO checkComplains(Integer complainId) {
        var complain = complainRepository.findByComplainId(complainId);
        if (complain.isPresent()) {
            ComplainDTO existingComplain = complain.get();
            existingComplain.setComplainType(Complain.REJECTED);
            return complainRepository.save(existingComplain);
        }
        else {
           return null;
       }
    }

    public ComplainDTO  addComplain(Integer complainId, DetailsDTO complainRequest) {

      var complain = complainRepository.findByComplainId(complainId);

      AdminDTO getAdminOptional = adminRepository.findByAdminId(complainRequest.getAdminId());

        if (complain.isPresent()) {

            ComplainDTO existingComplain = complain.get();

            existingComplain.setActionDescription(complainRequest.getActionDescription());
            existingComplain.setAdminId(getAdminOptional);
            existingComplain.setComplainType(Complain.SOLVED);

            return complainRepository.save(existingComplain);
        }
       else
        {
            return null;
        }
    }



}
