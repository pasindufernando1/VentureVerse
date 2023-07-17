import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Signup1 from './Signup1';
import Signup2 from './Signup2';
import Signup3 from './Signup3';
import Signup4 from './Signup4';
import Button from '../webcomponent/Button';
import Navbar from '../webcomponent/NavbarHome';
import Footer from '../webcomponent/Footer';

const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const nicRegex=/^\d{10}(?:\d{2}|-\d{2}v)$/;
const mobileRegex=/^(?:\+94|0)(?:\d{9})$/;


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

  const [validateFormData, setValitadeFormData] = useState({
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
    let nicFlag=nicRegex.test(formData.nic)
    let mobileFlag=mobileRegex.test(formData.mobile)
 
  // Update the validateFormData in a single call
  setValitadeFormData({
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
    }    
    });
  }, [formData.email,formData.nic,formData.mobile]);
 
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

    //map the stored data to the formdata object
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
    lawsuit: formData.lawsuit,
    felonyDescription: formData.lawsuitDetails,
    policeReport: formData.policeReport,
    incomeStatement: formData.bankStatement,
    businessName: formData.businessName,
    businessContact: formData.businessContact,
    bfirstlineAddress: formData.bfirstline,
    bsecondlineAddress: formData.bsecondline,
    btown: formData.btown,
    bdistrict: formData.bdistrict,
    businessWebsite: formData.businesswebsite,
    businessEmail: formData.businessemail,
    businessDescription: formData.businessDescription,
    businessregdoc: formData.businessregdoc,
    password: formData.password
  }

  const handlePrevClick = () => {
    setPage((currPage) => currPage - 1);
  };

  const handleNextClick = async () => {
    //if the submit page then just get the data and submit the form
    if (page === FormTitles.length - 1) {
      console.log(requestData);
      try {
        const response = await axios.post('/api/auth/register/entrepreneur', requestData);
        console.log(response.data); // Handle the response from the back-end as needed
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
    <Navbar />
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
