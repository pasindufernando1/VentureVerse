import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Signup1 from './Signup1';
import Signup2 from './Signup2';
import Signup3 from './Signup3';
import Signup4 from './Signup4';
import { CommonNavbar, Footer, Button } from "../webcomponent";


const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const nicRegex=/^\d{10}(?:\d{2}|-\d{2}v)$/;
const mobileRegex=/^(?:\+94|0)(?:\d{9})$/;
const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;


function Form() {

  const [page, setPage] = useState(0);

  // form data
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    firstline: '',
    secondline: '',
    town: '',
    district: '',
    email: '',
    nic: '',
    gender: '',
    mobile: '',
    collobarators: '',
    felony: '',
    lawsuit: '',
    lawsuitDetails: '',
    policeReport: '',
    bankStatement: '',
    businessName: '',
    businessContact: '',
    bfirstline: '',
    bsecondline: '',
    btown: '',
    bdistrict: '',
    businesswebsite: '',
    businessemail: '',
    businessDescription: '',
    businessregdoc: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [validateFormData, setValidateFormData] = useState({
    firstname: { "State":"", "Message":"" },
    lastname: { "State":"", "Message":"" },
    firstline: { "State":"", "Message":"" },
    secondline: { "State":"", "Message":"" },
    town: { "State":"", "Message":"" },
    district: { "State":"", "Message":"" },
    email: { "State":"", "Message":"" },
    nic: { "State":"", "Message":"" },
    gender: { "State":"", "Message":"" },
    mobile: { "State":"", "Message":"" },
    collobarators: { "State":"", "Message":"" },
    felony: { "State":"", "Message":"" },
    lawsuit: { "State":"", "Message":"" },
    lawsuitDetails: { "State":"", "Message":"" },
    policeReport: { "State":"", "Message":"" },
    bankStatement: { "State":"", "Message":"" },
    businessName: { "State":"", "Message":"" },
    businessContact: { "State":"", "Message":"" },
    bfirstline: { "State":"", "Message":"" },
    bsecondline: { "State":"", "Message":"" },
    btown: { "State":"", "Message":"" },
    bdistrict: { "State":"", "Message":"" },
    businesswebsite: { "State":"", "Message":"" },
    businessemail: { "State":"", "Message":"" },
    businessDescription: { "State":"", "Message":"" },
    businessregdoc: { "State":"", "Message":"" },
    password: { "State":"", "Message":"" },
    confirmPassword: { "State":"", "Message":"" },
    terms: false
  });

  const [disabled, setDisabled] = useState(true);
  
  useEffect(() => {
    let emailFlag = emailRegex.test(formData.email);
    let nicFlag=nicRegex.test(formData.nic);
    let mobileFlag=mobileRegex.test(formData.mobile);
    let businessContactFlag=mobileRegex.test(formData.businessContact);
    let businessemailFlag = emailRegex.test(formData.businessemail);
    let passwordFlag = passwordRegex.test(formData.password);
    let confirmPasswordFlag = formData.password === formData.confirmPassword;
 
  // Update the validateFormData in a single call
  setValidateFormData({
    email: {
      State: emailFlag || !formData.email ? "Valid" : "Invalid",
      Message: emailFlag || !formData.email ? "" : "Invalid Email"
    },
    nic:{
      State: nicFlag || !formData.nic ? "Valid" : "Invalid",
      Message: nicFlag || !formData.nic ? "" : "Invalid NIC"
    },
    mobile:{
      State: mobileFlag || !formData.mobile ? "Valid" : "Invalid",
      Message: mobileFlag || !formData.mobile ? "" : "Invalid Contact Number"
    },
    businessContact:{
      State: businessContactFlag || !formData.businessContact ? "Valid" : "Invalid",
      Message: businessContactFlag || !formData.businessContact ? "" : "Invalid Contact Number"
    },
    businessemail:{
      State: businessemailFlag || !formData.businessemail ? "Valid" : "Invalid",
      Message: businessemailFlag || !formData.businessemail ? "" : "Invalid Email"
    },
    password: {
      State: passwordFlag || !formData.password ? "Valid" : "Invalid",
      Message: passwordFlag || !formData.password ? "" : "Password must contain at least 8 characters, one uppercase, one lowercase and one number"
    },
    confirmPassword: {
      State: confirmPasswordFlag || !formData.confirmPassword ? "Valid" : "Invalid",
      Message: confirmPasswordFlag || !formData.confirmPassword ? "" : "Passwords do not match"
    }    
    });
    //check email already exist state
    if(formData.email){
      axios.get(`/auth/checkEmail/${formData.email}`)
      .then((res) => {
        if(res.data.status === "Error"){
          setValidateFormData((prevData) => ({
            ...prevData,
            email: {
              State: "Invalid",
              Message: "Email already exists"
            }
          }));
        }
      }
      )
      .catch((error) => {
        console.error(error);
      });
    }
    if(formData.businessemail){
      axios.get(`/auth/checkBusinessEmail/${formData.businessemail}`)
      .then((res) => {
        if(res.data.status === "Error"){
          setValidateFormData((prevData) => ({
            ...prevData,
            businessemail: {
              State: "Invalid",
              Message: "Email already exists"
            }
          }));
        }
      }
      )
      .catch((error) => {
        console.error(error);
      });
    }
  }, [formData.email,formData.nic,formData.mobile,formData.businessContact,formData.businessemail,formData.password,formData.confirmPassword]);

  const [requiredFields] = useState({
    // Add the required fields here, corresponding to each page
    0: ['firstname', 'lastname','firstline','town','district','email', 'nic', 'gender', 'mobile'],
    1: ['felony', 'lawsuit','policeReport', 'bankStatement'],
    2: ['businessName', 'businessContact', 'bfirstline', 'btown', 'bdistrict','businessemail', 'businessDescription', 'businessregdoc'],
    3: ['password', 'confirmPassword', 'terms']
  });

  useEffect(() => {
    // Check if all the required fields on the current page are filled
    const isPageDataValid = requiredFields[page]?.every(field => formData[field]);

    // Check if there are no validation errors for the current page
    const isPageValid = Object.keys(validateFormData).every(field => validateFormData[field].State === "Valid");

    // Enable/disable the Next button based on the above checks
    setDisabled(!isPageDataValid || !isPageValid);
  }, [formData, validateFormData, requiredFields, page]);

  const FormTitles = ['Signup1', 'Signup2', 'Signup3', 'Signup4'];

  const PageDisplay = () => {
    if (page === 0) {
      return <Signup1 formData={formData} setFormData={setFormData} validateFormData={validateFormData}/>;
    } else if (page === 1) {
      return <Signup2 formData={formData} setFormData={setFormData} validateFormData={validateFormData} />;
    } else if (page === 2) {
      return <Signup3 formData={formData} setFormData={setFormData} validateFormData={validateFormData} />;
    } else if (page === 3) {
      return <Signup4 formData={formData} setFormData={setFormData} validateFormData={validateFormData} />;
    }
  };

  //map the stored data to the form data object
  const requestData = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    firstLineAddress: formData.firstline,
    secondLineAddress: formData.secondline,
    town: formData.town,
    district: formData.district,
    email: formData.email,
    nic: formData.nic,
    gender: formData.gender,
    contactNumber: formData.mobile,
    collaboratorDetails: formData.collobarators,
    felony: formData.felony,
    lawSuit: formData.lawsuit,
    felonyDescription: formData.lawsuitDetails,
    policeReport:formData.policeReport, 
    incomeStatement: formData.bankStatement,
    businessName: formData.businessName,
    businessContact: formData.businessContact,
    bfirstLineAddress: formData.bfirstline,
    bsecondLineAddress: formData.bsecondline,
    btown: formData.btown,
    bdistrict: formData.bdistrict,
    businessWebsite: formData.businesswebsite,
    businessEmail: formData.businessemail,
    businessDescription: formData.businessDescription,
    businessRegDoc: formData.businessregdoc ,
    password: formData.password
  }

  const handlePrevClick = () => {
    setPage((currPage) => currPage - 1);
  };

  const handleNextClick = async () => {
    if (page === FormTitles.length - 1) {
      console.log(requestData);
        try {
          const formData = new FormData();

          //generate a unique names for images using date and a random number
          const policeReportFileName = Date.now() + Math.random() + requestData.policeReport.name;
          const bankStatementFileName = Date.now() + Math.random() + requestData.incomeStatement.name;
          const businessregdocFileName = Date.now() + Math.random() + requestData.businessRegDoc.name;

          //append the images to the form data
          formData.append("policeReport", requestData.policeReport, policeReportFileName);
          formData.append("bankStatement", requestData.incomeStatement, bankStatementFileName);
          formData.append("businessregdoc", requestData.businessRegDoc, businessregdocFileName);

          //send the images to the backend
          const response = await axios.post('/auth/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true});
          console.log(response.data); 

          //update the request data with the image names
          requestData.policeReport = policeReportFileName;
          requestData.incomeStatement = bankStatementFileName;
          requestData.businessRegDoc = businessregdocFileName;

          const response2 = await axios.post('auth/register/entrepreneur', JSON.stringify(requestData), {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true});
          console.log(response2.data); 
          if(response2.data.status === "Success"){
            //redirect to success page
            window.location.href = "/success";
          }
        } catch (error) {
          console.error(error); // Handle any errors that occur during the request
        }
    }else{
      setPage((currPage) => currPage + 1);
    }
  };

  return (
    //Add navbar
    <div>
    <CommonNavbar active="Sign Up" />
    <main className="h-auto flex justify-center items-center bg-gray-200 lg:h-screen">
      <form className="bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] lg:w-9/12">
        <div className="text-gray-700 p-[2rem] w-full">
          {PageDisplay()}
          <Button
            type="button"
            className={'float-left' + (page === 0 ? ' hidden' : '')}
            icon="previous"
            onClick={handlePrevClick}
            // disabled={disabled}
          >
            Prev
          </Button>
          <Button
            type="button"
            className="float-right"
            onClick={handleNextClick}
            icon={page === FormTitles.length - 1 ? '' : 'next'}
            disabled={disabled}
          >
            {page === FormTitles.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
        <div className="listing w-[50%] rounded-r-[1rem] hidden lg:block"></div>
      </form>
    </main>
    <Footer />
    </div>
  );
}

export default Form;
