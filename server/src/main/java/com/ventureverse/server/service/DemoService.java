package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.AdminDTO;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.AdminRepository;
import com.ventureverse.server.repository.ComplainRepository;
import com.ventureverse.server.repository.IndividualInvestorRepository;
import jakarta.servlet.http.HttpServletResponse;
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

    public ResponseDTO checkDetails(Integer complainId) {
        var complain = complainRepository.findByComplainId(complainId);
        if (complain.isPresent()) {
             complainRepository.deleteById(complainId);
            return GlobalService.response("Success", "Id Available");
        }
        else {
           return GlobalService.response("Error", "Id Available");
       }
    }

    public ResponseDTO addComplain(Integer complainId,String action_description) {


//        var complain = complainRepository.findByComplainId(complainId);
//
//        if (complain.isPresent()) {
//            complain.get().setActionDescription(action_description);
//            complainRepository.save(complain.get());
//            return GlobalService.response("Success", "message is updated");
//        }
//        else
        {
            return GlobalService.response("Error", "Id Is Not Available");
        }
    }



}
