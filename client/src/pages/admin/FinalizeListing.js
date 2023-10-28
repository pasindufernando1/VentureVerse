import React, {useEffect, useState} from 'react';
import {Button, Textarea, Header,StatusPopUp} from "../webcomponent";
import useAxiosMethods from '../../hooks/useAxiosMethods';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip, Input, Checkbox,
} from "@material-tailwind/react";
import {Link} from "react-router-dom";


function FinalizeListingAdmin() {
    const {get,put}=useAxiosMethods();
    const [response, setResponse] = useState([]);
    const [response1, setResponse1] = useState([]);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [pdf, setpdf] = useState([]);
    const [entrepreneurpic, setentrepreneurpic] = useState([]);
    const [investorpic, setinvestorpic] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    let id=3;

    useEffect(() => {
        get(`/entrepreneur/finalizeListing/${id}`, setResponse);
    }, []);

    console.log(response);

        const requestData = {
            finalizedDate: new Date()
        };

        const handleSubmit = () => {
            put(`/entrepreneur/updateDate/${id}`,requestData,setResponse1);
            setShowSuccessNotification(true);
        };

        const fetchPdfsForResponse = (listingId, investorId) => {  
            get(`/entrepreneur/admingetPdf/${listingId}/${investorId}`, setpdf);
        }

        const pdfs = {
            entrepreneurDoc:pdf[0],
            investorDoc:pdf[1],
        }

        const getentrepreneurpic = (entrepreneurId) => {
            get(`/entrepreneurs/getEntrepreneurPic/${entrepreneurId}`, setentrepreneurpic);
        }

        const getinvestorpic = (investorId) => {
            get(`/investors/getInvestorPic/${investorId}`, setinvestorpic);
        }

        return (
            response.length > 0 ?(
                response && response.map((item) => (
                fetchPdfsForResponse(item.id.listingId.listingId, item.id.investorId.id),
                getentrepreneurpic(item.id.listingId.entrepreneurId.id),
                getinvestorpic(item.id.investorId.id),
                <div>
                    <Header active="View Listing">
                        <main className="h-auto flex justify-center items-center ">
                            <form
                                className="bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] mt-[-2rem] border-[1px] border-main-purple rounded-[1rem]">
                                <div className="text-gray-700 p-[2rem] w-full">
                                    <div className="Signup1">
                                        <h3 className="text-3xl text-main-purple self-center">Finalized Investment</h3>
                                        <div className="mt-6">
                                            <div className="row2 flex flex-row flex-wrap gap-5 justify-center">
                                                <div className='flex justify-center'>    
                                                    <div>
                                                        <Card className="w-80">
                                                            <CardHeader floated={false} className="h-60">    
                                                                <img
                                                                    src={`data:application/pdf;base64,${entrepreneurpic}`}
                                                                    width="100%"
                                                                    alt="profile-picture"/>
                                                            </CardHeader>
                                                            <CardBody className="text-center">
                                                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                                                    {item.id.listingId.entrepreneurId.firstname} {item.id.listingId.entrepreneurId.lastname }
                                                                </Typography>
                                                                <Typography color="blue-gray" className="font-medium" textGradient>
                                                                    Entrepreneur
                                                                </Typography>
                                                            </CardBody>
                                                            
                                                        </Card>
                                                    </div>
                                                    <div>
                                                    <Card className="w-80 ml-10">
                                                            <CardHeader floated={false} className="h-60">
                                                                <img
                                                                    src={`data:application/pdf;base64,${investorpic}`}
                                                                    width="100%"
                                                                    alt="profile-picture"/>
                                                            </CardHeader>
                                                            <CardBody className="text-center">
                                                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                                                    {item.id.investorId.firstname} {item.id.investorId.lastname}
                                                                </Typography>
                                                                <Typography color="blue-gray" className="font-medium" textGradient>
                                                                    Investor
                                                                </Typography>
                                                            </CardBody>
                                                            
                                                        </Card>

                                                    </div>
                                                </div>
                                                <div>
                                                    <Card className="w-full shadow-lg p-6 border-2 border-main-purple mt-2 ml-5">
                                                    <p className="text-main-purple justify-center flex font-extrabold text-2xl">
                                                        Finalized Offerings
                                                    </p>
                                                        <label htmlFor="seek"
                                                            className="text-main-gray block mb-2 text-[14px] font-extrabold mt-5 text-lg">
                                                            Investing amount (Rs.) : <span
                                                            className='font-black font-extrabold text-base'>{item.amountFinalized}</span>
                                                        </label>
                                                        <label htmlFor="seek"
                                                            className="text-main-gray block mb-2 mt-5 text-[14px] font-extrabold text-lg">
                                                            Returns as a percentage
                                                        </label>
                                                        <div>
                                                            <label htmlFor="seek"
                                                                className="text-main-gray block mb-2 text-[14px] ml-4 text-base text-base">
                                                                Equity : <span className='font-black font-extrabold text-base'>{item.returnEquityPercentage}%</span>
                                                            </label>
                                                            <label htmlFor="seek"
                                                                className="text-main-gray block mb-2 text-[14px] ml-4 text-base">
                                                                Profit per unit : <span className='font-black font-extrabold text-base'>{item.returnUnitProfitPercentage} %</span>
                                                            </label>
                                                        </div>
                                                        
                                                        <div className='flex flex-row'>
                                                            <div className="document-container w-full mt-10">  
                                                                <p><strong>Entrepreneur side agreement</strong></p>
                                                                <p>
                                                                <iframe
                                                                    src={`data:application/pdf;base64,${pdfs.entrepreneurDoc}`}
                                                                    width="88%"
                                                                    height="520px"
                                                                    title="Police Report"
                                                                ></iframe>
                                                                <br></br>
                                                                </p>
                                                            </div>
                                                            <div className="document-container w-full ml-10 mt-10">  
                                                                <p><strong>Investor side agreement</strong></p>
                                                                <p>
                                                                <iframe
                                                                    src={`data:application/pdf;base64,${pdfs.investorDoc}`}
                                                                    width="88%"
                                                                    height="520px"
                                                                    title="Police Report"
                                                                ></iframe>
                                                                <br></br>
                                                                </p>
                                                            </div>
                                                        </div>                                   
                                                    </Card>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        className="float-right mt-2"
                                        onClick={handleSubmit}
                                    >
                                        Mark as finished
                                    </Button>
                                </div>
                            </form>
                        </main>
                        {showSuccessNotification && (
                            <StatusPopUp
                            successTitle="Listing finalized successfully"
                            successMessage="You have successfully finalized the listing."
                            redirectUrl="/admin/view-finalizedListings"
                            />
                        )}
                    </Header>
                </div>
                ))
            ) : (
                <Header active="View Listing">
                <main className="h-auto flex justify-center items-center ">
                    <form
                        className="bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] mt-[-2rem] border-[1px] border-main-purple rounded-[1rem]">
                        <div className="text-gray-700 p-[2rem] w-full">
                            <div className="Signup1">
                                <h3 className="text-3xl text-main-purple self-center">Finalize Investment</h3>
                                <p className="text-main-purple">
                                    No finalized listings
                                </p>
                               
                            </div>
                        </div>
                    </form>
                </main>
            </Header>        
            )        
        );
}

export default FinalizeListingAdmin;
