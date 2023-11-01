import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import {Header, Input, Checkbox, StatusPopUp, Button, Carousel} from "../webcomponent";

import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

import {Avatar} from "@material-tailwind/react";
import {Progress} from "@material-tailwind/react";
import {Link, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {useState} from "react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import {axiosPrivate} from "../../api/axios";


function ViewListingFullInvestor() {
    const [showsuccessNotification, setshowsuccessNotification] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [response, setResponse] = useState(null);
    const [response11, setResponse11] = useState(null);
    const {id} = useParams();
    const {get,post} = useAxiosMethods();
    const [listing, setListing] = useState({});
    const [videoUrl, setVideoUrl] = useState("");
    const [disabled, setDisabled] = useState(true);
    const {auth} = useAuth();

    const handleInterested = () => setOpen(!open);
    const submit =() =>{
        setshowsuccessNotification(true);
        setOpen(false);
    }

    useEffect(() => {
        //Get the listing object related to the listingId
        get(`/entrepreneur/getListingFromListingId/${parseInt(id)}`, setListing);
    }, []);

    useEffect(() => {
        if (listing.pitchingVideo) {
            get(`/entrepreneur/getVideo/${listing.pitchingVideo}`, setVideoUrl, true)
        }
    }, [listing])

    //Get the listing images
    const [listingImages, setListingImages] = useState([]);
    useEffect(() => {
        get(`/entrepreneur/getListingImages/${listing.listingId}`, setListingImages);
    }, [listing])

    useEffect(() => {
        axiosPrivate.get(`/entrepreneur/getCompletedInvestment/${listing.listingId}`)
            .then((response) => {
                listing.completedInvestment = response.data;
                return listing;
            })
            .catch((error) => {
                console.error("Error fetching completed investment for listing", listing.listingId, error);
                return listing; // Return the listing even if an error occurs
            });


    }, [listing]);

    useEffect(() => {
        axiosPrivate.get(`/entrepreneur/getInterestedParties/${listing.listingId}`)
            .then((response) => {
                listing.interestedParties = response.data;
                return listing;
            })
            .catch((error) => {
                console.error("Error fetching interested parties for listing", listing.listingId, error);
                return listing; // Return the listing even if an error occurs
            });
    }, [listing]);


    console.log(listing);
    // console.log(listing.interestedParties.length);


    //Assign the images to an array to be used in the carousel
    const images = [];
    listingImages.map((image) => {
        images.push(image);
    }, [listingImages])

    const businessStartDate = new Date(listing.businessStartDate);
    // Take the day month and the year only
    const businessStartDateString = businessStartDate.toDateString();

    var listingId=parseInt(id);
    var investorId=auth.id;

    const [formData, setFormData] = useState({
        amount: "",
        returnEquityPercentage: "",
        returnUnitProfitPercentage: "",
        listingId:{
            listingId:listingId
        },
        investorId:{
            id:investorId
        }
    });

    const formData2 = [];
    formData2[0] = listingId;
    formData2[1] = investorId;
    formData2[2]=listing.returnEquityPercentage;
    formData2[3]=listing.returnUnitProfitPercentage;

    const handleWithCounterOffering = () => {
        post(`/entrepreneur/counterProposal`, formData, setResponse11);
        submit();
    }

    const handleWithoutCounterOffering = () => {
        post(`/entrepreneur/addInterestedListing`, formData2, setResponse);
        submit();
    }

    const[validateFormData,setValidateFormData]=useState({
        amount: {"State": "", "Message": ""},
        returnEquityPercentage: {"State": "", "Message": ""},
        returnUnitProfitPercentage: {"State": "", "Message": ""},
    });

    useEffect(() => {
            if(formData.amount){
                if(formData.returnEquityPercentage || formData.returnUnitProfitPercentage){
                    setDisabled(false);
                }
            }else{
                setDisabled(true);
            }
        }
        ,[formData]);

    // Convert the listing object to an array
    const listingArray = Object.values(listing);

    return (
        <div>
            <Header>
                <div className="h-auto min-h-[100vh] flex justify-center items-center">
                    <div>
                        <Card className="mt-[-3rem]">
                            <CardHeader className="relative h-300 mt-5 ">
                                <div className="relative h-0" style={{paddingBottom: '56.25%'}}>
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src={videoUrl}
                                        title="Video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>

                            </CardHeader>
                            <CardBody>
                                <Typography variant="h5" className="mb-2 text-main-purple">
                                    {listing.title}
                                </Typography>
                                <Typography>
                                    {listing.description}
                                </Typography>

                                {/* Business name */}
                                <Typography variant="h6" color="blue-gray" className="mb-2 mt-2">
                                    {listing && listing.entrepreneurId && (
                                        <p>Business Name: {listing.entrepreneurId.businessName}</p>
                                    )}
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
                                            Rs. {listing.expectedAmount}
                                        </Typography>
                                        <Typography variant="h6" className="mb-2 text-black">
                                            {listing.returnEquityPercentage}%
                                        </Typography>
                                        <Typography variant="h6" className="mb-2 text-black">
                                            {listing.returnUnitProfitPercentage}% per unit
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
                                            {Math.floor(listing.completedInvestment*100/listing.expectedAmount)}%
                                        </Typography>
                                    </div>
                                    <Progress value={Math.floor(listing.completedInvestment*100/listing.expectedAmount)} color="purple"/>
                                </div>
                                <Typography variant="h6" className="mb-2 text-main-gray mt-4">
                                    Interested
                                </Typography>
                                {/* Div to show the images of interested parties images*/}
                                <div className="flex items-center -space-x-4 mt-2">
                                    {listing.interestedParties && listing.interestedParties.map((interestedParty) => (
                                        <Avatar
                                            variant="circular"
                                            alt="user 1"
                                            className="border-2 border-white hover:z-10 focus:z-10"
                                            src={`data:application/img;base64,${interestedParty}`}
                                            title="Mr. Nimal Fernando"
                                        />
                                    ))}
                                    {
                                        listing.interestedParties && listing.interestedParties.length === 0 && (
                                            <Typography variant="h7" className="mb-2 text-main-gray mt-4">
                                                No interested parties yet
                                            </Typography>
                                        )
                                    }
                                </div>
                                <Typography variant="h5" className="mb-2 text-light-purple mt-4">
                                    Business / Product images
                                </Typography>

                                {/* Section to show the images (Corousel) */}
                                <div className="flex justify-center items-center mt-4">
                                    <Carousel
                                        navigationActive="main-purple"
                                        navigationInactive="light-purple"
                                        prevArrow={({ handlePrev }) => (
                                            <FontAwesomeIcon icon={faArrowLeft} size="2xl" onClick={handlePrev} className="!absolute top-2/4 left-4 -translate-y-2/4 text-main-purple"/>
                                        )}
                                        nextArrow={({ handleNext }) => (
                                            <FontAwesomeIcon icon={faArrowRight} size="2xl" onClick={handleNext} className="!absolute top-2/4 right-4 -translate-y-2/4 text-main-purple"/>
                                        )}
                                    >
                                        {
                                            listingImages.map((image) => (
                                                    <img
                                                        // Convert the image to a blob
                                                        src={`data:application/img;base64,${image}`}
                                                        alt="1"
                                                        className="h-96 w-96 object-fill ml-[4rem] border-2"
                                                        style={{maxHeight: '100%', maxWidth: '100%'}}
                                                    />
                                                )
                                            )
                                        }
                                        {/*/>*/}
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
                                        {listing.intention}
                                    </Typography>
                                </div>

                                <div className="row mt-2"
                                     style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px'}}>
                                    <div>
                                        <Typography variant="h6" color="blue-gray"
                                                    className="mb-2 text-main-gray font-bold">
                                            <span>Business start date : </span><span
                                            className="font-light">{businessStartDateString}</span>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="h6" color="blue-gray"
                                                    className="mb-2 text-main-gray font-bold">
                                            <span>Business duration : </span><span
                                            className="font-light">{listing.businessDuration} years</span>
                                        </Typography>
                                    </div>
                                </div>

                                <div className="row mt-[-8px]">
                                    <div>
                                        <Typography variant="h6" color="blue-gray"
                                                    className="mb-2 text-main-gray font-bold">
                                            <span>Lifetime sales :      </span><span
                                            className="font-light">Rs. {listing.lifetimeSales}</span>
                                        </Typography>
                                    </div>
                                </div>
                                <div className="row mt-[-8px]">
                                    <div>
                                        <Typography variant="h6" color="blue-gray"
                                                    className="mb-2 text-main-gray font-bold">
                                            <span>Stage of business :      </span><span
                                            className="font-light">{listing.stage}</span>
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
                                            <span>Gross income : </span><span
                                            className="font-light">Rs. {listing.lastYearGrossIncome}</span>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="h6" color="blue-gray"
                                                    className="mb-2 text-main-gray font-bold">
                                            <span>Net income : </span><span
                                            className="font-light">Rs. {listing.lastYearNetIncome}</span>
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
                                            <span>For this year : </span><span
                                            className="font-light">Rs. {listing.salesProjectionThisYear}</span>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="h6" color="blue-gray"
                                                    className="mb-2 text-main-gray font-bold">
                                            <span>For next year : </span><span
                                            className="font-light">Rs. {listing.salesProjectionNextYear}</span>
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
                                        {listing.projectionMethod}
                                    </Typography>
                                </div>
                                {/* Section for the previous attempts */}
                                <Typography variant="h5" className="mb-2 text-light-purple mt-5">
                                    Attempts to grow the business
                                </Typography>
                                <div className="flex justify-between items-center">
                                    <Typography variant="h6" color="blue-gray"
                                                className="mb-2 text-main-gray font-bold">
                                        Previous funding attempts
                                    </Typography>
                                </div>
                                <div className="flex justify-between items-center mt-[-1vh]">
                                    <Typography variant="h6" color="blue-gray" className=" text-main-gray font-light">
                                        {listing.outsideSourceDescription}
                                    </Typography>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Typography variant="h6" color="blue-gray"
                                                className="mb-2 text-main-gray font-bold">
                                        Previous attempts to grow business
                                    </Typography>
                                </div>
                                <div className="flex justify-between items-center mt-[-1vh]">
                                    <Typography variant="h6" color="blue-gray" className=" text-main-gray font-light">
                                        {listing.attemptsToGrow}
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
                                        {listing.uniqueSellingProposition}
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
                                        {listing.awards}
                                    </Typography>
                                </div>


                            </CardBody>
                            <CardFooter className="pt-0 flex justify-center">
                                <Button
                                    variant="clear"
                                    label="Show less"
                                    icon="previous"
                                >
                                    <Link to="/investor/view-listing">Show less</Link>
                                </Button>
                                <Button
                                    variant="primary"
                                    className="ml-2"
                                    onClick={handleInterested}
                                    label="Mark as interested"
                                />
                            </CardFooter>
                        </Card>
                    </div>

                </div>
                <Dialog
                    open={open}
                    handler={handleInterested}
                    animate={{
                        mount: {scale: 1, y: 0},
                        unmount: {scale: 0.9, y: -100},
                    }}
                >
                    <DialogHeader className="text-main-purple justify-center">Add a counter-offering
                        <img src="/assets/images/handshake.png" alt="counter-offer" className="ml-2" />
                    </DialogHeader>
                    <DialogBody className="justify-center">
                        <Card className="w-500 shadow-lg p-6 border-2 border-main-purple">
                            <label htmlFor="seek" className="text-main-gray block mb-2 text-[14px]">
                                I'll offer (Rs) :
                            </label>
                            <Input
                                type="text"
                                id="seek"
                                className="w-full"
                                required={true}
                                value={formData.amount}
                                onChange={(event) =>
                                    setFormData({...formData, amount: event.target.value})
                                }
                            />
                            <label htmlFor="seek" className="text-main-gray block mb-2 mt-5 text-[14px]">
                                And willing to take up (Should select at least one option) :

                            </label>
                            <div className="flex items-center mb-3">
                                <Input
                                    type="text"
                                    id="equityinput"
                                    className="w-full mr-2"
                                    value={formData.returnEquityPercentage}
                                    onChange={(event) =>
                                        setFormData({...formData, returnEquityPercentage: event.target.value})
                                    }
                                />
                                <Checkbox
                                    label="On Equity"
                                    name="equitybox"
                                    id="equity"
                                />
                            </div>
                            <div className="flex items-center">
                                <Input
                                    type="text"
                                    id="profitinput"
                                    className="w-full mr-2"
                                    value={formData.returnUnitProfitPercentage}
                                    onChange={(event) =>
                                        setFormData({...formData, returnUnitProfitPercentage: event.target.value})
                                    }
                                />
                                <Checkbox
                                    label="Profit per unit"
                                    name="profitunit"
                                    id="profitunitpercentage"
                                />
                            </div>
                        </Card>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="clear"
                            color="red"
                            onClick={handleWithoutCounterOffering}
                            className="mr-1"
                        >
                            <span>Continue without counter-offering</span>
                        </Button>
                        <Button
                            variant="primary"
                            color="green"
                            onClick={handleWithCounterOffering}
                            disabled={disabled}
                        >
                            <span>Continue</span>
                        </Button>

                    </DialogFooter>
                </Dialog>
            </Header>
            <div>
                {showsuccessNotification && (
                    <StatusPopUp
                        successTitle="Counter proposal added successfully!"
                        successMessage="You can contact the entrepreneur directly to discuss further."
                        redirectUrl="/investor/view-listing"
                    />
                )}
            </div>
        </div>



    );

}

export default ViewListingFullInvestor;


