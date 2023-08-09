import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../webcomponent/NavbarAll";
import { useState } from "react";
import Button from "../webcomponent/CustomButton";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import axios from '../../api/axios';

const ViewEntrepreneurDetails = () => {
  const { get } = useAxiosMethods();
  const [response, setResponse] = useState([]);
  const[pdf,setPdf]=useState([]);
  
  const { id } = useParams();

  useEffect(() => {
    get(`/entrepreneurs/pending-details/${id}`, setResponse);
  }, [id,get]);
 
  useEffect(() => {
    get(`/auth/get-pdf/${id}`, setPdf);
  }, []);

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
    policeReport:response.policeReport,
    incomeStatement:response.incomeStatement,
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
    businessRegDoc:response.businessRegDoc,
    felony: response.felony,
    felonyDescription: response.felonyDescription,
    lawsuit: response.lawSuit,
  };

  const pdfs = {
    policeReport:pdf[0],
    incomeStatement:pdf[1],
    businessRegDoc:pdf[2],
  }

  const handleDocumentDownload = (documentData, documentName) => {
    //download the pdf
    const linkSource = `data:application/pdf;base64,${documentData}`;
    const downloadLink = document.createElement("a");
    const fileName = `${documentName}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
    
  };

  const handleAuthorization = async (status,id) => {   
    const response = await axios.post(`/auth/authorize/${status}/${id}`);
    const statusResponse = response.data.status;
    const message = response.data.message;

    console.log(statusResponse);
    console.log(message);

    if(statusResponse === "success"){
      window.location.href = `/admin/registration-request-success/${message}`;
    }else{
      alert(message);
    }
  };
  
  return (
    <div>
      <Navbar />
      <main className="h-auto flex justify-center items-center bg-white">
        <form className="bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] lg:w-7/12 mt-8 mb-8">
          <div className="text-gray-700 p-[2rem] w-full">
            <div className="row flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold mb-4">Registration Request Details</h2>
              </div>
              </div>
              <div>
                <h3 className="font-medium text-purple-400 text-lg font-semibold mb-2">Personal Information</h3>  
                <div className="grid grid-cols-2 gap-2 ml-10">
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
                <div className="grid grid-cols-2 gap-2 ml-10">
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
                    <iframe
                      src={`data:application/pdf;base64,${pdfs.businessRegDoc}`}
                      width="100%"
                      height="530px"
                      title="Police Report"
                    ></iframe>
                    <br></br>
                    <Button
                      className="download-button"
                      type="button"
                      onClick={() =>
                        handleDocumentDownload(
                          pdfs.businessRegDoc,
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
                    <iframe
                      src={`data:application/pdf;base64,${pdfs.policeReport}`}
                      width="100%"
                      height="530px"
                      title="Police Report"
                    ></iframe>
                    <br></br>
                    <Button
                      className="download-button"
                      type="button"
                      onClick={() =>
                        handleDocumentDownload(
                          pdfs.policeReport,
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
                    <iframe
                      src={`data:application/pdf;base64,${pdfs.incomeStatement}`}
                      width="100%"
                      height="530px"
                      title="Income Statement"
                    ></iframe>
                    <br></br>
                    <Button
                      className="download-button"
                      type="button"
                      onClick={() =>
                        handleDocumentDownload(
                          pdfs.incomeStatement,
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
                  onClick={() => handleAuthorization("PENDING", registrationRequestDetails.id)}
                  label="Accept"                 
                >
                </Button>  
                <Button
                  type="button"
                  onClick={() => handleAuthorization("decline", registrationRequestDetails.id)}
                  label="Reject"
                  >
                </Button>
              </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ViewEntrepreneurDetails;
