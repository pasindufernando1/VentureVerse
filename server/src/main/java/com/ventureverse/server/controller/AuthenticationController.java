package com.ventureverse.server.controller;

import com.ventureverse.server.model.normal.AuthenticationRequestDTO;
import com.ventureverse.server.model.normal.AuthenticationResponseDTO;
import com.ventureverse.server.model.normal.RegisterRequestDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register/admin")
    public ResponseEntity<ResponseDTO> register(
            HttpServletResponse response,
            @RequestBody RegisterRequestDTO registerRequestDTO
    ) {
        return ResponseEntity.ok(authenticationService.registerAdmin(response, registerRequestDTO));
    }

    @PostMapping("/register/entrepreneur")
    public ResponseEntity<ResponseDTO> registerEntrepreneur(
            HttpServletResponse response,
            @RequestBody RegisterRequestDTO registerRequestDTO
    ) {
        return ResponseEntity.ok(authenticationService.registerEntrepreneur(response, registerRequestDTO));
    }

    @PostMapping("/authorize/{status}/{id}")
    public ResponseEntity<ResponseDTO> register(
            HttpServletResponse response,
            @PathVariable String status,
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(authenticationService.authorize(response, status, id));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponseDTO> authenticate(
            HttpServletResponse response,
            @RequestBody AuthenticationRequestDTO authenticationRequestDTO
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(response, authenticationRequestDTO));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ResponseDTO> forgotPassword(
            HttpServletResponse response,
            @RequestBody AuthenticationRequestDTO authenticationRequestDTO
    ) {
        return ResponseEntity.ok(authenticationService.forgotPassword(response, authenticationRequestDTO.getEmail()));
    }

    @PostMapping("/reset-password/{token}")
    public ResponseEntity<ResponseDTO> resetPassword(
            HttpServletResponse response,
            @RequestBody AuthenticationRequestDTO authenticationRequestDTO,
            @PathVariable String token
    ) {
        return ResponseEntity.ok(authenticationService.resetPassword(response, authenticationRequestDTO.getPassword(), token));
    }

    @PostMapping("/logout")
    public ResponseEntity<ResponseDTO> logout(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(authenticationService.logout(request, response));
    }

    @GetMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authenticationService.refreshToken(request, response);
    }

}
