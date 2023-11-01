package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.exception.CustomErrorException;
import com.ventureverse.server.exception.CustomExceptionHandler;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.entity.InvestorDTO;
import com.ventureverse.server.model.entity.ScheduleDTO;
import com.ventureverse.server.model.normal.DetailsDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final InvestorRepository investorRepository;
    private final IndividualInvestorRepository individualInvestorRepository;
    private final EnterpriseInvestorRepository enterpriseInvestorRepository;

    public List<Map<String, String>> getAllSchedules(Integer id) {
        var investor = investorRepository.findById(id).orElseThrow(() -> new CustomErrorException("User Not Found"));

        List<ScheduleDTO> name= scheduleRepository.findByInvestorId(investor);
        List<Map<String, String>> scheduleMap = new ArrayList<>();
        for (ScheduleDTO scheduleDTO : name) {
            String entrepreneurName;
            EntrepreneurDTO entrepreneurId = scheduleDTO.getEntrepreneurId();
            if(entrepreneurId==null) {
                entrepreneurName = "Not Assigned";
            }else{
                entrepreneurName = entrepreneurId.getFirstname() + " " + entrepreneurId.getLastname();
            }
            scheduleMap.add(Map.of(
                    "title", scheduleDTO.getTitle(),
                    "time", scheduleDTO.getTime(),
                    "date", scheduleDTO.getDate(),
                    "entrepreneurName", entrepreneurName
            ));
        }
        return scheduleMap;
    }

    public ResponseDTO addSchedule(Integer id, ScheduleDTO scheduleDTO) {
        try {
            if(scheduleDTO.getEntrepreneurId().getId() == null){
                scheduleDTO.setEntrepreneurId(null);
            }else{
                scheduleDTO.setEntrepreneurId(scheduleDTO.getEntrepreneurId());
            }
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

    public ResponseDTO addScheduleEntrepreneur(Integer id, ScheduleDTO scheduleDTO) {
        try {
            if(scheduleDTO.getInvestorId().getId() == null){
                scheduleDTO.setInvestorId(null);
            }else{
                scheduleDTO.setEntrepreneurId(scheduleDTO.getEntrepreneurId());
            }
            var schedule = ScheduleDTO.builder()
                    .title(scheduleDTO.getTitle())
                    .time(scheduleDTO.getTime())
                    .date(scheduleDTO.getDate())
                    .investorId(null)
                    .entrepreneurId(scheduleDTO.getEntrepreneurId())
                    .build();
            scheduleRepository.save(schedule);
            return new ResponseDTO("Schedule added successfully", "true");
        } catch (Exception e) {
            return new ResponseDTO("Failed to add schedule.", "false");
        }
    }


    public List<Map<String, String>> getAllSchedulesEntrepreneur(Integer id) {
        List<ScheduleDTO> name= scheduleRepository.findByEntrepreneurId(id);

        List<Map<String, String>> scheduleMap = new ArrayList<>();
        for (ScheduleDTO scheduleDTO : name) {
            String investorName;
            if(scheduleDTO.getInvestorId()==null){
                investorName = "Not Assigned";
            }else {
                Role userRole = scheduleDTO.getInvestorId().getRole();
                InvestorDTO list = scheduleDTO.getInvestorId();
                if (userRole == Role.INDIVIDUAL_INVESTOR) {
                    investorName = individualInvestorRepository.findById(list.getId()).orElse(null).getFirstname() + " " + individualInvestorRepository.findById(list.getId()).orElse(null).getLastname();
                } else {
                    investorName = enterpriseInvestorRepository.findById(list.getId()).orElse(null).getBusinessName();
                }
            }
            scheduleMap.add(Map.of(
                "title", scheduleDTO.getTitle(),
                "time", scheduleDTO.getTime(),
                "date", scheduleDTO.getDate(),
                "investorName", investorName
            ));
        }
        return scheduleMap;
    }
}
