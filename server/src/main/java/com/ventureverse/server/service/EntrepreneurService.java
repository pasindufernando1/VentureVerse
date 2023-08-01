package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.repository.EntrepreneurRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntrepreneurService {

    private final EntrepreneurRepository entrepreneurRepository;

    public EntrepreneurService(EntrepreneurRepository entrepreneurRepository) {
        this.entrepreneurRepository = entrepreneurRepository;
    }

    public List<EntrepreneurDTO> findByApprovalStatus(Status status) {
        return entrepreneurRepository.findByApprovalStatus(status);
    }
}
