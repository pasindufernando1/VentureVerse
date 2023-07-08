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
                    <label htmlFor="felony" className="text-main-black block mb-1">
                    Have you ever been charged with any felony or misdemeanor?
                    </label>
                    <div className="flex gap-20">
                        <Radio 
                            color="purple" 
                            name="felony" 
                            id="felony"  
                            label="Yes" 
                            value={formData.felony}
                            onChange={(event)=>
                                setFormData({...formData, felony: event.target.value})
                            }
                        />
                        <Radio 
                            color="purple" 
                            name="felony" 
                            id="felony" 
                            value="no" 
                            label="No"/>
                            value={formData.felony}
                            onChange={(event)=>
                                setFormData({...formData, felony: event.target.value})
                            }
                    </div>    
                </div>
            </div>   

            <div className="row">
                <div>
                    <label htmlFor="lawsuit" className="text-main-black block mb-1">
                    Have you ever been party to a lawsuit? 
                    </label>
                    <div className="flex gap-20">
                        <Radio 
                            color="purple" 
                            name="lawsuit" 
                            id="lawsuit"   
                            value="yes" 
                            label="Yes"
                            onChange={(event)=>
                                setFormData({...formData, lawsuit: event.target.value})
                            }
                        />
                        <Radio 
                            color="purple" 
                            name="lawsuit" 
                            id="lawsuit" 
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
                    <label htmlFor="lawsuitDetails" className="text-main-black block mb-2">
                    if so explain (date,city,state and circumstances, including precise charge and resolution of the case):
                    </label>
                    <Textarea 
                        color="purple"  
                        outline={true} 
                        className="w-full" 
                        value={formData.lawsuitDetails}
                        onChange={(event)=>
                            setFormData({...formData, lawsuitDetails: event.target.value})
                        }
                    />
                </div>
            </div>  

            <div className="row">
                <div>
                    <label htmlFor="policeReport" className="text-main-black block mb-1">
                    Please provide a copy of any police report .
                    </label>
                    <div className="flex gap-20">
                    </div>
                </div>
            </div>

            <div className="row">
                <div>
                    <label htmlFor="bankStatement" className="text-main-black block mb-1">
                    Please provide a copy of your bank statement.
                    </label>
                    <div className="flex gap-20">
                    </div>
                </div>
            </div>            
        </div>
    </div> 
    );   
}
export default Signup2;