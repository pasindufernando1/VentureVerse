import React from "react";
import InputField from "../../webcomponent/InputField";
import Select from "../../webcomponent/CustomSelect";

function Signup1({formData, setFormData}) {
//   const validateForm1 = () => {
//     let errors = {};

//     if (!formData.firstname.trim()) {
//         errors.firstname = "First name is required";
//     }
//     if (!formData.lastname.trim()) {
//         errors.lastname = "Last name is required";
//     }
//     if (!formData.firstline.trim()) {
//         errors.firstline = "First line is required";
//     }
//     if (!formData.secondline.trim()) {
//         errors.secondline = "Second line is required";
//     }
//     if (!formData.town.trim()) {
//         errors.town = "Town is required";
//     }
//     if (!formData.district.trim()) {
//         errors.district = "District is required";
//     }
//     //check email format using regex
//     if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
//         errors.email = "Email is required";
//     }
//     if (!formData.nic.trim() || !(/^[0-9]{9}[vVxX]$/.test(formData.nic)&&/^[0-9]{12}$/.test(formData.nic))) {
//         errors.nic = "NIC is required";
//     }
//     if (!formData.gender.trim()) {
//         errors.gender="Gender is required";
//     }
//     if (!formData.mobile.trim() || !/^[0-9]{10}$/.test(formData.mobile)) {
//         errors.mobile = "Mobile is required";
//     }

//     if (Object.keys(errors).length > 0) {
//         return errors;
//     }else{
//         return null;
//     }

//   }
  return (
    <div className="Signup1">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Individual Investor</h3>                                
        <p className="text-main-purple">
        Tell us about you
        </p>
        <div className="mt-6">
            <div className="row">
                <InputField
                    type="text"
                    label="First Name"
                    value={formData.firstname}
                    onChange={(event)=>
                        setFormData({...formData, firstname: event.target.value})
                    }
                    // errorMessage={formData.firstname}
                />
                <InputField
                    type="text"
                    label="Last name"
                    value={formData.lastname}
                    onChange={(event)=>
                        setFormData({...formData, lastname: event.target.value})
                    }
                    // errorMessage={formData.lastname}
                />
            </div>

            <fieldset className='p-2 border-[1px] mb-[1rem] rounded-2xl border-light-purple'>
                <legend className="bg-white px-[1rem] text-light-purple relative left-[0.1rem]">Address
                </legend>
                <div className="row">
                    <InputField
                        type="text"
                        label="First Line"
                        value={formData.firstline}
                        onChange={(event)=>
                            setFormData({...formData, firstline: event.target.value})
                        }
                        // errorMessage={formData.firstline}
                    />
                    <InputField
                        type="text"
                        label="Second Line"
                        value={formData.secondline}
                        onChange={(event)=>
                            setFormData({...formData, secondline: event.target.value})
                        }
                        // errorMessage={formData.secondline}
                    />
                </div>

                <div className="row">
                    <InputField
                        type="text"
                        label="Town"
                        value={formData.town}
                        onChange={(event)=>
                            setFormData({...formData, town: event.target.value})
                        }
                        // errorMessage={formData.town}
                    />
                    <Select 
                        label="District"
                        value={formData.district}
                        options={["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"]}
                        onChange={(event)=>
                            setFormData({...formData, district: event})
                        }
                        // errorMessage={formData.district}
                    />
                </div>
            </fieldset>

            <div className="row">
                <InputField
                    type="email"
                    label="Email"
                    value={formData.email}
                    onChange={(event)=>
                        setFormData({...formData, email: event.target.value})
                    }
                    // errorMessage={formData.email}
                />
                <InputField
                    type="text"
                    label="NIC"
                    value={formData.nic}
                    onChange={(event)=>
                        setFormData({...formData, nic: event.target.value})
                    }
                    // errorMessage={formData.nic}
                />
            </div>

            <div className="row">
                <Select
                    label="Gender"
                    value={formData.gender}
                    options={["Male","Female"]}
                    onChange={(event)=>
                        setFormData({...formData, gender: event})
                    }
                    // errorMessage={formData.gender}
                />
                <InputField
                    type="text"
                    label="mobile number"
                    value={formData.mobile}
                    onChange={(event)=>
                        setFormData({...formData, mobile: event.target.value})
                    }
                    // errorMessage={formData.mobile}
                />
            </div>
   
        </div>
    </div>
  );
}
export default Signup1;