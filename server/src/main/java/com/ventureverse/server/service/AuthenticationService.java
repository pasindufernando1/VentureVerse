package com.ventureverse.server.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ventureverse.server.config.JwtService;
import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.enumeration.TokenType;
import com.ventureverse.server.model.entity.AdminDTO;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.entity.TokenDTO;
import com.ventureverse.server.model.entity.UserDTO;
import com.ventureverse.server.model.normal.AuthenticationRequestDTO;
import com.ventureverse.server.model.normal.AuthenticationResponseDTO;
import com.ventureverse.server.model.normal.RegisterRequestDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.AdminRepository;
import com.ventureverse.server.repository.TokenRepository;
import com.ventureverse.server.repository.UserRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Value("${application.security.jwt.refresh-token.expiration}")
    private Integer refreshExpiration;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseDTO registerAdmin(HttpServletResponse response, RegisterRequestDTO registerRequestDTO ) {

        // Generate a Random Salt
        var salt = GlobalService.generateSalt();

        var user = AdminDTO.builder()
                .email(registerRequestDTO.getEmail())
                .password(passwordEncoder.encode(GlobalService.generateSaltedPassword(registerRequestDTO.getPassword() ,salt)))
                .salt(salt)
                .approvalStatus(Status.PENDING)
                .profileImage("profileImage.jpg")
                .contactNumber(registerRequestDTO.getContactNumber())
                .firstLineAddress(registerRequestDTO.getFirstLineAddress())
                .secondLineAddress(registerRequestDTO.getSecondLineAddress())
                .town(registerRequestDTO.getTown())
                .district(registerRequestDTO.getDistrict())
                .role(Role.CO_ADMIN)
                .firstname(registerRequestDTO.getFirstname())
                .lastname(registerRequestDTO.getLastname())
                .gender(registerRequestDTO.getGender())
                .nic(registerRequestDTO.getNic())
                .adminType(Role.CO_ADMIN)
                .build(); // Creates AdminDTO

        adminRepository.save(user); // Save the Record
        return GlobalService.response("Success", "Registration Pending");

    }

    public ResponseDTO registerEntrepreneur(HttpServletResponse response,RegisterRequestDTO registerRequestDTO) {
        // Generate a Random Salt
        var salt = GlobalService.generateSalt();

        var user = EntrepreneurDTO.builder()
                .email(registerRequestDTO.getEmail())
                .password(passwordEncoder.encode(GlobalService.generateSaltedPassword(registerRequestDTO.getPassword(), salt)))
                .salt(salt)
                .approvalStatus(Status.PENDING)
                .profileImage("profileImage.jpg")
                .contactNumber(registerRequestDTO.getContactNumber())
                .firstLineAddress(registerRequestDTO.getFirstLineAddress())
                .secondLineAddress(registerRequestDTO.getSecondLineAddress())
                .town(registerRequestDTO.getTown())
                .district(registerRequestDTO.getDistrict())
                .role(Role.ENTREPRENEUR)
                .firstname(registerRequestDTO.getFirstname())
                .lastname(registerRequestDTO.getLastname())
                .gender(registerRequestDTO.getGender())
                .nic(registerRequestDTO.getNic())
                .policeReport(registerRequestDTO.getPoliceReport())
                .incomeStatement(registerRequestDTO.getIncomeStatement())
                .collaboratorDetails(registerRequestDTO.getCollaboratorDetails())
                .felony(registerRequestDTO.getFelony())
                .lawSuit(registerRequestDTO.getLawSuit())
                .felonyDescription(registerRequestDTO.getFelonyDescription())
                .build(); // Creates EntrepreneurDTO

        userRepository.save(user); // Save the Record
        return GlobalService.response("Success", "Registration request sent");
    }

    public ResponseDTO authorize( HttpServletResponse response, Integer id ) {

        var user = userRepository.findById(id).orElseThrow();

        user.setApprovalStatus(Status.APPROVED);
        userRepository.save(user);

        var accessToken = jwtService.generateToken(user);
        saveUserToken(user, accessToken);

        // SEND EMAIL TO USER

        return GlobalService.response("Success", "User Approved");

    }

    public AuthenticationResponseDTO authenticate( HttpServletResponse response, AuthenticationRequestDTO authenticationRequest ) {

        var salt = userRepository.findSaltByEmail(authenticationRequest.getEmail()).orElseThrow();

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(),
                        GlobalService.generateSaltedPassword(authenticationRequest.getPassword() ,salt)
                )
        );
        var user = userRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow();
        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        updateUserToken(user, accessToken);
        creatCookie(response, refreshToken, refreshExpiration/1000);
        return GlobalService.authenticationResponse(
                accessToken,
                user.getId(),
                user.getRole()
        );
    }

    public void refreshToken( HttpServletRequest request, HttpServletResponse response ) throws IOException {

        String refreshToken = null;
        final String email;

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        if (refreshToken == null) {
            return;
        }

        email = jwtService.extractEmail(refreshToken);
        if (email != null) {
            var user = this.userRepository.findByEmail(email).orElseThrow();

            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                updateUserToken(user, accessToken);
                var authResponse = AuthenticationResponseDTO.builder()
                        .accessToken(accessToken)
                        .id(user.getId())
                        .role(user.getRole())
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }

    }

    public ResponseDTO logout(HttpServletRequest request, HttpServletResponse response ) {

        String authHeader = request.getHeader("Authorization");
        String jwt;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return GlobalService.response("Error", "Logout Failed" );
        }

        jwt = authHeader.substring(7);
        var email = jwtService.extractEmail(jwt);
        var user = this.userRepository.findByEmail(email).orElseThrow();
        revokeAllUserTokens(user);
        creatCookie(response,"",0);

        return GlobalService.response("Success", "" );

    }

    private void creatCookie(HttpServletResponse response, String refreshToken, Integer MaxAge) {
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);  // Make the cookie accessible only through HTTP
        refreshTokenCookie.setMaxAge(MaxAge);  // Set the cookie's expiration time in seconds
        refreshTokenCookie.setPath("/");  // Set the cookie's path to the root
        response.addCookie(refreshTokenCookie);
    }

    private void saveUserToken(UserDTO user, String jwtToken) {
        var token = TokenDTO.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(true)
                .revoked(true)
                .build();
        tokenRepository.save(token);
    }

    private void updateUserToken(UserDTO user, String jwtToken) {
        var storedToken = tokenRepository.findByUser_Id(user.getId()).orElse(null);
        if (storedToken != null) {
            storedToken.setToken(jwtToken);
            storedToken.setExpired(false);
            storedToken.setRevoked(false);
            tokenRepository.save(storedToken);
        }
    }

    private void revokeAllUserTokens(UserDTO user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token->{
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
