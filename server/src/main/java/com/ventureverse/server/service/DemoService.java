package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Complain;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.*;
import com.ventureverse.server.model.normal.DetailsDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.*;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.lang.reflect.Array;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DemoService {
    private final UserRepository userRepository;
    private final EnterpriseInvestorRepository enterpriseInvestorRepository;
    private final IndividualInvestorRepository individualInvestorRepository;
    private final AdminRepository adminRepository;
    private final ComplainRepository complainRepository;
    private final EntrepreneurRepository entrepreneurRepository;
    private final ListingRepository listingRepository;
    private final Investor_InterestedListingRepository  investorInterestedListingRepository;
    private final InvestorRepository investorRepository;
   // private final EntrepreneurStarRating entrepreneurStarRating;

    public List<AdminDTO> details(){

        return adminRepository.findAll();
    }

    public List<ComplainDTO> findByComplains1() {
        return complainRepository.findAll();
    }

    public List<ComplainDTO> findByComplain(Complain complain) {
        return complainRepository.findByComplainType(complain);
    }


    public ComplainDTO checkComplains(Integer complainId) {
        var complain = complainRepository.findByComplainId(complainId);
        if (complain.isPresent()) {
            ComplainDTO existingComplain = complain.get();
            existingComplain.setComplainType(Complain.REJECTED);
            return complainRepository.save(existingComplain);
        }
        else {
           return null;
       }
    }

    public ComplainDTO  addComplain(Integer complainId, DetailsDTO complainRequest) {

      var complain = complainRepository.findByComplainId(complainId);

      AdminDTO getAdminOptional = adminRepository.findByAdminId(complainRequest.getAdminId());

        if (complain.isPresent()) {

            ComplainDTO existingComplain = complain.get();

            existingComplain.setActionDescription(complainRequest.getActionDescription());
            existingComplain.setAdminId(getAdminOptional);
            existingComplain.setComplainType(Complain.SOLVED);

            return complainRepository.save(existingComplain);
        }
       else
        {
            return null;
        }
    }


    public List<Object[]> entrepreneurLeaderboard() {
        List<EntrepreneurDTO> AllEntrepreneur = entrepreneurRepository.findAll();
        List<Object[]> entrepreneurContainers = new ArrayList<>();


        for (EntrepreneurDTO entrepreneurDTO : AllEntrepreneur) {
            Object[] container = new Object[6];
            int count =0;
            int Id   = entrepreneurDTO.getId();
            container[0] =Id;
            container[3] =entrepreneurDTO.getFirstname();
            container[4] =entrepreneurDTO.getLastname();
            container[5] =entrepreneurDTO.getEmail();
            Long ListCount = listingRepository.getCountById(entrepreneurDTO);
            container[1] = ListCount;



            List<ListingDTO> EntrepreneursListings = listingRepository.findAllByEntrepreneurId(entrepreneurDTO);

            for (ListingDTO listingDTO : EntrepreneursListings) {
                int TotalListInterestCount = investorInterestedListingRepository.getCountByID(listingDTO);
                count += TotalListInterestCount;
            }
            container[2] =count;

            entrepreneurContainers.add(container);
        }

        Collections.sort(entrepreneurContainers, new Comparator<Object[]>() {
            @Override
            public int compare(Object[] o1, Object[] o2) {
                Integer count1 = (Integer) o1[2];
                Integer count2 = (Integer) o2[2];
                return count2.compareTo(count1);
            }
        });

        return entrepreneurContainers;
    }





    public List<Object[]> investorLeaderboard() {
        List<InvestorDTO> AllInvestors = investorRepository.findAll();
        List<Object[]> investorsContainers = new ArrayList<>();

        for (InvestorDTO investorDTO : AllInvestors) {
            Object[] container1 = new Object[6];
            int amount =0;
            int Id   = investorDTO.getId();

            container1[0] =Id;
            EnterpriseInvestorDTO Inverstor =  enterpriseInvestorRepository.findByenterpriseinvestorId(Id);
            if(Inverstor!=null){
                container1[3]=Inverstor.getBusinessName() ;
                UserDTO Inverstor1 = userRepository.getReferenceById(Id);
                container1[5]= Inverstor1.getEmail();
            }

            else{
                IndividualInvestorDTO  Inverstor1 = individualInvestorRepository.getReferenceById(Id);
                container1[3]= Inverstor1.getFirstname();
                container1[4]= Inverstor1.getLastname();
                container1[5]= Inverstor1.getEmail();

            }

            Long ListCount = investorInterestedListingRepository.getCountByInvestorId(investorDTO);
            container1[1] = ListCount;

            List<InvestorInterestedListingDTO> InvestorsListings = investorInterestedListingRepository.findAllByInvestorId(investorDTO);

            for (InvestorInterestedListingDTO InterestedListingDTO : InvestorsListings) {

                amount +=InterestedListingDTO.getAmountFinalized() ;
            }
            container1[2] =amount;

            investorsContainers.add(container1);
        }

        Collections.sort(investorsContainers, (o1, o2) -> {
            Integer count1 = (Integer) o1[2];
            Integer count2 = (Integer) o2[2];
            return count2.compareTo(count1);
        });


        return investorsContainers;
    }

    public List<ComplainDTO> InverstorViewComplains(UserDTO id) {
        List<ComplainDTO> Complains = complainRepository.findByUserId(id);
        List<ComplainDTO> filteredComplains = new ArrayList<>();

        for (ComplainDTO complain : Complains) {
            if (!(Complain.MARKED).equals(complain.getComplainType())) {
                filteredComplains.add(complain);
            }
        }

        return filteredComplains;
    }

    public ComplainDTO MarkedComplains(Integer id)  {

        var complain=complainRepository.findById(id);

        if (complain.isPresent()) {

            ComplainDTO existingComplain = complain.get();

            existingComplain.setComplainType(Complain.MARKED);
           return complainRepository.save(existingComplain);
        }
        else{
            return null;
        }




    }

//    public EntreprenenrStarRatingDTO GivingStarRating(EntreprenenrStarRatingDTO starRating) {
//        EntrepreneurDTO entId= starRating.getId().getEntrepreneurId();
//        UserDTO userID = starRating.getId().getId();
//
//
//        EntreprenenrStarRatingDTO star = entrepreneurStarRating.findById(entId,userID);
//
////        AdminDTO getAdminOptional = adminRepository.findByAdminId(complainRequest.getAdminId());
//
//        if (star.isPresent()) {
//            star.setStarRating(starRating.starRating());
//            return entrepreneurStarRating.save(star);
//        }
//        else
//        {
//            return entrepreneurStarRating.save(starRating);
//
//        }
//
//
//    }

//    public Integer getStarCount(Integer id) {
//        EntrepreneurDTO  entrepreneur=
//     }
}
