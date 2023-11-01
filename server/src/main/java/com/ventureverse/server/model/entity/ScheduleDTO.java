package com.ventureverse.server.model.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "schedule")
@PrimaryKeyJoinColumn(name = "meetingId")

public class ScheduleDTO {
    @Id
    @GeneratedValue
    private Integer meetingId;
    private String title;
    private Date date;
    private Time time;

    @ManyToOne
    @JoinColumn(name = "entrepreneurId", referencedColumnName = "id")
    private EntrepreneurDTO entrepreneurId;

    @ManyToOne
    @JoinColumn(name="investorId",referencedColumnName = "id")
    private InvestorDTO investorId;
}
