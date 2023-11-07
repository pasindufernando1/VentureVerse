package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.exception.CustomErrorException;
import com.ventureverse.server.model.entity.AdminDTO;
import com.ventureverse.server.model.entity.UserDTO;
import com.ventureverse.server.repository.AdminRepository;
import com.ventureverse.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
    @RequiredArgsConstructor
    public class CoAdminService {

        private final AdminRepository adminRepository;
        private final UserRepository userRepository;

        public List<AdminDTO> getAllCoAdmins() {
            return adminRepository.findAllByRole(Role.CO_ADMIN, Status.APPROVED);
        }
        public AdminDTO getDetails(Integer id) {
            return adminRepository.findAllById(id);
        }

        public AdminDTO updateCoAdmin(AdminDTO updatedAdmin, Integer id) {
            Integer coAdminId = updatedAdmin.getId();

            Optional<AdminDTO> existingCoAdminOptional = adminRepository.findById(id);

            if (existingCoAdminOptional.isPresent()) {
                AdminDTO existingCoAdmin = existingCoAdminOptional.get();
                // Update the existing co-admin's fields with the values from updatedAdmin
                existingCoAdmin.setFirstname(updatedAdmin.getFirstname());
                existingCoAdmin.setLastname(updatedAdmin.getLastname());
                existingCoAdmin.setEmail(updatedAdmin.getEmail());
                existingCoAdmin.setNic(updatedAdmin.getNic());
                existingCoAdmin.setFirstLineAddress(updatedAdmin.getFirstLineAddress());
                existingCoAdmin.setSecondLineAddress(updatedAdmin.getSecondLineAddress());

                existingCoAdmin.setContactNumber(updatedAdmin.getContactNumber());
                existingCoAdmin.setTown(updatedAdmin.getTown());
                



                // Update other fields as needed...

                // Save the updated co-admin entity back to the database
                return adminRepository.save(existingCoAdmin);
            } else {
                return null;
            }
        }
        public UserDTO banCoAdmin (Integer id) {
            UserDTO user = userRepository.findById(id).orElseThrow(() -> new CustomErrorException("User Not Found"));
            user.setApprovalStatus(Status.BANNED);
            return userRepository.save(user);
        }



    }

