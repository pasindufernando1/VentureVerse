package com.ventureverse.server.model.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "subscription")
@PrimaryKeyJoinColumn(name = "subscriptionId")
public class SubscriptionDTO {
    @Id
    @GeneratedValue
    private Integer subscriptionId;
    private String subscriptionName;
    private String price;
    private Integer days;

    //Eliminate the circular reference
    @JsonBackReference
    @OneToMany(mappedBy = "subscriptionType")
    List<ListingDTO> listing;
}
