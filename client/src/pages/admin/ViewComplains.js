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
import useAuth from "../../hooks/useAuth";



function ViewComplains (){

  const {auth}=useAuth();

    const [formData, setFormData] = useState({
        
        complaintDesc: "",
        showError: false
    }); 

    const { get,put} = useAxiosMethods();
    const [response, setResponse] = useState([]);
    const [response1, setResponse1] = useState();
    const [response2, setResponse2] = useState();

    const [data, Data] = useState("");

    useEffect(() => {
        get("auth/pending", setResponse);
    }, []);

    useEffect(()=>{},[response1])


    const submitHandler1=(id)=>{
        put(`auth/IgnoreComplain/${id}`, {}, setResponse1);
        window.location.reload();
    }

     const Actiontaken = async (id) => {
            if (!formData.complaintDesc) {
                setFormData({ ...formData, showError: true }); 
            } else {
                const data = {
                
                    actionDescription:formData.complaintDesc,
                    adminId:auth.id,
                    complainId:id

                 }

                 console.log(data);
              put(`/auth/ActionTaken/${id}`, data, setResponse2);
                 console.log(response2);
             }
            
       
        //console.log(response);
        window.location.reload();
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
                                    <Textarea label="Action taken" color="purple" key={request.complainId} 
                                    onChange={(event) =>
                                        setFormData({ ...formData, complaintDesc: event.target.value, showError: false })       
                                    }
                                    rows={10}
                                     />
                                </div>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <div className="flex justify-center">
                                    <Button variant="outlined" color="green" 
                                        onClick={() =>Actiontaken(request.complainId)}
                                        >
                                        Action taken
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="red"
                                        className="ml-2"
                                        type="submit"
                                        onClick={() => submitHandler1(request.complainId)}
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