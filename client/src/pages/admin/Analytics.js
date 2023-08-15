import React, {useState, useEffect} from "react";
import {  Button, Header } from "../webcomponent";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography
} from "@material-tailwind/react";
import { Link } from "react-router-dom";


const Analytics = () => {
    return(
        <div>
        <Header active="Analytics">   
            <div className="flex flex-wrap justify-center"> 
                <Card className="w-80 mr-5 mb-10">
                <CardHeader color="blue-gray" className="relative h-40">
                    <img
                    src="/assets/images/users.webp"
                    alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                    Users
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button>
                        <Link to="/admin/users/reports">Generate Report</Link>    
                    </Button>
                </CardFooter>

                </Card>  
                <Card className="w-80 mr-5 mb-10">
                <CardHeader color="blue-gray" className="relative h-40">
                    <img
                    src="/assets/images/profit.png"
                    alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                    Gains
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button>
                        <Link to="/admin/gains/reports">Generate Report</Link>
                    </Button>
                </CardFooter>
                </Card>  

                <Card className="w-80 mr-5 mb-10">
                <CardHeader color="blue-gray" className="relative h-40">
                    <img
                    src="/assets/images/interest.jpg"
                    alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                    Interests
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button>
                       <Link to="/admin/interest/reports">Generate Report</Link>
                    </Button>
                </CardFooter>
                </Card>  

                <Card className="w-80 mr-5 mb-10">
                <CardHeader color="blue-gray" className="relative h-40">
                    <img
                    src="/assets/images/complains.jpg"
                    alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                    Complains
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button>
                        <Link to="/admin/complain/reports">Generate Report</Link>
                    </Button>
                </CardFooter>
                </Card>  
            </div>  
        </Header>
        </div>   
    )

}

export default Analytics;