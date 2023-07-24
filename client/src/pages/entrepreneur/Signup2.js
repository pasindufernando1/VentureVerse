import React from "react";
import { Textarea, Radio } from "../webcomponent";


function Signup2({formData, setFormData,validateFormData}) {
    const handleFelonyChange = (event) => {
        setFormData({ ...formData, felony: event.target.value });
    };
    
    const handleLawsuitChange = (event) => {
        setFormData({ ...formData, lawsuit: event.target.value });
    };

    const handleFileUpload = (event) => {
        const { name, files } = event.target;
        setFormData({ ...formData, [name]: files[0]});
    };

    const handlePoliceReportUpload = (event) => {
        const { name, files } = event.target;
        setFormData({ ...formData, [name]: files[0]});
    };

    return(
    <div className="Signup2">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Entrepreneur</h3>                                
        <p className="text-main-purple">
        Tell us more about you
        </p>

        <div className="mt-6">
            <div className="row">
                <div>
                    <label htmlFor="felony" className="text-main-black block mb-1 text-[14px]">
                    Have you ever been charged with any felony or misdemeanor?
                    <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className="flex gap-20 text-main-black block mb-1 text-[14px] h-4 w-4">
                        <Radio 
                            name="felony"
                            id="felony-yes"
                            label="Yes"
                            value="yes"
                            checked={formData.felony === 'yes'}
                            onChange={handleFelonyChange}
                            state={validateFormData.felony}
                            required={true}
                        />
                        <Radio 
                            name="felony"
                            id="felony-no"
                            label="No"
                            value="no"
                            checked={formData.felony === 'no'}
                            onChange={handleFelonyChange}
                            state={validateFormData.felony}
                            required={true}
                        />
                    </div>    
                </div>
            </div>   

            <div className="row">
                <div>
                    <label htmlFor="lawsuit" className="text-main-black block mb-1 text-[14px]">
                    Have you ever been party to a lawsuit? 
                    <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className="flex gap-20 text-main-black block mb-1 text-[14px] h-4 w-4">
                        <Radio 
                            name="lawsuit"
                            id="lawsuit-yes"
                            value="yes"
                            label="Yes"
                            checked={formData.lawsuit === 'yes'}
                            onChange={handleLawsuitChange}
                            state={validateFormData.lawsuit}
                            required={true}
                        />
                        <Radio 
                            name="lawsuit"
                            id="lawsuit-no"
                            value="no"
                            label="No"
                            checked={formData.lawsuit === 'no'}
                            onChange={handleLawsuitChange}
                            state={validateFormData.lawsuit}
                            required={true}
                        />
                    </div>    
                </div>
            </div> 

            
            <div className="row2">
                <div>
                    <label htmlFor="lawsuitDetails" className="text-main-black block mb-2 text-[14px]">
                    if so explain (date,city,state and circumstances, including precise charge and resolution of the case)
                    </label>
                    <Textarea 
                        outline="true"
                        className="w-full" 
                        value={formData.lawsuitDetails}
                        label="Lawsuit Details"
                        onChange={(event)=>
                            setFormData({...formData, lawsuitDetails: event.target.value})
                        }
                    />
                </div>
            </div>  

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
                    onChange={handleFileUpload}
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
        </div>
    </div> 
    );   
}
export default Signup2;