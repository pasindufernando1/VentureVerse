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
            <div className="flex flex-wrap justify-center mt-40"> 
                <Card className="w-96 mr-5 mb-10">
                <CardHeader color="blue-gray" className="relative h-50">
                    <img
                    src="/assets/images/profit.png"
                    alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                     Profit & Loss
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button>
                        <Link to="/investor/profit/reports">Generate Report</Link>    
                    </Button>
                </CardFooter>

                </Card>  
                <Card className="w-96 mr-5 mb-10">
                <CardHeader color="blue-gray" className="relative h-50">
                    <img
                    src="/assets/images/interested.png"
                    alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                    Investment sectors
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button>
                        <Link to="/investor/sector/reports">Generate Report</Link>
                    </Button>
                </CardFooter>
                </Card>   
            </div>  
        </Header>
        </div>   
    )

}

export default Analytics;