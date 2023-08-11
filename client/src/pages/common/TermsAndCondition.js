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
                    <p className="text-justify">Please note that to be eligible to apply, you must meet the following criteria, which are subject to change by Venture Verse at its sole discretion:
                    </p>
                    <p className="text-justify">
                        Restriction on Public Office Candidacy: You must not be a candidate for public office and agree not to become a candidate for public office from the date of the Audition Release until one (1) year after the initial broadcast of the last episode of the Series in which you appear (if applicable).
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