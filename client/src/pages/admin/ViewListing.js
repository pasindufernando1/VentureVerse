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
import {axiosPrivate} from "../../api/axios";
import axios from "../../api/axios";


function ViewListingInvestor() {

    // Get request to get the listing details
    const {get} = useAxiosMethods();
    const [listing, setListing] = useState({});
    const [printingcards, setPrintingcards] = useState([]);
    const [thumbnail, setThumbnail] = useState({});

    useEffect(() => {
        get("/entrepreneur/getAllFinalizedListings", (listingsData) =>{

            //Create an array of promises for getting thumbnails for each listing
            const thumbnailPromises = listingsData.map((listing) => {
                return axiosPrivate.get(`/entrepreneur/getThumbnail/${listing.thumbnail}`)
                    .then((response) => {
                        listing.thumbnail = response.data;
                        return listing;
                    })
                    .catch((error) => {
                        console.error("Error fetching thumbnail for listing", listing.listingId, error);
                        return listing; // Return the listing even if an error occurs
                    });
            });

            // Wait for all thumbnail requests to complete
            Promise.all(thumbnailPromises)
                .then((listingsWithThumbnails) => {
                    // Now you have an array of listings with thumbnails
                    setListing(listingsWithThumbnails);
                })
                .catch((error) => {
                    console.error("Error fetching thumbnails for listings:", error);
                });

            const completedInvestmentPromises = listingsData.map((listing) => {
                return axiosPrivate.get(`/entrepreneur/getCompletedInvestment/${listing.listingId}`)
                    .then((response) => {
                        listing.completedInvestment = response.data;
                        return listing;
                    })
                    .catch((error) => {
                        console.error("Error fetching completed investment for listing", listing.listingId, error);
                        return listing; // Return the listing even if an error occurs
                    });
            });

            // Wait for all completed investment requests to complete
            Promise.all(completedInvestmentPromises)
                .then((listingsWithCompletedInvestment) => {
                    // Now you have an array of listings with completed investments
                    setListing(listingsWithCompletedInvestment);
                })
                .catch((error) => {
                    console.error("Error fetching completed investments for listings:", error);
                });
        });
    }, []);

    const [listingSet, setListingSet] = useState([]);
    useEffect(() => {
        setListingSet(Object.values(listing));
    }, [listing]);

    console.log(listingSet);



    useEffect(() => {
        const listingPrint = listingSet.map((listing) => ({
            listingid: listing.listingId,
            businessName: listing.entrepreneurId.businessName,
            pitchVideo: listing.pitchingVideo,
            thumbnail: listing.thumbnail,
            expectedAmount: listing.expectedAmount,
            equityReturn: listing.returnEquityPercentage,
            profitPerUnitReturn: listing.returnUnitProfitPercentage,
            completedInvestment: Math.floor((listing.completedInvestment/listing.expectedAmount)*100),

        }));
        setPrintingcards(listingPrint);
    }, [listingSet]);

    //Handling hover playing of videos

    const [listingVideoUrl, setListingVideoUrl] = useState({
        video: null,
        index: null
    });
    const handleMouseEnter = (index,video) => {

        const getVideo = async (video) => {

            try {
                let response = await axios.get(`/auth/home/${video}`,
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true,
                        responseType: 'blob',
                    }
                );
                setListingVideoUrl({
                    video: URL.createObjectURL(response.data),
                    index: index
                })

            } catch (error) {
                console.log(error);
            }

        }

        getVideo(video).then();
    }
    const handleMouseLeave = () => {
        setListingVideoUrl({
            video: null,
            index: null
        })
    }









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

    let counter= 0;

    return (

        <Header active="Listings">
            <div className="flex flex-row">
                <div className="h-auto min-h-[100vh] flex flex-wrap gap-8 mt-[-2rem]">
                    {printingcards.map((card,index) => (

                        <Card className="w-96 mt-2" key={index}>
                            <CardHeader className="relative h-56 mt-5 w-50">
                                {/*<div className="relative h-full"*/}
                                {/*      onMouseEnter={() => handleMouseEnter(card.pitchVideo)}*/}
                                {/*      onMouseLeave={handleMouseLeave}>*/}
                                <div className="relative h-full"
                                     onMouseEnter={() => handleMouseEnter(index, card.pitchVideo)}
                                     onMouseLeave={handleMouseLeave}
                                >
                                    {listingVideoUrl.index===index ? (

                                        <iframe
                                            className="absolute inset-0 w-full h-full"
                                            src={listingVideoUrl.video}
                                            title="Video player"
                                            autoplay={true}
                                            muted="true"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>

                                    ) : (

                                        <img
                                            src={`data:application/img;base64,${card.thumbnail}`}
                                            alt="thumbnail"
                                            className="h-full w-full object-cover"
                                            style={{maxHeight: '100%', maxWidth: '100%'}}
                                        />
                                    )}
                                </div>
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
                                            Rs. {card.expectedAmount}
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            {card.equityReturn}%
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            {card.profitPerUnitReturn}
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
                                            {card.completedInvestment}%
                                        </Typography>
                                    </div>
                                    <Progress value={card.completedInvestment} color="purple"/>
                                </div>
                                {/* Business name */}
                                <Typography variant="h6" color="blue-gray" className="mb-2 mt-2 text-center ">
                                    Posted by : {card.businessName}
                                </Typography>

                                {/*Section to show more details*/}

                            </CardBody>
                            <CardFooter className="pt-0 flex justify-center">
                                <Button
                                    variant="primary"
                                    label="Show more"
                                    icon="next"
                                >
                                    <Link to={`/admin/view-finalizedOffering/${card.listingid}`}>View Finalization</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

            </div>

        </Header>


    )
        ;

}

export default ViewListingInvestor;