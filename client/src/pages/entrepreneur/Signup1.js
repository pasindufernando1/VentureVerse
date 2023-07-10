import React from "react";
import InputField from "../webcomponent/InputField";
import Textarea from "../webcomponent/CustomTextarea";
import { Select,Option } from "@material-tailwind/react";

function Signup1({formData, setFormData}) {
  return (
    <div className="Signup1">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Entrepreneur</h3>                                
        <p className="text-main-purple">
        Tell us about you
        </p>
        <div className="mt-6">
            <div className="row">
                <InputField
                    type="text"
                    label="First Name"
                    value={formData.firstname}
                    onChange={(event)=>
                        setFormData({...formData, firstname: event.target.value})
                    }
                    className=""
                />
                <InputField
                    type="text"
                    label="Last name"
                    value={formData.lastname}
                    onChange={(event)=>
                        setFormData({...formData, lastname: event.target.value})
                    }
                />
            </div>

            <fieldset className='p-2 border-[1px] mb-[1rem] rounded-2xl border-light-purple'>
                <legend className="bg-white px-[1rem] text-light-purple relative left-[0.1rem]">Address
                </legend>
                <div className="row">
                    <InputField
                        type="text"
                        label="First Line"
                        value={formData.firstline}
                        onChange={(event)=>
                            setFormData({...formData, firstline: event.target.value})
                        }
                    />
                    <InputField
                        type="text"
                        label="Second Line"
                        value={formData.secondline}
                        onChange={(event)=>
                            setFormData({...formData, secondline: event.target.value})
                        }
                    />
                </div>

                <div className="row">
                    <InputField
                        type="text"
                        label="Town"
                        value={formData.town}
                        onChange={(event)=>
                            setFormData({...formData, town: event.target.value})
                        }
                    />
                    <Select 
                        label="District"
                        value={formData.district}
                        // onChange={(event)=>
                        //     setFormData({...formData, district: event.target.value})
                        // }
                    >
                        <Option value="Colombo">Colombo</Option>
                        <Option value="Gampaha">Gampaha</Option>
                        <Option value="Kalutara">Kalutara</Option>
                        <Option value="Kandy">Kandy</Option>
                        <Option value="Matale">Matale</Option>
                        <Option value="Nuwara Eliya">Nuwara Eliya</Option>
                        <Option value="Galle">Galle</Option>
                        <Option value="Matara">Matara</Option>
                        <Option value="Hambantota">Hambantota</Option>
                        <Option value="Jaffna">Jaffna</Option>
                        <Option value="Kilinochchi">Kilinochchi</Option>
                        <Option value="Mannar">Mannar</Option>
                        <Option value="Mullaitivu">Mullaitivu</Option>
                        <Option value="Vavuniya">Vavuniya</Option>
                        <Option value="Puttalam">Puttalam</Option>
                        <Option value="Kurunegala">Kurunegala</Option>
                        <Option value="Anuradhapura">Anuradhapura</Option>
                        <Option value="Polonnaruwa">Polonnaruwa</Option>
                        <Option value="Badulla">Badulla</Option>
                        <Option value="Monaragala">Monaragala</Option>
                        <Option value="Batticaloa">Batticaloa</Option>
                        <Option value="Ampara">Ampara</Option>
                        <Option value="Trincomalee">Trincomalee</Option>
                        
                    </Select>
                </div>
            </fieldset>

            <div className="row">
                <InputField
                    type="email"
                    label="Email"
                    value={formData.email}
                    onChange={(event)=>
                        setFormData({...formData, email: event.target.value})
                    }
                />
                <InputField
                    type="text"
                    label="NIC"
                    value={formData.nic}
                    onChange={(event)=>
                        setFormData({...formData, nic: event.target.value})
                    }
                />
            </div>

            <div className="row">
                <Select 
                    label="Gender"
                    value={formData.gender}
                >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                </Select>
                <InputField
                    type="text"
                    label="mobile number"
                    value={formData.mobile}
                    onChange={(event)=>
                        setFormData({...formData, mobile: event.target.value})
                    }
                />
            </div>
 
            <div className="row2">
                <div>
                    <label htmlFor="collabarators" className="text-main-black block mb-2 text-[14px]">
                    If applying as a part of a group, the name(s) of your collaborator(s) :
                    </label>
                    <Textarea 
                        placeholder="Write here..." 
                        className="w-full" 
                        value={formData.collabarators}
                        onChange={(event)=>
                            setFormData({...formData, collabarators: event.target.value})
                        }
                    />
                </div>
            </div> 
        </div>
    </div>
  );
}
export default Signup1;