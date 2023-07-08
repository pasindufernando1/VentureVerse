import React from "react";
import InputField from "../../webcomponent/InputField";
import {Checkbox } from "@material-tailwind/react";


function Signup2({formData, setFormData}) {
    return(
    <div className="Signup2">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Entrepreneur</h3>                                <p className="text-main-purple">
        Tell us more about you
        </p>

        <div className="mt-6">
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
                    Please provide a copy of your financial Document.
                    </label>
                    <div className="flex gap-20">
                    </div>
                </div>
            </div>  

            <div className="row2">                                  
                <label>
                    Password:
                    <InputField 
                        type="password" 
                        color="purple" 
                        value={formData.password}
                        onChange={(event)=>
                            setFormData({...formData, password: event.target.value})
                        }
                    />
                </label>
            </div>    
            <br></br>
            <div className="row2">                                  
                <label>
                    Confirm Password:
                    <InputField 
                        type="password" 
                        color="purple" 
                        value={formData.confirmPassword}
                        onChange={(event)=>
                            setFormData({...formData, confirmPassword: event.target.value})
                        }
                    />
                </label>
            </div> 
            <br></br>
            <div>
                <Checkbox color="purple" label="I agree to the Terms and Conditions" />
            </div>           
        </div>
    </div> 
    );   
}
export default Signup2;