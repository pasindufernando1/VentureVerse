package com.ventureverse.server.controller;

import com.ventureverse.server.model.entity.ChatDTO;
import com.ventureverse.server.model.normal.DetailsDTO;
import com.ventureverse.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.reactivestreams.Publisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @GetMapping("/details/{id}")
    public ResponseEntity<DetailsDTO> getDetails(
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(userService.getDetails(id));
    }

    @GetMapping("/chat/{id}")
    public ResponseEntity<List<DetailsDTO>> getChats(
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(userService.getChats(id));
    }

    @GetMapping("/profileImage/{id}")
    public ResponseEntity<byte []> getImage(
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(userService.getProfileImage(id));
    }

    @GetMapping("/getusers")
    public ResponseEntity<List<Map<String, String>>> getUsers() {
        List<Map<String, String>> users = userService.getUsers();
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping("/getusersignup")
    public ResponseEntity<List<Map<String, String>>> getUsersSignup() {
        List<Map<String, String>> users = userService.getUsersSignup();
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping("/getuserregistration")
    public ResponseEntity<List<Map<String, String>>> getUserRegistration() {
        List<Map<String, String>> users = userService.getUserRegistration();
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping("/getTopcomplains")
    public ResponseEntity<List<Map<String, String>>> getTopcomplains() {
        List<Map<String, String>> users = userService.getTopcomplains();
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(users);
    }


}
