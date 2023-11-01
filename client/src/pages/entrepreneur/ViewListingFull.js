import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter
} from "@material-tailwind/react";
import {
    faArrowLeft, faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import {Header, Button, Input, Checkbox} from "../webcomponent";
import {IconButton} from "@material-tailwind/react";
import {Carousel} from "../webcomponent";
import {Avatar} from "@material-tailwind/react";
import {Progress} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {axiosPrivate} from "../../api/axios";
import StripeCheckout from "react-stripe-checkout";


function ViewListingFull() {

    // Specific user
    const {auth} = useAuth();

    // Getting the listing of the user
    const {get} = useAxiosMethods();
    const [listing, setListing] = useState({});
    const [videoUrl, setVideoUrl] = useState("");
    const [subscriptionStatus, setSubscriptionStatus] = useState({
        remainingDays: null,
        subscriptiontype: null
    });

    useEffect(() => {
        // Get the listing of the user based on the id
        get(`/entrepreneur/getLatestListing/${auth.id}`, setListing);

    }, [])
    // console.log(listing);
    useEffect(() => {
        if(listing.subscriptionType){
            //Get the date from the published date given in 2023-09-15T05:03:42.766+00:00 format
            const publishedDate = new Date(listing.publishedDate);
            console.log("Published date: ", publishedDate);
            //Get the current date
            const currentDate = new Date();
            console.log("Current date: ", currentDate);
            //Get the difference between the two dates. Should consider the date and the month
            // Calculate the time difference in milliseconds
            const timeDifference = currentDate - publishedDate;

            // Calculate the number of milliseconds in a day
            const millisecondsPerDay = 24 * 60 * 60 * 1000;

            // Calculate the number of days between the two dates
            const daysDifference = Math.floor(timeDifference / millisecondsPerDay);
            console.log("Difference: ", daysDifference);
            //Get the days given for the subscription
            const daysGiven = listing.subscriptionType.days;
            console.log("Days given: ", daysGiven);
            //Get the remaining days
            const remainingDays = Math.ceil(daysGiven - daysDifference);
            console.log("Remaining days: ", remainingDays);
            setSubscriptionStatus({
                remainingDays: remainingDays,
                subscriptiontype: listing.subscriptionType.subscriptionName
            })
        }
        console.log(subscriptionStatus);
    }, [listing]);

    useEffect(() => {
        if (listing.pitchingVideo) {
            get(`/entrepreneur/getVideo/${listing.pitchingVideo}`, setVideoUrl, true)
        }
    }, [listing])
    // console.log(videoUrl)

    //Get the listing images
    const [listingImages, setListingImages] = useState([]);
    useEffect(() => {
        get(`/entrepreneur/getListingImages/${listing.listingId}`, setListingImages);
    }, [listing])
    // console.log(listingImages);

    //Assign the images to an array to be used in the carousel
    const images = [];
    listingImages.map((image) => {
        images.push(image);
    }, [listingImages])
    // console.log(images);

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

    const businessStartDate = new Date(listing.businessStartDate);
    // Take the day month and the year only
    const businessStartDateString = businessStartDate.toDateString();


    //Handle listing deletion
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const handleDelete = () => {
        setOpen(false);
        axiosPrivate.post(`/entrepreneur/deleteListing/${listing.listingId}`)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting listing", listing.listingId, error);
                window.location.reload();
            });
    }

    console.log(listing);
    console.log(subscriptionStatus);

    return (
        <div>
            <Header active="Listings">
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
                                    {listing.title}  {listing.status === "DELETED" &&(
                                        <span className="text-red-300 "> (This listing is no longer visible)</span>
                                )}
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

                                {/* Section for the subscription details */}
                                <Typography variant="h5" className="mb-2 text-light-purple mt-5">
                                    Subscription Details
                                </Typography>
                                <div className="flex justify-between items-center">
                                    <Typography variant="h6" color="blue-gray"
                                                className="mb-2 text-main-gray font-bold">
                                        Subscription type
                                    </Typography>
                                </div>
                                <div className="flex justify-between items-center mt-[-1vh]">
                                    <Typography variant="h6" color="blue-gray" className=" text-main-gray font-light">
                                        {subscriptionStatus.subscriptiontype}
                                    </Typography>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Typography variant="h6" color="blue-gray"
                                                className="mb-2 text-main-gray font-bold">
                                        Remaining days
                                    </Typography>
                                </div>
                                <div className="flex justify-between items-center mt-[-1vh]">
                                    {subscriptionStatus.remainingDays > 0 && (
                                        <Typography variant="h6" color="light-green" className="font-light">
                                            {subscriptionStatus.remainingDays} days
                                        </Typography>
                                    )}
                                    {subscriptionStatus.remainingDays<0 && (
                                        <div className="flex flex-row">
                                            <Typography variant="h6" color="red" className="font-light">
                                                Expired by {Math.abs(subscriptionStatus.remainingDays)} days
                                            </Typography>
                                            {/*//Button to renew the subscription*/}
                                            <Button
                                                variant="clear"
                                                label="Top-Up"
                                                className="ml-2 mt-[-1rem]"

                                            >
                                                <Link to={`/entrepreneur/topup/${listing.listingId}`}>Top-Up</Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>


                            </CardBody>
                            <CardFooter className="pt-0 flex justify-center">
                                <Button
                                    variant="clear"
                                    label="Show less"
                                    icon="previous"
                                >
                                    <Link to="/entrepreneur/view-listing">Show less</Link>
                                </Button>
                                <Button
                                    variant="primary"
                                    label="View offerings"
                                    className="ml-2"
                                    icon="next"
                                >
                                    <Link to={`/entrepreneur/view-listingCounterProposal/${listing.listingId}`}>View offerings</Link>
                                </Button>
                                <Button
                                    variant="primary"
                                    label="Finalize Investment"
                                    className="ml-2"
                                    icon="next"
                                >
                                    <Link to={`/entrepreneur/finalize-listing/${listing.listingId}`}>Finalize Investment</Link>
                                </Button>
                                <Button
                                    variant="clear"
                                    label="Delete"
                                    className="ml-2"
                                    onClick={handleOpen}
                                />

                            </CardFooter>
                        </Card>
                    </div>

                </div>
                <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>
                        <Typography variant="h5" color="red" className="flex justify-center">
                            Your attention is needed!
                        </Typography>
                    </DialogHeader>
                    <DialogBody divider className="grid place-items-center gap-4">
                        <Typography className="text-center font-normal">
                            Are you sure that you no longer needs this listing to be published?
                        </Typography>
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                        <Button variant="primary" color="blue-gray" onClick={handleDelete}>
                            Yes I'm sure
                        </Button>
                        <Button variant="clear" onClick={handleOpen}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </Dialog>
            </Header>
        </div>


    );

}

export default ViewListingFull;


