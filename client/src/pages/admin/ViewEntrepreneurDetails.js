import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../webcomponent/NavbarAll";
import { useState } from "react";
import Button from "../webcomponent/CustomButton";
import useAxiosMethods from "../../hooks/useAxiosMethods";

const ViewEntrepreneurDetails = () => {
  const { get } = useAxiosMethods();
  const [response, setResponse] = useState([]);
  
  const { id } = useParams();

  useEffect(() => {
    get(`/entrepreneurs/pending-details/${id}`, setResponse);
  }, [id]);

  // create registrationRequestDetails using the response
  const registrationRequestDetails = {
    id: response.id,
    email: response.email,
    contactNum: response.contactNumber,
    firstline: response.firstLineAddress,
    secondline: response.secondLineAddress,
    town: response.town,
    district: response.district,
    role: response.role,
    firstname: response.firstname,
    lastname: response.lastname,
    gender:response.gender,
    nic:response.nic,
    policeReport:"/assets/images/letter.jpg",
    incomeStatement:"/assets/images/letter.jpg",
    collaboratorDetails:response.collaboratorDetails,
    businessName:response.businessName,
    businessContact:response.businessContact,
    bfirstline:response.bfirstLineAddress,
    bsecondline:response.bsecondLineAddress,
    btown:response.btown,
    bdistrict:response.bdistrict,
    businessEmail:response.businessEmail,
    businessWebsite:response.businessWebsite,
    businessDescription:response.businessDescription,
    businessRegDoc:"/assets/images/letter.jpg",
    felony: response.felony,
    felonyDescription: response.felonyDescription,
    lawsuit: response.lawSuit,
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupImageUrl, setPopupImageUrl] = useState("");

  const handleImageClick = (imageUrl) => {
    setIsPopupOpen(true);
    setPopupImageUrl(imageUrl);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupImageUrl("");
  };

  const handleDocumentDownload = (documentUrl, documentName) => {
    const link = document.createElement("a");
    link.href = documentUrl;
    link.download = documentName;
    link.click(); 
  };

  return (
    <div>
      <Navbar />
      <main className="h-auto flex justify-center items-center bg-gray-200">
        <form className="bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] lg:w-7/12 mt-8 mb-8">
          <div className="text-gray-700 p-[2rem] w-full">
            <div className="row flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold mb-4">Registration Request Details</h2>
              </div>
              </div>
              <div>
                <h3 className="font-medium text-purple-400 text-lg font-semibold mb-2">Personal Information</h3>  
                <div className="grid grid-cols-2 gap-2">
                  <p><strong>User Role:</strong></p>
                  <p>{registrationRequestDetails.role}</p>

                  <p><strong>Email:</strong></p>
                  <p>{registrationRequestDetails.email}</p>

                  <p><strong>Contact Number:</strong></p>
                  <p>{registrationRequestDetails.contactNum}</p>

                  <p><strong>Address:</strong></p>
                  <p>
                    {registrationRequestDetails.firstline},{" "}
                    {registrationRequestDetails.secondline?registrationRequestDetails.secondline:""}
                    {registrationRequestDetails.town},{" "}
                    {registrationRequestDetails.district}
                  </p>

                  <p><strong>Full Name:</strong></p>
                  <p>
                    {registrationRequestDetails.firstname}{" "}
                    {registrationRequestDetails.lastname}
                  </p>

                  <p><strong>Gender:</strong></p>
                  <p>{registrationRequestDetails.gender}</p>

                  <p><strong>NIC:</strong></p>
                  <p>{registrationRequestDetails.nic}</p>

                </div>
              </div>
              <br></br>
              <div>
                <h3 className="font-medium text-purple-400 text-lg font-semibold mb-2">Business Information</h3>
                <div className="grid grid-cols-2 gap-2">
                  <p><strong>Business Name:</strong></p>
                  <p>{registrationRequestDetails.businessName}</p>

                  <p><strong>Business Contact:</strong></p>
                  <p>{registrationRequestDetails.businessContact}</p>

                  <p><strong>Business Address:</strong></p>
                  <p>
                    {registrationRequestDetails.bfirstline},{" "}
                    {registrationRequestDetails.bsecondline?registrationRequestDetails.bsecondline:""}
                    {registrationRequestDetails.btown},{" "}
                    {registrationRequestDetails.bdistrict}
                  </p>

                  <p><strong>Business Email:</strong></p>
                  <p>{registrationRequestDetails.businessEmail}</p>

                  <p><strong>Business Website:</strong></p>
                  <p>
                    {registrationRequestDetails.businessWebsite?registrationRequestDetails.businessWebsite:"N/A"}
                  </p>

                  <p><strong>Business Description:</strong></p>
                  <p>{registrationRequestDetails.businessDescription}</p>

                  <p><strong>Collaborator Details:</strong></p>
                  <p>
                    {registrationRequestDetails.collaboratorDetails?registrationRequestDetails.collaboratorDetails:"N/A"}
                  </p>

                  <p><strong>Lawsuit</strong></p>
                  <p>{registrationRequestDetails.lawsuit}</p>

                  <p><strong>Felony</strong></p>
                  <p>{registrationRequestDetails.felony}</p>

                  {registrationRequestDetails.felony === "Yes" && (
                    <p>
                      <strong>Felony Description:</strong>
                      {registrationRequestDetails.felonyDescription}
                    </p>
                  )}
           
                </div>
              </div>  
              <br></br>  
              <div>
                <h3 className="font-medium text-purple-400 text-lg font-semibold mb-2">Documents</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="document-container">
                    <p><strong>Business Registration Document:</strong></p>
                    <p>
                      <img
                        src={registrationRequestDetails.businessRegDoc}
                        alt="Business Registration Document"
                        onClick={() =>
                          handleImageClick(
                            registrationRequestDetails.businessRegDoc
                          )
                        }
                      />
                    <br></br>
                    <Button
                      className="download-button"
                      type="button"
                      onClick={() =>
                        handleDocumentDownload(
                          registrationRequestDetails.businessRegDoc,
                          registrationRequestDetails.id + "_business_reg_doc"
                        )
                      }
                      label="Download"
                    />
                    </p>
                  </div>
                  <div className="document-container">  
                    <p><strong>Police Report:</strong></p>
                    <p>
                    <img 
                      src={registrationRequestDetails.policeReport} 
                      alt="Police Report"
                      onClick={() =>
                        handleImageClick(registrationRequestDetails.policeReport)
                      }
                    />
                    <br></br>
                    <Button
                      className="download-button"
                      type="button"
                      onClick={() =>
                        handleDocumentDownload(
                          registrationRequestDetails.policeReport,
                          registrationRequestDetails.id + "_police_report"
                        )
                      }
                      label="Download"
                    />
                    </p>
                  </div>
                  <div className="document-container">
                    <p><strong>Income Statement:</strong></p>
                    <p>
                    <img 
                      src={registrationRequestDetails.incomeStatement} 
                      alt="Income Statement"
                      onClick={() =>
                        handleImageClick(registrationRequestDetails.incomeStatement)
                      }
                    />
                    <br></br>
                    <Button
                      className="download-button"
                      type="button"
                      onClick={() =>
                        handleDocumentDownload(
                          registrationRequestDetails.incomeStatement,
                          registrationRequestDetails.id + "_income_statement"
                        )
                      }
                      label="Download"
                    />
                    </p>
                  </div>
                </div>
              </div>  
              <div className="mt-4 flex justify-end space-x-4">
                <Button
                    type="button"
                    onClick={() => alert("Registration request accepted")}
                    label="Accept"                 
                >
                </Button>  
                <Button
                      type="button"
                      onClick={() => alert("Registration request rejected")}
                      label="Reject"
                  >
                </Button>
              </div>
              {isPopupOpen && (
                <div className="popup-overlay">
                  <div className="popup-content">
                    <img src={popupImageUrl} alt="Full-Screen View" />
                    <button className="close-btn" onClick={handleClosePopup}>
                      X
                    </button>
                  </div>
                </div>
              )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default ViewEntrepreneurDetails;
