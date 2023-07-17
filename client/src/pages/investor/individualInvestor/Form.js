import React, {useEffect, useState} from 'react';
import Signup1 from './Signup1';
import Signup2 from './Signup2';
import Button from '../../webcomponent/Button';
import Navbar from '../../webcomponent/NavbarHome';
import Footer from '../../webcomponent/Footer';
import axios from 'axios';

const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const nicRegex=/^\d{10}(?:\d{2}|-\d{2}v)$/;
const mobileRegex=/^(?:\+94|0)(?:\d{9})$/;

function Form() {
    const [page, setPage] = useState(0);
    const[formData, setFormData] = useState({
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
        policeReport: '',
        bankStatement: '',
        password: '',
        confirmPassword: ''
    });    

    const[validateFormData, setValidateFormData] = useState({
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
        policeReport: { "State":"", "Message":"" },
        bankStatement: { "State":"", "Message":"" },
        password: { "State":"", "Message":"" },
        confirmPassword: { "State":"", "Message":"" }
    });

    const[disabled, setDisabled] = useState(true);

    useEffect(() => {
        let emailFlag = emailRegex.test(formData.email);
        let nicFlag=nicRegex.test(formData.nic);
        let mobileFlag=mobileRegex.test(formData.mobile);
        let passwordFlag = formData.password.length >= 8;
        let confirmPasswordFlag = formData.password === formData.confirmPassword;

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
              password: {
                State: passwordFlag || !formData.password ? "Valid" : "Invalid",
                Message: passwordFlag || !formData.password ? "" : "Password must be at least 8 characters"
              },
              confirmPassword: {
                State: confirmPasswordFlag || !formData.confirmPassword ? "Valid" : "Invalid",
                Message: confirmPasswordFlag || !formData.confirmPassword ? "" : "Passwords do not match"
              }    
        });

    },[formData.email, formData.nic, formData.mobile, formData.password, formData.confirmPassword]);

    const [requiredFields] = useState({
        // Add the required fields here, corresponding to each page
        0: ['firstname', 'lastname','firstline','town','district','email', 'nic', 'gender', 'mobile'],
        1: ['policeReport', 'bankStatement','password', 'confirmPassword', 'terms']
    });

    useEffect(() => {
        // Check if all the required fields on the current page are filled
        const isPageDataValid = requiredFields[page]?.every(field => formData[field]);

        // Check if there are no validation errors for the current page
        const isPageValid = Object.keys(validateFormData).every(field => validateFormData[field].State === "Valid");
        
        // Enable/disable the Next button based on the above checks
        setDisabled((!isPageDataValid || !isPageValid));
    }, [formData, validateFormData, requiredFields, page]);

    const FormTitles=["Signup1", "Signup2"];

    const PageDisplay = () => {
        if(page === 0){
            return <Signup1 formData={formData} setFormData={setFormData} validateFormData={validateFormData}/>
        }else if(page === 1){
            return <Signup2 formData={formData} setFormData={setFormData} validateFormData={validateFormData}/>
        }
    };

    const handlePrevClick = () => {
        setPage((currPage) => currPage - 1)
      };
    
    const handleNextClick = async () => {
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

    const requestData ={
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
        policeReport: formData.policeReport,
        financialDocument: formData.bankStatement,
        password: formData.password,
        confirmPassword: formData.confirmPassword
    }

    return(
        <div>
        <Navbar/>
        <main className="h-auto flex justify-center items-center bg-gray-200 lg:h-screen">
            <form className=" bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] lg:w-9/12">
                <div className="text-gray-700 p-20 w-full">
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
                        disabled={disabled}
                    >
                    {page === FormTitles.length - 1 ? 'Submit' : 'Next'}
                    </Button>                
                    </div> 
                <div className="listing w-[50%] rounded-r-[1rem] hidden lg:block">
                </div>             
            </form>
        </main> 
        <Footer/>
        </div>   
    )
}
export default Form;