import React, {useState} from 'react';
import Signup1 from './Signup1';
import Signup2 from './Signup2';
import Button from '../../webcomponent/Button';
import Navbar from '../../webcomponent/NavbarHome';
import Footer from '../../webcomponent/Footer';

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
    
      const handleNextClick = () => {
          if (page === FormTitles.length - 1) {
            alert('FORM SUBMITTED');
            console.log(formData);
          } else {
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