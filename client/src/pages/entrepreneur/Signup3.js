import React from "react";
import { Input, Select,Textarea } from "../webcomponent";

function Signup3({formData, setFormData,validateFormData}) {
    const handleBusinessRegDocUpload = (event) => {
        const { name, files } = event.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    return (
    <div className="Signup3">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Entrepreneur</h3>                                
        <p className="text-main-purple">
        Tell us more about your business
        </p>

        <div className="mt-6 ">
            <div className="row">                                  
                <Input
                    type="text" 
                    outline="true"
                    label={<span style={{ fontSize: '12px' }}>Business Name:</span>}
                    value={formData.businessName}  
                    onChange={(event)=>
                        setFormData({...formData, businessName: event.target.value})
                    }
                    state={validateFormData.businessName}
                    required={true}
                />
                <Input
                    type="text" 
                    outline="true"
                    label={<span style={{ fontSize: '12px' }}>Business Contact:</span>}
                    value={formData.businessContact}
                    onChange={(event)=>
                        setFormData({...formData, businessContact: event.target.value})
                    }
                    state={validateFormData.businessContact}
                    required={true}
                />
            </div>   

            <fieldset className='p-2 border-[1px] mb-[1rem] rounded-2xl border-light-purple'>
                <legend className="bg-white px-[1rem] text-light-purple relative left-[0.1rem]">Address
                </legend>

                <div className="row">
                    <Input
                        type="text"
                        label={<span style={{ fontSize: '12px' }}>First Line:</span>}
                        value={formData.bfirstline}
                        onChange={(event)=>
                            setFormData({...formData, bfirstline: event.target.value})
                        }
                        state={validateFormData.bfirstline}
                        required={true}
                    />
                    <Input
                        type="text"
                        label={<span style={{ fontSize: '12px' }}>Second Line:</span>}
                        value={formData.bsecondline}
                        onChange={(event)=>
                            setFormData({...formData, bsecondline: event.target.value})
                        }
                    />
                </div>

                <div className="row">
                    <Input
                        type="text"
                        label="Town"
                        value={formData.btown}
                        onChange={(event)=>
                            setFormData({...formData, btown: event.target.value})
                        }
                        state={validateFormData.btown}
                        required={true}
                        
                    />
                    <Select 
                        label="District"
                        value={formData.bdistrict}
                        options={["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"]}
                        onChange={(event)=>
                            setFormData({...formData, bdistrict: event})
                        }
                        state={validateFormData.bdistrict}
                        required={true}
                    />
                </div>
            </fieldset>

            <div className="row">                                  
                <Input
                    type="text" 
                    outline="true"
                    label={<span style={{ fontSize: '12px' }}>Business Website:</span>}
                    value={formData.businesswebsite}
                    onChange={(event)=>
                        setFormData({...formData, businesswebsite: event.target.value})
                    }
                    
                />
                <Input
                    type="text" 
                    outline="true" 
                    label={<span style={{ fontSize: '12px' }}>Business Email:</span>}
                    value={formData.businessemail}
                    onChange={(event)=>
                        setFormData({...formData, businessemail: event.target.value})
                    } 
                    state={validateFormData.businessemail}
                    required={true}
                />
            </div>   

            <div className="row2">
                <div>
                    <label htmlFor="businessDescription" className="text-main-black block mb-2 text-[14px]">
                    Please provide a brief non-confidential description of your business or product:
                    </label>
                    <Textarea 
                        label="Business Description:"
                        className="w-full"
                        value={formData.businessDescription} 
                        onChange={(event)=>
                            setFormData({...formData, businessDescription: event.target.value})
                        }
                        state={validateFormData.businessDescription}
                        required={true}
                    />
                </div>
            </div>

            <div className="row">
                <div className="file-input-container">
                <label htmlFor="businessregdoc" className="text-main-black block mb-1 text-[14px]">
                    Please upload the Business Registration Document:
                </label>
                <input
                    type="file"
                    id="businessregdoc"
                    name="businessregdoc"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleBusinessRegDocUpload}
                    state={validateFormData.businessregdoc}
                    required={true}
                />
                <label htmlFor="businessregdoc" className="file-input-button">
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
export default Signup3;