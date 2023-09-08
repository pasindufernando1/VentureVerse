package com.ventureverse.server.service;
import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.AdminDTO;
import com.ventureverse.server.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
    @RequiredArgsConstructor
    public class CoAdminService {

        private final AdminRepository adminRepository;

//        public List<AdminDTO> getAllCoAdmins() {
//
//            return adminRepository.findAll();
//        }

        public List<AdminDTO> getAllCoAdmins() {
            return adminRepository.findAllByRole(Role.CO_ADMIN);
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
                existingCoAdmin.setContactNumber(updatedAdmin.getContactNumber());
                



                // Update other fields as needed...

                // Save the updated co-admin entity back to the database
                return adminRepository.save(existingCoAdmin);
            } else {
                return null;
            }
        }
        public AdminDTO banCoAdmin (Integer id) {
            Optional<AdminDTO> existingCoAdminOptional = adminRepository.findById(id);

            if (existingCoAdminOptional.isPresent()) {
                AdminDTO existingCoAdmin = existingCoAdminOptional.get();
                // Update the existing co-admin's fields with the values from updatedAdmin
                existingCoAdmin.setApprovalStatus(Status.valueOf("Banned"));
                // Update other fields as needed...

                // Save the updated co-admin entity back to the database
                return adminRepository.save(existingCoAdmin);
            } else {
                return null;
            }
        }



    }

