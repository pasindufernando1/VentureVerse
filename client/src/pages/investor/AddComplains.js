import React, {useState } from 'react';
import {Button, Textarea, Header,StatusPopUp } from "../webcomponent";
import useAxiosMethods from '../../hooks/useAxiosMethods';
import useAuth from "../../hooks/useAuth";

function AddComplains() {
    const [formData, setFormData] = useState({
        complaintDesc: "",
        showError: false
    }); 

    // const [response, setResponse] = useState(null);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);

    const {post} = useAxiosMethods();
    const {auth} = useAuth();

    const handleSubmit = async () => {
        if (!formData.complaintDesc) {
            setFormData({ ...formData, showError: true }); 
        } else {
            const data = {
                description: formData.complaintDesc,
                date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' }),
                userId:{
                    id: auth.id
                }
            }
            const setSuccessNotification = (value) => {
                setShowSuccessNotification(value);
            };

            post(`/entrepreneurs/addcomplaint/${data.userId.id}`, data, setSuccessNotification);
        }
    }

    return (
        <div>
        <Header active="Complains">
        <main className="h-auto flex justify-center items-center ">
            <form className="bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] mt-[-2rem] border-[1px] border-main-purple rounded-[1rem]">
                <div className="text-gray-700 p-[2rem] w-full">
                    <div className="Signup1">
                        <h3 className="text-3xl text-main-purple self-center">Add New Complaint</h3>                                
                        <p className="text-main-purple">
                        Please provide your information below to help us understand your complaint better.
                        </p>
                        <div className="mt-6">
                            <div className="row2">
                                <div>
                                    <label htmlFor="complaints" className="text-main-black block mb-2 text-[14px]">
                                        Please describe your complaint in detail <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <Textarea 
                                        placeholder="Write here..." 
                                        className="w-full" 
                                        value={formData.complaintDesc}
                                        onChange={(event) =>
                                            setFormData({ ...formData, complaintDesc: event.target.value, showError: false })       
                                        }
                                        rows={10}
                                    />
                                    {formData.showError && (
                                        <p className="text-red-600">Please provide a detailed complaint description.</p>
                                    )}
                                </div>
                            </div> 
                        </div>
                    </div>
                    <Button
                        type="button"
                        className="float-right"
                        onClick={handleSubmit}
                    >
                    Submit    
                    </Button>
                </div>
                <div className="complaints w-[50%] rounded-r-[1rem] hidden lg:block"></div>
            </form>
        </main>
        <div>
            {showSuccessNotification && (
                <StatusPopUp
                successTitle="Complain added Successful"
                successMessage="You have successfully add a new complain!"
                redirectUrl="/investor/add-complains"
                />
            )}
        </div>
        </Header>
        </div>
    );
}

export default AddComplains;
