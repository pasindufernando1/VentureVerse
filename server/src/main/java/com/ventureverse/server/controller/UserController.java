package com.ventureverse.server.controller;

import com.ventureverse.server.model.normal.DetailsDTO;
import com.ventureverse.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
