package com.ventureverse.server.repository;

import com.ventureverse.server.model.entity.EntreprenenrStarRatingDTO;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.entity.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ventureverse.server.enumeration.Complain;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.model.entity.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EntrepreneurStarRating extends JpaRepository<EntreprenenrStarRatingDTO, Integer> {

//    EntreprenenrStarRatingDTO findById(EntrepreneurDTO entId, UserDTO userID);
}
