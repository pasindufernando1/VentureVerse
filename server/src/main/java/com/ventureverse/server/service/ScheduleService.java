package com.ventureverse.server.service;

import com.ventureverse.server.exception.CustomErrorException;
import com.ventureverse.server.exception.CustomExceptionHandler;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.entity.InvestorDTO;
import com.ventureverse.server.model.entity.ScheduleDTO;
import com.ventureverse.server.model.normal.DetailsDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.InvestorRepository;
import com.ventureverse.server.repository.ScheduleRepository;
import com.ventureverse.server.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final InvestorRepository investorRepository;

    public List<ScheduleDTO> getAllSchedules(Integer id) {
        var investor = investorRepository.findById(id).orElseThrow(() -> new CustomErrorException("User Not Found"));

        List<ScheduleDTO> name= scheduleRepository.findByInvestorId(investor);
        if(name !=null){
            return name;
        }
        else{
            return null;
        }

    }

    public ResponseDTO addSchedule(Integer id, ScheduleDTO scheduleDTO) {
        try {
            var schedule = ScheduleDTO.builder()
                            .title(scheduleDTO.getTitle())
                            .time(scheduleDTO.getTime())
                            .date(scheduleDTO.getDate())
                            .investorId(scheduleDTO.getInvestorId())
                            .entrepreneurId(scheduleDTO.getEntrepreneurId())
                            .build();
            scheduleRepository.save(schedule);
            return new ResponseDTO("Schedule added successfully", "true");
        } catch (Exception e) {
            return new ResponseDTO("Failed to add schedule.", "false");
        }
    }


    public List<ScheduleDTO> getAllSchedulesEntrepreneur(Integer id) {
        List<ScheduleDTO> name= scheduleRepository.findByEntrepreneurId(id);
        System.out.println(name);
        if(name !=null){
            return name;
        }
        else{
            System.out.println("null");
            return null;
        }
    }
}
