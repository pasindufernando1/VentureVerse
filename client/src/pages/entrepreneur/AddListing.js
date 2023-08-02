import {Card} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import {Button, Checkbox, CommonNavbar, Input, Radio, Textarea} from "../webcomponent";
import StripeCheckout from 'react-stripe-checkout';
import useAxiosMethods from "../../hooks/useAxiosMethods";

// Regular expressions to validate the inputs
// Integers only regex
const integerRegex = /^[0-9]*$/;

function AddListing() {

    const {post} = useAxiosMethods();
    const [res, setRes] = useState("")

    // Section Handling
    const [currentSection, setCurrentSection] = useState(1);
    const [previouseSection, setPrevSection] = useState(0);

    const handleNext = () => {
        setCurrentSection(currentSection + 1);
        setPrevSection(previouseSection + 1);
    }

    const handlePrevious = () => {
        setCurrentSection(currentSection - 1);
        setPrevSection(previouseSection - 1);
    }

    // Hooks to handle the inputs
    const [intention, setIntention] = useState("");
    const [businessStartDate, setStartDate] = useState("");
    const [businessDuration, setHowLong] = useState("");
    const [lifetimeSales, setLifeTimeSales] = useState("");
    const [lastYearGrossIncome, setGrossIncome] = useState("");
    const [lastYearNetIncome, setNetIncome] = useState("");
    const [salesProjectionThisYear, setThisSales] = useState("");
    const [salesProjectionNextYear, setNextSales] = useState("");
    const [projectionMethod, setProjectionLogic] = useState("");
    const [outsideSources, setOutsideSource] = useState("");
    const handleOutsideSourceChange = (event) => {
        setOutsideSource(event.target.value);
    };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [outsideSourceDescription, setOutsideDetails] = useState("");
    const [attemptsToGrow, setAttempts] = useState("");
    const [uniqueSellingProposition, setProposition] = useState("");
    const [awards, setAwards] = useState("");
    const [categories, setCategories] = useState({
        food: false,
        technology: false,
        app: false,
        fitness: false,
        healthcare: false,
        sports: false,
        beauty: false,
        clothing: false,
        toys: false,
        entertainment: false,
        pets: false,
        music: false,
        holiday: false,
        children: false,
        housewares: false,
    });

    // List to hold the selected categories
    const sectorId = [];
    // Rest of the data
    let x = 1;
    // For each category that is selected, add the category id to the list
    for (const [key, value] of Object.entries(categories)) {
        if (value === true) {
            // Push the index of the category to the list
            sectorId.push(x)
        }
        x++;
    }

    // List to hold the image names
    const images = [];

    const [stage, setStage] = useState("");
    const handleStageChange = (event) => {
        setStage(event.target.value);
    };

    // Current date as a timestamp
    const publishedDate = new Date();
    const [expectedAmount, setSeek] = useState("");
    const [returnEquityPercentage, setEquity] = useState("");
    const [equitychecked, setEquityChecked] = useState(false);
    const [returnUnitProfitPercentage, setProfitUnit] = useState("");
    const [profitunitchecked, setProfitUnitChecked] = useState(false);


    // Pricing handling
    const [subscriptionType, setSelectedPackage] = useState(4);
    const handlePackageSelect = (packageId) => {
        if (subscriptionType === packageId) {
            setSelectedPackage(4);
            setPrice(0);
            return;
        }
        setSelectedPackage(packageId);
        console.log(subscriptionType);
        if (packageId === "1") {
            setPrice(2000);
        } else if (packageId === "2") {
            setPrice(5000);
        } else if (packageId === "3") {
            setPrice(10000);
        }
    };
    const [price, setPrice] = useState(0);

    // Handling the image upload
    const [image1, setImage1] = useState({
        file: null,
        preview: null,
    });
    const [image2, setImage2] = useState({
        file: null,
        preview: null,
    });
    const [image3, setImage3] = useState({
        file: null,
        preview: null,
    });
    const [video, setVideo] = useState({
        file: null,
        preview: null,
    });

    // Function to handle the image upload  
    const handleImageupload = (event) => {
        const {name, files} = event.target;
        const selectedFile = files[0];

        if (name === 'images' && image1.file === null) {
            setImage1({
                file: selectedFile,
                preview: URL.createObjectURL(selectedFile),
            });
        } else if (name === 'images' && image2.file === null) {
            setImage2({
                file: selectedFile,
                preview: URL.createObjectURL(selectedFile),
            });
        } else if (name === 'images' && image3.file === null) {
            setImage3({
                file: selectedFile,
                preview: URL.createObjectURL(selectedFile),
            });
        }

    }

    // Function to handle the video upload
    const handleVideoUpload = (event) => {
        const {name, files} = event.target;
        const selectedFile = files[0];

        if (name === 'video') {
            setVideo({
                file: selectedFile,
                preview: URL.createObjectURL(selectedFile),
            });
        }
    }

    // Sending the listing object to the backend with the post request for free-trial version
    const onSubmitFree = async () => {
        // ---------------File uploading begin------------ //
        try {
            const generateUniqueFileName = (file) => {
                const timestamp = new Date().getTime();
                const randomString = Math.random().toString(36).substring(2, 7);
                const originalFileName = file.name;
                const fileExtension = originalFileName.substring(originalFileName.lastIndexOf('.'));
                return `${timestamp}_${randomString}${fileExtension}`;
            };

            const formData = new FormData();
            let image1filename = "";
            let image2filename = "";
            let image3filename = "";
            let videofilename = "";

            if (image1.file) {
                image1filename = "image1" + generateUniqueFileName(image1.file);
                formData.append("image", image1.file, image1filename);
                images.push(image1filename);
            }

            if (image2.file) {
                image2filename = "image2" + generateUniqueFileName(image2.file);
                formData.append("image", image2.file, image2filename);
                images.push(image2filename);
            }

            if (image3.file) {
                image3filename = "image3" + generateUniqueFileName(image3.file);
                formData.append("image", image3.file, image3filename);
                images.push(image3filename);
            }

            if (video.file) {
                videofilename = "video" + generateUniqueFileName(video.file);
                formData.append("video", video.file, videofilename);
            }

            post("/entrepreneur/upload", formData, setRes);

            console.log(res);

            //The listing object to be sent to the backend
            const listing = {
                title,
                description,
                "pitchingVideo": videofilename,
                intention,
                businessStartDate,
                businessDuration,
                lifetimeSales,
                lastYearGrossIncome,
                lastYearNetIncome,
                salesProjectionThisYear,
                salesProjectionNextYear,
                projectionMethod,
                outsideSources,
                outsideSourceDescription,
                attemptsToGrow,
                awards,
                uniqueSellingProposition,
                stage,
                expectedAmount,
                returnUnitProfitPercentage,
                returnEquityPercentage,
                subscriptionType,
                publishedDate,
                "status": "Active",
                "entrepreneurId": 102,
                sectorId,
                images
            }
            console.log(listing)
            post("/entrepreneur/addListing", JSON.stringify(listing),setRes);
            console.log("Listing added successfully");
        } catch (error) {
            console.error("Error uploading the files : ", error);
        }
        // ---------------File uploading over------------ //

    }

    // Payed version of the listing
    const publishableKey = 'pk_test_51NVoO5Lg7SFuaaswzqNwoC7EQgXDKL7sSzvUDtUJmrFbOtiUPlgEzEHaEY8vZoYUUvL1O22LnW9jdFQ1K9OmSiOy00MWdEV8aT';
    const handleToken = (token) => {
        // Send the payment token and amount to server
        sendPaymentToServer(token.id, price * 100).then();
    };

    const sendPaymentToServer = async (token, amount) => {
        try {
            // Make a POST request to your Spring Boot server
            post('entrepreneur/pay', { token, amount }, setRes);

            // Handle the response from the server (optional)
            console.log(res.data);
            await onSubmitFree();


        } catch (error) {
            console.error(error);
            // Handle the error (e.g., show error message, etc.)
        }
    };

    // Validations section
    const [validateFormData, setValidateFormData] = useState({
        intention: {"State": "", "Message": ""},
        businessStartDate: {"State": "", "Message": ""},
        businessDuration: {"State": "", "Message": ""},
        lifetimeSales: {"State": "", "Message": ""},
        lastYearGrossIncome: {"State": "", "Message": ""},
        lastYearNetIncome: {"State": "", "Message": ""},
        salesProjectionThisYear: {"State": "", "Message": ""},
        salesProjectionNextYear: {"State": "", "Message": ""},
        projectionMethod: {"State": "", "Message": ""},
        outsideSources: {"State": "", "Message": ""},
        title: {"State": "", "Message": ""},
        description: {"State": "", "Message": ""},
        outsideSourceDescription: {"State": "", "Message": ""},
        attemptsToGrow: {"State": "", "Message": ""},
        uniqueSellingProposition: {"State": "", "Message": ""},
        awards: {"State": "", "Message": ""},
        sectorId: {"State": "", "Message": ""},
        stage: {"State": "", "Message": ""},
        images: {"State": "", "Message": ""},
        video: {"State": "", "Message": ""},
        expectedAmount: {"State": "", "Message": ""},
        returnUnitProfitPercentage: {"State": "", "Message": ""},
        returnEquityPercentage: {"State": "", "Message": ""},
        subscriptionType: {"State": "", "Message": ""},
    });

    // Disabling the next button if the fields are not filled
    const [disableNext1, setDisableNext1] = useState(true);
    const [disableNext2, setDisableNext2] = useState(true);
    const [disableNext3, setDisableNext3] = useState(true);
    const [disableNext4, setDisableNext4] = useState(true);
    const [disableNext5, setDisableNext5] = useState(true);

    useEffect(() => {
        let businessDurationFlag = integerRegex.test(businessDuration);
        let lifetimeSalesFlag = integerRegex.test(lifetimeSales);
        let lastYearGrossIncomeFlag = integerRegex.test(lastYearGrossIncome);
        let lastYearNetIncomeFlag = integerRegex.test(lastYearNetIncome);
        let salesProjectionThisYearFlag = integerRegex.test(salesProjectionThisYear);
        let salesProjectionNextYearFlag = integerRegex.test(salesProjectionNextYear);
        let expectedAmountFlag = integerRegex.test(expectedAmount);
        let returnUnitProfitPercentageFlag = integerRegex.test(returnUnitProfitPercentage);
        let returnEquityPercentageFlag = integerRegex.test(returnEquityPercentage);

        setValidateFormData((prevData) => ({
            ...prevData,
            intention: {
                State: intention ? "Valid" : "Invalid",
                Message: intention ? "" : "Intention",
            },
            businessStartDate: {
                State: businessStartDate ? "Valid" : "Invalid",
                Message: businessStartDate ? "" : "Business start date",
            },
            businessDuration: {
                State: businessDurationFlag && businessDuration ? "Valid" : "Invalid",
                Message: businessDurationFlag && businessDuration ? "" : "No. of years",
            },
            lifetimeSales: {
                State: lifetimeSalesFlag && lifetimeSales ? "Valid" : "Invalid",
                Message: lifetimeSalesFlag && lifetimeSales ? "" : "Lifetime sales(Rs.)",
            },
            lastYearGrossIncome: {
                State: lastYearGrossIncomeFlag && lastYearGrossIncome ? "Valid" : "Invalid",
                Message: lastYearGrossIncomeFlag && lastYearGrossIncome ? "" : "Last year gross income(Rs.)",
            },
            lastYearNetIncome: {
                State: lastYearNetIncomeFlag && lastYearNetIncome ? "Valid" : "Invalid",
                Message: lastYearNetIncomeFlag && lastYearNetIncome ? "" : "Last year net income(Rs.)",
            },
            salesProjectionThisYear: {
                State: salesProjectionThisYearFlag && salesProjectionThisYear ? "Valid" : "Invalid",
                Message: salesProjectionThisYearFlag && salesProjectionThisYear ? "" : "Sales projection for this year(Rs.)",
            },
            salesProjectionNextYear: {
                State: salesProjectionNextYearFlag && salesProjectionNextYear ? "Valid" : "Invalid",
                Message: salesProjectionNextYearFlag && salesProjectionNextYear ? "" : "Sales projection for next year(Rs.)",
            },
            projectionMethod: {
                State: projectionMethod ? "Valid" : "Invalid",
                Message: projectionMethod ? "" : "Projection method",
            },
            outsideSources: {
                State: outsideSources ? "Valid" : "Invalid",
                Message: outsideSources ? "" : "Outside sources",
            },
            title: {
                State: title ? "Valid" : "Invalid",
                Message: title ? "" : "Please enter the title",
            },
            description: {
                State: description ? "Valid" : "Invalid",
                Message: description ? "" : "Please enter the description",
            },
            outsideSourceDescription: {
                State: outsideSourceDescription ? "Valid" : "Invalid",
                Message: outsideSourceDescription ? "" : "Outside source description",
            },
            attemptsToGrow: {
                State: attemptsToGrow ? "Valid" : "Invalid",
                Message: attemptsToGrow ? "" : "Attempts to grow",
            },
            uniqueSellingProposition: {
                State: uniqueSellingProposition ? "Valid" : "Invalid",
                Message: uniqueSellingProposition ? "" : "Unique selling proposition",
            },
            awards: {
                State: awards ? "Valid" : "Invalid",
                Message: awards ? "" : "Awards",
            },
            sectorId: {
                State: sectorId.length > 0 ? "Valid" : "Invalid",
                Message: sectorId.length > 0 ? "" : "Please select at least one category",
            },
            stage: {
                State: stage ? "Valid" : "Invalid",
                Message: stage ? "" : "Please select the stage",
            },
            images: {
                State: image1.file ? "Valid" : "Invalid",
                Message: image1.file ? "" : "Please upload at least one image",
            },
            video: {
                State: video.file ? "Valid" : "Invalid",
                Message: video.file ? "" : "Please upload a video",
            },
            expectedAmount: {
                State: expectedAmountFlag && expectedAmount ? "Valid" : "Invalid",
                Message: expectedAmountFlag && expectedAmount ? "" : "Expected amount(Rs.)",
            },
            returnUnitProfitPercentage: {
                State: returnUnitProfitPercentageFlag && returnUnitProfitPercentage ? "Valid" : "Invalid",
                Message: returnUnitProfitPercentageFlag && returnUnitProfitPercentage ? "" : "Return unit profit percentage(Out of 100)",
            },
            returnEquityPercentage: {
                State: returnEquityPercentageFlag && returnEquityPercentage ? "Valid" : "Invalid",
                Message: returnEquityPercentageFlag && returnEquityPercentage ? "" : "Return equity percentage(Out of 100)",
            },
            subscriptionType: {
                State: subscriptionType ? "Valid" : "Invalid",
                Message: subscriptionType ? "" : "Please enter the subscription type",
            }
        }));
    }, [intention, businessStartDate, businessDuration, lifetimeSales, lastYearGrossIncome, lastYearNetIncome, salesProjectionThisYear, salesProjectionNextYear, projectionMethod, outsideSources, title, description, outsideSourceDescription, attemptsToGrow, uniqueSellingProposition, awards, stage, expectedAmount, returnUnitProfitPercentage, returnEquityPercentage, subscriptionType, sectorId.length, image1.file, video.file]);

    const [requiredFields] = useState({
        0: ["intention", "businessStartDate", "businessDuration", "lifetimeSales", "lastYearGrossIncome", "lastYearNetIncome", "salesProjectionThisYear", "salesProjectionNextYear", "projectionMethod"],
        1: ["outsideSources", "title", "description", "outsideSourceDescription", "attemptsToGrow", "uniqueSellingProposition", "awards"],
        2: ["sectorId", "stage"],
        3: ["images", "video"],
        4: ["expectedAmount"]
    })

    useEffect(() => {
        let flag1 = true;
        let flag2 = true;
        let flag3 = true;
        let flag4 = true;
        let flag5 = true;
        requiredFields[0].forEach((field) => {
            if (validateFormData[field].State === "Invalid") {
                flag1 = false;
            }
        });
        setDisableNext1(!flag1);
        requiredFields[1].forEach((field) => {
                if (validateFormData[field].State === "Invalid") {
                    flag2 = false;
                }
            }
        );
        setDisableNext2(!flag2);
        requiredFields[2].forEach((field) => {
                if (validateFormData[field].State === "Invalid") {
                    flag3 = false;
                }
            }
        );
        setDisableNext3(!flag3);
        requiredFields[3].forEach((field) => {
                if (validateFormData[field].State === "Invalid") {
                    flag4 = false;
                }
            }
        );
        setDisableNext4(!flag4);
        if (validateFormData["expectedAmount"].State === "Invalid") {
            flag5 = false;
        }
        // Disable next if expected amount is not valid or if either of the investment return fields are not valid
        setDisableNext5(!flag5 || (!equitychecked && !profitunitchecked));
    }, [validateFormData, requiredFields, equitychecked, profitunitchecked]);

    // Handling the return on investment section
    // If the user types on the equity percentage field check the equity checkbox and if the input is empty uncheck the checkbox
    const handleEquityPercentageChange = (event) => {
        if (event.target.value) {
            setEquityChecked(true);
        } else {
            setEquityChecked(false);
        }
        setEquity(event.target.value);
    }

    // If the user types on the profit unit percentage field check the profit unit checkbox and if the input is empty uncheck the checkbox
    const handleProfitUnitPercentageChange = (event) => {
        if (event.target.value) {
            setProfitUnitChecked(true);
        } else {
            setProfitUnitChecked(false);
        }
        setProfitUnit(event.target.value);
    }

    // If a package is selected disable the free trial button
    const [disableFreeTrial, setDisableFreeTrial] = useState(false);
    useEffect(() => {
        if (subscriptionType !== 4) {
            setDisableFreeTrial(true);
        } else {
            setDisableFreeTrial(false);
        }
    }, [subscriptionType]);

    //If a package is not selected disable the pay button
    const [disablePay, setDisablePay] = useState(true);
    useEffect(() => {
        if (subscriptionType === 4) {
            setDisablePay(true);
        } else {
            setDisablePay(false);
        }
    }, [subscriptionType]);

    return (
        <div>
            <CommonNavbar/>
            <main className="h-auto min-h-[100vh] p-[2rem] flex justify-center items-center bg-gray-200">

                <form className=" bg-white flex drop-shadow-md mb-4 w-full h-full  rounded-[1rem] lg:w-9/12 lg:h-auto">
                    {currentSection === 1 && (
                        <>
                            <div className="text-gray-700 p-[2rem] w-full">
                                <h1 className="text-3xl text-main-purple self-center">Add investment opportunity</h1>
                                <p className="text-main-purple">Tell us about your business</p>
                                <div className="mt-6">

                                    <div className="row">
                                        <div className="w-full">
                                            <label htmlFor="last-name"
                                                   className="text-main-gray block mb-2 text-[14px] ">
                                                What are your plans with the investment fund ? Where will the money
                                                go?</label>
                                            <Input
                                                type="text"
                                                id="INTEN"
                                                value={intention}
                                                onChange={(e) => setIntention(e.target.value)}
                                                className="w-full"
                                                required={true}
                                                state={validateFormData.intention}
                                            />
                                        </div>
                                    </div>
                                    <div className="row flex-auto">
                                        <div className="flex-grow">
                                            <label htmlFor="startdate"
                                                   className="text-main-gray block mb-2 text-[14px]">
                                                When did you start the business?
                                            </label>
                                            <Input
                                                type="date"
                                                id="date"
                                                value={businessStartDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                required={true}
                                                state={validateFormData.businessStartDate}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <label htmlFor="howlong" className="text-main-gray block mb-2 text-[14px]">
                                                How long have you been operating as a business (Years) ?
                                            </label>
                                            <Input
                                                type="text"
                                                id="years"
                                                value={businessDuration}
                                                onChange={(e) => setHowLong(e.target.value)}
                                                state={validateFormData.businessDuration}
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="row flex-grow">
                                        <div>
                                            <label htmlFor="lifetimesales"
                                                   className="text-main-gray block mb-2 text-[14px]">
                                                What are your business's total lifetime sales since starting
                                                (Rs.)?</label>
                                            <Input
                                                type="text"
                                                id="lifesales"
                                                value={lifetimeSales}
                                                onChange={(e) => setLifeTimeSales(e.target.value)}
                                                required={true}
                                                state={validateFormData.lifetimeSales}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="grossincome"
                                                   className="text-main-gray block mb-2 text-[14px]">
                                                What was the gross income from your business last year?
                                            </label>
                                            <Input
                                                type="text"
                                                id="grossincome"
                                                value={lastYearGrossIncome}
                                                onChange={(e) => setGrossIncome(e.target.value)}
                                                required={true}
                                                state={validateFormData.lastYearGrossIncome}
                                            />
                                        </div>
                                    </div>
                                    <div className="row flex-grow">
                                        <div>
                                            <label htmlFor="netincome"
                                                   className="text-main-gray block mb-2 text-[14px]">
                                                What was the net income from your business last year?</label>
                                            <Input
                                                type="text"
                                                id="netincome"
                                                value={lastYearNetIncome}
                                                onChange={(e) => setNetIncome(e.target.value)}
                                                required={true}
                                                state={validateFormData.lastYearNetIncome}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="grossincome"
                                                   className="text-main-gray block mb-2 text-[14px]">
                                                What are your sale projections for THIS CALENDAR YEAR ?
                                            </label>
                                            <Input
                                                type="text"
                                                id="salesprojections"
                                                value={salesProjectionThisYear}
                                                onChange={(e) => setThisSales(e.target.value)}
                                                required={true}
                                                state={validateFormData.salesProjectionThisYear}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="w-full">
                                            <label htmlFor="nextsales"
                                                   className="text-main-gray block mb-2 text-[14px]">
                                                What are your sale projections for NEXT CALENDAR YEAR ?
                                            </label>
                                            <Input
                                                type="text"
                                                id="lifesales"
                                                value={salesProjectionNextYear}
                                                onChange={(e) => setNextSales(e.target.value)}
                                                required={true}
                                                state={validateFormData.salesProjectionNextYear}
                                            />
                                        </div>
                                    </div>
                                    {/* Take up the maximum width */}
                                    <div className="row">
                                        <div className="w-full">
                                            <label htmlFor="projectionlogic"
                                                   className="text-main-gray block mb-2 text-[14px]">
                                                How did you come up with those projections?
                                            </label>
                                            <Input
                                                type="text"
                                                id="projectionlogic"
                                                className="w-full"
                                                value={projectionMethod}
                                                onChange={(e) => setProjectionLogic(e.target.value)}
                                                required={true}
                                                state={validateFormData.projectionMethod}
                                            />
                                        </div>
                                    </div>
                                    <div className="row flex justify-end">
                                        <Button variant="primary" label="Next" icon="next" onClick={handleNext}
                                                disabled={disableNext1}/>
                                    </div>
                                </div>
                            </div>
                            <div className="listing w-[50%] rounded-r-[1rem] hidden lg:block">
                            </div>
                        </>
                    )}
                    {currentSection === 2 && (
                        <>
                            <div className="text-gray-700 p-[2rem] w-full">
                                <p className="text-main-purple">Tell us more about your business ...</p>
                                <div className="mt-6">
                                    <div className="row">
                                        <div className="w-full">
                                            <label htmlFor="title" className="text-main-gray block mb-2 text-[14px] ">
                                                Give a good title for your listing
                                            </label>
                                            <Input
                                                type="text"
                                                id="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="w-full"
                                                required={true}
                                                state={validateFormData.title}

                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="w-full">
                                            <label htmlFor="title" className="text-main-gray block mb-2 text-[14px] ">
                                                Give a brief description about your listing
                                                <span style={{color: 'red'}}>*</span>
                                            </label>
                                            <Textarea
                                                type="text"
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                className="w-full"
                                                required={true}
                                                state={validateFormData.description}
                                            />
                                        </div>
                                    </div>
                                    {/* Radio button to select either yes or no for outside funding */}
                                    <div className="row">
                                        <div>
                                            <label htmlFor="outside-sources"
                                                   className="text-main-gray block mb-2 text-[14px]">
                                                Have you ever tried to raise money from outside sources?
                                                <span style={{color: 'red'}}>*</span>
                                            </label>
                                            <Radio
                                                color="purple"
                                                type="radio"
                                                id="yes"
                                                name="outsource"
                                                value="yes"
                                                label={<span style={{fontSize: '12px'}}>Yes</span>}
                                                checked={outsideSources === 'yes'}
                                                onChange={handleOutsideSourceChange}
                                                required={true}
                                                state={validateFormData.outsideSources}
                                            />

                                            <Radio
                                                color="purple"
                                                type="radio"
                                                id="no"
                                                name="outsource"
                                                value="no"
                                                label={<span style={{fontSize: '12px'}}>No</span>}
                                                checked={outsideSources === 'no'}
                                                onChange={handleOutsideSourceChange}
                                                required={true}
                                                state={validateFormData.outsideSources}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="w-full">
                                            <label htmlFor="outside-details"
                                                   className="text-main-gray block mb-2 text-[14px]">
                                                If yes provide details else state as none
                                            </label>
                                            <Input
                                                type="text"
                                                id="outsidedetails"
                                                className="w-full"
                                                value={outsideSourceDescription}
                                                onChange={(e) => setOutsideDetails(e.target.value)}
                                                required={true}
                                                state={validateFormData.outsideSourceDescription}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="w-full">
                                            <label htmlFor="attempts" className="text-main-gray block mb-2 text-[14px]">
                                                What attempts have you made to build your business? Have you been
                                                successful?
                                            </label>
                                            <Input
                                                type="text"
                                                id="attempts"
                                                className="w-full"
                                                value={attemptsToGrow}
                                                onChange={(e) => setAttempts(e.target.value)}
                                                required={true}
                                                state={validateFormData.attemptsToGrow}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="w-full">
                                            <label htmlFor="proposition"
                                                   className="text-main-gray block mb-2 text-[14px]">
                                                What is your unique selling proposition? What is your “hook”, and why is
                                                your business Notable?
                                            </label>
                                            <Input
                                                type="text"
                                                id="proposition"
                                                className="w-full"
                                                value={uniqueSellingProposition}
                                                onChange={(e) => setProposition(e.target.value)}
                                                required={true}
                                                state={validateFormData.uniqueSellingProposition}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="w-full">
                                            <label htmlFor="awards" className="text-main-gray block mb-2 text-[14px]">
                                                List any awards or accolades you've received? State as none if not
                                                applicable
                                            </label>
                                            <Input
                                                type="text"
                                                id="awards"
                                                className="w-full"
                                                value={awards}
                                                onChange={(e) => setAwards(e.target.value)}
                                                required={true}
                                                state={validateFormData.awards}
                                            />
                                        </div>
                                    </div>
                                    <div className="row w-full flex">
                                        <div className="justify-begin">
                                            <Button variant="clear" label="Previous" icon="previous"
                                                    onClick={handlePrevious}/>
                                        </div>
                                        <div className="justify-end">
                                            <Button variant="primary" label="Next" icon="next" onClick={handleNext}
                                                    disabled={disableNext2}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="listing w-[50%] rounded-r-[1rem] hidden lg:block">
                            </div>
                        </>
                    )}
                    {currentSection === 3 && (
                        <>
                            <div className="text-gray-700 p-[2rem] w-full">
                                <p className="text-main-purple">Tell us more about your business ...</p>
                                <div className="mt-6">
                                    <div className="row">
                                        {/* Label */}
                                        <div className="w-full">
                                            <label htmlFor="category" className="text-main-gray block mb-2 text-[14px]">
                                                What category describes your business or product? (check all that
                                                apply):
                                                <span style={{color: 'red'}}>*</span>
                                            </label>
                                            <div className="flex flex-cols gap-2">
                                                <div className="row parent w-full">
                                                    <Checkbox
                                                        label="Food & Beverage"
                                                        name="Food & Beverage"
                                                        checked={categories.food}
                                                        onChange={(event) =>
                                                            setCategories({...categories, food: event.target.checked})
                                                        }

                                                    />
                                                    <Checkbox
                                                        label="Technology"
                                                        name="Technology"
                                                        checked={categories.technology}
                                                        onChange={(event) =>
                                                            setCategories({
                                                                ...categories,
                                                                technology: event.target.checked
                                                            })
                                                        }
                                                        required={true}
                                                    />
                                                    <Checkbox
                                                        label="App / Website"
                                                        name="App / Website"
                                                        checked={categories.app}
                                                        onChange={(event) =>
                                                            setCategories({...categories, app: event.target.checked})
                                                        }
                                                        required={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-cols gap-2">
                                                <div className="row parent w-full">
                                                    <Checkbox
                                                        label="Fitness"
                                                        name="Fitness"
                                                        checked={categories.fitness}
                                                        onChange={(event) =>
                                                            setCategories({
                                                                ...categories,
                                                                fitness: event.target.checked
                                                            })
                                                        }

                                                    />
                                                    <Checkbox
                                                        label="Health / Wellness / Nutrition"
                                                        name="Health / Wellness / Nutrition"
                                                        checked={categories.healthcare}
                                                        onChange={(event) =>
                                                            setCategories({
                                                                ...categories,
                                                                healthcare: event.target.checked
                                                            })
                                                        }
                                                    />
                                                    <Checkbox

                                                        label="Sports"
                                                        name="Sports"
                                                        checked={categories.sports}
                                                        onChange={(event) =>
                                                            setCategories({...categories, sports: event.target.checked})
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-cols gap-2">
                                                <div className="row parent w-full">
                                                    <Checkbox
                                                        label="Beauty"
                                                        name="Beauty"
                                                        checked={categories.beauty}
                                                        onChange={(event) =>
                                                            setCategories({...categories, beauty: event.target.checked})
                                                        }
                                                    />
                                                    <Checkbox
                                                        label="Clothing / Fashion"
                                                        name="Clothing / Fashion"
                                                        checked={categories.clothing}
                                                        onChange={(event) =>
                                                            setCategories({
                                                                ...categories,
                                                                clothing: event.target.checked
                                                            })
                                                        }
                                                    />
                                                    <Checkbox
                                                        label="Toys / Games"
                                                        name="Toys / Games"
                                                        checked={categories.toys}
                                                        onChange={(event) =>
                                                            setCategories({...categories, toys: event.target.checked})
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-cols gap-2">
                                                <div className="row parent w-full">
                                                    <Checkbox
                                                        label="Entertainment / Experiential"
                                                        name="Entertainment / Experiential"
                                                        checked={categories.entertainment}
                                                        onChange={(event) =>
                                                            setCategories({
                                                                ...categories,
                                                                entertainment: event.target.checked
                                                            })
                                                        }
                                                    />
                                                    <Checkbox
                                                        label="Pets"
                                                        name="Pets"
                                                        checked={categories.pets}
                                                        onChange={(event) =>
                                                            setCategories({...categories, pets: event.target.checked})
                                                        }
                                                    />
                                                    <Checkbox
                                                        label="Music"
                                                        name="Music"
                                                        checked={categories.music}
                                                        onChange={(event) =>
                                                            setCategories({...categories, music: event.target.checked})
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-cols gap-2">
                                                <div className="row parent w-full">
                                                    <Checkbox
                                                        label="Holiday"
                                                        name="Holiday"
                                                        checked={categories.holiday}
                                                        onChange={(event) =>
                                                            setCategories({
                                                                ...categories,
                                                                holiday: event.target.checked
                                                            })
                                                        }
                                                    />
                                                    <Checkbox
                                                        label="Children"
                                                        name="Children"
                                                        checked={categories.children}
                                                        onChange={(event) =>
                                                            setCategories({
                                                                ...categories,
                                                                children: event.target.checked
                                                            })
                                                        }
                                                    />
                                                    <Checkbox
                                                        label="Housewares / Home Design"
                                                        name="Housewares / Home Design"
                                                        checked={categories.housewares}
                                                        onChange={(event) =>
                                                            setCategories({
                                                                ...categories,
                                                                housewares: event.target.checked
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="w-full">
                                            <label htmlFor="stage" className="text-main-gray block mb-2 text-[14px]">
                                                What stage describes your business or product? (check all that apply):
                                                <span style={{color: 'red'}}>*</span>
                                            </label>
                                            <div className="flex flex-rows">
                                                <div className="row">
                                                    <Radio label={<span style={{fontSize: '12px'}}>Shopping Live</span>}
                                                           name="stage" value="live" checked={stage === 'live'}
                                                           onChange={handleStageChange} required={true}
                                                           state={validateFormData.stage}/>
                                                    <Radio label={<span style={{fontSize: '12px'}}>Revenue</span>}
                                                           name="stage" value="revenue" checked={stage === 'revenue'}
                                                           onChange={handleStageChange} required={true}
                                                           state={validateFormData.stage}/>
                                                    <Radio label={<span style={{fontSize: '12px'}}>Expansion</span>}
                                                           name="stage" value="expansion"
                                                           checked={stage === 'expansion'} onChange={handleStageChange}
                                                           required={true} state={validateFormData.stage}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row w-full flex">
                                        <div className="justify-begin">
                                            <Button variant="clear" label="Previous" icon="previous"
                                                    onClick={handlePrevious}/>
                                        </div>
                                        <div className="justify-end">
                                            <Button variant="primary" label="Next" icon="next" onClick={handleNext}
                                                    disabled={disableNext3}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="listing w-[50%] rounded-r-[1rem] hidden lg:block">
                            </div>
                        </>
                    )}
                    {currentSection === 4 && (
                        <>
                            <div className="text-gray-700 p-[2rem] w-full">
                                <div className="mt-6">
                                    <p className="text-main-purple">Tell us more about your business ...</p>
                                    <div className="row">
                                        <div className="w-full">
                                            <label htmlFor="image1" className="text-main-gray block mb-2 text-[14px]">
                                                Please upload a photo of your business or product (At least one image is
                                                required):
                                                <span style={{color: 'red'}}>*</span>
                                            </label>
                                            {/* Three divs to hold the three images uploaded */}
                                            <div className="flex flex-cols gap-2">
                                                <div className="row">
                                                    <div
                                                        className="w-[100px] h-[100px] border-2 border-main-purple rounded-[1rem] flex items-center justify-center overflow-hidden">
                                                        {image1.preview && (
                                                            <img src={image1.preview} alt="first"
                                                                 className="w-full h-full object-cover rounded-[1rem]"/>
                                                        )}
                                                    </div>
                                                    <div
                                                        className="w-[100px] h-[100px] border-2 border-main-purple rounded-[1rem] flex items-center justify-center overflow-hidden">
                                                        {image2.preview && (
                                                            <img src={image2.preview} alt="second"
                                                                 className="w-full h-full object-cover rounded-[1rem]"/>
                                                        )}
                                                    </div>
                                                    <div
                                                        className="w-[100px] h-[100px] border-2 border-main-purple rounded-[1rem] flex items-center justify-center overflow-hidden">
                                                        {image3.preview && (
                                                            <img src={image3.preview} alt="third"
                                                                 className="w-full h-full object-cover rounded-[1rem]"/>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="file-input-container">
                                                    <input
                                                        type="file"
                                                        id="image1"
                                                        name="images"
                                                        accept="image/png, image/jpeg"
                                                        className="hidden"
                                                        onChange={handleImageupload}
                                                    />
                                                    <label htmlFor="image1" className="file-input-button">
                                                        Select File
                                                    </label>
                                                    <span className="file-input-text">
                                                {/* Show all the uploaded images */}
                                                        {image1.file && image1.file.name + ","}
                                                        {image2.file && image2.file.name + ","}
                                                        {image3.file && image3.file.name}
                                                        {!image1.file && "No file uploaded"}
                                            </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Div to upload SINGLE video */}
                                    <div className="row">
                                        <div className="w-full">
                                            <label htmlFor="video" className="text-main-gray block mb-2 text-[14px]">
                                                Please upload a pitch video of your business less than 50MB (Make it
                                                well organized and professional):
                                                <span style={{color: 'red'}}>*</span>
                                            </label>
                                            <div className="flex flex-cols gap-2">
                                                <div className="row">
                                                    <div
                                                        className="w-full md:w-[600px] md:h-[300px] sm:w-[400px] border-2 border-main-purple rounded-[1rem] video-container">
                                                        {video.preview && (
                                                            <video src={video.preview}
                                                                   className="w-full h-full object-cover rounded-[1rem]"
                                                                   controls/>
                                                        )}
                                                        {!video.preview && (
                                                            <div
                                                                className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] mx-auto my-[4rem] md:my-[6rem] play-image"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="file-input-container">
                                                    <input
                                                        type="file"
                                                        id="video"
                                                        name="video"
                                                        accept="video/*"
                                                        className="hidden"
                                                        onChange={handleVideoUpload}
                                                    />
                                                    <label htmlFor="video" className="file-input-button">
                                                        Select File
                                                    </label>
                                                    <span className="file-input-text">
                                                {video && video.file && video.file.name}
                                                        {!video.file && "No file uploaded"}
                                            </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row w-full flex">
                                        <div className="justify-begin">
                                            <Button variant="clear" label="Previous" icon="previous"
                                                    onClick={handlePrevious}/>
                                        </div>
                                        <div className="justify-end">
                                            <Button variant="primary" label="Next" icon="next" onClick={handleNext}
                                                    disabled={disableNext4}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="listing w-[50%] rounded-r-[1rem] hidden lg:block"></div>
                        </>
                    )}
                    {currentSection === 5 && (
                        <>
                            <div className="text-gray-700 p-[2rem] w-full">
                                <div className="mt-6">
                                    {/* Container for the logo  */}
                                    <div className="flex justify-center items-center">
                                        <div
                                            className="venture-logo w-[200px] h-[80px] rounded-[1rem] justify-center drop-shadow">
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center row">
                                        <p className="text-main-purple font-bold mt-[1rem]">Let's begin</p>
                                    </div>
                                    <div className="row">
                                        <div className="w-full">
                                            <label htmlFor="venture-name"
                                                   className="text-main-gray block mb-2 text-[14px]">
                                                What investment amount are you seeking and what percentage of equity are
                                                you willing to give in exchange?
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row flex justify-center items-center">
                                        <Card className="w-500 shadow-lg p-6 border-2 border-main-purple">
                                            <label htmlFor="seek" className="text-main-gray block mb-2 text-[14px]">
                                                I am seeking (Rs) :
                                                <span style={{color: 'red'}}>*</span>
                                            </label>
                                            <Input
                                                type="text"
                                                id="seek"
                                                className="w-full"
                                                value={expectedAmount}
                                                onChange={(e) => setSeek(e.target.value)}
                                                required={true}
                                                state={validateFormData.expectedAmount}
                                            />
                                            <label htmlFor="seek"
                                                   className="text-main-gray block mb-2 mt-5 text-[14px]">
                                                And willing to give up (Should select at least one option) :
                                                <span style={{color: 'red'}}>*</span>
                                            </label>
                                            <div className="flex items-center mb-3">
                                                <Input
                                                    type="text"
                                                    id="equityinput"
                                                    className="w-full mr-2"
                                                    value={returnEquityPercentage}
                                                    onChange={handleEquityPercentageChange}
                                                    state={validateFormData.returnEquityPercentage}
                                                />
                                                <Checkbox
                                                    label="On Equity"
                                                    name="equitybox"
                                                    id="equity"
                                                    checked={equitychecked}
                                                    onChange={(event) => setEquityChecked(event.target.checked)}
                                                />
                                            </div>
                                            <div className="flex items-center">
                                                <Input
                                                    type="text"
                                                    id="profitinput"
                                                    className="w-full mr-2"
                                                    value={returnUnitProfitPercentage}
                                                    onChange={handleProfitUnitPercentageChange}
                                                    state={validateFormData.returnUnitProfitPercentage}
                                                />
                                                <Checkbox
                                                    label="Profit per unit"
                                                    name="profitunit"
                                                    id="profitunitpercentage"
                                                    checked={profitunitchecked}
                                                    onChange={(event) => setProfitUnitChecked(event.target.checked)}

                                                />
                                            </div>
                                        </Card>


                                    </div>
                                    <div className="row w-full flex">
                                        <div className="justify-begin">
                                            <Button variant="clear" label="Previous" icon="previous"
                                                    onClick={handlePrevious}/>
                                        </div>
                                        <div className="justify-end">
                                            <Button variant="primary" label="Next" icon="next" onClick={handleNext}
                                                    disabled={disableNext5}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="listing w-[50%] rounded-r-[1rem] hidden lg:block">
                            </div>
                        </>
                    )}
                    {currentSection === 6 && (
                        <>
                            <div className="text-gray-700 p-[2rem] w-full">
                                <div className="row">
                                    <div className="w-full flex justify-center items-center row">
                                        <label htmlFor="attempts"
                                               className="text-main-gray block text-[14px] font-extrabold">
                                            You will get 7 days free trial for your listing. You can do the subscription
                                            now which gives more benefits ...
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <div className="flex justify-center items-center row">
                                        <p className="text-main-purple font-bold mt-[1rem]">Choose a pricing package</p>
                                    </div>
                                    <div className="row flex justify-center items-center">
                                        {/* Pricing 1 */}
                                        <div
                                            className={`grid-cols-3 ${
                                                subscriptionType === 1 ? "border-[5px] border-main-purple shadow-lg" : ""
                                            }`}
                                            onClick={() => handlePackageSelect("1")}
                                        >
                                            <div
                                                className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                                <h3 className="mb-4 text-2xl font-semibold">Basic</h3>
                                                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                                                    Best option for personal use & for your next project.
                                                </p>
                                                <div className="flex justify-center items-baseline my-8">
                                                    <span className="mr-2 text-5xl font-extrabold">Rs2000</span>
                                                    <span className="text-gray-500 dark:text-gray-400">/month</span>
                                                </div>
                                                {/* List */}
                                                <ul className="mb-8 space-y-4 text-left">
                                                    <li className="flex items-center space-x-3">
                                                        {/* Icon */}
                                                        <svg
                                                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        <span>Individual configuration</span>
                                                    </li>
                                                    <li className="flex items-center space-x-3">
                                                        {/* Icon */}
                                                        <svg
                                                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        <span>No setup or hidden fees</span>
                                                    </li>
                                                    <li className="flex items-center space-x-3">
                                                        {/* Icon */}
                                                        <svg
                                                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        <span>Team size: <span
                                                            className="font-semibold">1 developer</span></span>
                                                    </li>
                                                    <li className="flex items-center space-x-3">
                                                        {/* Icon */}
                                                        <svg
                                                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        <span>Premium support: <span
                                                            className="font-semibold">6 months</span></span>
                                                    </li>
                                                    <li className="flex items-center space-x-3">
                                                        {/* Icon */}
                                                        <svg
                                                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        <span>Free updates: <span
                                                            className="font-semibold">6 months</span></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* Pricing 2 */}
                                        <div
                                            className={`grid-cols-3 ${
                                                subscriptionType === 2 ? "border-[5px] border-main-purple shadow-lg" : ""
                                            }`}
                                            onClick={() => handlePackageSelect("2")}
                                        >
                                            <div
                                                className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-main-gray bg-opacity-90 rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                                <h3 className="mb-4 text-2xl text-white font-semibold">Standard</h3>
                                                <p className="font-light text-white sm:text-lg dark:text-gray-400">
                                                    Relevant for multiple users, extended & premium support.
                                                </p>
                                                <div className="flex justify-center items-baseline my-8">
                                                    <span
                                                        className="mr-2 text-5xl text-white font-extrabold">Rs5000</span>
                                                    <span className="text-gray-500 dark:text-gray-400">/month</span>
                                                </div>
                                                {/* List */}
                                                <ul className="mb-8 space-y-4 text-left">
                                                    <li className="flex items-center space-x-3">
                                                        {/* Icon */}
                                                        <svg
                                                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        <span className="text-white">Individual configuration</span>
                                                    </li>
                                                    <li className="flex items-center space-x-3">
                                                        {/* Icon */}
                                                        <svg
                                                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        <span className="text-white">No setup or hidden fees</span>
                                                    </li>
                                                    <li className="flex items-center space-x-3">
                                                        {/* Icon */}
                                                        <svg
                                                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        <span className="text-white">Team size: <span
                                                            className="font-semibold">10 developers</span></span>
                                                    </li>
                                                    <li className="flex items-center space-x-3">
                                                        {/* Icon */}
                                                        <svg
                                                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        <span className="text-white">Premium support: <span
                                                            className="font-semibold">24 months</span></span>
                                                    </li>
                                                    <li className="flex items-center space-x-3">
                                                        {/* Icon */}
                                                        <svg
                                                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        <span className="text-white">Free updates: <span
                                                            className="font-semibold">24 months</span></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* Pricing 3 */}
                                        <div
                                            className={`grid-cols-3 ${
                                                subscriptionType === 3 ? "border-[5px] border-main-purple shadow-lg" : ""
                                            }`}
                                            onClick={() => handlePackageSelect("3")}
                                        >
                                            <div
                                                className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                                <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
                                                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                                                    Best for large-scale uses and extended redistribution rights.
                                                </p>
                                                <div className="flex justify-center items-baseline my-8">
                                                    <span className="mr-2 text-5xl font-extrabold">Rs10000</span>
                                                    <span className="text-gray-500 dark:text-gray-400">/month</span>
                                                </div>
                                                {/* List */}
                                                <ul className="mb-8 space-y-4 text-left">
                                                    <li className="flex items-center space-x-3">
                                                        {/* Icon */}
                                                        <svg
                                                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        <span>Individual configuration</span>
                                                    </li>
                                                    <li className="flex items-center space-x-3">
                                                        {/* Icon */}
                                                        <svg
                                                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        <span>No setup or hidden fees</span>
                                                    </li>
                                                    <li className="flex items-center space-x-3">
                                                        {/* Icon */}
                                                        <svg
                                                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        <span>Team size: <span
                                                            className="font-semibold">100+ developers</span></span>
                                                    </li>
                                                    <li className="flex items-center space-x-3">
                                                        {/* Icon */}
                                                        <svg
                                                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        <span>Premium support: <span
                                                            className="font-semibold">Lifetime</span></span>
                                                    </li>
                                                    <li className="flex items-center space-x-3">
                                                        {/* Icon */}
                                                        <svg
                                                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        <span>Free updates: <span
                                                            className="font-semibold">Lifetime</span></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row w-full flex mt-5">
                                        <div className="justify-begin">
                                            <Button variant="clear" label="Previous" icon="previous"
                                                    onClick={handlePrevious}/>
                                        </div>
                                        <div className="justify-end">
                                            <StripeCheckout
                                                amount={price * 100}
                                                label={'Pay Now'}
                                                name='VentureVerse'
                                                description={'Your Total Price is Rs.' + (price)}
                                                panelLabel='Pay Now'
                                                token={handleToken}
                                                stripeKey={publishableKey}
                                                currency='LKR'
                                                image="https://imgur.com/sACn7cR.png"
                                                fontfamily='Montserrat'
                                                type="button"
                                            >
                                                <Button variant="clear" label="Proceed with the payment"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                        }} disabled={disablePay}/>
                                            </StripeCheckout>
                                        </div>
                                        <div className="justify-end">
                                            <Button variant="primary" label="Proceed with the free trial" icon="next"
                                                    onClick={onSubmitFree} type="button" disabled={disableFreeTrial}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </form>
            </main>
            {/* <Footer /> */}
        </div>
    );
}

export default AddListing;


