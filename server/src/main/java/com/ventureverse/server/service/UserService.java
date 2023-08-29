package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.UserDTO;
import com.ventureverse.server.model.normal.DetailsDTO;
import com.ventureverse.server.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final EntrepreneurRepository entrepreneurRepository;
    private final EnterpriseInvestorRepository  enterpriseInvestorRepository;
    private final IndividualInvestorRepository individualInvestorRepository;
    private final AdminRepository adminRepository;

    public DetailsDTO getDetails(Integer id) {

        if (userRepository.findRoleById(id).equals(Role.ENTREPRENEUR)) {
            var user = entrepreneurRepository.findById(id).orElseThrow();

            return DetailsDTO.builder()
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .build();
        } else if (userRepository.findRoleById(id).equals(Role.ENTERPRISE_INVESTOR)) {

            var user = enterpriseInvestorRepository.findById(id).orElseThrow();

            return DetailsDTO.builder()
                    .businessName(user.getBusinessName())
                    .build();
        } else if (userRepository.findRoleById(id).equals(Role.INDIVIDUAL_INVESTOR)) {

            var user = individualInvestorRepository.findById(id).orElseThrow();

            return DetailsDTO.builder()
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .build();
        } else {
            var user = adminRepository.findById(id).orElseThrow();

            return DetailsDTO.builder()
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .build();
        }
    }

    public List<Map<String, String>> getUsers() {
        List<UserDTO> users= userRepository.findAll();
        List<Map<String, String>> complainMap = new ArrayList<>();
        for (UserDTO user : users) {
            complainMap.add(Map.of(
                    "id", user.getId().toString(),
                    "userRole", user.getRole().toString(),
                    "approvalStatus", user.getApprovalStatus().toString()
            ));
        }
        return complainMap;
    }

    public List<Map<String, String>> getUsersSignup() {
        List<UserDTO> users = userRepository.findAll();
        List<Map<String, String>> userMap = new ArrayList<>();

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -12); // Subtract 12 months from current date

        for (UserDTO user : users) {
            if (user.getApprovalStatus() == Status.APPROVED) {
                if (user.getRegisteredDate().after(calendar.getTime())) {
                    SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM yyyy", Locale.ENGLISH);
                    String registeredMonth = dateFormat.format(user.getRegisteredDate());

                    userMap.add(Map.of(
                            "id", user.getId().toString(),
                            "userRole", user.getRole().toString(),
                            "registeredMonth", registeredMonth
                    ));
                }
            }
        }

        return userMap;
    }
}
