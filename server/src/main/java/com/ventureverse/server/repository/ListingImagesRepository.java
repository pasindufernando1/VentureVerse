package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.ListingImagesDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingImagesRepository extends JpaRepository<ListingImagesDTO, Integer> {
}
