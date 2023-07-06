package com.ventureverse.server.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ventureverse.server.config.JwtService;
import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.enumeration.TokenType;
import com.ventureverse.server.model.entity.AdminDTO;
import com.ventureverse.server.model.entity.TokenDTO;
import com.ventureverse.server.model.entity.UserDTO;
import com.ventureverse.server.model.normal.AuthenticationRequestDTO;
import com.ventureverse.server.model.normal.AuthenticationResponseDTO;
import com.ventureverse.server.model.normal.RegisterRequestDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.AdminRepository;
import com.ventureverse.server.repository.TokenRepository;
import com.ventureverse.server.repository.UserRepository;
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
    private final EmailService emailService;

    public ResponseDTO registerAdmin(HttpServletResponse response, RegisterRequestDTO registerRequestDTO) {

        // Generate a Random Salt
        var salt = GlobalService.generateSalt();

        var user = AdminDTO.builder()
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

    public ResponseDTO authorize(HttpServletResponse response, String status, Integer id) {

        if (userRepository.findApprovalById(id).equals(Status.APPROVED)) {
            return GlobalService.response("Success", "User " + id + " Already Approved");
        }

        if (status.equals("decline")) {
            userRepository.deleteById(id);
            return GlobalService.response("Success", "Registration of User " + id + " is Declined");
        }

        var user = userRepository.findById(id).orElseThrow();

        user.setApprovalStatus(Status.APPROVED);
        userRepository.save(user);

        var accessToken = jwtService.generateToken(user);
        saveUserToken(user, accessToken);

        // SEND EMAIL TO USER
        emailService.sendEmail(user.getEmail(), "Test", string);

        return GlobalService.response("Success", "User " + id + " Approved");

    }

    public AuthenticationResponseDTO authenticate(HttpServletResponse response, AuthenticationRequestDTO authenticationRequest) {

        var salt = userRepository.findSaltByEmail(authenticationRequest.getEmail()).orElseThrow();

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(),
                        GlobalService.generateSaltedPassword(authenticationRequest.getPassword(), salt)
                )
        );
        var user = userRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow();
        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        updateUserToken(user, accessToken);
        creatCookie(response, refreshToken, refreshExpiration / 1000);
        return GlobalService.authenticationResponse(
                accessToken,
                user.getId(),
                user.getRole()
        );
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

    String string = "<!DOCTYPE html>\n" +
            "<html lang=\"en\">\n" +
            "\n" +
            "<head>\n" +
            "    <title>MicroCAPS</title>\n" +
            "    <link href=\"../../../../../../../../client/public/favicon.ico\" rel=\"Shortcut icon\" type=\"image/x-icon\">\n" +
            "    <meta name=\"modern-charset\" charset=\"UTF-8\">\n" +
            "    <meta name=\"email-subject\" content=\"\">\n" +
            "    <meta name=\"email-preheader\" content=\"\">\n" +
            "    <meta name=\"iterable-unsub\" content=<meta name=\"format-detection\" content=\"address=no, telephone=no, date=no, email=no\">\n" +
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
            "    <meta name=\"color-scheme\" content=\"light dark\">\n" +
            "    <meta name=\"supported-color-schemes\" content=\"light dark\">\n" +
            "    <meta name=\"ie-compatibility\" content=\"IE=edge\" http-equiv=\"X-UA-Compatible\">\n" +
            "\n" +
            "    <style>\n" +
            "\n" +
            "        body {\n" +
            "            margin: 0; \n" +
            "            padding: 0; \n" +
            "            background-color: #f0f2f3;\n" +
            "            display: flex;\n" +
            "            flex-direction: column;\n" +
            "            justify-content: center;\n" +
            "            height: 100vh;\n" +
            "        }\n" +
            "\n" +
            "        .padding-15 {\n" +
            "            padding-bottom:15px;\n" +
            "            font-weight: bold;\n" +
            "        }\n" +
            "\n" +
            "        .event {\n" +
            "            border: none;\n" +
            "            border-collapse: collapse;\n" +
            "            border-spacing: 0;\n" +
            "            margin: auto;\n" +
            "            max-width: 600px;\n" +
            "            padding-top: 50px;\n" +
            "            background: white;\n" +
            "        }\n" +
            "\n" +
            "        .event-nl-04 {\n" +
            "            font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, sans-serif;\n" +
            "            color: #000000;\n" +
            "        }\n" +
            "\n" +
            "        .container {\n" +
            "            margin: 0 auto;\n" +
            "            border: none;\n" +
            "            border-collapse: collapse;\n" +
            "            border-spacing: 0;\n" +
            "            table-layout: auto;\n" +
            "        }\n" +
            "\n" +
            "        .event .masthead {\n" +
            "            font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, sans-serif;\n" +
            "            color: #000000;\n" +
            "            padding: 25px;\n" +
            "            background: #252f3d;\n" +
            "            display: flex;\n" +
            "            flex-wrap: wrap;\n" +
            "            justify-content: center;\n" +
            "        }\n" +
            "\n" +
            "        .logo-color {\n" +
            "            display: block;\n" +
            "            border: none;\n" +
            "            width: 145px;\n" +
            "            width: 10rem;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .section-1 .section { \n" +
            "            border-top: 1px solid #D9D9D9;\n" +
            "            border-bottom: 1px solid #D9D9D9;\n" +
            "            font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, sans-serif;\n" +
            "            color: #000000;\n" +
            "            padding: 25px;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .section-1 .section .event-nl-feature-module {\n" +
            "            border: none;\n" +
            "            border-collapse: collapse;\n" +
            "            border-spacing: 0;\n" +
            "            mso-table-lspace: 0pt;\n" +
            "            mso-table-rspace: 0pt;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .section-1 .section .event-nl-feature-module .subtitle {\n" +
            "            background-color:#fff;\n" +
            "            color:#444;\n" +
            "            font-family:'Amazon Ember','Helvetica Neue',Roboto,Arial,sans-serif;\n" +
            "            font-size:14px;\n" +
            "            line-height:140%;\n" +
            "            padding:25px 35px;\n" +
            "            text-align:center\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .section-1 .section .event-nl-feature-module .code {\n" +
            "            color: #000;\n" +
            "            font-size: 36px;\n" +
            "            font-weight: bold;\n" +
            "        }\n" +
            "        \n" +
            "\n" +
            "        .event .event-nl-04 .section-1 .section .event-nl-feature-module .tag-row {\n" +
            "            padding-bottom: 13px;\n" +
            "            \n" +
            "            font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, sans-serif;\n" +
            "            color: #000000;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .section-1 .section .event-nl-feature-module .tag-row .tag,\n" +
            "        .event .event-nl-04 .section-1 .section .event-nl-feature-module .copy .tag {\n" +
            "            border: none;\n" +
            "            border-collapse: collapse;\n" +
            "            border-spacing: 0;\n" +
            "            mso-table-lspace: 0pt;\n" +
            "            mso-table-rspace: 0pt;\n" +
            "            width: 100%;\n" +
            "            text-align: center;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .section-1 .section .event-nl-feature-module .tag-row .txt {\n" +
            "            color: #096ED1;\n" +
            "            font-size: 30px;\n" +
            "            font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, sans-serif;\n" +
            "            white-space: wrap;\n" +
            "            font-weight: bold;\n" +
            "            text-align: center;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .section-1 .section .event-nl-feature-module .copy {\n" +
            "            color: #000000;\n" +
            "            font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, sans-serif;\n" +
            "            font-size: 16px;\n" +
            "            font-weight: normal;\n" +
            "            line-height: 26px;\n" +
            "            padding: 0 0 25px;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .footer {\n" +
            "            \n" +
            "            font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, sans-serif;\n" +
            "            color: #000000;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .footer .footer-v2 {\n" +
            "            border: none;\n" +
            "            border-collapse: collapse;\n" +
            "            border-spacing: 0;\n" +
            "            mso-table-lspace: 0pt;\n" +
            "            mso-table-rspace: 0pt;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .footer .footer-v2 .txt {\n" +
            "            padding-bottom: 26px;\n" +
            "            font-size: 12px;\n" +
            "            line-height: 18px;\n" +
            "            \n" +
            "            font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, sans-serif;\n" +
            "            color: #000000;\n" +
            "            text-align: center;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .footer .footer-v2 .txt .address {\n" +
            "            color: #000000;\n" +
            "            text-decoration: none;\n" +
            "            \n" +
            "            cursor: text;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .footer .links {\n" +
            "            \n" +
            "            font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, sans-serif;\n" +
            "            color: #000000;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .footer .links .options {\n" +
            "            border: none;\n" +
            "            border-collapse: collapse;\n" +
            "            border-spacing: 0;\n" +
            "            mso-table-lspace: 0pt;\n" +
            "            mso-table-rspace: 0pt;\n" +
            "            width: 100%;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .footer .links .options .left,\n" +
            "        .event .event-nl-04 .footer .links .options .right {\n" +
            "            \n" +
            "            font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, sans-serif;\n" +
            "            color: #000000;\n" +
            "            white-space: nowrap;\n" +
            "            text-align: right;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .footer .links .options .bottom {\n" +
            "            border-bottom-width: 1px;\n" +
            "            border-bottom-style: solid;\n" +
            "            border-bottom-color: #D9D9D9;\n" +
            "            font-size: 8px;\n" +
            "            letter-spacing: 1px;\n" +
            "            line-height: 22px;\n" +
            "            padding: 1rem;\n" +
            "            text-decoration: none;\n" +
            "            color: #000000;\n" +
            "            text-align: center;\n" +
            "            text-transform: uppercase;\n" +
            "            font-weight: bold;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .footer .links .options .right {\n" +
            "            padding: 0 30px;\n" +
            "            text-align: left;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .section-1 .section .event-nl-feature-module .copy .tag .th {\n" +
            "            padding: 0.5rem 0;\n" +
            "            background-color: #1B2B65;\n" +
            "            border: 1px solid white;\n" +
            "            color: white;\n" +
            "            text-transform: uppercase;\n" +
            "            font-family: \"Montserrat\", sans-serif;\n" +
            "            font-size: 12px;\n" +
            "            color: #fff;\n" +
            "            width: 50%;\n" +
            "        }\n" +
            "\n" +
            "        .event .event-nl-04 .section-1 .section .event-nl-feature-module .copy .tag .td {\n" +
            "            padding: 0.5rem 0;\n" +
            "            border-bottom: 0.5px solid #D9D9D9;\n" +
            "            color: #4d565a;\n" +
            "            text-transform: uppercase;\n" +
            "            font-family: \"Montserrat\", sans-serif;\n" +
            "            font-size: 12px;\n" +
            "            width: 50%;\n" +
            "        }\n" +
            "    \n" +
            "\n" +
            "        @media only screen and (max-width:599px) {\n" +
            "\n" +
            "            .footer .footer-v2 .options .left {\n" +
            "                padding: 0 0 20px 0 !important;\n" +
            "                white-space: normal !important;\n" +
            "                width: 100% !important\n" +
            "            }\n" +
            "\n" +
            "            .footer .footer-v2 .options .right {\n" +
            "                padding: 0 0 20px 0 !important;\n" +
            "                white-space: normal !important;\n" +
            "                width: 100% !important\n" +
            "            }\n" +
            "\n" +
            "            .footer .footer-v2 .options td {\n" +
            "                text-align: center !important\n" +
            "            }\n" +
            "\n" +
            "            .footer .footer-v2 .options td a {\n" +
            "                font-size: 12px !important;\n" +
            "                white-space: normal !important;\n" +
            "                padding-bottom: 2px !important;\n" +
            "                line-height: 28px !important\n" +
            "            }\n" +
            "\n" +
            "            .container {\n" +
            "                width: 100% !important;\n" +
            "                table-layout: fixed !important\n" +
            "            }\n" +
            "\n" +
            "            .event .footer {\n" +
            "                padding-left: 25px !important;\n" +
            "                padding-right: 25px !important\n" +
            "            }\n" +
            "\n" +
            "            .copy {\n" +
            "                font-size: 18px !important;\n" +
            "                line-height: 32px !important\n" +
            "            }\n" +
            "\n" +
            "            table.stacked tr.stacked-row td.stacked-cell {\n" +
            "                display: block !important;\n" +
            "                width: 100% !important\n" +
            "            }\n" +
            "\n" +
            "            .full-width {\n" +
            "                width: 100% !important\n" +
            "            }\n" +
            "\n" +
            "            .event .masthead {\n" +
            "                padding: 0 !important;\n" +
            "                background-color: #fff !important\n" +
            "            }\n" +
            "\n" +
            "            .event .masthead a {\n" +
            "                display: block !important;\n" +
            "                background-image: url('https://i.ibb.co/D4zqn6t/Email-Banner.png') !important;\n" +
            "                background-repeat: no-repeat !important;\n" +
            "                background-size: cover !important;\n" +
            "                width: 100% !important;\n" +
            "                height: auto !important;\n" +
            "                min-height: 88px !important\n" +
            "            }\n" +
            "\n" +
            "            .event .masthead a img {\n" +
            "                display: none !important\n" +
            "            }\n" +
            "        }\n" +
            "\n" +
            "        @media(prefers-color-scheme:dark) {\n" +
            "\n" +
            "            .footer .footer-v2 .options td .print {\n" +
            "                border-bottom: 1px solid #D9D9D9 !important\n" +
            "            }\n" +
            "\n" +
            "            .footer .footer-v2 .options td .contact {\n" +
            "                border-bottom: 1px solid #D9D9D9 !important\n" +
            "            }\n" +
            "\n" +
            "            body {\n" +
            "                background: #201f24 !important\n" +
            "            }\n" +
            "\n" +
            "            .address {\n" +
            "                color: #fff !important\n" +
            "            }\n" +
            "\n" +
            "            .black {\n" +
            "                color: #fff !important\n" +
            "            }\n" +
            "\n" +
            "            .copy {\n" +
            "                color: #fff !important\n" +
            "            }\n" +
            "\n" +
            "            td {\n" +
            "                color: #fff !important\n" +
            "            }\n" +
            "\n" +
            "            .green {\n" +
            "                color: #096ED1 !important\n" +
            "            }\n" +
            "\n" +
            "            a {\n" +
            "                color: #096ED1 !important\n" +
            "            }\n" +
            "        }\n" +
            "\n" +
            "        img {\n" +
            "            border: 0;\n" +
            "            display: block\n" +
            "        }\n" +
            "\n" +
            "        @media only screen and (max-width:375px) and (prefers-color-scheme:dark) {\n" +
            "            .event .masthead {\n" +
            "                padding: 0 !important;\n" +
            "                background-color: #fff !important\n" +
            "            }\n" +
            "\n" +
            "            .event .masthead a {\n" +
            "                display: block !important;\n" +
            "                background-image: url('https://i.ibb.co/fHLjK4L/logo.png') !important;\n" +
            "                background-repeat: no-repeat !important;\n" +
            "                background-size: cover !important;\n" +
            "                width: 100% !important;\n" +
            "                height: auto !important;\n" +
            "                min-height: 88px !important\n" +
            "            }\n" +
            "\n" +
            "            .event .masthead a img {\n" +
            "                display: none !important\n" +
            "            }\n" +
            "        }\n" +
            "    </style>\n" +
            "\n" +
            "</head>\n" +
            "\n" +
            "<body>\n" +
            "    <table role=\"presentation\" aria-hidden=\"true\" width=\"100%\" class=\"bg event\" cellpadding=\"0\" cellspacing=\"0\">\n" +
            "        <tr>\n" +
            "            <td valign=\"top\" class=\"event-nl-04 EMAIL-2238\">\n" +
            "                <table role=\"presentation\" aria-hidden=\"true\" width=\"600\" class=\"container full-width\" cellpadding=\"0\"\n" +
            "                    cellspacing=\"0\">\n" +
            "                    <tr>\n" +
            "                        <td class=\"masthead \" valign=\"middle\">\n" +
            "                            <!-- start of logo badge -->\n" +
            "                            <img src=\"https://i.ibb.co/s1bvXHy/Venture-Verse-Email-Logo.png\" alt=\"MicroCAPS\"\n" +
            "                                    title=\"Evernote\" class=\"logo-color\">\n" +
            "                            <!-- end of logo badge -->\n" +
            "                        </td>\n" +
            "                    </tr>\n" +
            "                    <tr class=\"section-1\">\n" +
            "                        <td class=\"section hr-bot\">\n" +
            "                            <!-- start of event-nl-feature-module -->\n" +
            "                            <table role=\"presentation\" aria-hidden=\"true\" width=\"100%\"\n" +
            "                                class=\"event-nl-feature-module full-width\" cellpadding=\"0\" cellspacing=\"0\">\n" +
            "                                <tr>\n" +
            "                                    <td class=\"tag-row\">\n" +
            "                                        <table role=\"presentation\" aria-hidden=\"true\" class=\"tag\"\n" +
            "                                            cellpadding=\"0\" cellspacing=\"0\">\n" +
            "                                            <tr>\n" +
            "                                                <td valign=\"bottom\" class=\"col-right txt\">\n" +
            "                                                    Verify Your Email Address\n" +
            "                                                </td>\n" +
            "                                            </tr>\n" +
            "                                        </table>\n" +
            "                                    </td>\n" +
            "                                </tr>\n" +
            "                                <tr>\n" +
            "                                    <td class=\"subtitle\">\n" +
            "                                        <div class=\"padding-15\">Verification code</div>\n" +
            "                                        <div class=\"padding-15 code\">-- code --</div>\n" +
            "                                        <div>(This code is valid for 10 minutes)</div>\n" +
            "                                    </td>\n" +
            "                                </tr>\n" +
            "                            </table><!-- end of event-nl-feature-module -->\n" +
            "                        </td>\n" +
            "                    </tr>\n" +
            "                    <tr>\n" +
            "                        <td dir=\"ltr\" class=\"footer section\">\n" +
            "                            <table role=\"presentation\" aria-hidden=\"true\" width=\"100%\" class=\"footer-v2\" cellpadding=\"0\"\n" +
            "                                cellspacing=\"0\">\n" +
            "                                <tr>\n" +
            "                                    <td valign=\"top\" class=\"links\">\n" +
            "                                        <table role=\"presentation\" aria-hidden=\"true\" width=\"1\"\n" +
            "                                            class=\"options stacked full-width\" cellpadding=\"0\" cellspacing=\"0\">\n" +
            "                                            <tr class=\"stacked-row\">\n" +
            "                                                <td valign=\"top\" class=\"stacked-cell black bold uppercase\">\n" +
            "                                                    <div class=\"bottom\">\n" +
            "                                                        Web Services will never email you and ask you to disclose or verify your password, credit card, or banking account number.\n" +
            "                                                    </div> \n" +
            "                                                </td>\n" +
            "                                                <!-- <td valign=\"top\" class=\"right txt-nowrap stacked-cell\">\n" +
            "                                                    <a href=\"\" class=\"print black bold uppercase txt-nowrap\"\n" +
            "                                                        target=\"_blank\" dir=\"ltr\">Print</a>\n" +
            "                                                </td> -->\n" +
            "                                            </tr>\n" +
            "                                        </table>\n" +
            "                                    </td>\n" +
            "                                </tr>\n" +
            "                            </table>\n" +
            "                        </td>\n" +
            "                    </tr>\n" +
            "                </table>\n" +
            "            </td>\n" +
            "        </tr>\n" +
            "    </table>\n" +
            "</body>\n" +
            "\n" +
            "</html>\n";

}
