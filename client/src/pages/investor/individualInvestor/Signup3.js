import React from "react";
import { Input,Checkbox } from "../../webcomponent";

function Signup3({formData, setFormData,validateFormData}) {
    const handlePoliceReportUpload = (event) => {
        const {name, files} = event.target;
        setFormData({ ...formData, [name]: files[0]});
    };
    const handleBankStatementUpload = (event) => {
        const {name, files} = event.target;
        setFormData({ ...formData, [name]: files[0]});
    };
    return(
    <div className="Signup2">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Individual Investor</h3>                                <p className="text-main-purple">
        Tell us more about you
        </p>

        <div className="mt-6">
            <div className="row">
                <div className="file-input-container">
                <label htmlFor="policeReport" className="text-main-black block mb-1 text-[14px]">
                    Please provide a copy of any police report
                    <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                    type="file"
                    id="policeReport"
                    name="policeReport"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handlePoliceReportUpload}
                    state={validateFormData.policeReport}
                    required={true}
                />
                <label htmlFor="policeReport" className="file-input-button">
                    Select File
                </label>
                <span className="file-input-text">
                    {formData.policeReport ? formData.policeReport.name : 'No file chosen'}
                </span>
                </div>
            </div>
            <div className="row">
                <div className="file-input-container">
                <label htmlFor="bankStatement" className="text-main-black block mb-1 text-[14px]">
                    Please provide a copy of your bank statement
                    <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                    type="file"
                    id="bankStatement"
                    name="bankStatement"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleBankStatementUpload}
                    state={validateFormData.bankStatement}
                    required={true}
                />
                <label htmlFor="bankStatement" className="file-input-button">
                    Select File
                </label>
                <span className="file-input-text">
                    {formData.bankStatement ? formData.bankStatement.name : 'No file chosen'}
                </span>
                </div>
            </div>

            <div className="row2">                                  
                    <Input 
                        type="password" 
                        color="purple" 
                        label={<span style={{ fontSize: '12px' }}>Password:</span>}
                        value={formData.password}
                        onChange={(event)=>
                            setFormData({...formData, password: event.target.value})
                        }
                        state={validateFormData.password}
                        required={true}
                    />
            </div>    
            <br></br>
            <div className="row2">                                  
                    <Input 
                        type="password" 
                        color="purple" 
                        label={<span style={{ fontSize: '12px' }}>Confirm Password:</span>}
                        value={formData.confirmPassword}
                        onChange={(event)=>
                            setFormData({...formData, confirmPassword: event.target.value})
                        }
                        state={validateFormData.confirmPassword}
                        required={true}
                    />
            </div> 
            <br></br>
            <div>
                <Checkbox 
                    color="purple" 
                    label="I agree to the Terms and Conditions" 
                    checked={formData.terms}
                    onChange={(event)=>
                        setFormData({...formData, terms: event.target.checked})
                    }
                    state={validateFormData.terms}
                    required={true}
                />
            </div>            
        </div>
    </div> 
    );   
}
export default Signup3;