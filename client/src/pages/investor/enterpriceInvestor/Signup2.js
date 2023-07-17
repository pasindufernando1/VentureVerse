import React from "react";
import { Input, Checkbox} from "../../webcomponent";

function Signup2({formData, setFormData,validateFormData}) {
    return (
    <div className="Signup4">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Entrepreneur</h3>                                
        <p className="text-main-purple">
        Tell us more about your business
        </p>

        <div className="mt-6">
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
export default Signup2;