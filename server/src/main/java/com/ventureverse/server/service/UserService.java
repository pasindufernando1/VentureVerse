package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.ListingDTO;
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
    private final ComplainRepository complainRepository;

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
            String registeredDate;
            if (user.getRegisteredDate() != null) {
                registeredDate = user.getRegisteredDate().toString();
            } else {
                registeredDate = "null";
            }
            complainMap.add(Map.of(
                    "id", user.getId().toString(),
                    "userRole", user.getRole().toString(),
                    "approvalStatus", user.getApprovalStatus().toString(),
                    "registeredDate", registeredDate
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

    public List<Map<String, String>> getUserRegistration() {
        List<UserDTO> users = userRepository.findAll();
        List<Map<String, String>> userMap = new ArrayList<>();
        for (UserDTO user : users) {
            String registeredDate;
            if (user.getRegisteredDate() != null) {
                registeredDate = user.getRegisteredDate().toString();
            } else {
                registeredDate = "null";
            }
            userMap.add(Map.of(
                    "id", user.getId().toString(),
                    "userRole", user.getRole().toString(),
                    "status", user.getApprovalStatus().toString(),
                    "registeredDate", registeredDate
            ));
        }

        return userMap;
    }

    public List<Map<String, String>> getTopcomplains() {
        List<ComplainDTO> complains = complainRepository.findAll();
        List<Map<String, String>> complainMap = new ArrayList<>();
        //sort complains by date
        for (ComplainDTO complain : complains) {
            String complainDate;
            if (complain.getDate() != null) {
                complainDate = complain.getDate();
            } else {
                complainDate = "null";
            }
            if (complain.getUserId().getRole().equals(Role.ENTREPRENEUR)) {
                var user = entrepreneurRepository.findById(complain.getUserId().getId()).orElseThrow();
                complainMap.add(Map.of(
                        "complainUser", user.getFirstname() + " " + user.getLastname(),
                        "userRole","Entrepreneur",
                        "complainDate", complainDate,
                        "complainStatus", complain.getComplainType().toString(),
                        "complainDescription", complain.getDescription()
                ));
            } else if (complain.getUserId().getRole().equals(Role.ENTERPRISE_INVESTOR)) {
                var user = enterpriseInvestorRepository.findById(complain.getUserId().getId()).orElseThrow();
                complainMap.add(Map.of(
                        "complainUser", user.getBusinessName(),
                        "userRole","Enterprise Investor",
                        "complainDate", complainDate,
                        "complainStatus", complain.getComplainType().toString(),
                        "complainDescription", complain.getDescription()
                ));
            } else if (complain.getUserId().getRole().equals(Role.INDIVIDUAL_INVESTOR)) {
                var user = individualInvestorRepository.findById(complain.getUserId().getId()).orElseThrow();
                complainMap.add(Map.of(
                        "complainUser", user.getFirstname() + " " + user.getLastname(),
                        "userRole","Individual Investor",
                        "complainDate", complainDate,
                        "complainStatus", complain.getComplainType().toString(),
                        "complainDescription", complain.getDescription()
                ));
            }
        }
        return complainMap;
    }

}
