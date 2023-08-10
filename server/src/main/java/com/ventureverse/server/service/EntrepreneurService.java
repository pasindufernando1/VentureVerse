package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.ComplainRepository;
import com.ventureverse.server.repository.EntrepreneurRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntrepreneurService {

    private final EntrepreneurRepository entrepreneurRepository;
    private final ComplainRepository complainRepository;

    public EntrepreneurService(EntrepreneurRepository entrepreneurRepository, ComplainRepository complainRepository) {
        this.entrepreneurRepository = entrepreneurRepository;
        this.complainRepository = complainRepository;
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
        complainRepository.save(complainDTO);
        return new ResponseDTO("Success", "Complain added successfully");
    }
}
