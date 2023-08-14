import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import {} from "../webcomponent";
import {Checkbox,Button,Input,Header} from "../webcomponent";
import {useEffect, useState} from "react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import {Progress} from "@material-tailwind/react";
import {Avatar} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import React from "react";
import { Slider } from "@material-tailwind/react";


function ViewListingInvestor() {

    // Get request to get the listing details
    const {get} = useAxiosMethods();
    const [listing, setListing] = useState({});
    const [subscriptionId, setSubscriptionId] = useState();


    useEffect(() => {
        get("/entrepreneur/getListing/1604", setListing);
        // Get listing enterprenuer
        get("/entrepreneur/getSubscription/1604", setSubscriptionId);
        console.log(subscriptionId);
        console.log(listing);

    }, [])


    const [subView, setSubView] = useState(false);
    const [fullView, setFullView] = useState(true);


    const onClicksub = () => {
        setSubView(true);
        setFullView(false);
    }

    const onClickfull = () => {
        setSubView(false);
        setFullView(true);
    }


    return (

            <Header active="Listings">
                <div className="flex flex-row">
                    <div className="h-auto min-h-[100vh] flex flex-wrap gap-8 mt-[-2rem]">
                        <Card className="w-full mt-2">
                            <CardHeader className="relative h-full mt-5 w-50">
                                <video
                                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                    controls
                                    autoPlay = {true}
                                    muted
                                >
                                    <source src="/assets/videos/video1.mp4" type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </CardHeader>
                            <CardBody>


                                <Typography variant="h5" className="mb-2 text-light-purple mt-4">
                                    Expectations & Returns
                                </Typography>
                                {/* Section for the business name */}

                                {/* Section for the required amount, equity return and profit per unit return */}
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex flex-col">
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Required Amount :
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Equity Return :
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Profit per Unit Return :
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col">
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Rs.5000000
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            5%
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            25
                                        </Typography>
                                    </div>
                                </div>
                                <Typography variant="h5" className="mb-2 text-light-purple mt-4">
                                    Status
                                </Typography>
                                <div className="w-full">
                                    <div className="mb-2 flex items-center justify-between gap-4">
                                        <Typography color="blue" variant="h6" className="text-main-gray">
                                            Completed
                                        </Typography>
                                        <Typography color="blue" variant="h6" className="text-main-purple">
                                            50%
                                        </Typography>
                                    </div>
                                    <Progress value={50} color="purple"/>
                                </div>
                                <Typography variant="h6" className="mb-2 text-main-gray mt-4">
                                    Interested
                                </Typography>
                                {/* Div to show the images of interested parties images*/}
                                <div className="flex items-center -space-x-4 mt-2">
                                    <Avatar
                                        variant="circular"
                                        alt="user 1"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 2"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 3"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 4"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        title="Mr. Nimal Fernando"
                                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 5"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                </div>
                                {/* Business name */}
                                <Typography variant="h6" color="blue-gray" className="mb-2 mt-2 text-center ">
                                    Posted by : MAS holdings pvt. ltd
                                </Typography>

                                {/*Section to show more details*/}

                            </CardBody>
                            <CardFooter className="pt-0 flex justify-center">
                                <Button
                                    variant="primary"
                                    label="Show more"
                                    icon="next"
                                >
                                    <Link to="/admin/view-finalizedOffering">View Finalization</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="w-full mt-2">
                            <CardHeader className="relative h-full mt-5 w-50">
                                <video
                                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                    controls
                                    autoPlay
                                    muted
                                >
                                    <source src="/assets/videos/video2.mp4" type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </CardHeader>
                            <CardBody>


                                <Typography variant="h5" className="mb-2 text-light-purple mt-4">
                                    Expectations & Returns
                                </Typography>
                                {/* Section for the business name */}

                                {/* Section for the required amount, equity return and profit per unit return */}
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex flex-col">
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Required Amount :
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Equity Return :
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Profit per Unit Return :
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col">
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Rs. 6000000               
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            6%
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            30
                                        </Typography>
                                    </div>
                                </div>
                                <Typography variant="h5" className="mb-2 text-light-purple mt-4">
                                    Status
                                </Typography>
                                <div className="w-full">
                                    <div className="mb-2 flex items-center justify-between gap-4">
                                        <Typography color="blue" variant="h6" className="text-main-gray">
                                            Completed
                                        </Typography>
                                        <Typography color="blue" variant="h6" className="text-main-purple">
                                            50%
                                        </Typography>
                                    </div>
                                    <Progress value={50} color="purple"/>
                                </div>
                                <Typography variant="h6" className="mb-2 text-main-gray mt-4">
                                    Interested
                                </Typography>
                                {/* Div to show the images of interested parties images*/}
                                <div className="flex items-center -space-x-4 mt-2">
                                    <Avatar
                                        variant="circular"
                                        alt="user 1"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 2"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 3"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 4"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        title="Mr. Nimal Fernando"
                                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 5"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                </div>
                                {/* Business name */}
                                <Typography variant="h6" color="blue-gray" className="mb-2 mt-2 text-center ">
                                    Posted by : MAS holdings pvt. ltd
                                </Typography>

                                {/*Section to show more details*/}

                            </CardBody>
                            <CardFooter className="pt-0 flex justify-center">
                                <Button
                                    variant="primary"
                                    label="Show more"
                                    icon="next"
                                >
                                    <Link to="/admin/view-finalizedOffering">View Finalization</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="w-full mt-2">
                            <CardHeader className="relative h-full mt-5 w-50">
                                <video
                                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                    controls
                                    autoPlay
                                    muted
                                >
                                    <source src="/assets/videos/video3.mp4" type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </CardHeader>
                            <CardBody>


                                <Typography variant="h5" className="mb-2 text-light-purple mt-4">
                                    Expectations & Returns
                                </Typography>
                                {/* Section for the business name */}

                                {/* Section for the required amount, equity return and profit per unit return */}
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex flex-col">
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Required Amount :
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Equity Return :
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Profit per Unit Return :
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col">
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Rs. 7000000
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            10%
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            35
                                        </Typography>
                                    </div>
                                </div>
                                <Typography variant="h5" className="mb-2 text-light-purple mt-4">
                                    Status
                                </Typography>
                                <div className="w-full">
                                    <div className="mb-2 flex items-center justify-between gap-4">
                                        <Typography color="blue" variant="h6" className="text-main-gray">
                                            Completed
                                        </Typography>
                                        <Typography color="blue" variant="h6" className="text-main-purple">
                                            50%
                                        </Typography>
                                    </div>
                                    <Progress value={50} color="purple"/>
                                </div>
                                <Typography variant="h6" className="mb-2 text-main-gray mt-4">
                                    Interested
                                </Typography>
                                {/* Div to show the images of interested parties images*/}
                                <div className="flex items-center -space-x-4 mt-2">
                                    <Avatar
                                        variant="circular"
                                        alt="user 1"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 2"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 3"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 4"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        title="Mr. Nimal Fernando"
                                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 5"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                </div>
                                {/* Business name */}
                                <Typography variant="h6" color="blue-gray" className="mb-2 mt-2 text-center ">
                                    Posted by : MAS holdings pvt. ltd
                                </Typography>

                                {/*Section to show more details*/}

                            </CardBody>
                            <CardFooter className="pt-0 flex justify-center">
                                <Button
                                    variant="primary"
                                    label="Show more"
                                    icon="next"
                                >
                                    <Link to="/admin/view-finalizedOffering">View Finalization</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="w-full mt-2">
                            <CardHeader className="relative h-full mt-5 w-50">
                                <video
                                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                    controls
                                    autoPlay
                                    muted
                                >
                                    <source src="/assets/videos/video4.mp4" type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </CardHeader>
                            <CardBody>


                                <Typography variant="h5" className="mb-2 text-light-purple mt-4">
                                    Expectations & Returns
                                </Typography>
                                {/* Section for the business name */}

                                {/* Section for the required amount, equity return and profit per unit return */}
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex flex-col">
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Required Amount :
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Equity Return :
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Profit per Unit Return :
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col">
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Rs. 8000000
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            12%
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            40
                                        </Typography>
                                    </div>
                                </div>
                                <Typography variant="h5" className="mb-2 text-light-purple mt-4">
                                    Status
                                </Typography>
                                <div className="w-full">
                                    <div className="mb-2 flex items-center justify-between gap-4">
                                        <Typography color="blue" variant="h6" className="text-main-gray">
                                            Completed
                                        </Typography>
                                        <Typography color="blue" variant="h6" className="text-main-purple">
                                            50%
                                        </Typography>
                                    </div>
                                    <Progress value={50} color="purple"/>
                                </div>
                                <Typography variant="h6" className="mb-2 text-main-gray mt-4">
                                    Interested
                                </Typography>
                                {/* Div to show the images of interested parties images*/}
                                <div className="flex items-center -space-x-4 mt-2">
                                    <Avatar
                                        variant="circular"
                                        alt="user 1"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 2"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 3"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 4"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        title="Mr. Nimal Fernando"
                                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                                    />
                                    <Avatar
                                        variant="circular"
                                        alt="user 5"
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
                                        title="Mr. Nimal Fernando"
                                    />
                                </div>
                                {/* Business name */}
                                <Typography variant="h6" color="blue-gray" className="mb-2 mt-2 text-center ">
                                    Posted by : MAS holdings pvt. ltd
                                </Typography>

                                {/*Section to show more details*/}

                            </CardBody>
                            <CardFooter className="pt-0 flex justify-center">
                                <Button
                                    variant="primary"
                                    label="Show more"
                                    icon="next"
                                >
                                    <Link to="/admin/view-finalizedOffering">View Finalization</Link>
                                </Button>
                            </CardFooter>
                        </Card>


                    </div>
                    
                </div>

            </Header>


    )
        ;

}

export default ViewListingInvestor;


