import React from "react";
import { Navbar, Footer, Button } from "../webcomponent";


const Pricing = () => {

    return (

        <div className="flex flex-col justify-between items-center w-full overflow-hidden">

            <Navbar active="Pricing"/>

                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Start Your Venture</h2>
                            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at VentureVerse we focus on provide best features for lowest cost.</p>
                        </div>
                        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                            {/* Pricing Card1 */}
                            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                <h3 className="mb-4 text-2xl font-semibold">Basic</h3>
                                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for personal use & for your next project.</p>
                                <div className="flex justify-center items-baseline my-8">
                                    <span className="mr-2 text-5xl font-extrabold">Rs2000</span>
                                    <span className="text-gray-500 dark:text-gray-400">/month</span>
                                </div>
                                {/* List */}
                                <ul role="list" className="mb-8 space-y-4 text-left">
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Individual configuration</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>No setup, or hidden fees</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Chat and Video Pitching: <span className="font-semibold">Full acess</span></span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Premium support: <span className="font-semibold">1 month</span></span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Free updates: <span className="font-semibold">1 month</span></span>
                                    </li>
                                </ul>
                                <Button
                                    type="button"
                                    variant="oval"
                                    innerHtml="Get Started"
                                    className="w-52 h-12 mx-auto"
                                >Get Started</Button>
                            </div>
                            {/*  pricing 2*/}
                            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-main-gray bg-opacity-90 rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                <h3 className="mb-4 text-2xl text-white font-semibold">Standard</h3>
                                <p className="font-light text-white sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
                                <div className="flex justify-center items-baseline my-8">
                                    <span className="mr-2 text-5xl text-white font-extrabold">Rs5000</span>
                                    <span className="text-gray-500 dark:text-gray-400">/3months</span>
                                </div>
                                {/* List */}
                                <ul role="list" className="mb-8 space-y-4 text-left">
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span className="text-white">Individual configuration</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span className="text-white">No setup, or hidden fees</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span className="text-white">Chat and Video pitching: <span className="font-semibold">Full acess</span></span>

                                    </li>
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span className="text-white">Premium support: <span className="font-semibold">3 months</span></span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span className="text-white">Free updates: <span className="font-semibold">3 months</span></span>
                                    </li>
                                </ul>

                                <Button
                                    type="button"
                                    variant="oval"
                                    innerHtml="Get Started"
                                    className="w-52 h-12 mx-auto"
                                >Get Started</Button>
                            </div>
                            {/*pricing card 3*/}
                            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
                                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p>
                                <div className="flex justify-center items-baseline my-8">
                                    <span className="mr-2 text-5xl font-extrabold">Rs10000</span>
                                    <span className="text-gray-500 dark:text-gray-400">/6months</span>
                                </div>
                                {/* List */}
                                <ul role="list" className="mb-8 space-y-4 text-left">
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Individual configuration</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>No setup, or hidden fees</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Chat and video pitching: <span className="font-semibold">Full acess</span></span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Premium support: <span className="font-semibold">6 months</span></span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Free updates: <span className="font-semibold">6 months</span></span>
                                    </li>
                                </ul>
                                <Button
                                    type="button"
                                    variant="oval"
                                    innerHtml="Get Started"
                                    className="w-52 h-12 mx-auto"
                                >Get Started</Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                        <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Frequently
                            asked questions</h2>
                        <div
                            className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
                            <div>
                                <div className="mb-10">
                                    <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                        What is Venture Verse?
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">Venture Verse is an innovative online platform that connects entrepreneurs with a diverse range of investors. It provides a space for entrepreneurs to showcase their ideas, products, and ventures through engaging video pitches..</p>
                                </div>
                                <div className="mb-10">
                                    <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                        How does Venture Verse work?
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">Entrepreneurs create video pitches showcasing their ventures. Investors explore these pitches, connect with entrepreneurs, and express their interest in potential collaborations or investments.</p>
                                </div>
                                <div className="mb-10">
                                    <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                        Who can use Venture Verse?
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">Venture Verse is open to both entrepreneurs and investors. Entrepreneurs seeking funding or partnerships for their ventures and investors looking for promising opportunities can join our dynamic community.</p>
                                    <p className="text-gray-500 dark:text-gray-400">Feel free to <a href="#"
                                                                                                    className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
                                                                                                    target="_blank"
                                                                                                    rel="noreferrer">contact
                                        us</a> and we'll help you out as soon as we can.</p>
                                </div>
                                <div className="mb-10">
                                    <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                        What makes Venture Verse different from other platforms?
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">Venture Verse stands out with its innovative video pitching feature, allowing entrepreneurs to present their ideas more vividly. Additionally, the platform caters to a diverse range of investors, fostering a comprehensive investment ecosystem.</p>
                                    <p className="text-gray-500 dark:text-gray-400">Find out more information by <a href="#"
                                                                                                                    className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">reading
                                        the license</a>.</p>
                                </div>
                            </div>
                            <div>
                                <div className="mb-10">
                                    <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                        How do I create a video pitch?
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">Creating a video pitch is easy! After signing up, you can access our user-friendly video creation tools. Craft a compelling pitch, explain your venture, and highlight what sets it apart. Your video pitch will help you stand out and engage with potential investors.</p>
                                </div>
                                <div className="mb-10">
                                    <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                        Is Venture Verse free to use?
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">Venture Verse offers both free and premium plans. While basic features are available for free, premium plans provide enhanced visibility and additional tools. Check our pricing page for more details.
                                    </p>

                                </div>
                                <div className="mb-10">
                                    <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                        How can investors connect with entrepreneurs?
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">Investors can browse video pitches, express interest, and initiate conversations with entrepreneurs. Our platform facilitates seamless communication and networking between both parties</p>
                                </div>
                                <div className="mb-10">
                                    <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                        Is my information secure?
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">Yes, we prioritize the security and privacy of your information. We employ robust data protection measures to ensure your data is safe and only accessible to authorized users.</p>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            <Footer/>

        </div>

    )

}

export default Pricing