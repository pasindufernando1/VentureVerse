import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import useAxiosMethods from "../../hooks/useAxiosMethods";
import axios from '../../api/axios';
import { Header, Button, StatusPopUp } from "../webcomponent";

const ViewInvestorDetails = () => {
  const { get } = useAxiosMethods();
  const [response, setResponse] = useState([]);
  const[sectors,setSectors]=useState([]);
  const [pdf, setPdf] = useState([]);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  
  const { id } = useParams();

  useEffect(() => {
    get(`/investors/pending-details/${id}`, setResponse);
  }, [id]);

  useEffect(() => {
    get(`/investors/interested-sectors/${id}`, setSectors);
  }, [id]);

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
    policeReport:"/assets/images/20000499.pdf",
    incomeStatement:"/assets/images/20000499.pdf"
  };

  useEffect(() => {
    get(`/auth/get-investor-pdf/${id}`, setPdf);
  }, []);

  const pdfs = {
    policeReport:pdf[0],
    incomeStatement:pdf[1],
  }

  const handleDocumentDownload = (documentData, documentName) => {
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

    if(statusResponse === "Success"){
      if(status ==="PENDING"){
        setShowSuccessNotification(true);
      }else{
        setShowErrorNotification(true);
      }
    }else{
      alert(message);
    }

  };
  
  return (
    <div>
      <Header active="Registration Requests">
        <main className="h-auto flex justify-center items-center bg-white">
          <form className="bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] mb-8">
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
                  <h3 className="font-medium text-purple-400 text-lg font-semibold mb-2">Investor Interested Sectors</h3>  
                  <div className="grid grid-cols-2 ml-10">
                    <p><strong>Interested Sectors</strong></p>    
                    <p>{sectors.map((sector) => (
                    <ul class="space-y-4 text-left dark:text-gray-400">
                    <li class="flex items-center space-x-3 mb-2">
                        <svg class="flex-shrink-0 w-5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                        </svg>
                        <span>{sector}</span>
                    </li>
                    </ul>
                    ))}</p>            
                  </div>
                </div>
                <br></br>
                <div>
                  <h3 className="font-medium text-purple-400 text-lg font-semibold mb-2">Documents</h3>
                  <div className="grid grid-cols-2 gap-5 ml-10">
                    <div className="document-container">  
                      <p><strong>Police Report:</strong></p>
                      <p>
                      <iframe
                        src={`data:application/pdf;base64,${pdfs.policeReport}`}
                        width="88%"
                        height="510px"
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
                        width="88%"
                        height="510px"
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
        <div>
            {showSuccessNotification && (
                <StatusPopUp
                successTitle="Registration request accepted!"
                successMessage="New Individual Investor is added to the system successfully!"
                redirectUrl="/admin/view-requests"
                />
            )}
            {showErrorNotification && (
              <StatusPopUp
              successTitle="Registration request rejected!"
              successMessage="Registration request is rejected successfully!"
              redirectUrl="/admin/view-requests"
              />
            )}
        </div>
      </Header>
    </div>
  );
};

export default ViewInvestorDetails;
