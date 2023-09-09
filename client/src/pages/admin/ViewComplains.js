import { Header } from "../webcomponent";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const ViewComplains = () => {


    const [formData, setFormData] = useState({
        complaintDesc: "",
        showError: false
    }); 

    const { get, post } = useAxiosMethods();
    const [response, setResponse] = useState([]);
    const [response1, setResponse1] = useState([]);

    const [data, Data] = useState("");

    useEffect(() => {
        get("auth/pendingComplains", setResponse);
    }, []);


function submitHandler(id){
    // const IgnoreComplain = () => {
    //     post(`auth/IgnoreComplain/${id}`, {}, setResponse1);
        
    // }

    try {
           post(`auth/IgnoreComplain/${id}`, {}, setResponse1);
    

        if (response.status === 200) {
            console.log('updated successfully');

        } else {
            console.error('Update failed');

        }
    } catch (error) {
        console.error('An error occurred:', error);

    }

}


     const Actiontaken = async () => {
       
            if (!formData.complaintDesc) {
                setFormData({ ...formData, showError: true }); 
            } else {
                const data = {

                // complainId,
                description:formData.complaintDesc

                 }

                 console.log(data.description); 
             }
            
        post(`/auth/addcomplaint`, data, setResponse);
        // console.log(response);
        
    }


    return (
        <div>
            <Header active="Complains">
                <div className="flex flex-col">


                    {response.map((request, key=request.complainId) => (
                    
                        <Card key={request.complainId}  className="mt-6 w-50">
                            
                            <CardBody className="flex items-start">
                                <Avatar
                                    variant="circular"
                                    alt="tania andrew"
                                    className="cursor-pointer border-2 border-main-purple hover:z-10 focus:z-10 ml-1"
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                />
                                <div className="ml-4">
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {request.userId.firstname} {request.userId.lastname} - {request.date}
                                </Typography>
                                </div>
                            </CardBody>
                            <CardBody className="mt-[-2rem]">
                                <Typography>
                                    {request.description}
                                </Typography>
                                <div className="w-full mt-2">
                                    <Textarea label="Action taken" color="purple"
                                    value={formData.complaintDesc}
                                    onChange={(event) =>
                                        setFormData({ ...formData, complaintDesc: event.target.value, showError: false })       
                                    }
                                    rows={10}
                                     />
                                </div>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <div className="flex justify-center">
                                    <Button variant="outlined" color="green" onClick={Actiontaken}>
                                        Action taken
                                    </Button>
                                    <Button variant="outlined" color="red" className="ml-2"
                                //   onClick={submitHandler(request.complainId)}
                                     >
                                        Ignore
                                    </Button>
                                </div>

                            </CardFooter>
                        </Card>
                    ))}




                </div>

            </Header>
        </div>
    )
}

export default ViewComplains;