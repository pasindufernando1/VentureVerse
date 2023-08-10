import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import {Header} from "../webcomponent";


import CustomButton from "../webcomponent/CustomButton";
import {Carousel, IconButton} from "@material-tailwind/react";
import {Avatar} from "@material-tailwind/react";
import {Progress} from "@material-tailwind/react";
import {Link} from "react-router-dom";


function ViewListingFull() {

    return (
        <div>
            <Header active="Listing">
                <div className="h-auto min-h-[100vh] flex justify-center items-center">
                    <div>
                        <Card className="mt-[-3rem]">
                            <CardHeader className="relative h-300 mt-5 ">
                                <video className="h-full w-full rounded-lg" controls autoPlay muted>
                                    <source src="/assets/videos/video.mp4" type="video/mp4"/>
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
                                    night life in Barcelona.The place is close to Barceloneta Beach and bus stop just 2
                                    min by
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
                                {/* Section for the required amount, equity return and profit per unit return */}
                                <div className="flex justify-between items-center mt-4">

                                    <div className="flex flex-col">
                                        <Typography variant="h6" color="blue-gray" className="mb-2 text-main-gray">
                                            Required Amount
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2 text-main-gray">
                                            Equity Return
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2 text-main-gray">
                                            Profit per Unit Return
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col">
                                        <Typography variant="h6" className="mb-2 text-black">
                                            $100,000
                                        </Typography>
                                        <Typography variant="h6" className="mb-2 text-black">
                                            10%
                                        </Typography>
                                        <Typography variant="h6" className="mb-2 text-black">
                                            $10
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
                                <Typography variant="h5" className="mb-2 text-light-purple mt-4">
                                    Business / Product images
                                </Typography>

                                {/* Section to show the images (Corousel) */}
                                <div className="flex justify-center items-center mt-4">
                                    <Carousel
                                        className="rounded-xl"
                                        prevArrow={({handlePrev}) => (
                                            <IconButton
                                                variant="text"
                                                color="white"
                                                size="lg"
                                                onClick={handlePrev}
                                                className="!absolute top-2/4 left-4 -translate-y-2/4"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                                    />
                                                </svg>
                                            </IconButton>
                                        )}
                                        nextArrow={({handleNext}) => (
                                            <IconButton
                                                variant="text"
                                                color="white"
                                                size="lg"
                                                onClick={handleNext}
                                                className="!absolute top-2/4 !right-4 -translate-y-2/4"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                                    />
                                                </svg>
                                            </IconButton>
                                        )}
                                    >

                                        <img
                                            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                                            alt="2"
                                            className="h-full w-full object-cover"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                                            alt="3"
                                            className="h-full w-full object-cover"
                                        />
                                    </Carousel>
                                </div>
                                {/* Section for the business details */}
                                <Typography variant="h5" className="mb-2 text-light-purple mt-10">
                                    Business Details
                                </Typography>

                                <div className="flex justify-between items-center mt-5">
                                    <Typography variant="h6" color="blue-gray"
                                                className="mb-2 text-main-gray font-bold">
                                        Plans with the intended fund
                                    </Typography>
                                </div>
                                <div className="flex justify-between items-center mt-[-1vh]">
                                    <Typography variant="h6" color="blue-gray" className=" text-main-gray font-light">
                                        Used for building a warehouse. The goal was to do somthing else. Hello Hello...
                                    </Typography>
                                </div>

                                <div className="row mt-2"
                                     style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px'}}>
                                    <div>
                                        <Typography variant="h6" color="blue-gray"
                                                    className="mb-2 text-main-gray font-bold">
                                            <span>Business start date : </span><span
                                            className="font-light">2022-01-01</span>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="h6" color="blue-gray"
                                                    className="mb-2 text-main-gray font-bold">
                                            <span>Business duration : </span><span className="font-light">5 years</span>
                                        </Typography>
                                    </div>
                                </div>

                                <div className="row mt-[-8px]">
                                    <div>
                                        <Typography variant="h6" color="blue-gray"
                                                    className="mb-2 text-main-gray font-bold">
                                            <span>Lifetime sales :      </span><span
                                            className="font-light">Rs. 5000000</span>
                                        </Typography>
                                    </div>
                                </div>
                                <div className="row mt-[-8px]">
                                    <div>
                                        <Typography variant="h6" color="blue-gray"
                                                    className="mb-2 text-main-gray font-bold">
                                            <span>Stage of business :      </span><span className="font-light">Online selling</span>
                                        </Typography>
                                    </div>
                                </div>

                                {/* Section for the last year stats */}
                                <Typography variant="h5" className="mb-2 text-light-purple">
                                    Last Year Earnings
                                </Typography>
                                <div className="row mt-2"
                                     style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px'}}>
                                    <div>
                                        <Typography variant="h6" color="blue-gray"
                                                    className="mb-2 text-main-gray font-bold">
                                            <span>Gross income : </span><span className="font-light">Rs. 100000</span>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="h6" color="blue-gray"
                                                    className="mb-2 text-main-gray font-bold">
                                            <span>Net income : </span><span className="font-light">Rs. 100000</span>
                                        </Typography>
                                    </div>
                                </div>

                                {/* Section for the sales projections */}
                                <Typography variant="h5" className="mb-2 text-light-purple">
                                    Sales projections
                                </Typography>
                                <div className="row mt-2"
                                     style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px'}}>
                                    <div>
                                        <Typography variant="h6" color="blue-gray"
                                                    className="mb-2 text-main-gray font-bold">
                                            <span>For this year : </span><span className="font-light">Rs. 100000</span>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="h6" color="blue-gray"
                                                    className="mb-2 text-main-gray font-bold">
                                            <span>For next year : </span><span className="font-light">Rs. 100000</span>
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-[-1vh]">
                                    <Typography variant="h6" color="blue-gray"
                                                className="mb-2 text-main-gray font-bold">
                                        How the projections are made
                                    </Typography>
                                </div>
                                <div className="flex justify-between items-center mt-[-1vh]">
                                    <Typography variant="h6" color="blue-gray" className=" text-main-gray font-light">
                                        Used for building a warehouse. The goal was to do somthing else. Hello Hello...
                                    </Typography>
                                </div>
                                {/* Section for the previous attempts */}
                                <Typography variant="h5" className="mb-2 text-light-purple mt-5">
                                    Attempts to grow the business
                                </Typography>
                                <div className="flex justify-between items-center">
                                    <Typography variant="h6" color="blue-gray"
                                                className="mb-2 text-main-gray font-bold">
                                        How the projections are made
                                    </Typography>
                                </div>
                                <div className="flex justify-between items-center mt-[-1vh]">
                                    <Typography variant="h6" color="blue-gray" className=" text-main-gray font-light">
                                        Used for building a warehouse. The goal was to do somthing else. Hello Hello...
                                    </Typography>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Typography variant="h6" color="blue-gray"
                                                className="mb-2 text-main-gray font-bold">
                                        Previous attempts to raise funds
                                    </Typography>
                                </div>
                                <div className="flex justify-between items-center mt-[-1vh]">
                                    <Typography variant="h6" color="blue-gray" className=" text-main-gray font-light">
                                        None
                                    </Typography>
                                </div>

                                {/* Section for the highlights */}
                                <Typography variant="h5" className="mb-2 text-light-purple mt-5">
                                    Highlights
                                </Typography>
                                <div className="flex justify-between items-center">
                                    <Typography variant="h6" color="blue-gray"
                                                className="mb-2 text-main-gray font-bold">
                                        Unique selling proposition and hook
                                    </Typography>
                                </div>
                                <div className="flex justify-between items-center mt-[-1vh]">
                                    <Typography variant="h6" color="blue-gray" className=" text-main-gray font-light">
                                        No 1 business in the world
                                    </Typography>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Typography variant="h6" color="blue-gray"
                                                className="mb-2 text-main-gray font-bold">
                                        Awards received
                                    </Typography>
                                </div>
                                <div className="flex justify-between items-center mt-[-1vh]">
                                    <Typography variant="h6" color="blue-gray" className=" text-main-gray font-light">
                                        None
                                    </Typography>
                                </div>


                            </CardBody>
                            <CardFooter className="pt-0 flex justify-center">
                                <CustomButton
                                    variant="clear"
                                    label="Show less"
                                    icon="previous"
                                >
                                    <Link to="/entrepreneur/view-listing">Show less</Link>
                                </CustomButton>
                                <CustomButton
                                    variant="primary"
                                    label="View offerings"
                                    className="ml-2"
                                    icon="next"
                                >
                                    <Link to="/entrepreneur/view-listingCounterProposal">View offerings</Link>
                                </CustomButton>
                            </CardFooter>
                        </Card>
                    </div>

                </div>
            </Header>
        </div>


    );

}

export default ViewListingFull;


