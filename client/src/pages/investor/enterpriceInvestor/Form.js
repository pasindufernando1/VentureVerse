import React, {useState,useEffect} from 'react';
import Signup1 from './Signup1';
import Signup2 from './Signup2';
import Button from '../../webcomponent/Button';
import Navbar from '../../webcomponent/NavbarHome';
import Footer from '../../webcomponent/Footer';

const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const nicRegex=/^\d{10}(?:\d{2}|-\d{2}v)$/;
const mobileRegex=/^(?:\+94|0)(?:\d{9})$/;

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
        let passwordFlag = formData.password.length >= 8;
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
                Message: passwordFlag || !formData.password ? "" : "Password must be at least 8 characters"
            },
            confirmPassword: {
                State: confirmPasswordFlag || !formData.confirmPassword ? "Valid" : "Invalid",
                Message: confirmPasswordFlag || !formData.confirmPassword ? "" : "Password does not match"
            }
        });
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

    const handlePrevClick = () => {
        setPage((currPage) => currPage - 1)
      };
    
    const handleNextClick = () => {
    if(page === FormTitles.length - 1){
        console.log(formData);
    }else{
        setPage((currPage) => currPage + 1)
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