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
import {Link, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import { all } from 'axios';


function FinalizeListingAdmin() {
    const {get,put}=useAxiosMethods();
    const [response, setResponse] = useState([]);
    const [response1, setResponse1] = useState([]);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [pdf, setpdf] = useState([]);
    // const {id} = useParams();
    // const [pdf, setpdfEntrepreneur] = useState([]);
    const [pdf1, setpdfInvestor] = useState([]);
    const [entrepreneurpic, setentrepreneurpic] = useState([]);
    const [investorpic, setinvestorpic] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const allinvestorid = [];
    const allentrepreneurid = [];
    const allinvestorproofdoc = [];
    const allentrepreneurproofdoc = [];
    var investorfirstname = "";
    var investorlastname = "";
    var count=0;
    var counter1 = 0;
    var counter2 = 0;
    var counter3 = 0;
    var i=0;
    const {id} = useParams();

    useEffect(() => {
        get(`/entrepreneur/finalizeListing/${parseInt(id)}`, setResponse);
    }, []);

    useEffect(() => {
        get(`/entrepreneur/getpdf/${parseInt(id)}`, setpdf);
    }, []);

        const requestData = {
            finalizedDate: new Date()
        };


    // const handleSubmit = () => {
    //     put(`/entrepreneur/updateDate/${parseInt(id)}`,requestData,setResponse1);
    //     setShowSuccessNotification(true);
    // };
        const handleSubmit = (investorId) => {
            console.log(investorId);
            put(`/entrepreneur/updateDate/${id}/${investorId}`,requestData,setResponse1);
            setShowSuccessNotification(true);
        };

        console.log(requestData); 
        console.log(response1);

        //useeffect to store data into image array
        response && response.map((item) => (
            allinvestorid.push(item.id.investorId.id),
            allentrepreneurid.push(item.id.listingId.entrepreneurId.id),
            allinvestorproofdoc.push(item.investorProofDocument),
            allentrepreneurproofdoc.push(item.entrepreneurProofDocument)
        )) 

        useEffect(() => {
            get(`/entrepreneurs/getEntrepreneurPic/${allentrepreneurid}`, setentrepreneurpic);
        }, [response]);

        useEffect(() => {
            get(`/entrepreneurs/getEntrepreneurPic/${allinvestorid}`, setinvestorpic);
        }, [response]);

        useEffect(() => {
            get(`/entrepreneur/admingetPdf/${allentrepreneurproofdoc}`, setpdfEntrepreneur);
        }, [response]);

        useEffect(() => {
            get(`/entrepreneur/admingetPdf/${allinvestorproofdoc}`, setpdfInvestor);
        }, [response]);


        const getinvestorname = (item) => {
            if(item.id.investorId.firstname == null){
                investorfirstname = item.id.investorId.businessName;
                investorlastname = "";
            }else{
                investorfirstname = item.id.investorId.firstname;
                investorlastname = item.id.investorId.lastname;
            }
        }

        return (
            response.length > 0 ?(
                response && response.map((item) => (
                // fetchPdfsForResponse(item.id.listingId.listingId, item.id.investorId.id,counter1),
                getinvestorname(item),
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
                                                            <CardHeader floated={false}>    
                                                                <img
                                                                    src={`data:application/pdf;base64,${entrepreneurpic[counter2++]}`}
                                                                    width="100%"
                                                                    height="340px"
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
                                                            <CardHeader floated={false} className="h-70">
                                                                <img
                                                                    src={`data:application/pdf;base64,${investorpic[counter3++]}`}
                                                                    width="100%"
                                                                    height="340px"
                                                                    alt="profile-picture"/>
                                                            </CardHeader>
                                                            <CardBody className="text-center">
                                                                <Typography variant="h4" color="blue-gray" className="mb-2">                                                                
                                                                    {investorfirstname} {investorlastname}
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
                                                                    src={`data:application/pdf;base64,${pdf[counter1++]}`}
                                                                    width="88%"
                                                                    height="320px"
                                                                    title="Police Report"
                                                                ></iframe>
                                                                <br></br>
                                                                </p>
                                                            </div>
                                                            <div className="document-container w-full ml-10 mt-10">  
                                                                <p><strong>Investor side agreement</strong></p>
                                                                <p>
                                                                <iframe
                                                                    src={`data:application/pdf;base64,${pdf1[count++]}`}
                                                                    width="88%"
                                                                    height="320px"
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
                                        onClick={() => handleSubmit(allinvestorid[i++])}
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
