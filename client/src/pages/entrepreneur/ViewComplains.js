import {Header} from "../webcomponent";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import {Avatar} from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import useAuth from "../../hooks/useAuth";
import React, { useState, useEffect } from "react";

function ViewComplains() {

    const {auth}=useAuth();
    const {get,put} = useAxiosMethods();

    const [response, setResponse] = useState([]);
    const [response1, setResponse1] = useState();

    useEffect(() => {
        get(`auth/PastComplains/${auth.id}`, setResponse);
    }, []);

    useEffect(()=>{},[response1])

    const Actiontaken = async (id) => {
            console.log(id);
            put(`auth/MarkedComplains/${id}`, {}, setResponse1);
         //  window.location.reload();
    }

   





    return (
        <div>
            <Header active="Complains">
                <div className="flex flex-col">
                {response.map((request, key=request.complainId) => (
                    <Card className="mt-6 w-50">
                        <CardBody className="flex items-start">
                            <div>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    Complain date - {request.date}
                                </Typography>
                            </div>
                        </CardBody>
                        <CardBody className="mt-[-3rem]">
                            <Typography>
                            {request.description}
                            </Typography>
                            <div className="w-full mt-2">
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    Action taken  
                                </Typography>
                                <Typography>
                                {request.actionDescription === null ? (
                                        <p>no action has been taken</p>
                                    ) : (
                                        <p>{request.actionDescription}</p>
                                    )}
                            </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <div className="flex justify-center">
                            {request.actionDescription === null ? (
                                        <Button variant="outlined" color="green" disabled={true}>Done</Button>
                                    ) : (

                                        <Button variant="outlined" color="green" onClick={() =>Actiontaken(request.complainId)}>Done</Button>
                                    )}
                               
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