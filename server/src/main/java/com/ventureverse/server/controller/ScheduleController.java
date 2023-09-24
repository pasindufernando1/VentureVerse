package com.ventureverse.server.controller;

import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.entity.ScheduleDTO;
import com.ventureverse.server.model.normal.DetailsDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.ScheduleService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @GetMapping("/list/{id}")
    public List<ScheduleDTO> getAllSchedules(
            @PathVariable Integer id
//            @RequestBody DetailsDTO scheduleDTO
    ) {
        List<ScheduleDTO> schedules = scheduleService.getAllSchedules(id);
        return schedules;
    }


    @PostMapping("/add/{id}")
    public ResponseEntity<ResponseDTO> addSchedule(
            @PathVariable Integer id,
            @RequestBody DetailsDTO scheduleDTO
    ) {
        return ResponseEntity.ok(scheduleService.addSchedule(id,scheduleDTO));
    }

}
