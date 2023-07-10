import React, {useState} from 'react';
import Signup1 from './Signup1';
import Signup2 from './Signup2';
import Signup3 from './Signup3';
import Signup4 from './Signup4';
import Button from '../webcomponent/Button';

function Form() {
    const [page, setPage] = useState(0);
    //validation
    // const [errors, setErrors] = useState({});
    //form data
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

    const[formErrors, setFormErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        nic: '',
        mobile: '',
        password: '',
        confirmPassword: ''
    });

    //validation
    const validate = (name, value) => {
        switch(name){
            case 'firstname':
                if(value.length < 3){
                    setFormErrors({...formErrors, firstname: 'First name must be at least 3 characters long'});
                }
                break;
            case 'lastname':
                if(value.length < 3){
                    setFormErrors({...formErrors, lastname: 'Last name must be at least 3 characters long'});
                }else{
                    setFormErrors({...formErrors, lastname: ''});
                }
                break;
            case 'email':
                //check using a regular expression
                if(!/\S+@\S+\.\S+/.test(value)){
                    setFormErrors({...formErrors, email: 'Email is not valid'});
                }else{
                    setFormErrors({...formErrors, email: ''});
                }
                break;
            case 'nic':
                //check using a regular expression for 2 formats of NIC
                if(!/^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(value)){
                    setFormErrors({...formErrors, nic: 'NIC is not valid'});
                }else{
                    setFormErrors({...formErrors, nic: ''});
                }
                break;
            }
    }

    const FormTitles=["Signup1", "Signup2", "Signup3", "Signup4"];

    const PageDisplay = () => {
        if(page === 0){
            return <Signup1 formData={formData} setFormData={setFormData} setPage={setPage}/>
        }else if(page === 1){
            return <Signup2 formData={formData} setFormData={setFormData} />
        }else if(page === 2){
            return <Signup3 formData={formData} setFormData={setFormData} />
        }else if(page === 3){
            return <Signup4 formData={formData} setFormData={setFormData} />
        }
    };

    return(
        <main className="h-auto flex justify-center items-center bg-gray-200 lg:h-screen">
            <form className=" bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] lg:w-9/12">
                <div className="text-gray-700 p-[2rem] w-full">
                    {PageDisplay()}
                    <Button 
                        type="button"
                        className={"float-left" + (page === 0 ? " hidden" : "")}
                        icon="previous"
                        onClick={() => {   
                            const hasErrors = Object.values(formErrors).some((error) => error !== ''); 
                            if (hasErrors) {
                                alert('Please fix the errors before submitting.');
                            } else{   
                                setPage((currPage) => currPage - 1);
                            }
                        }}
                    >
                    Prev    
                    </Button>
                    <Button
                        type="button"
                        className="float-right"
                        onClick={() => {
                        const hasErrors = Object.values(formErrors).some((error) => error !== '');
                        if (hasErrors) {
                            alert('Please fix the errors before submitting.');
                        } else if (page === FormTitles.length - 1) {
                            alert("FORM SUBMITTED");
                            console.log(formData);
                        } else {
                            setPage((currPage) => currPage + 1);
                        }
                        }}
                        icon={page === FormTitles.length - 1 ? "" : "next"}
                    >
                    {page === FormTitles.length - 1 ? "Submit" : "Next"}
                    </Button>
                </div> 
                <div className="listing w-[50%] rounded-r-[1rem] hidden lg:block">
                </div>             
            </form>
        </main>    
    )
}
export default Form;