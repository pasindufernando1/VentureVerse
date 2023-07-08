import React from "react";
import InputField from "../../webcomponent/InputField";

function Signup1({formData, setFormData}) {
  return (
    <div className="Signup1">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Individual Investor</h3>                                
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
                    <InputField
                        type="text"
                        label="District"
                        value={formData.district}
                        onChange={(event)=>
                            setFormData({...formData, district: event.target.value})
                        }
                    />
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
                <InputField
                    type="text"
                    label="Gender"
                    value={formData.gender}
                    onChange={(event)=>
                        setFormData({...formData,gender: event.target.value})
                    }
                />
                <InputField
                    type="text"
                    label="mobile number"
                    value={formData.mobile}
                    onChange={(event)=>
                        setFormData({...formData, mobile: event.target.value})
                    }
                />
            </div>
   
        </div>
    </div>
  );
}
export default Signup1;