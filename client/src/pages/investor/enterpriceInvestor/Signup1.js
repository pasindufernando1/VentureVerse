import React from "react";
import { Input, Select } from "../../webcomponent";

function Signup1({formData, setFormData}) {
    const handleBusinessRegDocUpload = (event) => {
        const file = event.target.files[0];
        setFormData({ ...formData, businessregdoc: file });
    };
    return (
    <div className="Signup1">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Individual Investor</h3>                                
        <p className="text-main-purple">
        Tell us about you
        </p>
        <div className="mt-6">
            <div className="row2">
                <Input
                    type="text"
                    label="Company Name"
                    value={formData.companyName}
                    onChange={(event)=>
                        setFormData({...formData, firstname: event.target.value})
                    }
                    
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
                       required
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
                        
                    />
                    <Select 
                        label="District"
                        value={formData.district}
                        options={["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"]}
                        onChange={(event)=>
                            setFormData({...formData, district: event})
                        }
                     
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
                    
                />
                <Input
                    type="text"
                    label="mobile number"
                    value={formData.mobile}
                    onChange={(event)=>
                        setFormData({...formData, mobile: event.target.value})
                    }               
                />
            </div>
            <div className="row">
                <div className="file-input-container">
                <label htmlFor="bregReport" className="text-main-black block mb-1 text-[14px]">
                    Please upload the Business Registration Document:
                </label>
                <input
                    type="file"
                    id="bregReport"
                    name="bregReport"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleBusinessRegDocUpload}
                />
                <label htmlFor="bregReport" className="file-input-button">
                    Select File
                </label>
                <span className="file-input-text">
                    {formData.businessregdoc ? formData.businessregdoc.name : 'No file chosen'}
                </span>
                </div>
            </div>
        </div>
    </div>
  );
}
export default Signup1;