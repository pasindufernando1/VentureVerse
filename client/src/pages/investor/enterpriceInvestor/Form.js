import React, {useState,useEffect} from 'react';
import Signup1 from './Signup1';
import Signup2 from './Signup2';
import Button from '../../webcomponent/Button';
import Navbar from '../../webcomponent/NavbarHome';
import Footer from '../../webcomponent/Footer';
import axios from '../../../api/axios';

const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const nicRegex=/^\d{10}(?:\d{2}|-\d{2}v)$/;
const mobileRegex=/^(?:\+94|0)(?:\d{9})$/;
const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

function Form() {
    const [page, setPage] = useState(0);
    const[formData, setFormData] = useState({
        companyName: '',
        firstline: '',
        secondline: '',
        town: '',
        district: '',
        email: '',
        mobile: '',
        businessregdoc: '',
        bankStatement: '',
        password: '',
        confirmPassword: ''
    });    
    const [validateFormData, setValidateFormData] = useState({
        companyName: { "State":"", "Message":"" },
        firstline: { "State":"", "Message":"" },
        town: { "State":"", "Message":"" },
        district: { "State":"", "Message":"" },
        email: { "State":"", "Message":"" },
        mobile: { "State":"", "Message":"" },
        businessregdoc: { "State":"", "Message":"" },
        bankStatement: { "State":"", "Message":"" },
        password: { "State":"", "Message":"" },
        confirmPassword: { "State":"", "Message":"" }
    });
    const[disabled, setDisabled] = useState(true);

    useEffect(() => {
        let emailFlag = emailRegex.test(formData.email);
        let nicFlag=nicRegex.test(formData.nic);
        let mobileFlag=mobileRegex.test(formData.mobile);
        let passwordFlag = passwordRegex.test(formData.password);
        let confirmPasswordFlag = formData.password === formData.confirmPassword;

        setValidateFormData({
            email: {
                State: emailFlag || !formData.email ? "Valid" : "Invalid",
                Message: emailFlag || !formData.email ? "" : "Invalid Email"
            },
            nic: {
                State: nicFlag || !formData.nic ? "Valid" : "Invalid",
                Message: nicFlag || !formData.nic ? "" : "Invalid NIC"
            },
            mobile: {
                State: mobileFlag || !formData.mobile ? "Valid" : "Invalid",
                Message: mobileFlag || !formData.mobile ? "" : "Invalid Mobile Number"
            },
            password: {
                State: passwordFlag || !formData.password ? "Valid" : "Invalid",
                Message: passwordFlag || !formData.password ? "" : "Password must contain at least 8 characters, one uppercase, one lowercase and one number"
            },
            confirmPassword: {
                State: confirmPasswordFlag || !formData.confirmPassword ? "Valid" : "Invalid",
                Message: confirmPasswordFlag || !formData.confirmPassword ? "" : "Password does not match"
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
    }, [formData.email, formData.nic, formData.mobile, formData.password, formData.confirmPassword]);

    const FormTitles=["Signup1", "Signup2"];

    const [requiredFields] = useState({
        0: ['companyName','firstline','town','district','email', 'mobile','businessregdoc', 'bankStatement'],
        1: ['password', 'confirmPassword', 'terms']
    });

    useEffect(() => {
        // Check if all the required fields on the current page are filled
        const isPageDataValid = requiredFields[page]?.every(field => formData[field]);

        // Check if there are no validation errors for the current page
        const isPageValid = Object.keys(validateFormData).every(field => validateFormData[field].State === "Valid");
        
        // Enable/disable the Next button based on the above checks
        setDisabled((!isPageDataValid || !isPageValid));
    }, [formData, validateFormData, requiredFields, page]);

    const PageDisplay = () => {
        if(page === 0){
            return <Signup1 formData={formData} setFormData={setFormData} validateFormData={validateFormData}/>
        }else if(page === 1){
            return <Signup2 formData={formData} setFormData={setFormData} validateFormData={validateFormData}/>
        }
    };

    const requestData =  {
        businessName: formData.companyName,
        firstLineAddress: formData.firstline,
        secondLineAddress: formData.secondline,
        town: formData.town,
        district: formData.district,
        email: formData.email,
        contactNumber: formData.mobile,
        businessRegistration: formData.businessregdoc,
        financialDocument: formData.bankStatement,
        password: formData.password
    };

    const handlePrevClick = () => {
        setPage((currPage) => currPage - 1)
      };
    
    const handleNextClick = async () => {
        if (page === FormTitles.length - 1) {
            console.log(requestData);
              try {
                const formData = new FormData();
      
                //generate a unique names for images using date and a random number
                const bankStatementFileName = Date.now() + Math.random() + requestData.financialDocument.name;
                const businessregdocFileName = Date.now() + Math.random() + requestData.businessRegistration.name;
      
                //append the images to the formdata
                formData.append("bankStatement", requestData.financialDocument, bankStatementFileName);
                formData.append("businessregdoc", requestData.businessRegistration, businessregdocFileName);
      
                //send the images to the backend
                const response = await axios.post('/auth/uploadenterprice', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true});
                console.log(response.data); 
      
                //update the request data with the image names
                requestData.financialDocument = bankStatementFileName;
                requestData.businessRegistration = businessregdocFileName;
      
                const response2 = await axios.post('auth/register/enterpriseInvestor', JSON.stringify(requestData), {
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