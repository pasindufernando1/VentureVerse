package com.ventureverse.server.model.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "subscription")
public class SubscriptionDTO {
    @Id
    @GeneratedValue
    private Integer subscriptionId;
    private String subscriptionName;
    private String price;
    private Integer days;
}
