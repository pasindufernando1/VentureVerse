import React, {useEffect, useState} from 'react';
import {DisableAccount, NotificationSettings} from "../sectioncomponent";
import {Button, Input, Select} from "../webcomponent";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import useAuth from "../../hooks/useAuth";
import {setRef} from "@fullcalendar/core/internal";

const ProfileInfo = ({formData, setFormData,validateFormData}) => {

    const [editMode, setEditMode] = useState(false);
    const[editForm, setEditForm] = useState(true);
    const[changePassword, setchangePassword] = useState(false)
    const handleEditClick = () => {
        setEditMode(true);
        setEditForm(false);
    };

    //get user id
    const [ response, setResponse] = useState([]);
    const {auth} = useAuth();
    const id=auth.id;
    console.log(id);

    const {get} = useAxiosMethods();
    useEffect(()=>{
        get(`entrepreneurs/pending-details/${id}`,setResponse, true);
    },[] )
    console.log(response)

    const handleChangePasswordClick = () => {
        setchangePassword(true)
    }
    const noHandleChangePasswordClick = () => {
        setchangePassword(false)
    }

    const handleSubmit = () => {
        // Perform form submission or data updating logic here
        // ...

        // After submission, exit edit mode
        setEditMode(false);
        setEditForm(true);
    };
    return (
        <div className='flex mt-24 relative justify-center items-start w-auto rounded-2xl py-[2rem] border border-main-purple'>
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
                            <Button color="purple" ripple={true} onClick={handleSubmit}>Submit</Button>
                        ) : (
                            <Button color="purple" ripple={true} onClick={handleEditClick} >Edit</Button>
                        )}
                    </div>
                    <div className="mt-6">
                        <div className="row">
                            <Input
                                type="text"
                                label="First Name"
                                value={response.firstname}
                                disabled ={editForm}
                            />
                            <Input
                                type="text"
                                label="Last name"
                                value={response.lastname}
                                disabled ={editForm}
                            />

                        </div>


                        <fieldset className='p-2 border-[1px] mb-[1rem] rounded-2xl border-light-purple'>
                            <legend className="bg-white px-[1rem] text-light-purple relative left-[0.1rem]">Address</legend>
                            <div className="row">
                                <Input
                                    type="text"
                                    label="First Line"
                                    value={response.firstLineAddress}
                                    disabled ={editForm}
                                />
                                <Input
                                    type="text"
                                    label="Second Line"
                                    value={response.secondLineAddress}
                                    disabled ={editForm}
                                />
                            </div>


                            <div className="row">
                                <Input
                                    type="text"
                                    label="Town"
                                    value={response.town}
                                    disabled ={editForm}
                                />
                                <Select
                                    label="District"
                                    value={response.district}
                                    options={["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"]}
                                    disabled ={editForm}
                                />
                            </div>
                        </fieldset>

                        <div className="row">
                            <Select
                                label="Gender"
                                value={response.gender}
                                options={["Male","Female"]}
                                disabled ={editForm}
                            />
                            <Input
                                type="text"
                                value={response.contactNumber}
                                label="mobile number"
                                disabled ={editForm}
                            />
                        </div>
                    </div>
                    <button className="text-sm text-main-purple" onClick={handleChangePasswordClick}>Change Password</button>
                </div>
            )}
        </div>
    )
}
const UpdatedDocuments = () => {
    return (
        <div
            className=' mb-24 flex flex-col mt-24 relative justify-center items-start w-auto rounded-2xl px-[1rem] lg:px-[5rem] py-[2rem] border border-main-purple'>
            <h1 className="text-2xl text-main-purple self-center ">Documents Uploaded</h1>
            <div className="flex flex-row items-center w-full text-center mt-6">
                <div className="applicationNotifications w-1/2">
                    <h4 className="text-main-purple self-center">Bank Statement</h4>
                    <div className='w-full mt-4 py-[2rem] px-4 bg-white flex flex-col space-y-4 mr-4'>
                        <embed
                            className="h-[600px] w-full"
                            src="/assets/documents/Bank%20Account%20Statement.pdf"
                            type="application/pdf"
                        />
                    </div>
                </div>

                <div className="applicationNotificationsSettings w-1/2">
                    <h4 className=" text-main-purple self-center">Police Report</h4>
                    <div className='w-full mt-4 py-[2rem] px-4 bg-white flex flex-col space-y-4 mr-4'>
                        <embed
                            className="h-[600px] w-full"
                            src="/assets/documents/clearance_application.pdf"
                            type="application/pdf"
                        />
                    </div>
                </div>

                <div className="applicationNotifications w-1/2">
                    <h4 className="text-main-purple self-center">Business Registration Document</h4>
                    <div className='w-full mt-4 py-[2rem] px-4 bg-white flex flex-col space-y-4 mr-4'>
                        <embed
                            className="h-[600px] w-full"
                            src="/assets/documents/registration%20dicument.BR.pdf"
                            type="application/pdf"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const Profile = () => {
    return (
        <>
            <ProfileInfo/>
            <NotificationSettings/>
            <UpdatedDocuments/>
            <DisableAccount/>
        </>
    )
}

export default Profile

