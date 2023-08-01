import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";

import CustomButton from "../webcomponent/CustomButton";
import ViewListingFull from "./ViewListingFull";
import { useEffect, useState } from "react";
import useAxiosMethods from "../../hooks/useAxiosMethods";


function ViewListing() {

    // Get request to get the listing details
    const { get } = useAxiosMethods();
    const [listing, setListing] = useState({});

    useEffect(() => {
        get("/entrepreneur/getListing/1604", setListing);
        console.log(listing)
    }, [])

    const [subView, setSubView] = useState(false);
    const [fullView, setFullView] = useState(true);

    const onClicksub = () => {
        setSubView(true);
        setFullView(false);
    }



    return (
        <div className="h-auto min-h-[100vh] p-[2rem] flex justify-center items-center">
            <div hidden={subView}>
            <Card className="mt-6 w-96">
                <CardHeader className="relative h-56 mt-5 ">
                    <video
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        controls
                        autoPlay
                    >
                        <source src="/assets/videos/video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" className="mb-2 text-main-purple">
                        Title of the listing
                    </Typography>
                    <Typography>
                        The place is close to Barceloneta Beach and bus stop just 2 min by
                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                        night life in Barcelona.The place is close to Barceloneta Beach and bus stop just 2 min by
                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                        night life in Barcelona.
                    </Typography>
                    {/* Business name */}
                    <Typography variant="h6" color="blue-gray" className="mb-2 mt-2">
                        Business Name : ABC company
                    </Typography>
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
                                $100,000
                            </Typography>
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                10%
                            </Typography>
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                $10
                            </Typography>
                        </div>
                    </div>
                    {/*Section to show more details*/}

                </CardBody>
                <CardFooter className="pt-0 flex justify-center">
                    <CustomButton 
                        variant="primary" 
                        label="Show more" 
                        icon="next"
                        onClick={onClicksub}
                    />
                </CardFooter>
            </Card>
            </div>
            <div hidden={fullView}>
                <ViewListingFull />
            </div>
        </div>
        


    );
    
}

export default ViewListing;


