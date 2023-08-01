import React from "react";
import Navbar from "../webcomponent/NavbarAll";
import { useState } from "react";
import Button from "../webcomponent/CustomButton";

const ViewRequestDetails = () => {
  // Dummy data for the registration request details
  const registrationRequestDetails = {
    id: 1,
    email: "john@example.com",
    contactNum: "+1234567890",
    address: "123 Main Street, City, Country",
    role: "Entrepreneur",
    fullName: "John Doe",
    gender: "Male",
    nic: "123456789012",
    policeReport: "../../../assets/images/hero.png",
    incomeStatement: "../../../assets/images/hero.png",
    collaboratorDetails: "Details of collaborators Details of collaborators Details of collaborators Details of Details of collaboratorsDetails of collaboratorscollaborators Details of collaborator Details of collaborators Details of collaborators",
    businessName: "ABC Enterprises",
    businessContact: "+9876543210",
    businessAddress: "456 Business Road, City, Country",
    businessEmail: "info@abc.com",
    businessWebsite: "www.abc.com",
    businessDescription: "Description of the business",
    businessRegDoc:"../../../assets/images/hero.png"
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
                  <p>{registrationRequestDetails.address}</p>

                  <p><strong>Full Name:</strong></p>
                  <p>{registrationRequestDetails.fullName}</p>

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
                  <p>{registrationRequestDetails.businessAddress}</p>

                  <p><strong>Business Email:</strong></p>
                  <p>{registrationRequestDetails.businessEmail}</p>

                  <p><strong>Business Website:</strong></p>
                  <p>{registrationRequestDetails.businessWebsite}</p>

                  <p><strong>Business Description:</strong></p>
                  <p>{registrationRequestDetails.businessDescription}</p>

                  <p><strong>Collaborator Details:</strong></p>
                  <p>{registrationRequestDetails.collaboratorDetails}</p>
                  
                </div>
              </div>    
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
                        handleImageClick(registrationRequestDetails.businessRegDoc)
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

export default ViewRequestDetails;
