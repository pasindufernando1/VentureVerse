package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.repository.EntrepreneurRepository;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EntrepreneurService {

    private final EntrepreneurRepository entrepreneurRepository;

    public EntrepreneurService(EntrepreneurRepository entrepreneurRepository) {
        this.entrepreneurRepository = entrepreneurRepository;
    }

    public List<EntrepreneurDTO> findByApprovalStatus(Status status) {
        return entrepreneurRepository.findByApprovalStatus(status);
    }

    public EntrepreneurDTO findById(Integer id) {
        return entrepreneurRepository.findById(id).orElse(null);
    }

    public EntrepreneurDTO getEntrepreneurById(Integer id) {
        return entrepreneurRepository.findById(id).orElse(null);
    }

    public List<UrlResource> getPDF(Integer id) {
        //get the pdf names using the id
        List<String> pdfnames=new ArrayList<>();
        String policeReport=entrepreneurRepository.findById(id).get().getPoliceReport();
        String incomeStatement=entrepreneurRepository.findById(id).get().getIncomeStatement();
        String businessRegDoc=entrepreneurRepository.findById(id).get().getBusinessRegDoc();

        pdfnames.add(policeReport);
        pdfnames.add(incomeStatement);
        pdfnames.add(businessRegDoc);

        //get the pdfs using the names
        List<UrlResource> pdfs=new ArrayList<>();
        for(String pdfname:pdfnames){
            try{
                String rootPath = System.getProperty("user.dir");
                String path = rootPath + "/src/main/resources/static/uploads/images/regImages/" + pdfname;
                UrlResource pdf=new UrlResource(path);
                pdfs.add(pdf);
            }catch(Exception e){
                System.out.println(e);
            }
        }
        return pdfs;
    }
}
