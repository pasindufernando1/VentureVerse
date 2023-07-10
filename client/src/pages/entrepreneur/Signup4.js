import React from "react";
import Checkbox from "../webcomponent/CustomCheckbox";
import InputField from "../webcomponent/InputField";

function Signup4({formData, setFormData}) {
    return (
    <div className="Signup4">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Entrepreneur</h3>                                
        <p className="text-main-purple">
        Tell us more about your business
        </p>

        <div className="mt-6">
            <div className="row2">                                  
                <label htmlFor="password" className="text-main-black block mb-1 text-[14px]">
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
                <label htmlFor="cpassword" className="text-main-black block mb-1 text-[14px]">
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
export default Signup4;