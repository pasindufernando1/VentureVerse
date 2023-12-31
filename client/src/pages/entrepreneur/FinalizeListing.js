import React, {useEffect, useState} from 'react';
import {Button, Textarea, Header,StatusPopUp} from "../webcomponent";
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
import useAuth from "../../hooks/useAuth";
import { useParams } from 'react-router-dom';


function FinalizeListing() {
    const {get, post,put} = useAxiosMethods();
    const[response, setResponse] = useState([]);
    const[response1, setResponse1] = useState([]);
    const[response2, setResponse2] = useState([]);
    const[investorpic, setinvestorpic] = useState([]);
    const[investorname, setinvestorname] = useState([]);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    var allinvestorid=[];
    var count=0;
    var count1=0;
    const {auth} = useAuth();
    // const { id } = useParams();

    const [formData, setFormData] = useState({
        agreement: "",
    });

    const handledocumentUpload = (event) => {
        const { name, files } = event.target;
        setFormData({ ...formData, [name]: files[0]});
    };

    const {id} = useParams();

    useEffect(() => {
        get(`/entrepreneurs/finalizeListings/${id}`, setResponse);
        get(`/entrepreneurs/getEntrepreneurPic/${allinvestorid}`, setinvestorpic);
        get(`/entrepreneurs/getInvestorName/${allinvestorid}`, setinvestorname);
    }, [response]);

    //useeffect to store data into image array
    response && response.map((item) => (
        allinvestorid.push(item.id.investorId.id)
    ));

    const requestData = {
        entrepreneurProofDocument:formData.agreement,
        status:"Entrepreneur_Finalized"
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        const agreementName =  Date.now() + Math.random() + requestData.entrepreneurProofDocument.name;
        formData.append("agreement", requestData.entrepreneurProofDocument, agreementName);
        post("/investors/upload", formData, setResponse2, true);

        requestData.entrepreneurProofDocument = agreementName;
        put(`/entrepreneurs/updatefinalizeListing/${id}`,requestData,setResponse1);

        setShowSuccessNotification(true);

    };
 
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        //if condition to check the size of the response array
        response.length > 0 ?(
            response && response.map((item) => (
                <div>
                    <Header active="View Listing">
                        <main className="h-auto flex justify-center items-center ">
                            <form
                                className="bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] mt-[-2rem] border-[1px] border-main-purple rounded-[1rem]">
                                <div className="text-gray-700 p-[2rem] w-full">
                                    <div className="Signup1">
                                        <h3 className="text-3xl text-main-purple self-center">Finalize Investment</h3>
                                        <p className="text-main-purple">
                                            Uploading the contractual agreement is a must
                                        </p>
                                        <div className="mt-6">
                                            <div className="row2 flex flex-row flex-wrap">
                                                <div>
                                                    <Card className="w-60">
                                                        <CardHeader floated={false} className="h-60">
                                                            <img
                                                                src={`data:application/pdf;base64,${investorpic[count++]}`}
                                                                width="100%"
                                                                alt="profile-picture"/>
                                                        </CardHeader>
                                                        <CardBody className="text-center">
                                                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                                                {investorname[count1++]}
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
                                                            className='font-black font-extrabold'>{item.amountFinalized}</span>
                                                        </label>
                                                        <label htmlFor="seek"
                                                               className="text-main-gray block mb-2 mt-5 text-[14px] font-extrabold">
                                                            Returns as a percentage
                                                        </label>
                                                        <div>
                                                            <label htmlFor="seek"
                                                                   className="text-main-gray block mb-2 text-[14px] ml-4">
                                                                Equity : <span className='font-black font-extrabold'>{item.returnEquityPercentage} %</span>
                                                            </label>
                                                            <label htmlFor="seek"
                                                                   className="text-main-gray block mb-2 text-[14px] ml-4">
                                                                Profit per unit : <span className='font-black font-extrabold'>{item.returnUnitProfitPercentage} %</span>
                                                            </label>
                                                        </div>
                                                        <div className="row">
                                                            <div className="file-input-container mt-2">
                                                                <label htmlFor="agreement"
                                                                       className="text-main-black block mb-1 text-[14px] font-extrabold">
                                                                    Please provide a copy of your contractual agreement. Use a
                                                                    scanned pdf file
                                                                    <span style={{color: 'red'}}>*</span>
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    id="agreement"
                                                                    name="agreement"
                                                                    accept=".pdf"
                                                                    className="hidden"
                                                                    onChange={handledocumentUpload}
                                                                    required={true}
                                                                />
                                                                <label htmlFor="agreement" className="file-input-button">
                                                                    Select File
                                                                </label>
                                                                <span className="file-input-text">
                                                            {formData.agreement ? formData.agreement.name : 'No file chosen'}
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
                                        onClick={handleSubmit}
                                    >
                                        Finalize
                                    </Button>
                                    <Button
                                        variant="clear"
                                        type="button"
                                        className="float-right mt-2 mr-2"
                                    >
                                        <Link to={`/entrepreneur/view-listing/${id}`}>Back</Link>
                                    </Button>
                                </div>

                            </form>
                        </main>
                        {showSuccessNotification && (
                            <StatusPopUp
                                successTitle="Listing finalized successfully"
                                successMessage="You have successfully finalized the listing."
                                redirectUrl="/entrepreneur/dashboard"
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
                                    Uploading the contractual agreement is a must
                                </p>
                                <p>
                                    You don't have any finalized listings yet.
                                </p>
                            </div>
                        </div>
                    </form>
                </main>
            </Header>
        )
    );
}

export default FinalizeListing;
