import React, {useState} from 'react';
import Signup1 from './Signup1';
import Signup2 from './Signup2';
import Signup3 from './Signup3';
import Signup4 from './Signup4';
import { Button } from '@material-tailwind/react';

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
                <div className="text-gray-700 p-20 w-full">
                    {PageDisplay()}
                    <Button 
                        type="button"
                        //hide prev button on first page
                        hidden={page === 0}
                        //change the color to purple
                        color="purple"
                        className="float-left"
                        onClick={() => {      
                        setPage((currPage) => currPage - 1);
                        }}
                    >
                    Prev    
                    </Button>
                    <Button
                        type="button"
                        color="purple"
                        className="float-right"
                        onClick={() => {
                        if (page === FormTitles.length - 1) {
                            alert("FORM SUBMITTED");
                            console.log(formData);
                        } else {
                            setPage((currPage) => currPage + 1);
                        }
                        }}
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