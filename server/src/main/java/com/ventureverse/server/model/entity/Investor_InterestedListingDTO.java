package com.ventureverse.server.model.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "investor_interested_listing")
public class Investor_InterestedListingDTO implements Serializable {
    @EmbeddedId
    private CompositeKey id;
    private Integer AmountFinalized;
    private Integer ReturnEquityPercentage;
    private Integer ReturnUnitProfitPercentage;
    private String FinalizedDate;
    private String Status;
    private String InvestorProofDocument;
    private String EnterpreneurProofDocument;
    private String SystemGeneratedDocument;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Embeddable
    public static class CompositeKey implements Serializable {
        @ManyToOne(cascade = CascadeType.ALL)
        @JoinColumn(name = "investorId", referencedColumnName = "investorId")
        private InvestorDTO investorId;

        @ManyToOne(cascade = CascadeType.ALL)
        @JoinColumn(name = "listingId", referencedColumnName = "listingId")
        private ListingDTO listingId;
    }
}
