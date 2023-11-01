
import { useParams } from 'react-router-dom';
import {Button, Checkbox, Input, Select} from "../webcomponent";
import {DisableAccount, NotificationSettings} from "../sectioncomponent";
import {Header} from "../webcomponent";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import React, {useState, useEffect} from "react";

const ProfileInformation = ({formData, setFormData, validateFormData}) => {

    const { id } = useParams(); 
    const { get,put} = useAxiosMethods();
    const [response, setResponse] = useState([]);
 
    

    useEffect(() => {
        get(`auth/GetInformation/${ id }`, setResponse);
        
    }, []);

    console.log("hi");
    console.log(response);

    const [editForm, setEditForm] = useState(true);
    
    return (
        <div
            className='flex mt-24 relative justify-center items-start w-auto rounded-2xl py-[2rem] border border-main-purple'>
           
                <div className="ProfileInfo">
                    <div className="flex justify-between">
                        <h1 className="text-2xl text-main-purple">Profile Information</h1>
                        
                    </div>
                    <div className="mt-6">
                        <div className="row">

                        {response.firstname !== null ? (
                        // Content to render when response.firstname is not null
                                <Input
                                type="text"
                                label="First Name"
                                value={response.firstname}
                                disabled={editForm}
                            />
                        ) : (
                        // Content to render when response.firstname is null
                        <div>
                             
                        </div>
                        )}


                    {response.lastname !== null ? (
                        // Content to render when response.firstname is not null
                                <Input
                                type="text"
                                label="Last name"
                                value={response.lastname}
                                disabled={editForm}
                            />
                        ) : (
                        // Content to render when response.firstname is null
                        <div>
                             
                        </div>
                        )}

                        </div>


                        {response.bfirstLineAddress !== null ? (
                                    
                                    
                           

                        <fieldset className='p-2 border-[1px] mb-[1rem] rounded-2xl border-light-purple'>
                            <legend className="bg-white px-[1rem] text-light-purple relative left-[0.1rem]">Address
                            </legend>
                            <div className="row">

                            {response.bfirstLineAddress !== null ? (
                                    
                                            <Input
                                            type="text"
                                            label="First Line"
                                            value={response.bfirstLineAddress}
                                            disabled={editForm}
                                        />
                                    ) : (

                                    <div>
                                        
                                    </div>
                            )}

                            {response.bsecondLineAddress !== null ? (
                                    
                                    <Input
                                    type="text"
                                    label="Second Line"
                                    value={response.bsecondLineAddress}
                                    disabled={editForm}
                                />
                            ) : (

                            <div>
                                
                            </div>
                             )}                        






                            </div>






                            <div className="row">

                            {response.btown !== null ? (
                                    
                                    <Input
                                    type="text"
                                    label="Town"
                                    value={response.btown}
                                    disabled={editForm}
                                />
                            ) : (

                            <div>
                                
                            </div>
                             )}      

                                {response.bdistrict !== null ? (
                                                                    
                                                                    <Input
                                                                    type="text"
                                                                    label="District"
                                                                    value={response.bdistrict}
                                                                    disabled={editForm}
                                                                />
                                                            ) : (

                                                            <div>
                                                                
                                                            </div>
                                )}   






                            </div>
                        </fieldset>


                        ) : (

                            <div>
                                
                            </div>
                        )}




                        <div className="row">



                        {response.gender !== null ? (
                                                                    
                                                                    <Input
                                                                    type="text"
                                                                    label="Gender"
                                                                    value={response.gender}
                                                                    disabled={editForm}
                                                                />
                                                            ) : (

                                                            <div>
                                                                
                                                            </div>
                                )}   

                        {response.contactNumber !== null ? (
                                                                    
                                                                    <Input
                                                                    type="text"
                                                                    label="mobile number"
                                                                    value={response.contactNumber}
                                                                    disabled={editForm}
                                                                />
                                                            ) : (

                                                            <div>
                                                                
                                                            </div>
                                )}                                  



                        </div>
                    </div>
                    
                </div>

        </div>
    )
}

const TopBar = () => {

    const { id } = useParams(); 
    const { get,put} = useAxiosMethods();
    const [response, setResponse] = useState([]);
 
    

    useEffect(() => {
        get(`auth/GetInformation/${ id }`, setResponse);
        
    }, []);

    console.log("hi");
    console.log(response);

    const [editForm, setEditForm] = useState(true);



    return (
        <div className='relative h-56 w-full mt-0'>
            <div className='h-36 w-full mt-0 py-16 px-4 bg-gradient-to-r from-main-purple to-light-purple' >
                <div className='absolute h-48 w-full py-0 px-12 flex flex-row left-0 ' >
                    <img
                        className="relative h-48 w-48  border-4 border-white  rounded-lg object-cover object-center"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        alt="nature image"
                    />
                    <div className=' m-4 mt-28 flex flex-col px-1 h-auto ' >
                    {response.firstname !== null ? (
                        // Content to render when response.firstname is not null
                        <h1 className=' font-bold text-4xl' >{response.firstname}</h1>
                        ) : (
                        // Content to render when response.firstname is null
                        <div>
                             <h1 className=' font-bold text-4xl' ></h1>
                        </div>
                    )}

                    {response.email !== null ? (
                        // Content to render when response.firstname is not null
                                 <h3 className='mt-2'>{response.email}</h3>
                        ) : (
                        // Content to render when response.firstname is null
                        <div>
                             <h3 className='mt-2'></h3>
                        </div>
                    )}
                     

                    </div>
                </div>
            </div>
        </div>
    )
}


const Profile = () => {
    return (
        <Header active="Leaderboard">
        <TopBar />
       
            <ProfileInformation/>
           
        
         </Header>
    )
}

export default Profile

