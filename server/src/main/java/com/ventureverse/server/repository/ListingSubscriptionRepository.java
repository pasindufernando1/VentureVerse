package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.ListingSubscriptionDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingSubscriptionRepository extends JpaRepository<ListingSubscriptionDTO, Integer> {
}
