import React, {useState, useEffect} from "react";
import { Input, Select, Button, Header, StatusPopUp } from "../webcomponent";
import axios from '../../api/axios';
import useAxiosMethods from "../../hooks/useAxiosMethods";
import {useParams} from "react-router-dom";



const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const nicRegex = /^[0-9]{9}[vVxX]|[0-9]{12}$/;
const mobileRegex=/^(?:\+94|0)(?:\d{9})$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;





const UpdateEnterpriseInvestor = () => {
    const { get } = useAxiosMethods();
    const{ put } = useAxiosMethods();
    const [response, setResponse] = useState([

    ]);
    const [response2 , setResponse2] = useState([
    ]);
    const {id} = useParams();


    useEffect(() => {

        get(`/investors/EnterpriseInvestor/view/${id}`,setResponse);



    }, []);
    console.log(response)




    const[formData, setFormData] =useState({
        firstname: "",
        lastname: "",
        firstline: "",
        secondline: "",
        town: "",
        district: "",
        email: "",
        nic: "",
        gender: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        businessName: "",
    });

    useEffect(() => {
        setFormData({
            ...formData,
            firstname: response.firstname,
            lastname: response.lastname,
            firstline: response.firstLineAddress,
            secondline: response.secondLineAddress,
            town: response.town,
            district: response.district,
            email: response.email,
            nic: response.nic,
            gender: response.gender,
            mobile: response.contactNumber,
            password: response.password,
            confirmPassword: response.password,
            businessName: response.businessName,
        })

    }, [response]);

    const[validateFormData, setValidateFormData] =useState({
        firstname: {"State":"", "Message":""},
        lastname: {"State":"", "Message":""},
        firstline: {"State":"", "Message":""},
        secondline: {"State":"", "Message":""},
        town: {"State":"", "Message":""},
        district: {"State":"", "Message":""},
        email: {"State":"", "Message":""},
        nic: {"State":"", "Message":""},
        gender: {"State":"", "Message":""},
        mobile: {"State":"", "Message":""},
        password: {"State":"", "Message":""},
        confirmPassword: {"State":"", "Message":""},
        businessName: {"State":"", "Message":""}
    });

    const[disabled, setDisabled] = useState(true);

    const [showSuccessNotification, setShowSuccessNotification] = useState(false);

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
                Message: passwordFlag || !formData.password ? "" : "Password must contain at least 8 characters, one uppercase, one lowercase and one number"
            },
            confirmPassword: {
                State: confirmPasswordFlag || !formData.confirmPassword ? "Valid" : "Invalid",
                Message: confirmPasswordFlag || !formData.confirmPassword ? "" : "Passwords do not match"
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
        firstLineAddress: formData.firstline,
        secondLineAddress: formData.secondline,
        town: formData.town,
        district: formData.district,
        email: formData.email,
        nic: formData.nic,
        gender:formData.gender,
        contactNumber: formData.mobile,
        password: formData.password,
        businessName: formData.businessName,
    }
    //
    // const handleNextClick = async () => {
    //     const response2 = await axios.post(`coadmin/update/${id}`, JSON.stringify(requestData), {
    //         headers: { 'Content-Type': 'application/json' },
    //         withCredentials: true});
    //
    //     console.log(response2.data);
    //
    //     if(response2.data.status === "Success"){
    //         setShowSuccessNotification(true);
    //     }else{
    //         console.log("Error");
    //     }
    // };
    const handleUpdateClick =  () => {
        try {
            const response =  put(`/coadmin/update/${id}`, JSON.stringify(requestData), setResponse
            );


            if (response.status === 200) {
                console.log('Co-admin updated successfully');
                setShowSuccessNotification(true);

            } else {
                console.error('Update failed');
                setShowSuccessNotification(true);

            }
        } catch (error) {
            console.error('An error occurred: error', error);
            setShowSuccessNotification(true);

        }
    };


    //check all fields are valid and required fields are not empty
    const [requiredFields] = useState([
        "firstname",
        "lastname",
        "firstline",
        "town",
        "district",
        "email",
        "nic",
        "mobile",
        "password",
        "confirmPassword",
        "businessName"
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
                                <h3 className="text-3xl text-main-purple self-center">Update Enterprise Investor</h3>
                                <div className="mt-6">
                                    <div className="row">
                                        <Input
                                            type="text"
                                            label="Business Name"
                                            value={formData.businessName}
                                            onChange={(event)=>
                                                setFormData({...formData, businessName: event.target.value})
                                            }
                                            state={validateFormData.businessName}
                                            required={true}
                                        />

                                    </div>

                                    <fieldset className='p-2 border-[1px] mb-[1rem] rounded-2xl border-light-purple'>
                                        <legend className="bg-white px-[1rem] text-light-purple relative left-[0.1rem]">Address
                                        </legend>
                                        <div className="row">
                                            <Input
                                                type="text"
                                                label="First Line"
                                                value={formData.firstline}
                                                onChange={(event)=>
                                                    setFormData({...formData, firstline: event.target.value})
                                                }
                                                state={validateFormData.firstline}
                                                required={true}
                                            />
                                            <Input
                                                type="text"
                                                label="Second Line"
                                                value={formData.secondline}
                                                onChange={(event)=>
                                                    setFormData({...formData, secondline: event.target.value})
                                                }

                                            />
                                        </div>

                                        <div className="row">
                                            <Input
                                                type="text"
                                                label="Town"
                                                value={formData.town}
                                                onChange={(event)=>
                                                    setFormData({...formData, town: event.target.value})
                                                }
                                                state={validateFormData.town}
                                                required={true}
                                            />
                                            {/*<Select*/}
                                            {/*    label="District"*/}
                                            {/*    value={formData.district}*/}
                                            {/*    options={["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"]}*/}
                                            {/*    onChange={(event)=>*/}
                                            {/*        setFormData({...formData, district: event})*/}
                                            {/*    }*/}
                                            {/*    state={(validateFormData.district)}*/}
                                            {/*    required={true}*/}
                                            {/*/>*/}
                                        </div>
                                    </fieldset>

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

                                    <div className="row">
                                        <Input
                                            type="password"
                                            color="purple"
                                            label={<span style={{ fontSize: '12px' }}>Password:</span>}
                                            value={formData.password}
                                            onChange={(event)=>
                                                setFormData({...formData, password: event.target.value})
                                            }
                                            state={validateFormData.password}
                                            required={true}
                                        />
                                        <Input
                                            type="password"
                                            color="purple"
                                            label={<span style={{ fontSize: '12px' }}>Confirm Password:</span>}
                                            value={formData.confirmPassword}
                                            onChange={(event)=>
                                                setFormData({...formData, confirmPassword: event.target.value})
                                            }
                                            state={validateFormData.confirmPassword}
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
                            successTitle="Registration Successful"
                            successMessage="You have successfully Updated the Co-Admin"
                            redirectUrl="/admin/users/coAdmins"
                        />
                    )}
                </div>
            </Header>
        </div>
    )

}

export default UpdateEnterpriseInvestor;