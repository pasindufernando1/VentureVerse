package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
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

    public long countEntrepreneurs() {
        return entrepreneurRepository.count();
    }


    public EntrepreneurDTO updateEntrepreneur(EntrepreneurDTO updatedEntrepreneur, Integer id) {
        Integer entrepreneurId = updatedEntrepreneur.getId();
        Optional<EntrepreneurDTO> existingEntrepreneuroptional = entrepreneurRepository.findById(id);

        if(existingEntrepreneuroptional.isPresent()){
            EntrepreneurDTO existingEntrepreneur = existingEntrepreneuroptional.get();
            // Update the existing entrepreneur fields with the values from updatedAdmin
            existingEntrepreneur.setFirstname(updatedEntrepreneur.getFirstname());
            existingEntrepreneur.setLastname(updatedEntrepreneur.getLastname());
            existingEntrepreneur.setFirstLineAddress(updatedEntrepreneur.getFirstLineAddress());
            existingEntrepreneur.setSecondLineAddress(updatedEntrepreneur.getSecondLineAddress());
            existingEntrepreneur.setTown(updatedEntrepreneur.getTown());
            existingEntrepreneur.setDistrict(updatedEntrepreneur.getDistrict());
            existingEntrepreneur.setContactNumber(updatedEntrepreneur.getContactNumber());
            //save to backend
            return entrepreneurRepository.save(existingEntrepreneur);
        }else{
            //keep the existing entrepreneur
            return entrepreneurRepository.save(updatedEntrepreneur);
        }
    }

}
