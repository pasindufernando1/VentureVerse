import React, {useEffect} from "react";
import {useState} from "react";
import {Button, StatusPopUp} from "../webcomponent";
import StripeCheckout from 'react-stripe-checkout';
import useAxiosMethods from "../../hooks/useAxiosMethods";
import {Header} from "../webcomponent";
import {Link, useParams} from "react-router-dom";

function TopUp() {

    // Pricing handling
    const [subscriptionType, setSelectedPackage] = useState(null);

    const [price, setPrice] = useState(0);
    const handlePackageSelect = (packageId) => {
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

    //Get the listing id from the url
    const {id} = useParams();
    console.log(id);

    // Payed version of the listing
    const publishableKey = 'pk_test_51NVoO5Lg7SFuaaswzqNwoC7EQgXDKL7sSzvUDtUJmrFbOtiUPlgEzEHaEY8vZoYUUvL1O22LnW9jdFQ1K9OmSiOy00MWdEV8aT';
    const handleToken = (token) => {
        // Send the payment token and amount to server
        sendPaymentToServer(token.id, price * 100);
    };

    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const [listingupdate, setListingUpdate] = useState(null);
    const {post,put} = useAxiosMethods();
    const today = new Date();
    const requestData = {
        listingId: id,
        subscriptionType: subscriptionType,
        publishedDate: today,
    }
    const sendPaymentToServer = async (token, amount) => {
        try {
            // Make a POST request to your Spring Boot server
            post(`/entrepreneur/topup/${id}`, {token, amount}, setPaymentSuccess);
            put(`/entrepreneur/updateListing/${id}`, requestData, setPaymentSuccess);
            setShowSuccessNotification(true)
        } catch (error) {
            console.error(error);
        }
    };
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);


    //If a package is not selected disable the pay button
    const [disablePay, setDisablePay] = useState(true);
    useEffect(() => {
        if (subscriptionType === null) {
            setDisablePay(true);
        } else {
            setDisablePay(false);
        }
    }, [subscriptionType]);




    return (
        <div>
            <Header active="Listings">
                <main className="h-auto min-h-[100vh] flex justify-center items-center w-full ">
                    <form
                        className=" bg-white flex drop-shadow-md mb-4 mt-[-2rem] w-full h-full  border-[1px] border-main-purple rounded-[1rem] lg:w-full lg:h-auto">
                        <div className="text-gray-700 p-[2rem] w-full">

                        <div className="mb-5">
                            <div className="flex justify-center items-center row">
                                <p className="text-main-purple font-bold mt-[1rem]">Choose a pricing
                                    package</p>
                            </div>
                            <div className="row flex justify-center items-center">
                                {/* Pricing 1 */}
                                <div
                                    className={`grid-cols-3 ${
                                        subscriptionType === "1" ? "border-[5px] border-main-purple shadow-lg" : ""
                                    }`}
                                    onClick={() => handlePackageSelect("1")}
                                >
                                    <div
                                        className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                        <h3 className="mb-4 text-2xl font-semibold">Basic</h3>
                                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best
                                            option for personal use & for your next project.</p>
                                        <div className="flex justify-center items-baseline my-8">
                                            <span className="mr-2 text-5xl font-extrabold">Rs2000</span>
                                            <span className="text-gray-500 dark:text-gray-400">/month</span>
                                        </div>
                                        {/* List */}
                                        <ul role="list" className="mb-8 space-y-4 text-left">
                                            <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                                <span>Individual configuration</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                                <span>No setup, or hidden fees</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                                <span>Chat and Video Pitching: <span
                                                    className="font-semibold">Full acess</span></span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                                <span>Premium support: <span className="font-semibold">1 month</span></span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                                <span>Free updates: <span
                                                    className="font-semibold">1 month</span></span>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                                {/* Pricing 2 */}
                                <div
                                    className={`grid-cols-3 ${
                                        subscriptionType === "2" ? "border-[5px] border-main-purple shadow-lg" : ""
                                    }`}
                                    onClick={() => handlePackageSelect("2")}
                                >
                                    <div
                                        className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-main-gray bg-opacity-90 rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                        <h3 className="mb-4 text-2xl text-white font-semibold">Standard</h3>
                                        <p className="font-light text-white sm:text-lg dark:text-gray-400">Relevant
                                            for multiple users, extended & premium support.</p>
                                        <div className="flex justify-center items-baseline my-8">
                                            <span
                                                className="mr-2 text-5xl text-white font-extrabold">Rs5000</span>
                                            <span
                                                className="text-gray-500 dark:text-gray-400">/3months</span>
                                        </div>
                                        {/* List */}
                                        <ul role="list" className="mb-8 space-y-4 text-left">
                                            <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                                <span className="text-white">Individual configuration</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                                <span className="text-white">No setup, or hidden fees</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                                <span className="text-white">Chat and Video pitching: <span
                                                    className="font-semibold">Full acess</span></span>

                                            </li>
                                            <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                                <span className="text-white">Premium support: <span
                                                    className="font-semibold">3 months</span></span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                                <span className="text-white">Free updates: <span
                                                    className="font-semibold">3 months</span></span>
                                            </li>
                                        </ul>


                                    </div>
                                </div>
                                {/* Pricing 3 */}
                                <div
                                    className={`grid-cols-3 ${
                                        subscriptionType === "3" ? "border-[5px] border-main-purple shadow-lg" : ""
                                    }`}
                                    onClick={() => handlePackageSelect("3")}
                                >
                                    <div
                                        className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                        <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
                                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best
                                            for large scale uses and extended redistribution rights.</p>
                                        <div className="flex justify-center items-baseline my-8">
                                            <span className="mr-2 text-5xl font-extrabold">Rs10000</span>
                                            <span
                                                className="text-gray-500 dark:text-gray-400">/6months</span>
                                        </div>
                                        {/* List */}
                                        <ul role="list" className="mb-8 space-y-4 text-left">
                                            <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                                <span>Individual configuration</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                                <span>No setup, or hidden fees</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                                <span>Chat and video pitching: <span
                                                    className="font-semibold">Full acess</span></span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                                <span>Premium support: <span className="font-semibold">6 months</span></span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                                <span>Free updates: <span
                                                    className="font-semibold">6 months</span></span>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                            <div className="row w-full flex mt-5">
                                <div className="justify-begin">
                                    <Button variant="clear" label="Previous" icon="previous">
                                        <Link to={`/entrepreneur/view-listingfull`}>Back</Link>
                                    </Button>
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
                                        image="/assets/images/VentureVerse-Black.png"
                                        fontfamily='Montserrat'
                                        type="button"
                                    >
                                        <Button variant="clear" label="Proceed with the payment"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                }} disabled={disablePay}/>
                                    </StripeCheckout>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                </main>
                <div>
                    {showSuccessNotification && (
                        <StatusPopUp
                            successTitle="Listing republished successfully"
                            successMessage="Your listing is now visible to the matching investors"
                            redirectUrl="/entrepreneur/dashboard"
                        />
                    )}
                </div>
            </Header>
        </div>
    );
}

export default TopUp;