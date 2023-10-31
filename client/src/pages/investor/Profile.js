import React, {useState,useEffect} from 'react';
import {Button, Checkbox, Input, Select} from "../webcomponent";
import {DisableAccount, NotificationSettings} from "../sectioncomponent";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import useAuth from "../../hooks/useAuth";
import {useParams} from "react-router-dom";
//const mobileRegex=/^(?:\+94|0)(?:\d{9})$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

// const ProfileInformation = ({formData1, setFormData1, validateFormData1}) => {
//
//     const [editMode, setEditMode] = useState(false);
//     const [editForm, setEditForm] = useState(true);
//     const [changePassword, setchangePassword] = useState(false)
//     const handleEditClick = () => {
//         setEditMode(true);
//         setEditForm(false);
//     };
//     const handleChangePasswordClick = () => {
//         setchangePassword(true)
//     }
//     const noHandleChangePasswordClick = () => {
//         setchangePassword(false)
//     }
//     const {get,put} = useAxiosMethods();
//     const handleSubmit = () => {
//         setEditMode(false);
//         setEditForm(true);
//             put(`investors/update-details/${id})`,response,true)
//     };
//     //get user id
//     const [ response, setResponse] = useState([]);
//     const {auth} = useAuth();
//     const id=auth.id;
//     console.log(id);
//
//
//     useEffect(()=>{
//         get(`investors/pending-details/${id}`,setResponse, true);
//     },[] )
//
//
//
//
//         //const {id} = useParams();
//
//         // useEffect(() => {
//         //     get(`/investor/update/view/${id}`, setResponse, true);
//         // }, []);
//         // console.log(response)
//
//         const [formData, setFormData] = useState({
//             firstname: "",
//             lastname: "",
//             firstline: "",
//             secondline: "",
//             town: "",
//             district: "",
//             mobile: "",
//             password: "",
//             confirmPassword: "",
//         });
//
//         useEffect(() => {
//             setFormData({
//                 ...formData,
//                 firstname: response.firstname,
//                 lastname: response.lastname,
//                 firstline: response.firstLineAddress,
//                 secondline: response.secondLineAddress,
//                 town: response.town,
//                 district: response.district,
//                 mobile: response.contactNumber,
//                 password: response.password,
//                 confirmPassword: response.password,
//             })
//
//         }, [response]);
//
//         const [validateFormData, setValidateFormData] = useState({
//             firstname: {"State": "", "Message": ""},
//             lastname: {"State": "", "Message": ""},
//             firstline: {"State": "", "Message": ""},
//             secondline: {"State": "", "Message": ""},
//             town: {"State": "", "Message": ""},
//             district: {"State": "", "Message": ""},
//             mobile: {"State": "", "Message": ""},
//             password: {"State": "", "Message": ""},
//             confirmPassword: {"State": "", "Message": ""}
//         });
//
//         const [disabled, setDisabled] = useState(true);
//
//         const [showSuccessNotification, setShowSuccessNotification] = useState(false);
//
//         useEffect(() => {
//             //let mobileFlag = mobileRegex.test(formData.mobile);
//             let passwordFlag = passwordRegex.test(formData.password);
//             let confirmPasswordFlag = formData.password === formData.confirmPassword;
//
//             setValidateFormData({
//                 password: {
//                     State: passwordFlag || !formData.password ? "Valid" : "Invalid",
//                     Message: passwordFlag || !formData.password ? "" : "Password must contain at least 8 characters, one uppercase, one lowercase and one number"
//                 },
//                 confirmPassword: {
//                     State: confirmPasswordFlag || !formData.confirmPassword ? "Valid" : "Invalid",
//                     Message: confirmPasswordFlag || !formData.confirmPassword ? "" : "Passwords do not match"
//                 }
//             });
//         }, [formData.password, formData.confirmPassword]);
//
//
//         //check all fields are valid and required fields are not empty
//         const [requiredFields] = useState([
//             "firstname",
//             "lastname",
//             "firstline",
//             "secondline",
//             "town",
//             "district",
//             "mobile",
//             "password",
//             "confirmPassword"
//         ]);
//
//         useEffect(() => {
//             let requiredFieldsFlag = requiredFields.every((field) => formData[field] !== "");
//
//             let validateFormDataFlag = Object.values(validateFormData).every((field) => field.State === "Valid");
//
//             setDisabled(!(requiredFieldsFlag && validateFormDataFlag));
//         }, [formData, requiredFields, validateFormData]);
//
//
//         const requestData = {
//             firstname: formData.firstname,
//             lastname: formData.lastname,
//             firstLineAddress: formData.firstline,
//             secondLineAddress: formData.secondline,
//             town: formData.town,
//             district: formData.district,
//             email: formData.email,
//             nic: formData.nic,
//             gender: formData.gender,
//             contactNumber: formData.mobile,
//             password: formData.password,
//         }
//
//
//     const handleUpdateClick =  () => {
//         setEditMode(false);
//         setEditForm(true);
//         try {
//             const response =  put(`/investors/update/${id}`, JSON.stringify(requestData), setResponse
//             );
//
//             if (response.status === 200) {
//                 console.log('investor updated successfully');
//
//             } else {
//                 console.error('Update failed');
//
//             }
//         } catch (error) {
//             console.error('An error occurred:', error);
//
//         }
//     };
//     return (
//         <div
//             className='flex mt-24 relative justify-center items-start w-auto rounded-2xl py-[2rem] border border-main-purple'>
//             {changePassword ? (
//                 /* Display change password form */
//                 <div>
//                     <h1 className="text-2xl text-main-purple mb-6">Change Password</h1>
//                     <div className="flex flex-col gap-6 items-center mb-1 ">
//                         <Input
//                             type="password"
//                             label="Enter Current Password"
//                             required
//                         />
//                         <Input
//                             type="password"
//                             label="Enter New Password"
//                             required
//                         />
//                         <Input
//                             type="password"
//                             label="Confirm New Password"
//                             required
//                         />
//                         <div className="row">
//                             <Button color="purple" size="sm" ripple={true} type='submit'
//                                     onClick={noHandleChangePasswordClick}>back</Button>
//                             <Button color="purple" size="sm" ripple={true} type='submit'>Submit</Button>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="ProfileInfo">
//                     <div className="flex justify-between">
//                         <h1 className="text-2xl text-main-purple">Profile Information</h1>
//                         {editMode ? (
//                             <Button color="purple" ripple={true} onClick={handleUpdateClick}>Submit</Button>
//                         ) : (
//                             <Button color="purple" ripple={true} onClick={handleEditClick}>Edit</Button>
//                         )}
//                     </div>
//                     <div className="mt-6">
//                         <div className="row">
//                             <Input
//                                 type="text"
//                                 label="First Name"
//                                 value={formData.firstname}
//                                 disabled={editForm}
//                                 onChange={(e) => {
//                                     if (!editForm) {
//                                         setFormData({
//                                             ...formData,
//                                             firstname: e.target.value, // Update the value in response state
//                                         });
//                                     }
//
//                                 }}
//                                 state={validateFormData.firstname}
//                                 required={true}
//                             />
//                             <Input
//                                 type="text"
//                                 label="Last name"
//                                 value={formData.lastname}
//                                 disabled={editForm}
//                                 onChange={(e) => {
//                                     if (!editForm) {
//                                         setFormData({
//                                             ...formData,
//                                             lastname: e.target.value, // Update the value in response state
//                                         });
//                                     }
//                                 }}
//                                     state={validateFormData.lastname}
//                                     required={true}
//
//                             />
//
//                         </div>
//
//
//                         <fieldset className='p-2 border-[1px] mb-[1rem] rounded-2xl border-light-purple'>
//                             <legend className="bg-white px-[1rem] text-light-purple relative left-[0.1rem]">Address
//                             </legend>
//                             <div className="row">
//                                 <Input
//                                     type="text"
//                                     label="First Line"
//                                     value={formData.firstline}
//                                     disabled={editForm}
//                                     onChange={(e) => {
//                                         if (!editForm) {
//                                             setFormData({
//                                                 ...formData,
//                                                 firstline: e.target.value, // Update the value in response state
//                                             });
//                                         }
//                                     }}
//                                 />
//                                 <Input
//                                     type="text"
//                                     label="Second Line"
//                                     value={formData.secondline}
//                                     disabled={editForm}
//                                     onChange={(e) => {
//                                         if (!editForm) {
//                                             setFormData({
//                                                 ...formData,
//                                                 secondline: e.target.value, // Update the value in response state
//                                             });
//                                         }
//                                     }}
//                                 />
//                             </div>
//
//
//                             <div className="row">
//                                 <Input
//                                     type="text"
//                                     label="Town"
//                                     value={formData.town}
//                                     disabled={editForm}
//                                     onChange={(e) => {
//                                         if (!editForm) {
//                                             setFormData({
//                                                 ...response,
//                                                 town: e.target.value, // Update the value in response state
//                                             });
//                                         }
//                                     }}
//                                 />
//                                 <Select
//                                     label="District"
//                                     value={formData.district}
//                                     options={["Ampara",
//                                         "Anuradhapura",
//                                         "Badulla",
//                                         "Batticaloa",
//                                         "Colombo",
//                                         "Galle",
//                                         "Gampaha",
//                                         "Hambantota",
//                                         "Jaffna",
//                                         "Kalutara",
//                                         "Kandy",
//                                         "Kegalle",
//                                         "Kilinochchi",
//                                         "Kurunegala",
//                                         "Mannar",
//                                         "Matale",
//                                         "Matara",
//                                         "Monaragala",
//                                         "Mullaitivu",
//                                         "Nuwara Eliya",
//                                         "Polonnaruwa",
//                                         "Puttalam",
//                                         "Ratnapura",
//                                         "Trincomalee",
//                                         "Vavuniya"]}
//                                     disabled={editForm}
//                                     onChange={(e) => {
//                                         if (!editForm) {
//                                             setFormData({
//                                                 ...formData,
//                                                 district: e, // Update the value in response state
//                                             });
//                                         }
//                                     }}
//                                 />
//                             </div>
//                         </fieldset>
//
//                             <Input
//                                 type="text"
//                                 label="mobile number"
//                                 value={formData.mobile}
//                                 disabled={editForm}
//                                 onChange={(e) => {
//                                     if (!editForm) {
//                                         setFormData({
//                                             ...formData,
//                                             mobile: e.target.value, // Update the value in response state
//                                         });
//                                     }
//                                 }}
//                                 state={validateFormData.mobile}
//                                 required={true}
//                             />
//                         </div>
//                     {/*<button className="text-sm text-main-purple" onClick={handleChangePasswordClick}>Change Password*/}
//                     {/*</button>*/}
//                 </div>
//             )}
//         </div>
//     )
// }
// const ProfileInformation = ({formData1, setFormData1, validateFormData1}) => {
//
//     const [editMode, setEditMode] = useState(false);
//     const [editForm, setEditForm] = useState(true);
//     const [changePassword, setchangePassword] = useState(false)
//     const handleEditClick = () => {
//         setEditMode(true);
//         setEditForm(false);
//     };
//     const handleChangePasswordClick = () => {
//         setchangePassword(true)
//     }
//     const noHandleChangePasswordClick = () => {
//         setchangePassword(false)
//     }
//     const {get,put} = useAxiosMethods();
//     const handleSubmit = () => {
//         setEditMode(false);
//         setEditForm(true);
//         put(`investors/update-details/${id})`,response,true)
//     };
//     //get user id
//     const [ response, setResponse] = useState([]);
//     const {auth} = useAuth();
//     const id=auth.id;
//     console.log(id);
//
//
//     useEffect(()=>{
//         get(`investors/pending-details/${id}`,setResponse, true);
//     },[] )
//
//
//     const [formData, setFormData] = useState({
//         firstname: "",
//         lastname: "",
//         firstline: "",
//         secondline: "",
//         town: "",
//         district: "",
//         mobile: "",
//         password: "",
//         confirmPassword: "",
//     });
//
//     useEffect(() => {
//         setFormData({
//             ...formData,
//             firstname: response.firstname,
//             lastname: response.lastname,
//             firstline: response.firstLineAddress,
//             secondline: response.secondLineAddress,
//             town: response.town,
//             district: response.district,
//             mobile: response.contactNumber,
//             password: response.password,
//             confirmPassword: response.password,
//         })
//
//     }, [response]);
//
//     const [validateFormData, setValidateFormData] = useState({
//         firstname: {"State": "", "Message": ""},
//         lastname: {"State": "", "Message": ""},
//         firstline: {"State": "", "Message": ""},
//         secondline: {"State": "", "Message": ""},
//         town: {"State": "", "Message": ""},
//         district: {"State": "", "Message": ""},
//         mobile: {"State": "", "Message": ""},
//         password: {"State": "", "Message": ""},
//         confirmPassword: {"State": "", "Message": ""}
//     });
//
//     const [disabled, setDisabled] = useState(true);
//
//     const [showSuccessNotification, setShowSuccessNotification] = useState(false);
//
//     useEffect(() => {
//         //let mobileFlag = mobileRegex.test(formData.mobile);
//         let passwordFlag = passwordRegex.test(formData.password);
//         let confirmPasswordFlag = formData.password === formData.confirmPassword;
//
//         setValidateFormData({
//             password: {
//                 State: passwordFlag || !formData.password ? "Valid" : "Invalid",
//                 Message: passwordFlag || !formData.password ? "" : "Password must contain at least 8 characters, one uppercase, one lowercase and one number"
//             },
//             confirmPassword: {
//                 State: confirmPasswordFlag || !formData.confirmPassword ? "Valid" : "Invalid",
//                 Message: confirmPasswordFlag || !formData.confirmPassword ? "" : "Passwords do not match"
//             }
//         });
//     }, [formData.password, formData.confirmPassword]);
//
//
//     //check all fields are valid and required fields are not empty
//     const [requiredFields] = useState([
//         "firstname",
//         "lastname",
//         "firstline",
//         "secondline",
//         "town",
//         "district",
//         "mobile",
//         "password",
//         "confirmPassword"
//     ]);
//
//     useEffect(() => {
//         let requiredFieldsFlag = requiredFields.every((field) => formData[field] !== "");
//
//         let validateFormDataFlag = Object.values(validateFormData).every((field) => field.State === "Valid");
//
//         setDisabled(!(requiredFieldsFlag && validateFormDataFlag));
//     }, [formData, requiredFields, validateFormData]);
//
//
//     const requestData = {
//         firstname: formData.firstname,
//         lastname: formData.lastname,
//         firstLineAddress: formData.firstline,
//         secondLineAddress: formData.secondline,
//         town: formData.town,
//         district: formData.district,
//         email: formData.email,
//         nic: formData.nic,
//         gender: formData.gender,
//         contactNumber: formData.mobile,
//         password: formData.password,
//     }
//
//
//     const handleUpdateClick =  () => {
//         setEditMode(false);
//         setEditForm(true);
//         try {
//             const response =  put(`/investors/update/${id}`, JSON.stringify(requestData), setResponse
//             );
//
//             if (response.status === 200) {
//                 console.log('investor updated successfully');
//
//             } else {
//                 console.error('Update failed');
//
//             }
//         } catch (error) {
//             console.error('An error occurred:', error);
//
//         }
//     };
//     return (
//         <div
//             className='flex mt-24 relative justify-center items-start w-auto rounded-2xl py-[2rem] border border-main-purple'>
//             {changePassword ? (
//                 /* Display change password form */
//                 <div>
//                     <h1 className="text-2xl text-main-purple mb-6">Change Password</h1>
//                     <div className="flex flex-col gap-6 items-center mb-1 ">
//                         <Input
//                             type="password"
//                             label="Enter Current Password"
//                             required
//                         />
//                         <Input
//                             type="password"
//                             label="Enter New Password"
//                             required
//                         />
//                         <Input
//                             type="password"
//                             label="Confirm New Password"
//                             required
//                         />
//                         <div className="row">
//                             <Button color="purple" size="sm" ripple={true} type='submit'
//                                     onClick={noHandleChangePasswordClick}>back</Button>
//                             <Button color="purple" size="sm" ripple={true} type='submit'>Submit</Button>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="ProfileInfo">
//                     <div className="flex justify-between">
//                         <h1 className="text-2xl text-main-purple">Profile Information</h1>
//                         {editMode ? (
//                             <Button color="purple" ripple={true} onClick={handleUpdateClick}>Submit</Button>
//                         ) : (
//                             <Button color="purple" ripple={true} onClick={handleEditClick}>Edit</Button>
//                         )}
//                     </div>
//                     <div className="mt-6">
//                         <div className="row">
//                             <Input
//                                 type="text"
//                                 label="First Name"
//                                 value={formData.firstname}
//                                 disabled={editForm}
//                                 onChange={(e) => {
//                                     if (!editForm) {
//                                         setFormData({
//                                             ...formData,
//                                             firstname: e.target.value, // Update the value in response state
//                                         });
//                                     }
//
//                                 }}
//                                 state={validateFormData.firstname}
//                                 required={true}
//                             />
//                             <Input
//                                 type="text"
//                                 label="Last name"
//                                 value={formData.lastname}
//                                 disabled={editForm}
//                                 onChange={(e) => {
//                                     if (!editForm) {
//                                         setFormData({
//                                             ...formData,
//                                             lastname: e.target.value, // Update the value in response state
//                                         });
//                                     }
//                                 }}
//                                 state={validateFormData.lastname}
//                                 required={true}
//
//                             />
//
//                         </div>
//
//
//                         <fieldset className='p-2 border-[1px] mb-[1rem] rounded-2xl border-light-purple'>
//                             <legend className="bg-white px-[1rem] text-light-purple relative left-[0.1rem]">Address
//                             </legend>
//                             <div className="row">
//                                 <Input
//                                     type="text"
//                                     label="First Line"
//                                     value={formData.firstline}
//                                     disabled={editForm}
//                                     onChange={(e) => {
//                                         if (!editForm) {
//                                             setFormData({
//                                                 ...formData,
//                                                 firstline: e.target.value, // Update the value in response state
//                                             });
//                                         }
//                                     }}
//                                 />
//                                 <Input
//                                     type="text"
//                                     label="Second Line"
//                                     value={formData.secondline}
//                                     disabled={editForm}
//                                     onChange={(e) => {
//                                         if (!editForm) {
//                                             setFormData({
//                                                 ...formData,
//                                                 secondline: e.target.value, // Update the value in response state
//                                             });
//                                         }
//                                     }}
//                                 />
//                             </div>
//
//
//                             <div className="row">
//                                 <Input
//                                     type="text"
//                                     label="Town"
//                                     value={formData.town}
//                                     disabled={editForm}
//                                     onChange={(e) => {
//                                         if (!editForm) {
//                                             setFormData({
//                                                 ...response,
//                                                 town: e.target.value, // Update the value in response state
//                                             });
//                                         }
//                                     }}
//                                 />
//                                 <Select
//                                     label="District"
//                                     value={formData.district}
//                                     options={["Ampara",
//                                         "Anuradhapura",
//                                         "Badulla",
//                                         "Batticaloa",
//                                         "Colombo",
//                                         "Galle",
//                                         "Gampaha",
//                                         "Hambantota",
//                                         "Jaffna",
//                                         "Kalutara",
//                                         "Kandy",
//                                         "Kegalle",
//                                         "Kilinochchi",
//                                         "Kurunegala",
//                                         "Mannar",
//                                         "Matale",
//                                         "Matara",
//                                         "Monaragala",
//                                         "Mullaitivu",
//                                         "Nuwara Eliya",
//                                         "Polonnaruwa",
//                                         "Puttalam",
//                                         "Ratnapura",
//                                         "Trincomalee",
//                                         "Vavuniya"]}
//                                     disabled={editForm}
//                                     onChange={(e) => {
//                                         if (!editForm) {
//                                             setFormData({
//                                                 ...formData,
//                                                 district: e, // Update the value in response state
//                                             });
//                                         }
//                                     }}
//                                 />
//                             </div>
//                         </fieldset>
//
//                         <Input
//                             type="text"
//                             label="mobile number"
//                             value={formData.mobile}
//                             disabled={editForm}
//                             onChange={(e) => {
//                                 if (!editForm) {
//                                     setFormData({
//                                         ...formData,
//                                         mobile: e.target.value, // Update the value in response state
//                                     });
//                                 }
//                             }}
//                             state={validateFormData.mobile}
//                             required={true}
//                         />
//                     </div>
//                     {/*<button className="text-sm text-main-purple" onClick={handleChangePasswordClick}>Change Password*/}
//                     {/*</button>*/}
//                 </div>
//             )}
//         </div>
//     )
// }

const ProfileInformation = ({formData1, setFormData1, validateFormData1}) => {

    const [editMode, setEditMode] = useState(false);
    const [editForm, setEditForm] = useState(true);
    const [changePassword, setchangePassword] = useState(false)
    const handleEditClick = () => {
        setEditMode(true);
        setEditForm(false);
    };
    const handleChangePasswordClick = () => {
        setchangePassword(true)
    }
    const noHandleChangePasswordClick = () => {
        setchangePassword(false)
    }
    const {get,put} = useAxiosMethods();
    const handleSubmit = () => {
        setEditMode(false);
        setEditForm(true);
        put(`investors/update-details/${id})`,response,true)
    };
    //get user id
    const [ response, setResponse] = useState([]);
    const {auth} = useAuth();
    const id=auth.id;
    console.log(id);


    useEffect(()=>{
        get(`investors/pending-details/${id}`,setResponse, true);
    },[] )


    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        firstline: "",
        secondline: "",
        town: "",
        district: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        setFormData({
            ...formData,
            firstname: response.firstname,
            lastname: response.lastname,
            firstline: response.firstLineAddress,
            secondline: response.secondLineAddress,
            town: response.town,
            district: response.district,
            mobile: response.contactNumber,
            password: response.password,
            confirmPassword: response.password,
        })

    }, [response]);

    const [validateFormData, setValidateFormData] = useState({
        firstname: {"State": "", "Message": ""},
        lastname: {"State": "", "Message": ""},
        firstline: {"State": "", "Message": ""},
        secondline: {"State": "", "Message": ""},
        town: {"State": "", "Message": ""},
        district: {"State": "", "Message": ""},
        mobile: {"State": "", "Message": ""},
        password: {"State": "", "Message": ""},
        confirmPassword: {"State": "", "Message": ""}
    });

    const [disabled, setDisabled] = useState(true);

    const [showSuccessNotification, setShowSuccessNotification] = useState(false);

    useEffect(() => {
        //let mobileFlag = mobileRegex.test(formData.mobile);
        let passwordFlag = passwordRegex.test(formData.password);
        let confirmPasswordFlag = formData.password === formData.confirmPassword;

        setValidateFormData({
            password: {
                State: passwordFlag || !formData.password ? "Valid" : "Invalid",
                Message: passwordFlag || !formData.password ? "" : "Password must contain at least 8 characters, one uppercase, one lowercase and one number"
            },
            confirmPassword: {
                State: confirmPasswordFlag || !formData.confirmPassword ? "Valid" : "Invalid",
                Message: confirmPasswordFlag || !formData.confirmPassword ? "" : "Passwords do not match"
            }
        });
    }, [formData.password, formData.confirmPassword]);


    //check all fields are valid and required fields are not empty
    const [requiredFields] = useState([
        "firstname",
        "lastname",
        "firstline",
        "secondline",
        "town",
        "district",
        "mobile",
        "password",
        "confirmPassword"
    ]);

    useEffect(() => {
        let requiredFieldsFlag = requiredFields.every((field) => formData[field] !== "");

        let validateFormDataFlag = Object.values(validateFormData).every((field) => field.State === "Valid");

        setDisabled(!(requiredFieldsFlag && validateFormDataFlag));
    }, [formData, requiredFields, validateFormData]);


    const requestData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        firstLineAddress: formData.firstline,
        secondLineAddress: formData.secondline,
        town: formData.town,
        district: formData.district,
        email: formData.email,
        nic: formData.nic,
        gender: formData.gender,
        contactNumber: formData.mobile,
        password: formData.password,
    }


    const handleUpdateClick =  () => {
        setEditMode(false);
        setEditForm(true);
        try {
            const response =  put(`/investors/update/${id}`, JSON.stringify(requestData), setResponse
            );

            if (response.status === 200) {
                console.log('investor updated successfully');

            } else {
                console.error('Update failed');

            }
        } catch (error) {
            console.error('An error occurred:', error);

        }
    };
    return (
        <div
            className='flex mt-24 relative justify-center items-start w-auto rounded-2xl py-[2rem] border border-main-purple'>
            {changePassword ? (
                /* Display change password form */
                <div>
                    <h1 className="text-2xl text-main-purple mb-6">Change Password</h1>
                    <div className="flex flex-col gap-6 items-center mb-1 ">
                        <Input
                            type="password"
                            label="Enter Current Password"
                            required
                        />
                        <Input
                            type="password"
                            label="Enter New Password"
                            required
                        />
                        <Input
                            type="password"
                            label="Confirm New Password"
                            required
                        />
                        <div className="row">
                            <Button color="purple" size="sm" ripple={true} type='submit'
                                    onClick={noHandleChangePasswordClick}>back</Button>
                            <Button color="purple" size="sm" ripple={true} type='submit'>Submit</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="ProfileInfo">
                    <div className="flex justify-between">
                        <h1 className="text-2xl text-main-purple">Profile Information</h1>
                        {editMode ? (
                            <Button color="purple" ripple={true} onClick={handleUpdateClick}>Submit</Button>
                        ) : (
                            <Button color="purple" ripple={true} onClick={handleEditClick}>Edit</Button>
                        )}
                    </div>
                    <div className="mt-6">
                        <div className="row">
                            <Input
                                type="text"
                                label="First Name"
                                value={formData.firstname}
                                disabled={editForm}
                                onChange={(e) => {
                                    if (!editForm) {
                                        setFormData({
                                            ...formData,
                                            firstname: e.target.value, // Update the value in response state
                                        });
                                    }

                                }}
                                state={validateFormData.firstname}
                                required={true}
                            />
                            <Input
                                type="text"
                                label="Last name"
                                value={formData.lastname}
                                disabled={editForm}
                                onChange={(e) => {
                                    if (!editForm) {
                                        setFormData({
                                            ...formData,
                                            lastname: e.target.value, // Update the value in response state
                                        });
                                    }
                                }}
                                state={validateFormData.lastname}
                                required={true}

                            />

                        </div>


                        <fieldset className='p-2 border-[1px] mb-[1rem] rounded-2xl border-light-purple'>
                            <legend className="bg-white px-[1rem] text-light-purple relative left-[0.1rem]">Address
                            </legend>
                            <div className="row">
                                <Input
                                    type="text"
                                    label="First Line"
                                    value={formData.firstline}
                                    disabled={editForm}
                                    onChange={(e) => {
                                        if (!editForm) {
                                            setFormData({
                                                ...formData,
                                                firstline: e.target.value, // Update the value in response state
                                            });
                                        }
                                    }}
                                />
                                <Input
                                    type="text"
                                    label="Second Line"
                                    value={formData.secondline}
                                    disabled={editForm}
                                    onChange={(e) => {
                                        if (!editForm) {
                                            setFormData({
                                                ...formData,
                                                secondline: e.target.value, // Update the value in response state
                                            });
                                        }
                                    }}
                                />
                            </div>


                            <div className="row">
                                <Input
                                    type="text"
                                    label="Town"
                                    value={formData.town}
                                    disabled={editForm}
                                    onChange={(e) => {
                                        if (!editForm) {
                                            setFormData({
                                                ...response,
                                                town: e.target.value, // Update the value in response state
                                            });
                                        }
                                    }}
                                />
                                <Select
                                    label="District"
                                    value={formData.district}
                                    options={["Ampara",
                                        "Anuradhapura",
                                        "Badulla",
                                        "Batticaloa",
                                        "Colombo",
                                        "Galle",
                                        "Gampaha",
                                        "Hambantota",
                                        "Jaffna",
                                        "Kalutara",
                                        "Kandy",
                                        "Kegalle",
                                        "Kilinochchi",
                                        "Kurunegala",
                                        "Mannar",
                                        "Matale",
                                        "Matara",
                                        "Monaragala",
                                        "Mullaitivu",
                                        "Nuwara Eliya",
                                        "Polonnaruwa",
                                        "Puttalam",
                                        "Ratnapura",
                                        "Trincomalee",
                                        "Vavuniya"]}
                                    disabled={editForm}
                                    onChange={(e) => {
                                        if (!editForm) {
                                            setFormData({
                                                ...formData,
                                                district: e, // Update the value in response state
                                            });
                                        }
                                    }}
                                />
                            </div>
                        </fieldset>

                        <Input
                            type="text"
                            label="mobile number"
                            value={formData.mobile}
                            disabled={editForm}
                            onChange={(e) => {
                                if (!editForm) {
                                    setFormData({
                                        ...formData,
                                        mobile: e.target.value, // Update the value in response state
                                    });
                                }
                            }}
                            state={validateFormData.mobile}
                            required={true}
                        />
                    </div>
                    {/*<button className="text-sm text-main-purple" onClick={handleChangePasswordClick}>Change Password*/}
                    {/*</button>*/}
                </div>
            )}
        </div>
    )
}
const Preferences = () =>{

    const category = [
        {label: 'Food & Beverage'},
        {label: 'Technology'},
        {label: 'App / Website'},
        {label: 'Fitness'},
        {label: 'Health / Wellness / Nutrition'},
        {label: 'Sports'},
        {label: 'Beauty'},
        {label: 'Clothing / Fashion'},
        {label: 'Toys / Games'},
        {label: 'Entertainment / Experiential'},
        {label: 'Pets'},
        {label: 'Holiday'},
        {label: 'Children'},
        {label: 'Housewares / Home Design'},
    ];

    //get preferences
    const [ response, setResponse] = useState([]);
    const {auth} = useAuth();
    const id=auth.id;
    console.log(id);

    const {get} = useAxiosMethods();
    useEffect(()=>{
        get(`investors/interested-sectors-Ids/${id}`,setResponse, true);
    },[] )
    console.log(response)

    const [categories, setCategories] = useState({
        food: false,
        technology: false,
        app: false,
        fitness: false,
        healthcare: false,
        sports: false,
        beauty: false,
        clothing: false,
        toys: false,
        entertainment: false,
        pets: false,
        music: false,
        holiday: false,
        children: false,
        housewares: false,
    });
    const numCategories = Object.keys(categories).length;
    for (let i = 0; i < numCategories; i++) {
        const index = response[i];
        const key = Object.keys(categories)[index - 1];
        if (key) {
            categories[key] = true;
        }
    }
    console.log(categories)



    return (
        <div
            className='flex mt-24 relative justify-center items-start w-auto rounded-2xl px-[1rem] lg:px-[5rem] py-[2rem] border border-main-purple'>
            <div className="Preferences">
                <h1 className="text-2xl text-main-purple self-center">Preferences</h1>
                <p className="text-sm text-main-purple">Check the box to update your preferences.</p>
                <div className='w-full mt-4 py-[1rem] px-4 bg-white flex flex-col justify-center items-center  '>
                    <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8 justify-center items-center'>
                        <Checkbox
                            label="Food & Beverage"
                            name="Food & Beverage"
                            checked={categories.food}
                            onChange={(event) => {
                                setCategories({...categories, food: event.target.checked})
                            }}
                        />
                        <Checkbox
                            label="Technology"
                            name="Technology"
                            checked={categories.technology}
                            onChange={(event) => {
                                setCategories({...categories, technology: event.target.checked})
                            }}
                        />
                        <Checkbox
                            label="App / Website"
                            name="App / Website"
                            checked={categories.app}
                            onChange={(event) =>
                                setCategories({...categories, app: event.target.checked})
                            }
                            required={true}
                        />
                        <Checkbox
                            label="Fitness"
                            name="Fitness"
                            checked={categories.fitness}
                            onChange={(event) =>
                                setCategories({...categories, fitness: event.target.checked})
                            }

                        />
                        <Checkbox
                            label="Health / Wellness / Nutrition"
                            name="Health / Wellness / Nutrition"
                            checked={categories.healthcare}
                            onChange={(event) =>
                                setCategories({...categories, healthcare: event.target.checked})
                            }
                        />
                        <Checkbox

                            label="Sports"
                            name="Sports"
                            checked={categories.sports}
                            onChange={(event) =>
                                setCategories({...categories, sports: event.target.checked})
                            }
                        />
                        <Checkbox
                            label="Beauty"
                            name="Beauty"
                            checked={categories.beauty}
                            onChange={(event) =>
                                setCategories({...categories, beauty: event.target.checked})
                            }
                        />
                        <Checkbox
                            label="Clothing / Fashion"
                            name="Clothing / Fashion"
                            checked={categories.clothing}
                            onChange={(event) =>
                                setCategories({...categories, clothing: event.target.checked})
                            }
                        />
                        <Checkbox
                            label="Toys / Games"
                            name="Toys / Games"
                            checked={categories.toys}
                            onChange={(event) =>
                                setCategories({...categories, toys: event.target.checked})
                            }
                        />
                        <Checkbox
                            label="Entertainment / Experiential"
                            name="Entertainment / Experiential"
                            checked={categories.entertainment}
                            onChange={(event) =>
                                setCategories({...categories, entertainment: event.target.checked})
                            }
                        />
                        <Checkbox
                            label="Pets"
                            name="Pets"
                            checked={categories.pets}
                            onChange={(event) =>
                                setCategories({...categories, pets: event.target.checked})
                            }
                        />
                        <Checkbox
                            label="Music"
                            name="Music"
                            checked={categories.music}
                            onChange={(event) =>
                                setCategories({...categories, music: event.target.checked})
                            }
                        />
                        <Checkbox
                            label="Holiday"
                            name="Holiday"
                            checked={categories.holiday}
                            onChange={(event) =>
                                setCategories({...categories, holiday: event.target.checked})
                            }
                        />
                        <Checkbox
                            label="Children"
                            name="Children"
                            checked={categories.children}
                            onChange={(event) =>
                                setCategories({...categories, children: event.target.checked})
                            }
                        />
                        <Checkbox
                            label="Housewares / Home Design"
                            name="Housewares / Home Design"
                            checked={categories.housewares}
                            onChange={(event) =>
                                setCategories({...categories, housewares: event.target.checked})
                            }
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

const UpdatedDocuments = () => {
    const { get } = useAxiosMethods();
    const [response, setResponse] = useState([]);
    const[sectors,setSectors]=useState([]);
    const [pdf, setPdf] = useState([]);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);

    const { id } = useParams();

    const registrationRequestDetails = {
        policeReport:"/assets/images/20000499.pdf",
        incomeStatement:"/assets/images/20000499.pdf"
    };


    useEffect(() => {
        get(`/auth/get-investor-pdf/${id}`, setPdf);
    }, []);
    const pdfs = {
        policeReport:pdf[0],
        incomeStatement:pdf[1],
    }

    const handleDocumentDownload = (documentData, documentName) => {
        const linkSource = `data:application/pdf;base64,${documentData}`;
        const downloadLink = document.createElement("a");
        const fileName = `${documentName}.pdf`;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

    };

    return (
        <div
            className=' mb-24 flex flex-col mt-24 relative justify-center items-start w-auto rounded-2xl px-[1rem] lg:px-[5rem] py-[2rem] border border-main-purple'>
            {/*<div>*/}
            {/*    <h3 className="font-medium text-purple-400 text-lg font-semibold mb-2">Documents</h3>*/}
            {/*    <div className="grid grid-cols-2 gap-5 ml-10">*/}
            {/*        <div className="document-container">*/}
            {/*            <p><strong>Police Report:</strong></p>*/}
            {/*            <p>*/}
            {/*                <iframe*/}
            {/*                    src={`data:application/pdf;base64,${pdfs.policeReport}`}*/}
            {/*                    width="88%"*/}
            {/*                    height="510px"*/}
            {/*                    title="Police Report"*/}
            {/*                ></iframe>*/}
            {/*                <br></br>*/}
            {/*                <Button*/}
            {/*                    className="download-button"*/}
            {/*                    type="button"*/}
            {/*                    onClick={() =>*/}
            {/*                        handleDocumentDownload(*/}
            {/*                            pdfs.policeReport,*/}
            {/*                            registrationRequestDetails.id + "_police_report"*/}
            {/*                        )*/}
            {/*                    }*/}
            {/*                    label="Download"*/}
            {/*                />*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*        <div className="document-container">*/}
            {/*            <p><strong>Income Statement:</strong></p>*/}
            {/*            <p>*/}
            {/*                <iframe*/}
            {/*                    src={`data:application/pdf;base64,${pdfs.incomeStatement}`}*/}
            {/*                    width="88%"*/}
            {/*                    height="510px"*/}
            {/*                    title="Income Statement"*/}
            {/*                ></iframe>*/}
            {/*                <br></br>*/}
            {/*                <Button*/}
            {/*                    className="download-button"*/}
            {/*                    type="button"*/}
            {/*                    onClick={() =>*/}
            {/*                        handleDocumentDownload(*/}
            {/*                            pdfs.incomeStatement,*/}
            {/*                            registrationRequestDetails.id + "_income_statement"*/}
            {/*                        )*/}
            {/*                    }*/}
            {/*                    label="Download"*/}
            {/*                />*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <h1 className="text-2xl text-main-purple self-center ">Documents Uploaded</h1>
            <div className="flex flex-row items-center w-full text-center mt-6">
                <div className="applicationNotifications w-1/2">
                    <h4 className="text-main-purple self-center">Bank Statement</h4>
                    <div className='w-full mt-4 py-[2rem] px-4 bg-white flex flex-col space-y-4 mr-4'>
                        <embed
                            className="h-[600px] w-full"
                            src="/assets/documents/Bank%20Account%20Statement.pdf"
                            type="application/pdf"
                        />
                    </div>
                </div>

                <div className="applicationNotificationsSettings w-1/2">
                    <h4 className=" text-main-purple self-center">Police Report</h4>
                    <div className='w-full mt-4 py-[2rem] px-4 bg-white flex flex-col space-y-4 mr-4'>
                        <embed
                            className="h-[600px] w-full"
                            src="/assets/documents/clearance_application.pdf"
                            type="application/pdf"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const Profile = () => {
    return (
        <>
            <ProfileInformation/>
            <Preferences/>
            <UpdatedDocuments/>
            <DisableAccount/>
        </>
    )
}

export default Profile

