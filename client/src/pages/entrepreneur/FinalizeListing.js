import React, {useState} from 'react';
import {Button, Textarea, Header} from "../webcomponent";
import useAxiosMethods from '../../hooks/useAxiosMethods';
import Modal from "react-modal";
import Terms from "../common/Terms";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip, Input, Checkbox,
} from "@material-tailwind/react";
import {Link} from "react-router-dom";


function FinalizeListing() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <Header active="View Listing">
                <main className="h-auto flex justify-center items-center ">
                    <form
                        className="bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] mt-[-2rem] border-[1px] border-main-purple rounded-[1rem]">
                        <div className="text-gray-700 p-[2rem] w-full">
                            <div className="Signup1">
                                <h3 className="text-3xl text-main-purple self-center">Finalize Investment</h3>
                                <p className="text-main-purple">
                                    Fill out the finalized amount and the required documents
                                </p>
                                <div className="mt-6">
                                    <div className="row2 flex flex-row flex-wrap">
                                        <div>
                                            <Card className="w-80">
                                                <CardHeader floated={false} className="h-80">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                                        alt="profile-picture"/>
                                                </CardHeader>
                                                <CardBody className="text-center">
                                                    <Typography variant="h4" color="blue-gray" className="mb-2">
                                                        George Fernando
                                                    </Typography>
                                                    <Typography color="blue-gray" className="font-medium" textGradient>
                                                        CEO / Co-Founder
                                                    </Typography>
                                                </CardBody>
                                                
                                            </Card>

                                        </div>
                                        <div>
                                            <Card className="w-full shadow-lg p-6 border-2 border-main-purple mt-2 ml-5">
                                            <p className="text-main-purple justify-center flex font-extrabold">
                                                Finalized Offerings
                                            </p>
                                                <label htmlFor="seek"
                                                       className="text-main-gray block mb-2 text-[14px] font-extrabold mt-5">
                                                    Investing amount (Rs.) : <span
                                                    className='font-black font-extrabold'>1000000</span>
                                                </label>
                                                <label htmlFor="seek"
                                                       className="text-main-gray block mb-2 mt-5 text-[14px] font-extrabold">
                                                    Returns as a percentage
                                                </label>
                                                <div>
                                                    <label htmlFor="seek"
                                                           className="text-main-gray block mb-2 text-[14px] ml-4">
                                                        Equity : <span className='font-black font-extrabold'>5 %</span>
                                                    </label>
                                                    <label htmlFor="seek"
                                                           className="text-main-gray block mb-2 text-[14px] ml-4">
                                                        Profit per unit : <span className='font-black font-extrabold'>10 %</span>
                                                    </label>
                                                </div>
                                                <div className="row">
                                                    <div className="file-input-container mt-2">
                                                        <label htmlFor="bankStatement"
                                                               className="text-main-black block mb-1 text-[14px] font-extrabold">
                                                            Please provide a copy of your contractual agreement. Use a
                                                            scanned pdf file
                                                            <span style={{color: 'red'}}>*</span>
                                                        </label>
                                                        <input
                                                            type="file"
                                                            id="bankStatement"
                                                            name="bankStatement"
                                                            accept=".pdf"
                                                            className="hidden"
                                                            
                                                            required={true}
                                                        />
                                                        <label htmlFor="bankStatement" className="file-input-button">
                                                            Select File
                                                        </label>
                                                        <span className="file-input-text">
                                                            No file chosen
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <Checkbox
                                                    color="purple"
                                                    label="I agree that all numbers are in order."
                                                    name="terms"
                                                    required={true}/>
                                                
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="button"
                                className="float-right mt-2"
                            >
                                Finalize
                            </Button>
                            <Button
                                variant="clear"
                                type="button"
                                className="float-right mt-2 mr-2"
                            >
                                <Link to="/entrepreneur/view-listingfull">Back</Link>
                            </Button>
                        </div>

                    </form>
                </main>
            </Header>
        </div>
    );
}

export default FinalizeListing;
