import React from "react";
import { Input, Select } from "../../webcomponent";


function Signup1({formData, setFormData,validateFormData}) {
  return (
    <div className="Signup1">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Individual Investor</h3>                                
        <p className="text-main-purple">
        Tell us about you
        </p>
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
   
        </div>
    </div>
  );
}
export default Signup1;