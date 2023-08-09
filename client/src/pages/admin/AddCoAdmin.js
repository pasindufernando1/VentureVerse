import {Navbar,Button} from "../webcomponent";
import React, {useState, useEffect} from "react";
import { Input, Select } from "../webcomponent";
import Sidebar from "../webcomponent/CustomSideBar";
import axios from '../../api/axios';

const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const nicRegex=/^\d{10}(?:\d{2}|-\d{2}v)$/;
const mobileRegex=/^(?:\+94|0)(?:\d{9})$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

const AdminTestHome = () => {
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
    });

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
        confirmPassword: {"State":"", "Message":""}
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
    }

    const handleNextClick = async () => {
        const response2 = await axios.post('auth/register/admin', JSON.stringify(requestData), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true});

            console.log(response2.data);

            if(response2.data.status === "Success"){
              window.location.href = "/success";
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
        "confirmPassword"
    ]);

    useEffect(() => {
        let requiredFieldsFlag = requiredFields.every((field) => formData[field] !== "");

        let validateFormDataFlag = Object.values(validateFormData).every((field) => field.State === "Valid");

        setDisabled(!(requiredFieldsFlag && validateFormDataFlag));
    }, [formData, requiredFields, validateFormData]);

    return(
        <div>
        <Sidebar active="Dashboard">
            <main className="h-auto flex justify-center items-center g:h-screen">
                <form className=" bg-white flex border-[1px] border-main-purple mt-[-2.5rem] h-auto lg:rounded-[1rem] lg:w-full">
                    <div className="text-gray-700 p-20 w-full">
                    <div className="Signup1">
                    <h3 className="text-3xl text-main-purple self-center">Add New Co-Admin</h3>                                
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
                                    <Select 
                                        label="District"
                                        value={formData.district}
                                        options={["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"]}
                                        onChange={(event)=>
                                            setFormData({...formData, district: event})
                                        }
                                        state={validateFormData.district}
                                        required={true}
                                    />
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
                                <Select
                                    label="Gender"
                                    value={formData.gender}
                                    options={["Male","Female"]}
                                    onChange={(event)=>
                                        setFormData({...formData, gender: event})
                                    }
                                    state={validateFormData.gender}
                                    required={true}
                                />
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
                                onClick={handleNextClick}
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
        </Sidebar>  
        </div>   
    )

}

export default AdminTestHome;