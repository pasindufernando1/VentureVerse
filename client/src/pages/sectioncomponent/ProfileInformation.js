import React, {useState} from "react";
import {Input, Select, Button} from "../webcomponent";

function ProfileInformation({formData, setFormData,validateFormData}) {
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
                                value="Chris"
                                disabled ={editForm}
                            />
                            <Input
                                type="text"
                                label="Last name"
                                value="Perera"
                                disabled ={editForm}
                            />

                        </div>


                        <fieldset className='p-2 border-[1px] mb-[1rem] rounded-2xl border-light-purple'>
                            <legend className="bg-white px-[1rem] text-light-purple relative left-[0.1rem]">Address</legend>
                            <div className="row">
                                <Input
                                    type="text"
                                    label="First Line"
                                    value="216"
                                    disabled ={editForm}
                                />
                                <Input
                                    type="text"
                                    label="Second Line"
                                    value="st. antony'rd"
                                    disabled ={editForm}
                                />
                            </div>


                            <div className="row">
                                <Input
                                    type="text"
                                    label="Town"
                                    value="Karuneriya"
                                    disabled ={editForm}
                                />
                                <Select
                                    label="District"
                                    options={["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"]}
                                    disabled ={editForm}
                                />
                            </div>
                        </fieldset>

                        <div className="row">
                            <Select
                                label="Gender"
                                options={["Male","Female"]}
                                disabled ={editForm}
                            />
                            <Input
                                type="text"
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
export default ProfileInformation