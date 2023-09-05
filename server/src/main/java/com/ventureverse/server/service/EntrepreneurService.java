package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Complain;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.entity.UserDTO;
import com.ventureverse.server.model.normal.RegisterRequestDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.ComplainRepository;
import com.ventureverse.server.repository.EntrepreneurRepository;
import com.ventureverse.server.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EntrepreneurService {

    private final EntrepreneurRepository entrepreneurRepository;
    private final ComplainRepository complainRepository;

    private final UserRepository userRepository;

    public EntrepreneurService(EntrepreneurRepository entrepreneurRepository, ComplainRepository complainRepository, UserRepository userRepository) {
        this.entrepreneurRepository = entrepreneurRepository;
        this.complainRepository = complainRepository;
        this.userRepository = userRepository;
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
        UserDTO user = userRepository.findById(complainDTO.getUserId().getId()).orElse(null);
        if (user == null) {
            return GlobalService.response("Error", "User not found");
        }
        ComplainDTO complain = ComplainDTO.builder()
                .description(complainDTO.getDescription())
                .date(complainDTO.getDate())
                .userId(user) // Set the loaded UserDTO entity
                .ComplainType(Complain.PENDING)
                .build();

        complainRepository.save(complain);
        return GlobalService.response("Success", "Complain added successfully");
    }

    public List <Map<String, String>> getComplains() {
        List<ComplainDTO> complains = complainRepository.findAll();
        List<Map<String, String>> complainMap = new ArrayList<>();
        for (ComplainDTO complain : complains) {
            UserDTO user = userRepository.findById(complain.getUserId().getId()).orElse(null);
            if (user == null) {
                return null;
            }else{
                complainMap.add(Map.of(
                        "complainType", complain.getComplainType().toString(),
                        "userRole", user.getRole().toString(),
                        "date", complain.getDate().toString()
                ));
            }
        }
        return complainMap;
    }
}
