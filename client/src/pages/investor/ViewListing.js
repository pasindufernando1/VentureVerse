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


function ViewListing() {

    // Get request to get the listing details
    const {get} = useAxiosMethods();
    const [listings, setListing] = useState({});
    const [listingsectors, setListingsectors] = useState({});
    const [printingcards, setPrintingcards] = useState([]);
    const [filteredPrintingcards, setFilteredPrintingcards] = useState([]);
    const [thumbnail, setThumbnail] = useState({});
    const [interestedparty, setInterestedparty] = useState({});

    // Filter handling
    const [categoryFilters, setCategoryFilters] = useState([]);
    const [statusFilters, setStatusFilters] = useState([]);
    const [lowerLimit, setLowerLimit] = useState(0);
    // Set upper limit to infinity
    const [upperLimit, setUpperLimit] = useState(Infinity);


    // Get the listings
    useEffect(() => {
        // Get all the listings
        get("/entrepreneur/getAllListings", (listingsData) => {

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


            // Create an array of promises for getting sectors for each listing
            const sectorPromises = listingsData.map((listing) => {
                return axiosPrivate.get(`/entrepreneur/getListingSectors/${listing.listingId}`)
                    .then((response) => {
                        listing.sectors = response.data;
                        return listing;
                    })
                    .catch((error) => {
                        console.error("Error fetching sectors for listing", listing.listingId, error);
                        return listing; // Return the listing even if an error occurs
                    });
            });

            // Wait for all sector requests to complete
            Promise.all(sectorPromises)
                .then((listingsWithSectors) => {
                    // Now you have an array of listings with sectors
                    setListing(listingsWithSectors);
                })
                .catch((error) => {
                    console.error("Error fetching sectors for listings:", error);
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

            const interestedPartiesPromises = listingsData.map((listing) => {
                return axiosPrivate.get(`/entrepreneur/getInterestedParties/${listing.listingId}`)
                    .then((response) => {
                        listing.interestedParties = response.data;
                        return listing;
                    })
                    .catch((error) => {
                        console.error("Error fetching interested parties for listing", listing.listingId, error);
                        return listing; // Return the listing even if an error occurs
                    });
            });

            // Wait for all interested parties requests to complete
            Promise.all(interestedPartiesPromises)
                .then((listingsWithInterestedParties) => {
                    // Now you have an array of listings with interested parties
                    setListing(listingsWithInterestedParties);
                }
                )
                .catch((error) => {
                    console.error("Error fetching interested parties for listings:", error);
                });

        });
    }, []);
    //Convert the listing object to an array
    const [listingSet, setListingSet] = useState([]);
    useEffect(() => {
        setListingSet(Object.values(listings));
    }, [listings]);

    useEffect(() => {
        const listingPrint = listingSet.map((listing) => ({
            listingid: listing.listingId,
            businessName: listing.entrepreneurId.businessName,
            expectedAmount: listing.expectedAmount,
            equityReturn: listing.returnEquityPercentage,
            profitPerUnitReturn: listing.returnUnitProfitPercentage,
            pitchVideo: listing.pitchingVideo,
            thumbnail: listing.thumbnail,
            listingsectors: listing.sectors,
            stage: listing.stage,
            completedInvestment: Math.floor((listing.completedInvestment/listing.expectedAmount)*100),
            interestedParties: listing.interestedParties,

        }));
        setPrintingcards(listingPrint);
        setFilteredPrintingcards(listingPrint);
    }, [listingSet]);



    // Create an array including the thumbnails of the listings
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const thumbnails = [];
    //
    // useEffect(() => {
    //     for(let i = 0; i < listings.length; i++) {
    //         thumbnails.push(listings[i].thumbnail);
    //     }
    // }, [listings]);
    //
    //
    // //Make a get request to get the thumbnail of the listings passing thumbnails list as a request parameter
    // useEffect(() => {
    //     if(thumbnails.length === listings.length){
    //         get(`/entrepreneur/getThumbnails/${thumbnails}`, setThumbnail);
    //     }
    // }, [thumbnails]);

    //Get the videoURLs of the listings using an API call and store them in an array
    const [videoURLs, setVideoURLs] = useState([]);
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


    //Handle the category filters
    const handleCategoryFilter = (category) => {
        if (categoryFilters.includes(category)) {
            setCategoryFilters(categoryFilters.filter((cat) => cat !== category));
        } else {
            setCategoryFilters([...categoryFilters, category]);
        }
    }

    //Handle the status filters
    const handleStatusFilter = (status) => {
        if (statusFilters.includes(status)) {
            setStatusFilters(statusFilters.filter((stat) => stat !== status));
        } else {
            setStatusFilters([...statusFilters, status]);
        }
    }

    //Handle the investment limit
    const handleLowerLimit = (lowerlimit) => {
        if (lowerlimit === "") {
            setLowerLimit(0);
        }
        else {
            setLowerLimit(lowerlimit);
        }
    }
    const handleUpperLimit = (upperlimit) => {
        if(upperlimit === ""){
            setUpperLimit(Infinity);
        }
        else {
            setUpperLimit(upperlimit);
        }

    }

    // Handle the filtering
    const handleFilter = () => {
        // Filter the listings
        const filteredListings = printingcards
            .filter((card) => {
                // Apply your category and status filters here
                return (
                    (!categoryFilters.length || card.listingsectors.some(sector => categoryFilters.includes(sector))) &&
                    (!statusFilters.length || statusFilters.includes(card.stage)) &&
                    (card.expectedAmount <= upperLimit && card.expectedAmount >= lowerLimit)
                );
            });
        // Update state with the filtered listings
        setFilteredPrintingcards(filteredListings);
    }

    //Function to revert the filters
    const revertFilter = () => {
        setFilteredPrintingcards(printingcards);
    }

    return (
            <Header active="Listing">
                <div className="flex flex-row">
                    {/*Section for the cards*/}
                    <div className="h-auto min-h-[100vh] flex flex-wrap gap-8 mt-[-2rem] cards-section">
                        {filteredPrintingcards.map((card,index) => (
                            <Card className="w-96 mt-2" key={index}>
                                <CardHeader className="relative h-56 mt-5 w-50">
                                        <div className="relative h-full"
                                             onMouseEnter={() => handleMouseEnter(index, card.pitchVideo)}
                                             onMouseLeave={handleMouseLeave}
                                        >
                                            {listingVideoUrl.index===index ? (

                                                <iframe
                                                    className="absolute inset-0 w-full h-full"
                                                    src={listingVideoUrl.video}
                                                    title="Video player"
                                                    autoPlay={true}
                                                    muted
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
                                    <Typography variant="h6" className="mb-2 text-main-gray mt-4">
                                        Interested
                                    </Typography>
                                    {/* Div to show the images of interested parties images*/}
                                    <div className="flex items-center -space-x-4 mt-2">
                                        {card.interestedParties && card.interestedParties.map((interestedParty) => (
                                            <Avatar
                                                variant="circular"
                                                alt="user 1"
                                                className="border-2 border-white hover:z-10 focus:z-10"
                                                src={`data:application/img;base64,${interestedParty}`}
                                                title="Mr. Nimal Fernando"
                                            />
                                        ))}
                                        { card.interestedParties && card.interestedParties.length === 0 &&(
                                            <Typography variant="h6" color="blue-gray" className="mb-2 mt-2 text-center ">
                                                No interested parties yet
                                            </Typography>
                                        )}
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
                                        <Link to={`/investor/view-listingfull/${card.listingid}`}>Show more</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* Section for the filtering */}
                    <div className="mr-[-3rem] filter-section scroll-auto">
                        <Card
                            className={`transition-all duration-500  w-full flex items-center max-h-full p-4 shadow-xl shadow-blue-gray-900/5 rounded-none border-[1px] mt-[-3vh]`}>

                            <div className={`flex flex-col justify-between w-[15rem] h-full`}>
                                <Typography variant="h6" className="mb-2 text-black font-extrabold	">
                                    Filter By Category
                                </Typography>
                                <div className="flex flex-col space-y-[-1rem]">
                                    <Checkbox
                                        label="Food and Bevarages"
                                        name="Food and Bevarages"
                                        onChange={() => handleCategoryFilter("Food and Bevarages")}
                                    />
                                    <Checkbox
                                        label="Technology"
                                        name="Technology"
                                        onChange={() => handleCategoryFilter("Technology")}
                                    />
                                    <Checkbox
                                        label="App/Website"
                                        name="App/Website"
                                        onChange={() => handleCategoryFilter("App/Website")}
                                    />
                                    <Checkbox
                                        label="Fitness"
                                        name="Fitness"
                                        onChange={() => handleCategoryFilter("Fitness")}
                                    />
                                    <Checkbox
                                        label="Health / Wellness / Nutrition"
                                        name="Health / Wellness / Nutrition"
                                        onChange={() => handleCategoryFilter("Health/Wellness/Nutrition")}
                                    />
                                    <Checkbox
                                        label="Sports"
                                        name="Sports"
                                        onChange={() => handleCategoryFilter("Sports")}
                                    />
                                    <Checkbox
                                        label="Beauty"
                                        name="Beauty"
                                        onChange={() => handleCategoryFilter("Beauty")}
                                    />
                                    <Checkbox
                                        label="Clothing / Fashion"
                                        name="Clothing / Fashion"
                                        onChange={() => handleCategoryFilter("Clothing/Fashion")}
                                    />
                                    <Checkbox
                                        label="Toys / Games"
                                        name="Toys / Games"
                                        onChange={() => handleCategoryFilter("Toys/Games")}
                                    />
                                    <Checkbox
                                        label="Entertainment / Experiential"
                                        name="Entertainment / Experiential"
                                        onChange={() => handleCategoryFilter("Entertainment/Experiential")}
                                    />
                                    <Checkbox
                                        label="Pets"
                                        name="Pets"
                                        onChange={() => handleCategoryFilter("Pets")}
                                    />
                                    <Checkbox
                                        label="Music"
                                        name="Music"
                                        onChange={() => handleCategoryFilter("Music")}
                                    />
                                    <Checkbox
                                        label="Holiday"
                                        name="Holiday"
                                        onChange={() => handleCategoryFilter("Holiday")}
                                    />
                                    <Checkbox
                                        label="Children"
                                        name="Children"
                                        onChange={() => handleCategoryFilter("Children")}
                                    />
                                    <Checkbox
                                        label="Housewares / Home Design"
                                        name="Housewares / Home Design"
                                        onChange={() => handleCategoryFilter("Housewares/Home Design")}
                                    />
                                </div>
                            </div>
                            <div className={`flex flex-col justify-between w-[15rem] h-full`}>
                                <Typography variant="h6" className="mb-2 text-black font-extrabold	">
                                    Filter By Business/Product Status
                                </Typography>
                                <div className="flex flex-col space-y-[-1rem]">
                                    <Checkbox
                                        label="Shopping Live"
                                        name="Shopping Live"
                                        onChange={() => handleStatusFilter("Shopping Live")}
                                    />
                                    <Checkbox
                                        label="Revenue"
                                        name="Revenue"
                                        onChange={() => handleStatusFilter("Revenue")}
                                    />
                                    <Checkbox
                                        label="Expansion"
                                        name="Expansion"
                                        onChange={() => handleStatusFilter("Expansion")}
                                    />

                                </div>
                            </div>
                            <div className={`flex flex-col justify-between w-[15rem] h-full`}>
                                <Typography variant="h6" className="mb-2 text-black font-extrabold	">
                                    Filter By Pricing
                                </Typography>
                                <label htmlFor="last-name" className="text-main-gray block mb-2 text-[14px] ">
                                    Minimum investment amount
                                </label>
                                <Input
                                    type="number"
                                    name="lowerlimit"
                                    onChange={(e) => handleLowerLimit(e.target.value)}
                                />
                                <label htmlFor="last-name" className="text-main-gray block mb-2 text-[14px] ">
                                    Maximum investment amount
                                </label>
                                <Input
                                    type="number"
                                    name="upperlimit"
                                    onChange={(e) => handleUpperLimit(e.target.value)}
                                />


                            </div>
                            <div className={`flex flex-col justify-between w-[15rem] h-full mt-2`}>
                            <Button variant="primary" label="Filter" onClick={handleFilter}/>
                            <Button variant="clear" label="Clear filters" className="mt-3 mb-4" onClick={revertFilter}/>
                            </div>
                        </Card>
                    </div>
                </div>


            </Header>


    )
        ;

}

export default ViewListing;


