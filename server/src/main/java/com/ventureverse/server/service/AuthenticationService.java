package com.ventureverse.server.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ventureverse.server.assets.Templates;
import com.ventureverse.server.config.JwtService;
import com.ventureverse.server.enumeration.Chat;
import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.enumeration.TokenType;
import com.ventureverse.server.exception.CustomErrorException;
import com.ventureverse.server.model.entity.*;
import com.ventureverse.server.model.normal.*;
import com.ventureverse.server.repository.*;
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
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Value("${application.security.jwt.refresh-token.expiration}")
    private Integer refreshExpiration;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final TokenRepository tokenRepository;
    private final ResetRepository resetRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final EnterpriseInvestorRepository enterpriseInvestorRepository;
    private final IndividualInvestorRepository individualInvestorRepository;
    private final EntrepreneurRepository entrepreneurRepository;
    private final CredentialRepository credentialRepository;

    public ResponseDTO checkEmail(String email) {
        var user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return GlobalService.response("Error", "Email Already Exists");
        } else {
            return GlobalService.response("Success", "Email Available");
        }
    }
    public ResponseDTO checkEmailforId(String email, int Id){
        var user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            if(user.get().getId()==Id){
                return GlobalService.response("Success", "Email Existing");
            }
            else{
                return GlobalService.response("Error", "Email Already Exists");
            }
        } else {
            return GlobalService.response("Success", "Email Available");
        }
    }

    public ResponseDTO checkBusinessEmail(String email) {
        var user = entrepreneurRepository.findByBusinessEmail(email);
        if (user.isPresent()) {
            return GlobalService.response("Error", "Email Already Exists");
        } else {
            return GlobalService.response("Success", "Email Available");
        }
    }

    public ResponseDTO registerAdmin(RegisterRequestDTO registerRequestDTO) {

        // Generate a Random Salt
        var salt = GlobalService.generateSalt();

        var user = AdminDTO.builder()
                .email(registerRequestDTO.getEmail())
                .approvalStatus(Status.APPROVED)
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
                .build(); // Creates AdminDTO

        var savedUser = adminRepository.save(user); // Save the Record

        var credentials = CredentialDTO.builder()
                .user(savedUser)
                .username(savedUser.getEmail())
                .password(passwordEncoder.encode(GlobalService.generateSaltedPassword(registerRequestDTO.getPassword(), salt)))
                .salt(salt)
                .build(); // Creates CredentialsDTO

        var savedCredentials = credentialRepository.save(credentials); // Save the Record

        var accessToken = jwtService.generateToken(savedCredentials);
        saveUserToken(savedUser, accessToken);

        return GlobalService.response("Success", "Co-Admin Registration Successful");

    }

    public ResponseDTO registerEntrepreneur(RegisterRequestDTO registerRequestDTO) {

        // Generate a Random Salt
        var salt = GlobalService.generateSalt();

        var user = EntrepreneurDTO.builder()
                .email(registerRequestDTO.getEmail())
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
                .businessName(registerRequestDTO.getBusinessName())
                .businessContact(registerRequestDTO.getBusinessContact())
                .bfirstLineAddress(registerRequestDTO.getBfirstLineAddress())
                .bsecondLineAddress(registerRequestDTO.getBsecondLineAddress())
                .btown(registerRequestDTO.getBtown())
                .bdistrict(registerRequestDTO.getBdistrict())
                .businessWebsite(registerRequestDTO.getBusinessWebsite())
                .businessEmail(registerRequestDTO.getBusinessEmail())
                .businessDescription(registerRequestDTO.getBusinessDescription())
                .businessRegDoc(registerRequestDTO.getBusinessRegDoc())
                .build(); // Creates EntrepreneurDTO

        var savedUser = entrepreneurRepository.save(user); // Save the Record

        var credentials = CredentialDTO.builder()
                .user(savedUser)
                .username(savedUser.getEmail())
                .password(passwordEncoder.encode(GlobalService.generateSaltedPassword(registerRequestDTO.getPassword(), salt)))
                .salt(salt)
                .build(); // Creates CredentialsDTO

        credentialRepository.save(credentials); // Save the Record

        return GlobalService.response("Success", "Registration request sent");
    }

    public ResponseDTO registerIndividualInvestor(RegisterRequestDTO registerRequestDTO){
        // Generate a Random Salt
        var salt = GlobalService.generateSalt();

        var user= IndividualInvestorDTO.builder()
                .email(registerRequestDTO.getEmail())
                .approvalStatus(Status.PENDING)
                .profileImage("profileImage.jpg")
                .contactNumber(registerRequestDTO.getContactNumber())
                .firstLineAddress(registerRequestDTO.getFirstLineAddress())
                .secondLineAddress(registerRequestDTO.getSecondLineAddress())
                .town(registerRequestDTO.getTown())
                .district(registerRequestDTO.getDistrict())
                .role(Role.INDIVIDUAL_INVESTOR)
                .financialDocument(registerRequestDTO.getFinancialDocument())
                .badgeId(null)
                .firstname(registerRequestDTO.getFirstname())
                .lastname(registerRequestDTO.getLastname())
                .gender(registerRequestDTO.getGender())
                .nic(registerRequestDTO.getNic())
                .policeReport(registerRequestDTO.getPoliceReport())
                .build(); // Creates IndividualInvestorDTO

        var savedUser = individualInvestorRepository.save(user); // Save the Record

        var credentials = CredentialDTO.builder()
                .user(savedUser)
                .username(savedUser.getEmail())
                .password(passwordEncoder.encode(GlobalService.generateSaltedPassword(registerRequestDTO.getPassword(), salt)))
                .salt(salt)
                .build(); // Creates CredentialsDTO

        credentialRepository.save(credentials); // Save the Record

        var investor=individualInvestorRepository.getLastInsertedId();
        var listingSectors=registerRequestDTO.getSectorId();

        for (Integer sectorId:listingSectors){
            individualInvestorRepository.saveInvestorSector(investor,sectorId);
        }


        return GlobalService.response("Success", "Registration request sent");
    }

    public ResponseDTO registerEnterpriseInvestor(RegisterRequestDTO registerRequestDTO){
        var salt = GlobalService.generateSalt();

        var user= EnterpriseInvestorDTO.builder()
                .email(registerRequestDTO.getEmail())
                .approvalStatus(Status.PENDING)
                .profileImage("profileImage.jpg")
                .contactNumber(registerRequestDTO.getContactNumber())
                .firstLineAddress(registerRequestDTO.getFirstLineAddress())
                .secondLineAddress(registerRequestDTO.getSecondLineAddress())
                .town(registerRequestDTO.getTown())
                .district(registerRequestDTO.getDistrict())
                .role(Role.ENTERPRISE_INVESTOR)
                .businessRegistration(registerRequestDTO.getBusinessRegistration())
                .businessName(registerRequestDTO.getBusinessName())
                .financialDocument(registerRequestDTO.getFinancialDocument())
                .badgeId(null)
                .build();

        var savedUser = enterpriseInvestorRepository.save(user); // Save the Record

        var credentials = CredentialDTO.builder()
                .user(savedUser)
                .username(savedUser.getEmail())
                .password(passwordEncoder.encode(GlobalService.generateSaltedPassword(registerRequestDTO.getPassword(), salt)))
                .salt(salt)
                .build(); // Creates CredentialsDTO

        credentialRepository.save(credentials); // Save the Record

        //get the last inserted id
        var investor= enterpriseInvestorRepository.getLastInsertedId();
        var listingSectors=registerRequestDTO.getSectorId();

        for (Integer sectorId:listingSectors){
            enterpriseInvestorRepository.saveInvestorSector(investor,sectorId);
        }

        return GlobalService.response("Success", "Registration request sent");

    }

    public ResponseDTO authorize(String status, Integer id) {

        if (userRepository.findApprovalById(id).equals(Status.APPROVED)) {
            return GlobalService.response("Success", "User " + id + " Already Approved");
        }

        if (status.equals("decline")) {
            userRepository.findById(id).ifPresent(user -> {
                user.setApprovalStatus(Status.DELETED);
                userRepository.save(user);
            }
            );
            return GlobalService.response("Success", "Registration of User " + id + " is Declined");
        }

        var user = userRepository.findById(id).orElseThrow();
        var date = new Date();

        user.setApprovalStatus(Status.APPROVED);
        user.setRegisteredDate(date);
        userRepository.save(user);

        var credentials = credentialRepository.findByUsername(user.getEmail()).orElseThrow(() -> new CustomErrorException("Credentials Not Found"));

        var accessToken = jwtService.generateToken(credentials);
        saveUserToken(user, accessToken);

        // SEND EMAIL TO USER
        emailService.sendEmail(user.getEmail(), "Test", "string");

        return GlobalService.response("Success", "User " + id + " Approved");
    }

    public AuthenticationResponseDTO authenticate(HttpServletResponse response, AuthenticationRequestDTO authenticationRequest) throws IOException {

        var salt = credentialRepository.findSaltByEmail(authenticationRequest.getEmail()).orElseThrow();

        if (userRepository.findApprovalByEmail(authenticationRequest.getEmail()).equals(Status.PENDING)) {
            throw new CustomErrorException("User Account Not Approved");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(),
                        GlobalService.generateSaltedPassword(authenticationRequest.getPassword(), salt)
                )
        );
        var user = userRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow(() -> new CustomErrorException("User Not Found"));
        var credentials = credentialRepository.findByUsername(user.getEmail()).orElseThrow(() -> new CustomErrorException("Credentials Not Found"));
        var accessToken = jwtService.generateToken(credentials);
        var refreshToken = jwtService.generateRefreshToken(credentials);

        updateUserToken(user, accessToken);
        creatCookie(response, refreshToken, refreshExpiration / 1000);

        //Get the user image of the user
        var profileImage=userRepository.getimage(user.getId());
        System.out.println(profileImage);

        String rootDirectory = System.getProperty("user.dir");
        String imageUploadPath = rootDirectory + "/src/main/resources/static/uploads/images/profileImages";

        Path path = Paths.get(imageUploadPath,profileImage);
        byte[] image = Files.readAllBytes(path);
        System.out.println(image);

        user.setStatus(Chat.ONLINE);
        user.setLastLogin(null);
        userRepository.save(user);

        return GlobalService.authenticationResponse(
                accessToken,
                user.getId(),
                user.getRole(),
                image
        );
    }

    public ResponseDTO forgotPassword(String email) {

        if (userRepository.findApprovalByEmail(email).equals(Status.PENDING)) {
            throw new CustomErrorException("User Account Not Approved");
        }

        var user = userRepository.findByEmail(email).orElseThrow(() -> new CustomErrorException("User Not Found"));
        var credentials = credentialRepository.findByUsername(user.getEmail()).orElseThrow(() -> new CustomErrorException("Credentials Not Found"));
        var token = jwtService.generateForgotPasswordToken(credentials);
        emailService.sendEmail(email, "Reset Password", Templates.forgetPasswordTemp("http://localhost:3000/reset-password/" + token));
        saveResetToken(user, token);
        return GlobalService.response("Success", "Email Sent");
    }

    public ResponseDTO resetPassword(String password, String token) {

        var reset = resetRepository.findByToken(token).orElseThrow(() -> new CustomErrorException("Token Not Found"));

        if (reset.isExpired()) {
            return GlobalService.response("Error", "Token Expired");
        }

        if (password.equals("Token Check")) {
            return GlobalService.response("Alert", "Token Valid");
        }

        var email = jwtService.extractEmail(token);
        var credential = credentialRepository.findByUsername(email).orElseThrow(() -> new CustomErrorException("Credentials Not Found"));
        credential.setPassword(passwordEncoder.encode(GlobalService.generateSaltedPassword(password, credential.getSalt())));
        credentialRepository.save(credential);

        reset.setExpired(true);
        resetRepository.save(reset);

        return GlobalService.response("Success", "Password Reset");
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {

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
            var user = this.userRepository.findByEmail(email).orElseThrow(() -> new CustomErrorException("User Not Found"));
            var credentials = credentialRepository.findByUsername(user.getEmail()).orElseThrow(() -> new CustomErrorException("Credentials Not Found"));

            if (jwtService.isTokenValid(refreshToken, credentials)) {
                var accessToken = jwtService.generateToken(credentials);
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

    public ResponseDTO logout(HttpServletRequest request, HttpServletResponse response) {

        String authHeader = request.getHeader("Authorization");
        String jwt;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return GlobalService.response("Error", "Logout Failed");
        }

        jwt = authHeader.substring(7);
        var email = jwtService.extractEmail(jwt);
        var user = this.userRepository.findByEmail(email).orElseThrow();
        revokeAllUserTokens(user);
        creatCookie(response, "", 0);

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        user.setLastLogin(timestamp);
        userRepository.save(user);

        return GlobalService.response("Success", "");

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

    private void saveResetToken(UserDTO user, String jwtToken) {
        var token = ResetDTO.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.RESET_PASSWORD)
                .expired(false)
                .build();
        resetRepository.save(token);
    }

    private void revokeAllUserTokens(UserDTO user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    
}
