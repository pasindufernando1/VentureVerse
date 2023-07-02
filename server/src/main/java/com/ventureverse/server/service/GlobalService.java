package com.ventureverse.server.service;

import com.ventureverse.server.model.normal.AuthenticationResponseDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.enumeration.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class GlobalService {

    static AuthenticationResponseDTO authenticationResponse(String accessToken, Integer userId, Role role) {
        return AuthenticationResponseDTO.builder()
                .accessToken(accessToken)
                .id(userId)
                .role(role)
                .build();
    }

    static ResponseDTO response(String status, String message) {
        return ResponseDTO.builder()
                .status(status)
                .message(message)
                .build();
    }

    public static String generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    public static String generateSaltedPassword(String password, String salt) {
        return password + salt;
    }

}
