package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.model.normal.DetailsDTO;
import com.ventureverse.server.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

}
