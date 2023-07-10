import React from "react";
import { Radio, Textarea} from "@material-tailwind/react";


function Signup2({formData, setFormData}) {
    return(
    <div className="Signup2">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Entrepreneur</h3>                                <p className="text-main-purple">
        Tell us more about you
        </p>

        <div className="mt-6">
            <div className="row">
                <div>
                    <label htmlFor="felony" className="text-main-black block mb-1 text-[14px]">
                    Have you ever been charged with any felony or misdemeanor?
                    </label>
                    <div className="flex gap-20 text-main-black block mb-1 text-[14px] h-4 w-4">
                        <Radio 
                            color="purple" 
                            name="felony" 
                            id="felony"  
                            label="Yes" 
                            className="w-4 h-4"
                            value={formData.felony}
                            onChange={(event)=>
                                setFormData({...formData, felony: event.target.value})
                            }
                        />
                        <Radio 
                            color="purple" 
                            name="felony" 
                            id="felony" 
                            label="No"
                            className="w-4 h-4"
                            value={formData.felony}
                            onChange={(event)=>
                                setFormData({...formData, felony: event.target.value})
                            }
                        />
                    </div>    
                </div>
            </div>   

            <div className="row">
                <div>
                    <label htmlFor="lawsuit" className="text-main-black block mb-1 text-[14px]">
                    Have you ever been party to a lawsuit? 
                    </label>
                    <div className="flex gap-20 text-main-black block mb-1 text-[14px] h-4 w-4">
                        <Radio 
                            color="purple" 
                            name="lawsuit" 
                            id="lawsuit"   
                            value="yes" 
                            className="w-4 h-4"
                            label="Yes"
                            onChange={(event)=>
                                setFormData({...formData, lawsuit: event.target.value})
                            }
                        />
                        <Radio 
                            color="purple" 
                            name="lawsuit" 
                            id="lawsuit" 
                            className="w-4 h-4"
                            value="no" 
                            label="No"
                            onChange={(event)=>
                                setFormData({...formData, lawsuit: event.target.value})
                            }
                        />
                    </div>    
                </div>
            </div> 

            
            <div className="row2">
                <div>
                    <label htmlFor="lawsuitDetails" className="text-main-black block mb-2 text-[14px]">
                    if so explain (date,city,state and circumstances, including precise charge and resolution of the case):
                    </label>
                    <Textarea 
                        color="#8458B3"  
                        outline="true"
                        className="w-full" 
                        value={formData.lawsuitDetails}
                        onChange={(event)=>
                            setFormData({...formData, lawsuitDetails: event.target.value})
                        }
                    />
                </div>
            </div>  

            <div className="row">
                <div className="file-input-container">
                    <label htmlFor="policeReport" className="text-main-black block mb-1 text-[14px]">
                    Please provide a copy of any police report .
                    </label>
                    <input type="file" id="policeReport" name="policeReport" accept="image/png, image/jpeg" className="hidden" />
                    <label htmlFor="policeReport" className="file-input-button">
                        Select File
                    </label>
                    <span className="file-input-text">No file chosen</span>
                </div>
            </div>
            <div className="row">
                <div className="file-input-container">
                    <label htmlFor="bankStatement" className="text-main-black block mb-1 text-[14px]">
                    Please provide a copy of your bank statement.
                    </label>
                    <input type="file" id="bankStatement" name="bankStatement" accept="image/png, image/jpeg" className="hidden" />
                    <label htmlFor="bankStatement" className="file-input-button">
                        Select File
                    </label>
                    <span className="file-input-text">No file chosen</span>
                </div>
            </div>
        </div>
    </div> 
    );   
}
export default Signup2;