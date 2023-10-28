import React, {useEffect, useState} from 'react';
import {Button, Textarea, Header,StatusPopUp} from "../webcomponent";
import useAxiosMethods from '../../hooks/useAxiosMethods';
import Modal from "react-modal";
import Terms from "../common/Terms";
import useAuth from "../../hooks/useAuth";
import { useParams } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip
} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {Input,Checkbox} from "../webcomponent";



function FinalizeListingInvestor() {
    const {put,post} = useAxiosMethods();
    const[response, setResponse] = useState([]);
    const[response1, setResponse1] = useState([]);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const {auth} = useAuth();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        amountOffered: "",
        equityExpected: "",
        profitPerUnitExpected: "",
        agreement: "",
    });

    const handledocumentUpload = (event) => {
        const { name, files } = event.target;
        setFormData({ ...formData, [name]: files[0]});
    };
    const investor = auth.id;
    const listing=parseInt(id);

    const listing_data=[];
    listing_data[0]=listing;
    listing_data[1]=investor;

    const requestData = {
        amountFinalized: formData.amountOffered,
        returnEquityPercentage: formData.equityExpected,
        returnUnitProfitPercentage: formData.profitPerUnitExpected,
        investorProofDocument: formData.agreement,
        status: "Investor_Finalized"
    };

    console.log(requestData);

    const finalizeListing = async () => {
        const formData = new FormData();

        const agreementName =  Date.now() + Math.random() + requestData.investorProofDocument.name;
        formData.append("agreement", requestData.investorProofDocument, agreementName);
        post("/investors/upload", formData, setResponse, true);

        requestData.investorProofDocument = agreementName;
        put(`/investors/finalizeListing/${listing_data}`,requestData,setResponse1);

        setShowSuccessNotification(true);

    };

    console.log(response);

    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <Header active="Interests">
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
                                            <Card className="w-80">
                                                <CardHeader floated={false} className="h-80">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                                                        alt="profile-picture"/>
                                                </CardHeader>
                                                <CardBody className="text-center">
                                                    <Typography variant="h4" color="blue-gray" className="mb-2">
                                                        Ajith Epa
                                                    </Typography>
                                                    <Typography color="blue-gray" className="font-medium" textGradient>
                                                        Lanka Apparels
                                                    </Typography>
                                                </CardBody>

                                            </Card>

                                        </div>
                                        <div>
                                            <Card className="w-full shadow-lg p-6 border-2 border-main-purple  mt-2 ml-5">
                                                <p className="text-main-purple justify-center flex font-extrabold">
                                                    Finalize investment
                                                </p>
                                                <label htmlFor="seek" className="text-main-gray block mb-2 text-[14px] mt-2 font-extrabold">
                                                    I am offering (Rs) :
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="seek"
                                                    className="w-full"
                                                    required={true}
                                                    value={formData.amountOffered}
                                                    onChange={(event) => {
                                                        setFormData({...formData, amountOffered: event.target.value});
                                                    }}
                                                />
                                                <label htmlFor="seek"
                                                       className="text-main-gray block mb-2 mt-5 text-[14px] font-extrabold">
                                                    And willing to take up (Should select at least one option) :

                                                </label>
                                                <div className="flex items-center mb-3">
                                                    <Input
                                                        type="text"
                                                        id="equityinput"
                                                        className="w-full mr-2"
                                                        value={formData.equityExpected}
                                                        onChange={(event) => {
                                                            setFormData({...formData, equityExpected: event.target.value});
                                                        }}
                                                    />
                                                    <Checkbox
                                                        label="On Equity"
                                                        name="equitybox"
                                                        id="equity"

                                                    />
                                                </div>
                                                <div className="flex items-center">
                                                    <Input
                                                        type="text"
                                                        id="profitinput"
                                                        className="w-full mr-2"
                                                        value={formData.profitPerUnitExpected}
                                                        onChange={(event) => {
                                                            setFormData({...formData, profitPerUnitExpected: event.target.value});
                                                        }}
                                                    />
                                                    <Checkbox
                                                        label="Profit per unit"
                                                        name="profitunit"
                                                        id="profitunitpercentage"


                                                    />
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
                                                    label="I agree to all terms and conditions."
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
                                onClick={finalizeListing}
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
                {showSuccessNotification && (
                    <StatusPopUp
                        successTitle="Listing finalized successfully"
                        successMessage="You have successfully finalized the listing."
                        redirectUrl="/investor/interests"
                    />
                )}
            </Header>
        </div>
    );
}

export default FinalizeListingInvestor;
