import { Button, Checkbox} from "../webcomponent";
import React from "react";

const Terms = () => {

    return(
        <div>
            <main className="h-auto flex justify-center items-center bg-white w-full]">
                <div className="text-gray-700 p-10 w-full">
                    <h3 className="text-3xl text-main-purple self-center">Terms and Conditions</h3> 
                    <h2 className="text-[1rem] font-bold">Terms and Conditions in Registration  </h2>
                    <p className="text-justify text-1xl  mt-5">
                    Please note that to be eligible to apply, you must meet the following criteria, which are subject to change by Venture Verse at its sole discretion:
                    </p>
                    <ol className="text-justify list-decimal list-inside text-gray-500 ml-10">
                        <li>Restriction on Public Office Candidacy: You must not be a candidate for public office and agree not to become a candidate for public office from the date of the Audition Release until one (1) year after the initial broadcast of the last episode of the Series in which you appear (if applicable).</li>
                        <br></br>
                        <li>Felony Conviction: You must not have been convicted of a felony in the previous 10 years unless the conviction has been expunged.</li>
                        <br></br>
                        <li>Background Check: You must agree to voluntarily submit to a background check.</li>
                    </ol>
                    <p className="text-justify">
                        I acknowledge and agree that Venture Verse reserves the right to disqualify any individual, at its sole discretion, who is sufficiently acquainted with any person or entity involved in the development, production, or exhibition of the Series, if their participation could create the appearance of impropriety.
                    </p>
                    <p className="text-justify">
                        I understand and agree that Venture Verse has the sole authority to determine participant eligibility, and the Producer reserves the right to modify any of the eligibility requirements at any time.
                    </p>
                    <p className="text-justify">
                        By submitting your application, you acknowledge and agree that your submission is solely for the purpose of being considered by Venture Verse for participation on Venture Verse. You understand that you will not receive any compensation or credit for making the submission.
                        If the applicant is a minor, you affirm that you are the parent or legal guardian of the minor, authorized to apply on their behalf, and you are submitting and signing the application on their behalf. By making a submission, you are accepting and agreeing to the Venture Verse Terms of Use. You acknowledge that your email submission is not confidential and is not submitted in confidence or trust. No confidential or fiduciary relationship is intended or created by making an email submission. By making a submission, you hereby release Venture Verse and its administrators, directors, officers, shareholders, employees, licensees, assigns, and successors from any and all claims related to your email submission. This includes, but is not limited to, any claims arising from the risk of misdirection or misdelivery of your email.
                    </p>
                    {/* privacy */}
                    <h2 className="text-[1rem] font-bold mt-5">Privacy Notice</h2>
                    <p className="text-justify">
                            <p>1.We need to collect and process information about you for normal management purposes
                            on our e-commerce platform. This includes managing your account, order postings, and 
                            communications. During the registration process, we collect information to make decisions
                            about enrolling and providing our services to you. We continue to collect and use information 
                            throughout your customer relationship and, if necessary, after separation to effectively manage
                            our relationship with you. Please note that if you do not provide the requested data, we may not
                            be able to fulfill our contractual or legal obligations, and we will inform you about the 
                            implications of that decision. In the case of optional programs or benefits, we will inform you
                            if they require personal information and involve third parties in delivering those services. 
                            You will then have the choice to participate or not based on your preferences.</p>
                            <br></br>
                            <p>2.Apart from legal and contractual requirements, we may need to process your data on our e-commerce
                            platform to pursue our legitimate business interests. These interests include protecting our customers, 
                            personnel, investors, property, and reputation, as well as preventing fraud and deterring potential crimes. 
                            We also process data to maintain the integrity of our information systems and networks, evaluate or prepare for
                            corporate transactions such as mergers and acquisitions, and ensure compliance with succession planning. 
                            Additionally, we may process data to account to or seek information or payment from relevant organizations, 
                            promote workforce diversity, prevent discrimination and harassment, and enhance health and safety in the 
                            workplace. However, we are committed to respecting your privacy interests and will not process your information 
                            if your privacy rights outweigh our legitimate business interests.</p>
                            <br></br>
                            <p>3.Much of the information we hold on our e-commerce platform is provided by you during
                            the registration process. However, we may also obtain information from other internal 
                            and external sources. Internal sources may include your manager or other relevant personnel within 
                            the company. External sources may include individuals listed as references for prior employment or 
                            education, or designated agents. The information we collect and use includes details from your 
                            registration form and references. We may also refer to your employment contract, correspondence 
                            related to you, payroll and benefits records, travel and expense records, personal and emergency 
                            contact details, absence and leave records, information required for equal opportunities monitoring,
                            property records, network and security records, job assignments, training records, work product, performance 
                            appraisals, grievance and disciplinary records, commendations, retirement and separation records, and 
                            royalty or participation payment records. These sources and records help us effectively manage our
                            e-commerce platform and ensure compliance with relevant policies and regulations.</p>
                            <br></br>
                            <p>4. Where we have a need to process any of the special categories of information under data
                            protection law (information relating to your racial or ethnic origin, political opinions,
                            religious or philosophical beliefs, trade union membership, genetic data, identifying
                            biometric data, or data concerning health, sex life, or sexual orientation), we will do so only
                            with your explicit consent or as required or authorized by law.</p>
                            <br></br>
                            <p>5. In any instance where we are processing data based on your consent, you have the right to
                            withdraw that consent at any time.</p>
                            <br></br>    
                            <p>6. Depending on your role, we may keep records of your login hours through a
                             tracking system implemented in our e-commerce platform. Further information and guidelines 
                             regarding this system can be accessed on our platform or obtained from the E-commerce Department.</p>
                            <br></br>
                            <p>7. We may share your information with other companies affiliated with VentureVerse that are
                             involved in investments or intellectual property rights related to our e-commerce
                              platform. The entities within the group are dedicated to handling personal data in compliance 
                              with the data protection laws of the respective countries where the data exporter is located. 
                              This ensures that your personal information is treated in accordance with the applicable data 
                              protection regulations to safeguard your privacy and maintain the security of your data 
                              within the VentureVerse e-commerce platform.</p>
                            <br></br>
                            <p>8. As an e-commerce platform, VentureVerse may need to share certain information mentioned above with third parties to comply with legal requirements or to assist us in fulfilling our stated purposes. Here are some examples:
                            a. We may report information to governmental authorities as necessary for tax and regulatory purposes, such as payroll and occupational health reports.
                            b. We may engage professional services firms, including legal, accounting, audit, tax, and insurance providers, to assist us with relevant expertise and services.
                            c. Third-party providers may be contracted to administer payroll, pension, and insurance schemes on our behalf.
                            d. We may collaborate with third-party vendors for information technology support, recruiting and human resources services, property management, or off-site storage.
                            These third parties are carefully selected, and we take measures to ensure they handle your information securely and in compliance
                            with applicable data protection laws. We maintain appropriate contractual agreements and safeguards
                            to protect the confidentiality and security of your data when sharing it with these parties.</p>
                            <br></br>
                            <p>9. Your personal data will be retained as long as needed for the purposes for which it was 
                                collected or for which you subsequently authorized it, and additionally for as long as we are 
                                required to keep it because of legal obligations, professional accounting and audit standards, 
                                legal or insurance claims, or regulatory proceedings.</p>
                            <br></br>
                            <p>10. You have the right to request from us access to and rectification or erasure of your personal
                                 data, the right to restrict processing and object to processing, as well as in certain circumstances 
                                 the right to data portability. These rights are not unlimited; they are affected by our obligations and
                                  legitimate interests and by the privacy rights of other individuals.</p>
                            <br></br>
                            <p>11. If you have given consent for the processing of your data, you have the right to withdraw that 
                                consent at any time, which will not affect the lawfulness of the processing before your consent was withdrawn.</p>
                            <br></br>
                            <p>12. If you are in Sri Lanka, you have the right to lodge a complaint with the relevant data protection supervisory
                             authority in Sri Lanka if you believe that Venture Verse, as an e-commerce platform, has not complied with the 
                             requirements of the law regarding your personal data. If you are not satisfied after contacting us, you may escalate
                              your concern to the Sri Lankan data protection supervisory authority.</p>
                    </p>
                    <br></br> 
                </div>           
            </main>  
        </div>   
    )

}

export default Terms;
