import React, { useState } from 'react';
import {Checkbox, CommonNavbar, Footer, Input, Select} from "../webcomponent";
import { Navbar } from "../webcomponent";
import { Button } from "@material-tailwind/react";
import Topbar from "../common/Topbar";
import NotificationSettings from "../webcomponent/NotificationSettings";
import DisableAccount from "../webcomponent/DisableAccount";




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
function Preferences(){

    const category = [
        { label : 'Food & Beverage' },
        { label : 'Technology' },
        { label : 'App / Website' },
        { label : 'Fitness' },
        { label : 'Health / Wellness / Nutrition' },
        { label : 'Sports' },
        { label : 'Beauty' },
        { label : 'Clothing / Fashion' },
        { label : 'Toys / Games' },
        { label : 'Entertainment / Experiential' },
        { label : 'Pets' },
        { label : 'Holiday' },
        { label : 'Children' },
        { label : 'Housewares / Home Design' },
    ];

    const [categories, setCategories] = useState({
        food : false,
        technology : false,
        app : false,
        fitness : false,
        healthcare : true,
        sports : false,
        beauty : false,
        clothing : false,
        toys : false,
        entertainment : false,
        pets : false,
        music : false,
        holiday : false,
        children : false,
        housewares : false,
    })
    return(
        <div className='flex mt-24 relative justify-center items-start w-auto rounded-2xl px-[1rem] lg:px-[5rem] py-[2rem] border border-main-purple'>
            <div className="Preferences">
                <h1 className="text-2xl text-main-purple self-center">Preferences</h1>
                <p className="text-sm text-main-purple">Check the box to update your preferences.</p>
        <div className='w-full mt-4 py-[1rem] px-4 bg-white flex flex-col justify-center items-center  '>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8 justify-center items-center' >
            <Checkbox
                label = "Food & Beverage"
                name = "Food & Beverage"
                checked = {categories.food}
                onChange={(event) => {
                    setCategories({...categories, food: event.target.checked})
                }}
            />
            <Checkbox
                label = "Technology"
                name = "Technology"
                checked = {categories.technology}
                onChange={(event) => {
                    setCategories({...categories, technology: event.target.checked})
                }}
            />
            <Checkbox
                label="App / Website"
                name="App / Website"
                checked={categories.app}
                onChange={(event)=>
                    setCategories({...categories, app: event.target.checked})
                }
                required={true}
            />
            <Checkbox
                label="Fitness"
                name="Fitness"
                checked={categories.fitness}
                onChange={(event)=>
                    setCategories({...categories, fitness: event.target.checked})
                }

            />
            <Checkbox
                label="Health / Wellness / Nutrition"
                name="Health / Wellness / Nutrition"
                checked={categories.healthcare}
                onChange={(event)=>
                    setCategories({...categories, healthcare: event.target.checked})
                }
            />
            <Checkbox

                label="Sports"
                name="Sports"
                checked={categories.sports}
                onChange={(event)=>
                    setCategories({...categories, sports: event.target.checked})
                }
            />
            <Checkbox
                label="Beauty"
                name="Beauty"
                checked={categories.beauty}
                onChange={(event)=>
                    setCategories({...categories, beauty: event.target.checked})
                }
            />
            <Checkbox
                label="Clothing / Fashion"
                name="Clothing / Fashion"
                checked={categories.clothing}
                onChange={(event)=>
                    setCategories({...categories, clothing: event.target.checked})
                }
            />
            <Checkbox
                label="Toys / Games"
                name="Toys / Games"
                checked={categories.toys}
                onChange={(event)=>
                    setCategories({...categories, toys: event.target.checked})
                }
            />
            <Checkbox
                label="Entertainment / Experiential"
                name="Entertainment / Experiential"
                checked={categories.entertainment}
                onChange={(event)=>
                    setCategories({...categories, entertainment: event.target.checked})
                }
            />
            <Checkbox
                label="Pets"
                name="Pets"
                checked={categories.pets}
                onChange={(event)=>
                    setCategories({...categories, pets: event.target.checked})
                }
            />
            <Checkbox
                label="Music"
                name="Music"
                checked={categories.music}
                onChange={(event)=>
                    setCategories({...categories, music: event.target.checked})
                }
            />
            <Checkbox
                label="Holiday"
                name="Holiday"
                checked={categories.holiday}
                onChange={(event)=>
                    setCategories({...categories, holiday: event.target.checked})
                }
            />
            <Checkbox
                label="Children"
                name="Children"
                checked={categories.children}
                onChange={(event)=>
                    setCategories({...categories, children: event.target.checked})
                }
            />
            <Checkbox
                label="Housewares / Home Design"
                name="Housewares / Home Design"
                checked={categories.housewares}
                onChange={(event)=>
                    setCategories({...categories, housewares: event.target.checked})
                }
            />
        </div>
        </div>
            </div>
        </div>

    )}
function UpdatedDocuments2(){
    return(
        <div className=' mb-24 flex flex-col mt-24 relative justify-center items-start w-auto rounded-2xl px-[1rem] lg:px-[5rem] py-[2rem] border border-main-purple'>
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
            </div>
        </div>
        )}

const ProfileInvestor = () => {
    return (
        <div className="flex flex-col justify-between items-center w-full overflow-hidden ">
        <Navbar />
        <Topbar/>
            <div className='grid grid-cols-3'></div>
            <div >
            {/*left*/}
            </div>
            <div>
                <ProfileInformation/>
                <Preferences/>
                <NotificationSettings/>
                <UpdatedDocuments2/>
                <DisableAccount/>
            </div>
            <div>
                {/*right*/}
            </div>
            <Footer/>
        </div>

    )
}

export default ProfileInvestor

