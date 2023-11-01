package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.EntreprenenrStarRatingDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntrepreneurStarRating extends JpaRepository<EntreprenenrStarRatingDTO, Integer> {

//    EntreprenenrStarRatingDTO findById(EntrepreneurDTO entId, UserDTO userID);
}
