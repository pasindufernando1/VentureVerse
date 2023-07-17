import React, {useState} from 'react';
import Signup1 from './Signup1';
import Signup2 from './Signup2';
import Button from '../../webcomponent/Button';
import Navbar from '../../webcomponent/NavbarHome';
import Footer from '../../webcomponent/Footer';
import axios from 'axios';

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
    const FormTitles=["Signup1", "Signup2"];

    const PageDisplay = () => {
        if(page === 0){
            return <Signup1 formData={formData} setFormData={setFormData} setPage={setPage}/>
        }else if(page === 1){
            return <Signup2 formData={formData} setFormData={setFormData} />
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