import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Navbar, Footer, Button } from "../webcomponent";
import { Input, Select,Textarea } from "../webcomponent";

function AddComplaints() {
    const [formData, setFormData] = useState({
        complaintDesc: "",
        showError: false
    }); 

    const handlesubmit = async () => {
        if (!formData.complaintDesc) {
            setFormData({ ...formData, showError: true }); 
        } else {
            const data = {
                complaintDesc: formData.complaintDesc,
                complaintDate: new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' }),
                id:"2052"
            }
            console.log(data);
            const response = await axios.post(`entrepreneurs/addcomplain/${data.id}`, data);
            console.log(response);
        }
    }

    return (
        <div>
        <Navbar active="Sign Up" />
        <main className="h-auto flex justify-center items-center lg:h-screen">
            <form className="bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] lg:w-9/12">
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
                        onClick={handlesubmit}
                    >
                    Submit    
                    </Button>
                </div>
                <div className="complaints w-[50%] rounded-r-[1rem] hidden lg:block"></div>
            </form>
        </main>
        <Footer />
        </div>
    );
}

export default AddComplaints;
