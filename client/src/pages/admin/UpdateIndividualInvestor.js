import React, {useState, useEffect} from "react";
import { Input, Select, Button, Header, StatusPopUp } from "../webcomponent";
import axios from '../../api/axios';
import useAxiosMethods from "../../hooks/useAxiosMethods";
import {useParams} from "react-router-dom";
import {isPromise} from "formik";



const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const nicRegex = /^[0-9]{9}[vVxX]|[0-9]{12}$/;
const mobileRegex=/^(?:\+94|0)(?:\d{9})$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;





const UpdateIndividualInvestor = () => {
    const { get } = useAxiosMethods();
    const{ put } = useAxiosMethods();
    const [response, setResponse] = useState([

    ]);
    const [response2 , setResponse2] = useState([
    ]);
    const {id} = useParams();


    useEffect(() =>{

        get(`investors/IndividualInvestor/view/${id}`, setResponse, true);



    }, []);
    console.log(response)




    const[formData, setFormData] =useState({
        firstname: "",
        lastname: "",
        email: "",
        nic: "",
        mobile: "",
        businessName: "",
        businessEmail: "",

    });

    useEffect(() => {
        setFormData({
            ...formData,
            firstname: response.firstname,
            lastname: response.lastname,
            email: response.email,
            nic: response.nic,
            mobile: response.contactNumber,
            businessName: response.businessName,
            businessEmail: response.businessEmail,
        })

    }, [response]);

    const[validateFormData, setValidateFormData] =useState({
        firstname: {"State":"", "Message":""},
        lastname: {"State":"", "Message":""},
        email: {"State":"", "Message":""},
        nic: {"State":"", "Message":""},
        mobile: {"State":"", "Message":""},
        businessName: {"State":"", "Message":""},
        businessEmail: {"State":"", "Message":""},

    });

    const[disabled, setDisabled] = useState(true);

    const [showSuccessNotification, setShowSuccessNotification] = useState(false);

    useEffect(() => {
        let emailFlag = emailRegex.test(formData.email);
        let nicFlag=nicRegex.test(formData.nic);
        let mobileFlag=mobileRegex.test(formData.mobile);


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
            }

        });
        //check email already exist state
        if(formData.email){
            axios.get(`/auth/UpdatecheckEmail/${formData.email}/${id}`)
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
    },[formData.email, formData.nic, formData.mobile, formData.password, formData.confirmPassword]);

    const requestData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        nic: formData.nic,
        contactNumber: formData.mobile,
        businessName: formData.businessName,
        businessEmail: formData.businessEmail,
    }

      const handleUpdateClick =()  => {
        try {
            const response2 =  put(`investors/IndividualInvestor/update/${id}`, JSON.stringify(requestData), setResponse2
            );

            if (response2.status === 200 || response2.status === 304) {
                console.log('Co-admin updated successfully');
                setShowSuccessNotification(true);

            } else {
                console.log(response2);
                setShowSuccessNotification(true);



            }
        } catch (error) {
            console.error('An error occurred:', error);

        }
    };


    //check all fields are valid and required fields are not empty
    const [requiredFields] = useState([
        "firstname",
        "lastname",
        "email",
        "nic",
        "mobile",
        "businessName",
        "businessEmail",

    ]);

    useEffect(() => {
        let requiredFieldsFlag = requiredFields.every((field) => formData[field] !== "");

        let validateFormDataFlag = Object.values(validateFormData).every((field) => field.State === "Valid");

        setDisabled(!(requiredFieldsFlag && validateFormDataFlag));
    }, [formData, requiredFields, validateFormData]);

    return(
        <div>
            <Header active="Co-Admins">
                <main className="h-auto flex justify-center items-center g:h-screen">
                    <form className=" bg-white flex border-[1px] border-main-purple mt-[-0.5rem] h-auto lg:rounded-[1rem] lg:w-full">
                        <div className="text-gray-700 p-10 w-full">
                            <div className="Signup1">
                                <h3 className="text-3xl text-main-purple self-center">Update Individual Investor</h3>
                                <div className="mt-6">
                                    <div className="row">
                                        <Input
                                            type="text"
                                            label="First Name"
                                            value={formData.firstname}
                                            onChange={(event)=>
                                                setFormData({...formData, firstname: event.target.value})
                                            }
                                            state={validateFormData.firstname}
                                            required={true}
                                        />
                                        <Input
                                            type="text"
                                            label="Last name"
                                            value={formData.lastname}
                                            onChange={(event)=>
                                                setFormData({...formData, lastname: event.target.value})
                                            }
                                            state={validateFormData.lastname}
                                            required={true}
                                        />
                                    </div>



                                    <div className="row">
                                        <Input
                                            type="email"
                                            label="Email"
                                            value={formData.email}
                                            onChange={(event)=>
                                                setFormData({...formData, email: event.target.value})
                                            }
                                            state={validateFormData.email}
                                            required={true}
                                        />
                                        <Input
                                            type="text"
                                            label="NIC"
                                            value={formData.nic}
                                            onChange={(event)=>
                                                setFormData({...formData, nic: event.target.value})
                                            }
                                            state={validateFormData.nic}
                                            required={true}
                                        />
                                    </div>

                                    <div className="row">

                                        <Input
                                            type="text"
                                            label="mobile number"
                                            value={formData.mobile}
                                            onChange={(event)=>
                                                setFormData({...formData, mobile: event.target.value})
                                            }
                                            state={validateFormData.mobile}
                                            required={true}
                                        />
                                    </div>


                                

                                    <Button
                                        type="button"
                                        className="float-right"
                                        onClick={handleUpdateClick}
                                        label="Submit"
                                        disabled={disabled}
                                    >
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="coadmin w-[60%] rounded-r-[1rem] hidden lg:block">
                        </div>
                    </form>
                </main>
                <div>
                    {showSuccessNotification && (
                        <StatusPopUp
                            successTitle="Update Successful"
                            successMessage="You have successfully Updated the account!"
                            redirectUrl="/admin/users/individualInvestors"
                        />
                    )}
                </div>
            </Header>
        </div>
    )

}

export default UpdateIndividualInvestor;