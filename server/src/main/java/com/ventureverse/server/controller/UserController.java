package com.ventureverse.server.controller;

import com.ventureverse.server.model.normal.DetailsDTO;
import com.ventureverse.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
