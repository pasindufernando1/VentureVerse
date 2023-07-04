package com.ventureverse.server.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "industry-sector")
public class IndustrySectorDTO {

    @Id
    @GeneratedValue
    private Integer sectorId;
    private String sectorName;

}
