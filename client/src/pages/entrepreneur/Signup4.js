import React from "react";
import { Input, Checkbox,Button } from "../webcomponent";
import Modal from "react-modal";
import { useState } from "react";
import Terms from "../common/Terms";


function Signup4({formData, setFormData,validateFormData}) {
    const [isModalOpen, setIsModalOpen] = useState(false); 
    return (
    <div className="Signup4">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Entrepreneur</h3>                                
        <p className="text-main-purple">
        Finally, create a password
        </p>

        <div className="mt-6">
            <div className="row2">                                  
                    <Input 
                        type="password" 
                        color="purple" 
                        label="Password:"
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
                        label="Confirm Password:"
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
            <div>
                <Checkbox 
                color="purple" 
                label="I agree to the terms and conditions"
                name="terms"
                checked={formData.terms}
                onChange={(event) =>
                    setFormData({ ...formData, terms: event.target.checked })
                }
                state={validateFormData.terms}
                onClick={() => setIsModalOpen(true)}
                required={true}
                />
            </div>  
            </div>                                    
        </div>
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
            {/* display  terms and consitions*/}
            <Terms />
            <Button
                type="button"
                className="float-right"
                onClick={() => setIsModalOpen(false)}
            >
                Agree
            </Button>
        </Modal>
    </div>    
    );
}
export default Signup4;