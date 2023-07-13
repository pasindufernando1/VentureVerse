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
                    <InputField 
                        type="password" 
                        color="purple" 
                        label={<span style={{ fontSize: '12px' }}>Password:</span>}
                        value={formData.password}
                        onChange={(event)=>
                            setFormData({...formData, password: event.target.value})
                        }
                    />
            </div>    
            <br></br>
            <div className="row2">                                  
                    <InputField 
                        type="password" 
                        color="purple" 
                        label={<span style={{ fontSize: '12px' }}>Confirm Password:</span>}
                        value={formData.confirmPassword}
                        onChange={(event)=>
                            setFormData({...formData, confirmPassword: event.target.value})
                        }
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
                />
            </div>                                    
        </div>
    </div>    
    );
}
export default Signup4;