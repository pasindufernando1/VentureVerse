package com.ventureverse.server.service;

import com.ventureverse.server.model.normal.AuthenticationResponseDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.enumeration.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

}
