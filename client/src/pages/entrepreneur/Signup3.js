import React from "react";
import {Textarea} from "@material-tailwind/react";
import InputField from "../webcomponent/InputField";

function Signup3({formData, setFormData}) {
    const handleBusinessRegDocUpload = (event) => {
        const file = event.target.files[0];
        setFormData({ ...formData, businessregdoc: file });
    };

    return (
    <div className="Signup3">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Entrepreneur</h3>                                
        <p className="text-main-purple">
        Tell us more about your business
        </p>

        <div className="mt-6 ">
            <div className="row">                                  
                <InputField 
                    type="text" 
                    color="purple"  
                    outline="true"
                    label={<span style={{ fontSize: '12px' }}>Business Name:</span>}
                    value={formData.businessName}  
                    onChange={(event)=>
                        setFormData({...formData, businessName: event.target.value})
                    }
                />
                <InputField 
                    type="text" 
                    color="purple"  
                    outline="true"
                    label={<span style={{ fontSize: '12px' }}>Business Contact:</span>}
                    value={formData.businessContact}
                    onChange={(event)=>
                        setFormData({...formData, businessContact: event.target.value})
                    }
                />
            </div>   

            <fieldset className='p-2 border-[1px] mb-[1rem] rounded-2xl border-light-purple'>
                <legend className="bg-white px-[1rem] text-light-purple relative left-[0.1rem]">Address
                </legend>

                <div className="row">
                    <InputField
                        type="text"
                        label={<span style={{ fontSize: '12px' }}>First Line:</span>}
                        value={formData.bfirstline}
                        onChange={(event)=>
                            setFormData({...formData, bfirstline: event.target.value})
                        }
                    />
                    <InputField
                        type="text"
                        label={<span style={{ fontSize: '12px' }}>Second Line:</span>}
                        value={formData.bsecondline}
                        onChange={(event)=>
                            setFormData({...formData, bsecondline: event.target.value})
                        }
                    />
                </div>

                <div className="row">
                    <InputField
                        type="text"
                        label={<span style={{ fontSize: '12px' }}>Town:</span>}
                        value={formData.btown}
                        onChange={(event)=>
                            setFormData({...formData, btown: event.target.value})
                        }
                    />
                    <InputField
                        type="text"
                        label={<span style={{ fontSize: '12px' }}>District:</span>}
                        value={formData.bdistrict}
                        onChange={(event)=>
                            setFormData({...formData, bdistrict: event.target.value})
                        }
                    />
                </div>
            </fieldset>

            <div className="row">                                  
                <InputField 
                    type="text" 
                    color="purple"  
                    outline="true"
                    label={<span style={{ fontSize: '12px' }}>Business Website:</span>}
                    value={formData.businesswebsite}
                    onChange={(event)=>
                        setFormData({...formData, businesswebsite: event.target.value})
                    }
                />
                <InputField 
                    type="text" 
                    color="purple"  
                    outline="true" 
                    label={<span style={{ fontSize: '12px' }}>Business Email:</span>}
                    value={formData.businessemail}
                    onChange={(event)=>
                        setFormData({...formData, businessemail: event.target.value})
                    } 
                />
            </div>   

            <div className="row2">
                <div>
                    <label htmlFor="businessDescription" className="text-main-black block mb-2 text-[14px]">
                    Please provide a brief non-confidential description of your business or product:
                    </label>
                    <Textarea 
                        label={<span style={{ fontSize: '12px' }}>Business Description:</span>}
                        className="w-full"
                        value={formData.businessDescription} 
                        onChange={(event)=>
                            setFormData({...formData, businessDescription: event.target.value})
                        }
                    />
                </div>
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
export default Signup3;