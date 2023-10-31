import React from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {Navbar, Footer} from "../webcomponent";

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

const Description = () => {
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <div className="flex flex-col justify-between items-center w-full overflow-hidden px-32 m-24">
            <h1 className="text-2xl text-purple-600 m-4 md:text-4xl ">Terms and Conditions</h1>
            <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(1)}>Eligibility</AccordionHeader>
                <AccordionBody>
                    <p className="text-justify">Please note that to be eligible to apply,
                        you must meet the following criteria, which are subject
                        to change by Venture Verse at its sole discretion:
                    </p>
                    <p className="text-justify">
                        Restriction on Public Office Candidacy:
                        You must not be a candidate for public office and agree not to become a candidate for public office from the date of the Audition Release until one (1) year after the initial broadcast of the last episode of the Series in which you appear (if applicable).
                    </p>
                    <p className="text-justify">Felony Conviction: You must not have been convicted of a felony in the previous 10 years unless the conviction has been expunged.
                    </p>
                    <p className="text-justify">
                        Background Check: You must agree to voluntarily submit to a background check.
                    </p>
                    <p className="text-justify">
                        I acknowledge and agree that Venture Verse reserves the right to disqualify any individual, at its sole discretion, who is sufficiently acquainted with any person or entity involved in the development, production, or exhibition of the Series, if their participation could create the appearance of impropriety.
                    </p>
                    <p className="text-justify">
                        I understand and agree that Venture Verse has the sole authority to determine participant eligibility, and the Producer reserves the right to modify any of the eligibility requirements at any time.
                    </p>
                    <p className="text-justify">
                        By submitting your application, you acknowledge and agree that your submission is solely for the purpose of being considered by Venture Verse for participation on Venture Verse. You understand that you will not receive any compensation or credit for making the submission. If the applicant is a minor, you affirm that you are the parent or legal guardian of the minor, authorized to apply on their behalf, and you are submitting and signing the application on their behalf. By making a submission, you are accepting and agreeing to the Venture Verse Terms of Use. You acknowledge that your email submission is not confidential and is not submitted in confidence or trust. No confidential or fiduciary relationship is intended or created by making an email submission. By making a submission, you hereby release Venture Verse and its administrators, directors, officers, shareholders, employees, licensees, assigns, and successors from any and all claims related to your email submission. This includes, but is not limited to, any claims arising from the risk of misdirection or misdelivery of your email.
                    </p>
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(2)}>
                    Grant of rights
                </AccordionHeader>
                <AccordionBody>
                    <ul className="list-disc pl-6">
                        <li className="mb-4">
                            <p className="text-justify">
                                All rights of every kind and character whatsoever, whether now known or hereafter devised, in perpetuity throughout the universe in and to (i) any and all footage, tapes and/or other recordings taped, filmed, photographed, recorded and/or otherwise produced hereunder depicting me and any performances or actions made by me, (ii) material supplied by me (whether scripted or unscripted, written, spoken, sung, or otherwise uttered or expressed by me) and information given by me and/or captured on any such footage, tapes, and/or recordings ("Statements"), and (iii) all of the results and proceeds thereof (collectively, (i), (ii) and (iii) shall be referred to as the "Material"). I acknowledge that the Material is specially ordered by Producer for use as part of an audiovisual work and shall be considered a work made for hire for Venture verse entity shall be the author and copyright owner thereof for all purposes throughout the universe in perpetuity. To the extent that such Material is not deemed a work-for-hire in any jurisdiction, I irrevocably assign, transfer and convey such Material to Venture Verse entity including, without limitation, all copyrights, renewals, and extensions of copyrights therein, in all media now known or hereafter devised, throughout the universe in perpetuity For the avoidance of doubt, the Material shall include neither the Business Indicia nor any other intellectual property relating to my business
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                The irrevocable right to reproduce, edit, dub, subtract from, add to, modify or juxtapose the Likeness, Business Indicia, Statements and/or Material in any manner and to combine them with any other material. I understand, acknowledge and agree that Venture Verse entity shall have no obligation to use any of the Likeness, Business Indicia, Statements and/or Material in or in connection with the platform.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                The irrevocable, perpetual, nonexclusive right to use, copy, digitize, sublicense, transmit, distribute publicly perform, publish, display, and make any other uses of the Likeness, Business Indicia, Statements, whether or not embodied in the Material, in any media now known or hereafter devised, throughout the universe, in and in connection with the Series, including without limitation the advertising, promotion, marketing or exploitation of the Series (including without limitation commercial tie-ins and the exploitation of any allied, ancillary and subsidiary rights in and to the Platform), and the business activities of Producer, SPT and Network
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                I understand, acknowledge and agree that the Venture Verse entity may exercise any aspect of the foregoing granted rights without review by, me or any other party, except as prohibited by law.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                I grant the rights hereunder whether or not I am selected join venture verse platform.I release Releasees (as that term is defined herein below) from any and all liability arising out of its use of the Likeness, Business Indicia, Statements and/or the Material, and I agree not to make any claim against Releasees as a result of the recording or use of the Likeness, Business Indicia, Statements and/or the Materials (including, without limitation, any claim that such use invades any right of privacy and/or publicity and/or any claims based on defamation, libel and/or false light and/or copyright, trademark or patent infringement)
                            </p>
                        </li>
                    </ul>
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(3)}>
                    Representations and Warranties
                </AccordionHeader>
                <AccordionBody>
                    <p className="text-justify">
                        I hereby represent and warrant that: (i) I, alone or in concert with any collaborators listed below (collectively "Collaborators"), have the right to grant the rights granted hereunder, (ii) L alone or in concert with any Collaborators, have the right to enter into this Agreement; (iii) I, alone or in concert with any Collaborators, own and control all rights in and to the idea, product, invention, service or business that I desire to present as part of my participation in the Series; (iv) the consent of no other person, firm, corporation or labor organization (other than any Collaborators) is required to make my desired presentation or to enable Venture verse entity  to use the Likeness, Business Indicia, Statements and the Material as described herein; (v) Producer's use of the Material, Business Indicia, Statements and Likeness hereunder will not violate the rights of any third party other than any Collaborators; (vi) Producer shall have the right to use the Material free and clear of any claims for royalties, residuals or other compensation, either by virtue of this Agreement or any guild or union agreement, which I acknowledge does not govern my relationship with Producer; (vii) I have answered all questionnaire and application questions completely, honestly and accurately, and I acknowledge that if any of the foregoing information is found to be false, that this will be grounds for my dismissal from registration  process and/or from the pplatform, if selected; (viii) I further understand and acknowledge that I will be required to enter into further agreements with Venture verse entity  relating to my Business and enrolment in the platform and (ix) I understand and agree that all decisions by the Producer concerning the selection of the participants are final and not subject to challenge or appeal.
                    </p>
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(4)}>
                    Securities and Acknowledgement
                </AccordionHeader>
                <AccordionBody>
                    <p className="text-justify">
                        I understand that the announcement, solicitation and/or acceptance of any investment in my Business or any equity interests thereto of any kind from one or more of the Investors or any other person may be a securities offering and/or a sale of securities governed by federal, state and other securities laws, and I agree to comply with any and all applicable securities laws in connection therewith. including but not limited to laws governing the offer and sale of securities. I also understand that it is my sole responsibility to comply with such securities laws, that Venture Verse entity will not be providing me with any advice or assistance of counsel in that regard. In addition, I acknowledge and agree that Venture verse entity will not be acting on my behalf, either directly or indirectly, as an agent, broker or finder, in connection with the offer or sale of any securities and that the Venture verse entity will not have any liability for my failure to comply with such securities laws Confidentiality. Without the express prior written consent of Venture verse entity, I shall not at any time, reveal, report, publish or disclose any information or trade secrets obtained or learned by me about the platform, including, without limitation, any information concerning or relating to the platform, the participants, the events contained in the platform, any ideas, products, inventions, services or businesses presented by any user  in connection with the platform or the outcome of the platform or any presentation associated therewith (collectively, "Confidential Information"). This confidentiality obligation shall remain in place whether or not I am enrolled in the platform, and shall continue both during and after my enrollment in the registration and, if I am selected as an user, my participation in the Series, and shall continue regardless of whether or not  include some or all of the Confidential Information. I further agree that any Confidential Information of which I become aware will only be used for the express and exclusive purposes for which Venture verse entity has instructed me to use the Confidential Information.
                    </p>
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(5)}>
                    General Release
                </AccordionHeader>
                <AccordionBody>
                    <p className="text-justify">
                        To the maximum extent permitted by law, I, my heirs, next of kin, spouse, guardians, legal representatives, executors, administrators, successors and assigns (collectively "Releasing Parties") hereby irrevocably and unconditionally release and covenant not to sue Venture Verse entity. subsidiary, affiliated and related entities, their successors, licensees, assigns, and their respective directors, officers, shareholders, members, employees, agents and representatives (collectively "Releasees") from any and all claims, actions, damages, liabilities, losses, costs and expenses of any kind (including, without limitation, attorneys' fees) (collectively "Claims") arising out of, resulting from, or by reason of my application for and/or participation in or in connection with the Platform, including, without limitation, any travel I undertake in connection with my participation in the Platform, any exploitation, distribution, exhibition, advertising and/or promotion of the Series or my appearance on the Platform, any disclosure of my idea, product, invention, service or business, the failure of the Venture verse entity to select me as a participant, the cancellation of my account, the negotiation, entry into or breach of any agreement between any investor and me (whether during or after the enrolment in the platform and whether or not such negotiation culminates in a binding agreement), or the exercise by thr Venture Verse entity or anyone else of any rights granted by me under this Agreement, on any legal theory whatsoever (including without limitation personal injury, property damage, violation of privacy and publicity rights, false light, defamation, intentional or negligent infliction of emotional distress, products liability, breach of express or implied contract, breach of any statutory or other duty of care owed under applicable laws, infringement of copyright, trademark or patent, loss, limitation or reduction of any intellectual property rights and loss of earnings or potential earnings)
                    </p>
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(6)}>
                    Release of Unknown Claims
                </AccordionHeader>
                <AccordionBody>
                    <p className="text-justify">
                        I acknowledge that there is a possibility that after my execution of this Agreement, I may discover facts or incur or suffer claims which were unknown or unsuspected at the time this Agreement was executed and which, if known by me at that time, may have materially affected my decision to execute this Agreement. I acknowledge and agree that by reason of this Agreement, and the release of liability contained herein, I am assuming any risk of such unknown facts and such unknown and unsuspected claims. I have been advised of the existence of Section 1542 of the California Civil Code which provides:
                        A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE TIME OF EXECUTING THE RELEASE WHICH, IF KNOWN BY HIM OR HER, MUST HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH THE DEBTOR.
                    </p>
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 7} icon={<Icon id={7} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(7)}>
                    Indemnity
                </AccordionHeader>
                <AccordionBody>
                    <p className="text-justify">
                        individually and on behalf of the Releasing Parties, agree to defend (at indemnitees' option). indemnify and hold harmless the Releases from any and all Claims caused by or arising out of my application for and/or participation in and in connection with the Venture verse platform, including, without limitation, any of the following: (1) any statement, action or omission made or taken by me or anyone else during or in connection with or relating to the platform: (1) my failure to follow the instructions of the venture verse entity, Network, any of their officers, agents, representatives or employees, or anyone connected with the platform; (iii) my breach of any of my representations, warranties, undertakings, promises or obligations pursuant to this Agreement or the platform Rules (as may be promulgated and amended from time to time); (iv) my possession or use of any prize or investment; or (v) the use by Producer or Network or any of their respective licensees or assigns of any of the rights I have granted herein.
                    </p>
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 8} icon={<Icon id={8} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(8)}>
                    Governing Law
                </AccordionHeader>
                <AccordionBody>
                    <p className="text-justify">
                        This Agreement shall be deemed to be entered into in the platform itself and shall be governed by and interpreted in accordance with the laws of Sri Lanka applicable to agreements executed and fully carried out within Sri Lanka (but not its conflict of laws principles).
                    </p>
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 9} icon={<Icon id={9} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(9)}>
                    Dispute Resolution/Binding Arbitration.
                </AccordionHeader>
                <AccordionBody>
                    <p className="text-justify">
                        Both Venture Verse entity, and I acknowledge, understand and agree that any action, proceeding or litigation concerning this Agreement or my appearance of participation in the platform may only be brought in Sri Lanka, and that, subject to the arbitration proceeding below, the courts of Sri Lanka, shall have exclusive jurisdiction over me and the subject matter of any such proceeding. The parties agree that any and all disputes, controversies or claims arising under or relating to this Agreement or any of its terms, including without limitation the applicability of this arbitration provision, any effort by any party to enforce, interpret, construe, rescind, terminate or annul this Agreement, or any provision thereof, and any and all disputes or controversies arising under or relating to my possible appearance or participation in the platform that are not otherwise barred or released pursuant to the terms of this Agreement (collectively, "Matters"), and cannot be resolved through direct discussions, the parties agree to endeavor first to resolve by mediation conducted in the County of Sri lanka. If any Matter is not resolved, as set forth above, the parties then agree that it shall be resolved by binding arbitration conducted in accordance with the Streamlined Arbitration Rules and Procedures of JAMS through its Los Angeles, California office, in accordance with California law. Any such arbitration shall be conducted by a single, neutral arbitrator, who shall also be a retired judge of a state or federal court, experienced in entertainment disputes, and selected from the JAMS panel of arbitrators proffered by its Los Angeles, California office. If the parties cannot agree upon an arbitrator after good faith discussion, the arbitrator shall be chosen by JAMS pursuant to the requirements of this paragraph. The parties agree that the arbitrator's ruling in the arbitration shall be final and binding and not subject to appeal or challenge: The parties further agree that the arbitration proceedings, testimony, discovery and documents filed in the course of such proceedings, including the fact that the arbitration is being conducted, must be treated as confidential and must not be disclosed to any third party to such proceedings, except the arbitrator(s) and their staff. the parties attorneys and their staff, and any experts retained by the parties, provided that such arbitrator(s) and their staff, the JAMS and its staff, the parties' attorneys and their staff, and any experts retained by the parties. The Federal Arbitration Act (9 U.S.C. § 1, et seq.) or its successor statute shall apply and govern the enforcement of this arbitration clause. By agreeing to arbitration, the parties acknowledge that they have waived the right to a jury trial. further acknowledge and agree that the business realities of television productions of this nature, including the Series, create special circumstances for which Producer must be able to maintain its ability to seek injunctive relief and or other equitable and/or provisional remedies. Accordingly, the parties agree that nothing in this paragraph or in any of the applicable rules of JAMS, shall prevent Producer, SPT or Network from seeking provisional relief outside of arbitration. For example, a participant's premature or threatened disclosure in violation of the confidentiality provisions of this Agreement could result in a reduction of audience interest or other diminution in the value of the Series or Producer's, SPT's or Network's rights hereunder, which would cause Producer, SPT and Network irreparable injury and damage that could not be reasonably calculated or adequately compensated by damages in an action at law I hereby expressly agree that Producer, SPT and Network shall be entitled to injunctive and other equitable relief pursuant to California Code of Procedure section 1281.8 and any successor or similar statute 2. Severability, Assignment. Without limiting the foregoing, any provision of this Agreement that is invalid, illegal, or unenforceable in any jurisdiction will, as to that jurisdiction, be ineffective only to the extent of such invalidity, illegality or unenforceability, without affecting in any way the remaining provisions hereof in such jurisdiction or rendering that or any other provision of this Agreement invalid, illegal or unenforceable in any other jurisdiction. Producer (and its assignees and licensees) may freely assign, in whole or in part, any of their rights or obligations under this Agreement. I may not assign any of my rights or obligations under this Agreement.
                    </p>
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 10} icon={<Icon id={10} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(10)}>
                    Entire Agreement
                </AccordionHeader>
                <AccordionBody>
                    <p className="text-justify">
                        In signing this Agreement, I have not relied on any representations or other statements that are not contained herein. No promises have been made to me other than as expressly set forth herein. This Agreement shall supersede and replace all prior and contemporaneous oral, written and electronic communications, understandings and agreements between Producer and me relating to the subject matter hereof. This Agreement sets forth the entire agreement between Producer and me with respect to the subject matter hereof and may not be altered or amended except by a writing signed by both parties.
                    </p>
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 11} icon={<Icon id={11} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(11)}>
                    Modification or Amendment
                </AccordionHeader>
                <AccordionBody>
                    <p className="text-justify">
                        In signing this Agreement, I have not relied on any representations or other statements that are not contained herein. No promises have been made to me other than as expressly set forth herein. This Agreement shall supersede and replace all prior and contemporaneous oral, written and electronic communications, understandings and agreements between Producer and me relating to the subject matter hereof. This Agreement sets forth the entire agreement between Producer and me with respect to the subject matter hereof and may not be altered or amended except by a writing signed by both parties.
                    </p>
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 12} icon={<Icon id={12} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(12)}>
                    Waiver
                </AccordionHeader>
                <AccordionBody>
                    <p className="text-justify">
                        Any waiver of any term of this Agreement in a particular instance shall not be a waiver of such term for the future. I agree that the invalidity or unenforceability of any part of this Agreement shall in no way affect the validity or enforceability of any other part thereof.
                    </p>
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 13} icon={<Icon id={13} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(13)}>
                    Declaration
                </AccordionHeader>
                <AccordionBody>
                    <p className="text-justify">
                        I declare under penalty of perjury that all statements made by me in this Agreement are true. The name given is my legal name Any other name(s) or alias(es) used by me within the past seven years are also noted below. I have been given ample opportunity to read, and have carefully read, this entire Agreement 1 represent and warrant that 1 have had the opportunity to consult with my own legal counsel prior to signing, and I have either so consulted with my own counsel or, in the alternative. I have voluntarily and on my own accord declined such opportunity. By signing below. I am voluntarily and knowingly agreeing to the terms and conditions of this Agreement
                    </p>
                </AccordionBody>
            </Accordion>
            <h1 className="text-2xl text-purple-600 m-4 md:text-4xl ">Submitted Material Release</h1>
            <Accordion open={open === 14} icon={<Icon id={14} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(14)}>
                    Material release
                </AccordionHeader>
                <AccordionBody>
                    <ul className="list-disc pl-6">
                        <li className="mb-4">
                            <p className="text-justify">
                                I acknowledge and agree that, if Venture verse entity selects me for further consideration in the Participant selection process, I will complete and execute further agreements requested by the entity, (collectively "Participant Agreements"). I acknowledge and agree that (a) unless and until I execute such Participant Agreements, Venture verse entity will not consider me as a possible Participant for the platform and (b) Venture verse entity is accepting my Submitted Material in reliance on my completion and execution of the Participant Agreements.
                                Submitted Material in reliance on my completion and execution of the Participant Agreements.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                I shall not receive any compensation or credit for submitting the Submitted Material to Venture verse and understand that the Venture Verse Entity may view the Submitted Material.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                I hereby grant to Venture verse entity, subsidiaries, successors, assigns, affiliated and related entities, licensees, and the respective owners, officers, directors, members, contractors, agents and employees of each of the foregoing, as well as any social media network, and other media exhibitors that exhibit or have the right to exhibit  (collectively "Releasees") the perpetual, irrevocable right and license to distribute, broadcast, and otherwise exploit the Submitted Material, gratis, throughout the universe, in any and all manners, formats and media, whether now known or hereafter devised, in and in connection with the platform or otherwise, including, without limitation, the non-exclusive, fully paid, universal license to use, copy, digitize, sublicense, transmit, distribute, publicly perform, publish, delete or display such Submitted Material, or any portion thereof, in any media now known or hereafter devised including, without limitation, the platform. I authorize the Releasees, and any entities affiliated, related or in privity with Releasees, to utilize on a non-exclusive basis, throughout the universe, in perpetuity and in any manner they see fit, the Submitted Material (including without limitation use in advertising, publicity, marketing, promotional and commercial tie-in purposes in connection with the platform, all allied, ancillary and subsidiary rights therein and thereto, or any other use in connection with the platform in all media now known or hereafter devised), and to make derivative works from such materials. I agree that such use shall be freely assignable by venture verse entity and that entity and Venture verse's assignees and licensees shall have no obligations whatsoever to me (including without limitation no obligation to make any payments to me or to obtain my approval). I hereby grant venture verse entity permission to and Venture verse entity shall have the right and sole discretion to edit, alter. modify or change any part of the Submitted Material for any reason in connection with Venture verse's (or Venture verse's assignee's or licensee's) use thereof. It is hereby understood and agreed that the licenses granted in this paragraph shall be exclusive to Releasees from the date hereof through and until six (6) months after the initial broadcast of the final episode of the cycle of the platform for which I would like to be considered as a Participant (regardless of whether Venture verse selects me to be a Participant on the platform) and non-exclusive thereafter: provided that Venture verse 's license with respect to Business Indicia shall be non-exclusive
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                I recognize the possibility that the Submitted Material may be identical with or similar to material which has or may come to Releasees and/or Releasees affiliated or related entities from other sources. Receiving identical or similar material has given rise to litigation in the past so that unless Releasees can obtain adequate protection in advance, Releasees will refuse to consider or post the Submitted Material. The protection for Releasees must be sufficiently broad to protect Releasees and all related parties, including without limitation Releasees' parent, subsidiary, affiliated and related entities and their respective officers, directors, shareholders, employees, contractors. agents, representatives, broadcasters, distributors, licensees, assigns, and all parties to whom the foregoing submit material or have been or may be involved in developing, financing or exploiting materials and properties generally. Accordingly, as a further inducement to Venture verse entity to examine the Submitted Material and to consider me for selection as a Participant. I represent, warrant and agree, as follows:
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                I acknowledge that the Submitted Material is submitted voluntarily and not in confidence or in trust and that no confidential or fiduciary relationship is intended or created between Releasees and me by reason of such submission or otherwise. Nothing in this Agreement, or the submission of the Submitted Material, shall be deemed to place Releasees in any worse position than any member of the public with respect to the Submitted Material. Accordingly, without limiting any of the rights and releases I have granted herein, any part of the Submitted Material which could be freely used by any member of the public may be used by Releasees without liability to me or any other party claiming from or through me.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                I understand and agree that Releasees' use of material similar to or identical with the Submitted Material or containing features or elements similar to or identical with those contained in the Submitted Material shall not obligate Releasees to negotiate with me nor entitle me to any compensation or other entitlement if Releasees determine that Releasees have an independent legal right to use such other material (either because, e.g., such features or elements were not new or novel, or were not originated by me, or were or may hereafter be independently created by or submitted to Releasees).
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                I represent and warrant that the description provided above is true and accurate and that (i) I either solely own the Submitted Material, free of any lien or encumbrance, or have obtained all necessary rights to grant Releasees the right and/or to permit Releasees to use the Submitted Material in connection with the Platform or otherwise, in any and all media, now known or hereafter devised, through the universe in perpetuity, and that I have all production, distribution and/or exploitation rights in and to the Submitted Material, including without limitation all rights to the likenesses, names, voices and biographical information incorporated in the Submitted Material, any locations, any artwork, any logos or other intellectual property, and any and all other elements or content in the Submitted Material; (ii) it is original with me and not based on any other material or source; (iii) the use and exploitation thereof will not violate or infringe any third party rights; and (iv) I have the right to submit and to offer such material to Releasees without obligation to any third party, and the consent of no other person or entity is required for Releasees to fully exploit the Submitted Material as provided herein. I further represent that I am the sole copyright owner in all music and scoring incorporated in the Submitted Material as set forth herein or have obtained all necessary rights to grant Releasees the right and/or to permit Releasees to use all music and scoring incorporated therein. I further represent and warrant that I will not assert, maintain or assist other persons in asserting or maintaining against Releasees any claim, action, suit or demand of any kind or nature whatsoever related to the use of the Submitted Material, including without limitation those grounded upon copyright, trademark or patent infringement. invasion of privacy or publicity rights, other civil rights, or any other ground in connection with the use of the Submitted Material in the Series or in other productions. I further represent and warrant that I am competent to agree to all of the provisions in this Agreement.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                I agree that no obligation of any kind is assumed by Releasees or may be implied against Releasees (including, without limitation, any obligation to pay money) by reason of Releasees' receipt or potential or actual review of the Submitted Material or any discussions or negotiations I may have. Without limiting the foregoing. I specifically acknowledge and agree that (a) I do not and will not under any circumstances have or assert any so-called idea subotusion implied contract or similar claim against Releasees, and (b) Releasees are free to use (te. Releasees will not owe me any money or other obligation for using) any portion of the Submitted Material.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                Both Venture verse and I acknowledge, understand and agree that any action, proceeding or litigation concerning this Agreement or my appearance or participation in the Platform may only be brought in Sri lanka and that subject to the arbitration proceeding below, the courts of Sri lanka shall have exclusive juridiction over me and the subject matter of any such proceeding. I agree that any and all disputes, controversies or claims arming under or relating to this release or any of its terms, including without limitation the applicability of this arbitration provision, any effort by any party to enforce, interpret, construe, rescind, terminate or annul this release, or any provision thereof, and any and all disputes or controversies arising under or relating to my possible appearance or participation in the Series that are not otherwise barred or released pursuant to the terms of this Agreement (collectively. "Matters), and cannot be resolved through direct discussions
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                Hereby release Releasees to the maximum extent allowed by law of and from any and all claims, costs, demands and liabilities of every kind whatsoever, known or unknown, that may arise in relation to the Submitted Material or by reason of any claim now or hereafter made by or through me or on my behalf (even though I realize that such might be based on facts or circumstances not now known or suspected by me to exist, which if known or suspected, would have materially affected our decision to enter into this agreement) that Releasees have used or appropriated the Submitted Material
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                I agree to defend (at Releasees' option), indemnify Releasees and hold Releasees harmless from and against all liability, actions, claims, demands, losses or damages (including attorneys' fees and costs and punitive damages) caused by or arising out of Releasees' use of the Submitted Material or any rights granted by me herein in any manner, or as a result of any breach or alleged breach of any of my representations or warranties herein, including, but not limited to  above.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                Should any provision of this Agreement be void or unenforceable, such provision shall be deemed omitted, and this Agreement with such provision omitted shall remain in full force and effect.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                This Agreement is entire and shall be binding on the parties' respective successors, assigns, licensees and all affiliated and related parties. No statements or representations have been made except those expressly stated in this Agreement. This Agreement may be modified only by subsequent written agreement. "I," "me" and "my" refers to the party submitting the material, and any individual who may be competing for the benefit of such party, to Venture verse.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                Venture verse entity and Releasees may freely assign, in whole or in part, their rights hereunder.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                This Agreement will be interpreted in accordance with the laws of Sri Lanka applicable to agreements entered into and fully performed therein by residents of Sri Lanka (but not its conflict of laws principles).
                            </p>
                        </li>
                    </ul>
                </AccordionBody>
            </Accordion>
            <h1 className="text-2xl text-purple-600 m-4 md:text-4xl ">Intellectual Property Release</h1>
            <Accordion open={open === 15} icon={<Icon id={15} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(15)}>
                    Intellectual Property Release
                </AccordionHeader>
                <AccordionBody>
                    <p className="text-justify">
                        For good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the undersigned, being the legal owner of certain intellectual property (including all necessary rights of trademark and as the owner of the intellectual property rights (IP) described as [Description of the IP], hereby grants VentureVerse and its representatives, distributors, agents, employees, successors, licensees, and assigns (collectively, "Platform") the full and irrevocable right and license to use, photograph, reproduce, manipulate, edit, and incorporate the IP in and in connection with the platform known as "VentureVerse" (the "Platform"). As between the undersigned and the Platform, the Platform shall solely own all rights in and to the Platform, including without limitation the copyright in the Platform and any advertising or promotional materials for the Platform. The Platform shall have all rights to use the Platform, including without limitation images and/or footage including or incorporating the IP, in any and all manners and media, whether now known or hereinafter devised, throughout the universe in perpetuity, in any and all languages. The undersigned also consents to the use of the IP in connection with the advertising, promotion, marketing, and exploitation of the Platform.

                        The undersigned hereby waives any right that the undersigned may have to inspect or approve the finished Series or any advertising, marketing or promotional materials that may be used in connection therewith. In no event shall the undersigned have the night to terminate the rights granted to Venture verse hereunder or to enjoin, restrain, or otherwise interfere with the development, production, distribution or other exploitation of the Series

                        The undersigned hereby represents and warrants that: (i) it is the owner and/or authorized representative of the IP and that it has the full authority to execute this release and to grant Producer the permission and rights herein granted, and that no one else's permission or consent is required, and (u) that no credit, acknowledgment, payment, contribution, monies and/or any other consideration is required to the undersigned and or any other person and/or entity (including but not limited to any guild, union and/or other collective bargaining organization) for Producer's use of the IP as provided in this agreement. The undersigned, and its representatives, successors and assigns hereby absolutely, unconditionally and forever release and discharge Producer and all other persons and entities connected with the Series, and each of them from any and all claims, actions, causes of action, proceedings, suits, awards, judgments, damages, liabilities, losses, costs and expenses of any kind (including, without limitation, reasonable attorneys' fees and union fees, if any) arising out of, resulting from, or by reason of, the use of the IP in or in connection with the Series (including without limitation, claims based on patent, trademark or copyright infringement, rights of publicity or privacy, defamation or false negative light). The undersigned shall defend (at indemnitee's option), indemnify and hold harmless Producer, Sony Pictures Television Inc., American Broadcasting Companies, Inc., each of their respective parents, subsidiary, affiliated and related entities and their respective officers, directors, employees, shareholders, contractors, members, representatives, agents, licensees, successors and assigns of each of the foregoing, from all liability, injury, damage, expense, or loss caused by or arising out of or related to (1) any act or omission of the undersigned which is a breach of the provisions of this Intellectual Property Release: (1) a breach of any of the undersigned's representations and warranties or agreements hereunder, (i) materials or images appearing in the Series that were provided to Producer by the undersigned (including, but not limited to, any logos and trademarks), and (iv) the negligence or willful misconduct of the undersigned or the undersigned's agents, employees, contractors or representatives.

                        he undersigned acknowledges that in no event shall Producer be obligated to use the IP in the Series or otherwise or to exercise any other nights, licenses or privileges granted to Producer hereunder

                        This Intellectual Property Release shall be binding upon the undersigned and the undersigned's heirs, representatives, agents, employees, contractors, successors, licensees and assigns.

                    </p>
                </AccordionBody>
            </Accordion>
            <h1 className="text-2xl text-purple-600 m-4 md:text-4xl ">Privacy Notice</h1>
            <Accordion open={open === 16} icon={<Icon id={16} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(16)}>
                    How we use information about you
                </AccordionHeader>
                <AccordionBody>
                    <ul className="list-disc pl-6">
                        <li className="mb-4">
                            <p className="text-justify">
                                1. We need to collect and process information about you for normal management purposes on our e-commerce platform. This includes managing your account, order postings, and communications. During the registration process, we collect information to make decisions about enrolling and providing our services to you. We continue to collect and use information throughout your customer relationship and, if necessary, after separation to effectively manage our relationship with you. Please note that if you do not provide the requested data, we may not be able to fulfill our contractual or legal obligations, and we will inform you about the implications of that decision. In the case of optional programs or benefits, we will inform you if they require personal information and involve third parties in delivering those services. You will then have the choice to participate or not based on your preferences.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                2. Apart from legal and contractual requirements, we may need to process your data on our e-commerce platform to pursue our legitimate business interests. These interests include protecting our customers, personnel, investors, property, and reputation, as well as preventing fraud and deterring potential crimes. We also process data to maintain the integrity of our information systems and networks, evaluate or prepare for corporate transactions such as mergers and acquisitions, and ensure compliance with succession planning. Additionally, we may process data to account to or seek information or payment from relevant organizations, promote workforce diversity, prevent discrimination and harassment, and enhance health and safety in the workplace. However, we are committed to respecting your privacy interests and will not process your information if your privacy rights outweigh our legitimate business interests.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                3. Much of the information we hold on our e-commerce platform is provided by you during the registration process. However, we may also obtain information from other internal and external sources. Internal sources may include your manager or other relevant personnel within the company. External sources may include individuals listed as references for prior employment or education, or designated agents. The information we collect and use includes details from your registration form and references. We may also refer to your employment contract, correspondence related to you, payroll and benefits records, travel and expense records, personal and emergency contact details, absence and leave records, information required for equal opportunities monitoring, property records, network and security records, job assignments, training records, work product, performance appraisals, grievance and disciplinary records, commendations, retirement and separation records, and royalty or participation payment records. These sources and records help us effectively manage our e-commerce platform and ensure compliance with relevant policies and regulations.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                4. Where we have a need to process any of the special categories of information under data
                                protection law (information relating to your racial or ethnic origin, political opinions,
                                religious or philosophical beliefs, trade union membership, genetic data, identifying
                                biometric data, or data concerning health, sex life, or sexual orientation), we will do so only
                                with your explicit consent or as required or authorized by law.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                In any instance where we are processing data based on your consent, you have the right to
                                withdraw that consent at any time.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                Depending on your role, we may keep records of your login hours through a tracking system implemented in our e-commerce platform. Further information and guidelines regarding this system can be accessed on our platform or obtained from the E-commerce Department.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                We may share your information with other companies affiliated with VentureVerse that are involved in investments or intellectual property rights related to our e-commerce platform. The entities within the group are dedicated to handling personal data in compliance with the data protection laws of the respective countries where the data exporter is located. This ensures that your personal information is treated in accordance with the applicable data protection regulations to safeguard your privacy and maintain the security of your data within the VentureVerse e-commerce platform.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                As an e-commerce platform, VentureVerse may need to share certain information mentioned above with third parties to comply with legal requirements or to assist us in fulfilling our stated purposes. Here are some examples:
                                a. We may report information to governmental authorities as necessary for tax and regulatory purposes, such as payroll and occupational health reports.
                                b. We may engage professional services firms, including legal, accounting, audit, tax, and insurance providers, to assist us with relevant expertise and services.
                                c. Third-party providers may be contracted to administer payroll, pension, and insurance schemes on our behalf.
                                d. We may collaborate with third-party vendors for information technology support, recruiting and human resources services, property management, or off-site storage.
                                These third parties are carefully selected, and we take measures to ensure they handle your information securely and in compliance with applicable data protection laws. We maintain appropriate contractual agreements and safeguards to protect the confidentiality and security of your data when sharing it with these parties.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                Your personal data will be retained as long as needed for the purposes for which it was
                                collected or for which you subsequently authorized it, and additionally for as long as we are
                                required to keep it because of legal obligations, professional accounting and audit
                                standards, legal or insurance claims, or regulatory proceedings.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                You have the right to request from us access to and rectification or erasure of your personal
                                data, the right to restrict processing and object to processing, as well as in certain
                                circumstances the right to data portability. These rights are not unlimited; they are affected
                                by our obligations and legitimate interests and by the privacy rights of other individuals.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                If you have given consent for the processing of your data, you have the right to withdraw
                                that consent at any time, which will not affect the lawfulness of the processing before your
                                consent was withdrawn.
                            </p>
                        </li>
                        <li className="mb-4">
                            <p className="text-justify">
                                If you are in Sri Lanka, you have the right to lodge a complaint with the relevant data protection supervisory authority in Sri Lanka if you believe that VentureVerse, as an e-commerce platform, has not complied with the requirements of the law regarding your personal data. If you are not satisfied after contacting us, you may escalate your concern to the Sri Lankan data protection supervisory authority.
                            </p>
                        </li>
                    </ul>
                </AccordionBody>
            </Accordion>
        </div>
    );
}

const TermsAndConditions = () => {

    return (

        <div className="flex flex-col justify-between items-center w-full overflow-hidden">
        <Navbar/>
        <Description/>
        <Footer/>
        </div>

    )

}

export default TermsAndConditions