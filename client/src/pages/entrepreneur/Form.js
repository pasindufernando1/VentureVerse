import React, { useState } from 'react';
import Signup1 from './Signup1';
import Signup2 from './Signup2';
import Signup3 from './Signup3';
import Signup4 from './Signup4';
import Button from '../webcomponent/Button';
import Navbar from '../webcomponent/NavbarHome';
import Footer from '../webcomponent/Footer';

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
    confirmPassword: ''
  });

  // validation
  // const validateForm=()=> {
  //   const errors = {};
  //   //first page
  //   if(page === 0){
  //     if (formData.firstname.trim().length < 3) {
  //       errors.firstname = 'First name must be at least 3 characters.';
  //     }
  //     if (formData.lastname.trim().length < 3) {
  //       errors.lastname = 'Last name must be at least 3 characters.';
  //     }
  //     //check email using a regex
  //     if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //       errors.email = 'Email address is invalid.';
  //     }
  //     //check both types of nic using a regex
  //     if (!/^[0-9]{9}[vVxX]$/.test(formData.nic) && !/^[0-9]{12}$/.test(formData.nic)) {
  //       errors.nic = 'NIC is invalid.';
  //     }
  //     //check mobile number using a regex
  //     if (!/^[0-9]{10}$/.test(formData.mobile)) {
  //       errors.mobile = 'Mobile number is invalid.';
  //     }
  //   }else if(page === 2){
  //     //second page
  //     if (formData.businessName.trim().length < 3) {
  //       errors.businessName = 'Business name must be at least 3 characters.';
  //     }
  //     //check business contact number using a regex
  //     if (!/^[0-9]{10}$/.test(formData.businessContact)) {
  //       errors.businessContact = 'Business contact number is invalid.';
  //     }
  //     //check business email using a regex
  //     if (!/\S+@\S+\.\S+/.test(formData.businessemail)) {
  //       errors.businessemail = 'Business email address is invalid.';
  //     }
  //   }else if(page === 3){
  //     //third page
  //     if (formData.password.trim().length < 6) {
  //       errors.password = 'Password must be at least 6 characters.';
  //     }
  //     if (formData.confirmPassword.trim().length < 6) {
  //       errors.confirmPassword = 'Confirm password must be at least 6 characters.';
  //     }
  //     if (formData.password !== formData.confirmPassword) {
  //       errors.confirmPassword = 'Passwords do not match.';
  //     }
  //   }
  //   setFormErrors(errors);
  // };

  const FormTitles = ['Signup1', 'Signup2', 'Signup3', 'Signup4'];

  const PageDisplay = () => {
    if (page === 0) {
      // <Signup1 formData={formData} setFormData={setFormData} validateForm={validateForm} formErrors={formErrors} setFormErrors={setFormErrors} isFormValid={isFormValid} />
      return <Signup1 formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <Signup2 formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      return <Signup3 formData={formData} setFormData={setFormData} />;
    } else if (page === 3) {
      return <Signup4 formData={formData} setFormData={setFormData} />;
    }
  };

  const handlePrevClick = () => {
    setPage((currPage) => currPage - 1);
  };

  const handleNextClick = () => {
    setPage((currPage) => currPage + 1);
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
          >
            Prev
          </Button>
          <Button
            type="button"
            className="float-right"
            onClick={handleNextClick}
            icon={page === FormTitles.length - 1 ? '' : 'next'}
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
