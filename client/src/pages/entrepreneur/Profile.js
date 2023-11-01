import React, {useEffect, useState} from 'react';
import {DisableAccount, NotificationSettings} from "../sectioncomponent";
import {Button, Input, Select} from "../webcomponent";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import useAuth from "../../hooks/useAuth";
import {setRef} from "@fullcalendar/core/internal";
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;



const ProfileInfo = ({formData1, setFormData1,validateFormData1}) => {

    const [editMode, setEditMode] = useState(false);
    const[editForm, setEditForm] = useState(true);
    const[changePassword, setchangePassword] = useState(false)
    const handleEditClick = () => {
        setEditMode(true);
        setEditForm(false);
    };
    const handleChangePasswordClick = () => {
        setchangePassword(true)
    }
    const noHandleChangePasswordClick = () => {
        setchangePassword(false)
    }
    const {get,put} = useAxiosMethods();
    const handleSubmit = () => {
        setEditMode(false);
        setEditForm(true);
        put(`entrepreneurss/update-details/${id})`,response,true)
    };
    //get user id
    const [ response, setResponse] = useState([]);
    const {auth} = useAuth();
    const id=auth.id;
    console.log(id);


    useEffect(()=>{
        get(`entrepreneurs/pending-details/${id}`,setResponse, true);
    },[] )
    console.log(response)

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        firstline: "",
        secondline: "",
        town: "",
        district: "",
        mobile: "",
        password: "",
        confirmPassword: "",
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
            mobile: response.contactNumber,
            password: response.password,
            confirmPassword: response.password,
        })

    }, [response]);

    const [validateFormData, setValidateFormData] = useState({
        firstname: {"State": "", "Message": ""},
        lastname: {"State": "", "Message": ""},
        firstline: {"State": "", "Message": ""},
        secondline: {"State": "", "Message": ""},
        town: {"State": "", "Message": ""},
        district: {"State": "", "Message": ""},
        mobile: {"State": "", "Message": ""},
        password: {"State": "", "Message": ""},
        confirmPassword: {"State": "", "Message": ""}
    });

    const [disabled, setDisabled] = useState(true);

    const [showSuccessNotification, setShowSuccessNotification] = useState(false);

    useEffect(() => {
        //let mobileFlag = mobileRegex.test(formData.mobile);
        let passwordFlag = passwordRegex.test(formData.password);
        let confirmPasswordFlag = formData.password === formData.confirmPassword;

        setValidateFormData({
            password: {
                State: passwordFlag || !formData.password ? "Valid" : "Invalid",
                Message: passwordFlag || !formData.password ? "" : "Password must contain at least 8 characters, one uppercase, one lowercase and one number"
            },
            confirmPassword: {
                State: confirmPasswordFlag || !formData.confirmPassword ? "Valid" : "Invalid",
                Message: confirmPasswordFlag || !formData.confirmPassword ? "" : "Passwords do not match"
            }
        });
    }, [formData.password, formData.confirmPassword]);


    //check all fields are valid and required fields are not empty
    const [requiredFields] = useState([
        "firstname",
        "lastname",
        "firstline",
        "secondline",
        "town",
        "district",
        "mobile",
        "password",
        "confirmPassword"
    ]);

    useEffect(() => {
        let requiredFieldsFlag = requiredFields.every((field) => formData[field] !== "");

        let validateFormDataFlag = Object.values(validateFormData).every((field) => field.State === "Valid");

        setDisabled(!(requiredFieldsFlag && validateFormDataFlag));
    }, [formData, requiredFields, validateFormData]);


    const requestData = {
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
        password: formData.password,
    }


    const handleUpdateClick =  () => {
        setEditMode(false);
        setEditForm(true);
        try {
            const response =  put(`/entrepreneurs/update/${id}`, JSON.stringify(requestData), setResponse
            );

            if (response.status === 200) {
                console.log('investor updated successfully');

            } else {
                console.error('Update failed');

            }
        } catch (error) {
            console.error('An error occurred:', error);

        }
    };
    return (
        <div
            className='flex mt-24 relative justify-center items-start w-auto rounded-2xl py-[2rem] border border-main-purple'>
            {changePassword ? (
                /* Display change password form */
                <div>
                    <h1 className="text-2xl text-main-purple mb-6">Change Password</h1>
                    <div className="flex flex-col gap-6 items-center mb-1 ">
                        <Input
                            type="password"
                            label="Enter Current Password"
                            required
                        />
                        <Input
                            type="password"
                            label="Enter New Password"
                            required
                        />
                        <Input
                            type="password"
                            label="Confirm New Password"
                            required
                        />
                        <div className="row">
                            <Button color="purple" size="sm" ripple={true} type='submit' onClick={noHandleChangePasswordClick}>back</Button>

                            <Button color="purple" size="sm" ripple={true} type='submit'>Submit</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="ProfileInfo">
                    <div className="flex justify-between">
                        <h1 className="text-2xl text-main-purple">Profile Information</h1>
                        {editMode ? (
                            <Button color="purple" ripple={true} onClick={handleUpdateClick}>Submit</Button>
                        ) : (
                            <Button color="purple" ripple={true} onClick={handleEditClick} >Edit</Button>
                        )}
                    </div>
                    <div className="mt-6">
                        <div className="row">
                            <Input
                                type="text"
                                label="First Name"
                                value={formData.firstname}
                                disabled ={editForm}
                                onChange={(e) => {
                                    if (!editForm) {
                                        setFormData({
                                            ...formData,
                                            firstname: e.target.value, // Update the value in response state
                                        });
                                    }

                                }}
                                state={validateFormData.firstname}
                                required={true}

                            />
                            <Input
                                type="text"
                                label="Last name"
                                value={formData.lastname}
                                disabled ={editForm}
                                onChange={(e) => {
                                    if (!editForm) {
                                        setFormData({
                                            ...formData,
                                            lastname: e.target.value, // Update the value in response state
                                        });
                                    }
                                }}
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
                                    disabled ={editForm}
                                    onChange={(e) => {
                                        if (!editForm) {
                                            setFormData({
                                                ...formData,
                                                firstline: e.target.value, // Update the value in response state
                                            });
                                        }
                                    }}
                                />
                                <Input
                                    type="text"
                                    label="Second Line"
                                    value={formData.secondline}
                                    disabled ={editForm}
                                    onChange={(e) => {
                                        if (!editForm) {
                                            setFormData({
                                                ...formData,
                                                secondline: e.target.value, // Update the value in response state
                                            });
                                        }
                                    }}
                                />
                            </div>


                            <div className="row">
                                <Input
                                    type="text"
                                    label="Town"
                                    value={formData.town}
                                    disabled ={editForm}
                                    onChange={(e) => {
                                        if (!editForm) {
                                            setFormData({
                                                ...response,
                                                town: e.target.value, // Update the value in response state
                                            });
                                        }
                                    }}
                                />
                                <Select
                                    label="District"
                                    value={formData.district}
                                    options={["Ampara",
                                        "Anuradhapura",
                                        "Badulla",
                                        "Batticaloa",
                                        "Colombo",
                                        "Galle",
                                        "Gampaha",
                                        "Hambantota",
                                        "Jaffna",
                                        "Kalutara",
                                        "Kandy",
                                        "Kegalle",
                                        "Kilinochchi",
                                        "Kurunegala",
                                        "Mannar",
                                        "Matale",
                                        "Matara",
                                        "Monaragala",
                                        "Mullaitivu",
                                        "Nuwara Eliya",
                                        "Polonnaruwa",
                                        "Puttalam",
                                        "Ratnapura",
                                        "Trincomalee",
                                        "Vavuniya"]}
                                    disabled={editForm}
                                    onChange={(e) => {
                                        if (!editForm) {
                                            setFormData({
                                                ...formData,
                                                district: e, // Update the value in response state
                                            });
                                        }
                                    }}
                                />
                            </div>
                        </fieldset>

                            <Input
                                type="text"
                                label="mobile number"
                                value={formData.mobile}
                                disabled={editForm}
                                onChange={(e) => {
                                    if (!editForm) {
                                        setFormData({
                                            ...formData,
                                            mobile: e.target.value, // Update the value in response state
                                        });
                                    }
                                }}
                                state={validateFormData.mobile}
                                required={true}
                            />
                        </div>
                     {/*<button className="text-sm text-main-purple" onClick={handleChangePasswordClick}>Change Password</button>*/}
                </div>
            )}
        </div>
    )
}
// const UpdatedDocuments = () => {
//     return (
//         <div
//             className=' mb-24 flex flex-col mt-24 relative justify-center items-start w-auto rounded-2xl px-[1rem] lg:px-[5rem] py-[2rem] border border-main-purple'>
//             <h1 className="text-2xl text-main-purple self-center ">Documents Uploaded</h1>
//             <div className="flex flex-row items-center w-full text-center mt-6">
//                 <div className="applicationNotifications w-1/2">
//                     <h4 className="text-main-purple self-center">Bank Statement</h4>
//                     <div className='w-full mt-4 py-[2rem] px-4 bg-white flex flex-col space-y-4 mr-4'>
//                         <embed
//                             className="h-[600px] w-full"
//                             src="/assets/documents/Bank%20Account%20Statement.pdf"
//                             type="application/pdf"
//                         />
//                     </div>
//                 </div>
//
//                 <div className="applicationNotificationsSettings w-1/2">
//                     <h4 className=" text-main-purple self-center">Police Report</h4>
//                     <div className='w-full mt-4 py-[2rem] px-4 bg-white flex flex-col space-y-4 mr-4'>
//                         <embed
//                             className="h-[600px] w-full"
//                             src="/assets/documents/clearance_application.pdf"
//                             type="application/pdf"
//                         />
//                     </div>
//                 </div>
//
//                 <div className="applicationNotifications w-1/2">
//                     <h4 className="text-main-purple self-center">Business Registration Document</h4>
//                     <div className='w-full mt-4 py-[2rem] px-4 bg-white flex flex-col space-y-4 mr-4'>
//                         <embed
//                             className="h-[600px] w-full"
//                             src="/assets/documents/registration%20dicument.BR.pdf"
//                             type="application/pdf"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

const Profile = () => {
    return (
        <>
            <ProfileInfo/>
            {/*<NotificationSettings/>*/}
            {/*<UpdatedDocuments/>*/}
            <DisableAccount/>
        </>
    )
}

export default Profile

