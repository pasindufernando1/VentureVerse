package com.ventureverse.server.controller;

import com.ventureverse.server.model.entity.ListingDTO;
import com.ventureverse.server.model.normal.DetailsDTO;
import com.ventureverse.server.service.VisitorService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class VisitorController {

    private final VisitorService visitorService;
    @GetMapping("/home")
    public ResponseEntity<Object> home() throws IOException {
        return ResponseEntity.ok(visitorService.home());
    }

    @GetMapping("/home/{video}")
    public ResponseEntity<Resource> getVideo(@PathVariable String video) {

        String rootDirectory = System.getProperty("user.dir");
        Resource videoResource = new ClassPathResource("/static/uploads/videos/" + video);

        MediaType mediaType = MediaTypeFactory.getMediaType(videoResource).orElse(MediaType.APPLICATION_OCTET_STREAM);
        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(videoResource);

    }

}
