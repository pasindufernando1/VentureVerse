import React from "react";
import { Input, Select } from "../../webcomponent";

function Signup1({formData, setFormData,validateFormData}) {
    const handleBusinessRegDocUpload = (event) => {
        const{ name, files } = event.target;
        setFormData({ ...formData, [name]: files[0]});
    };
    const handleBankStatement= (event) => {
        const{ name, files } = event.target;
        setFormData({ ...formData, [name]: files[0]});
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
                        setFormData({...formData, companyName: event.target.value})
                    }
                    state={validateFormData.companyName}
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
                    label="mobile number"
                    value={formData.mobile}
                    onChange={(event)=>
                        setFormData({...formData, mobile: event.target.value})
                    }  
                    state={validateFormData.mobile}
                    required={true}             
                />
            </div>
            <div className="row">
                <div className="file-input-container">
                <label htmlFor="businessregdoc" className="text-main-black block mb-1 text-[14px]">
                    Please upload the Business Registration Document
                    <span style={{ color: 'red' }}>*</span>
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
            <div className="row">
                <div className="file-input-container">
                    <label htmlFor="bankStatement" className="text-main-black block mb-1 text-[14px]">
                        Please upload the Bank Statement
                        <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="file"
                        id="bankStatement"
                        name="bankStatement"
                        accept="image/png, image/jpeg"
                        className="hidden"
                        onChange={handleBankStatement}
                        state={validateFormData.bankStatement}
                        required={true}
                    />
                    <label htmlFor="bankStatement" className="file-input-button">
                        Select File
                    </label>
                    <span className="file-input-text">
                        {formData.bankStatement? formData.bankStatement.name : 'No file chosen'}
                    </span>
                </div>
            </div>
        </div>
    </div>
  );
}
export default Signup1;