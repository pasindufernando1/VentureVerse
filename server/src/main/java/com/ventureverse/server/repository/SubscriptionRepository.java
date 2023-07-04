package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.SubscriptionDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<SubscriptionDTO, Integer> {
}
