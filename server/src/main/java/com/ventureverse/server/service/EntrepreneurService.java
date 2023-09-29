package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.ComplainRepository;
import com.ventureverse.server.repository.EntrepreneurRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        var complain = ComplainDTO.builder()
                .description(complainDTO.getDescription())
                .date(complainDTO.getDate())
                .userId(complainDTO.getUserId())
                .build();

        complainRepository.save(complain);
        return GlobalService.response("Success", "Complain added successfully");
    }
    public List<EntrepreneurDTO> getAllApprovedEntrepreneurs() {
        return entrepreneurRepository.findByApprovalStatus(Status.APPROVED);
    }



    public EntrepreneurDTO updateEntrepreneur(EntrepreneurDTO updatedEntrepreneur, Integer id) {
        Optional<EntrepreneurDTO> existingEntrepreneurOptional = entrepreneurRepository.findById(id);

        if (existingEntrepreneurOptional.isPresent()) {
            EntrepreneurDTO existingEntrepreneur = existingEntrepreneurOptional.get();

            // Update the fields of the existing entrepreneur with data from updatedEntrepreneur
            existingEntrepreneur.setFirstname(updatedEntrepreneur.getFirstname());
            existingEntrepreneur.setLastname(updatedEntrepreneur.getLastname());
            existingEntrepreneur.setEmail(updatedEntrepreneur.getEmail());
            existingEntrepreneur.setNic(updatedEntrepreneur.getNic());
            existingEntrepreneur.setContactNumber(updatedEntrepreneur.getContactNumber());
            existingEntrepreneur.setBusinessName(updatedEntrepreneur.getBusinessName());
            existingEntrepreneur.setBusinessEmail(updatedEntrepreneur.getBusinessEmail());

            // Save the updated existing entrepreneur to the repository
            entrepreneurRepository.save(existingEntrepreneur);

            // Return the updated entrepreneur
            return existingEntrepreneur;
        } else {
            return null; // Or you can throw an exception indicating that the entrepreneur with the given ID was not found
        }
    }


    public EntrepreneurDTO banEntrepreneur(Integer id) {
        Optional<EntrepreneurDTO> existingEntrepreneurOptional = entrepreneurRepository.findById(id);

        if (existingEntrepreneurOptional.isPresent()) {
            EntrepreneurDTO existingEntrepreneur = existingEntrepreneurOptional.get();

            existingEntrepreneur.setApprovalStatus(Status.PENDING);

            // You can update other fields here if needed...

            // Save the updated entrepreneur entity back to the database
            return entrepreneurRepository.save(existingEntrepreneur);
        } else {
            return null; // You can also throw an exception indicating that the entrepreneur with the given ID was not found
        }
    }
}
