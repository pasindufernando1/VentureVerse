import React from "react";
import {Navbar, Footer} from "../webcomponent";
import {Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faCircle} from "@fortawesome/free-solid-svg-icons";

function Signup() {
    return (

        <div className="flex flex-col justify-between items-center w-full overflow-hidden">

            <Navbar active="Sign Up"/>
            <section className="flex flex-col md:flex-row w-full ">
                <div className="flex flex-col justify-center items-center w-full lg:w-[50%] gap-[2.5rem] my-[5rem]">
                    <div className="flex flex-col justify-center items-center w-[80%] lg:w-full">
                        <Typography
                            className="font-normal text-main-purple text-[1.25rem] tracking-[0.2px] leading-normal">
                            Sign Up To
                        </Typography>
                        <Typography
                            className="font-[700] text-black uppercase text-[2.5rem] tracking-[0.8px] leading-normal">
                            Venture Verse
                        </Typography>
                        <Typography
                            className="font-normal text-main-purple text-[1rem] tracking-[0.2px] leading-normal text-center">
                            Are you seeking for an investment or looking for an investor for your business ?
                        </Typography>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full gap-[1rem]">
                        <Link to="/signup/individual-investor" className="flex flex-row justify-between rounded-[1rem] border border-light-purple cursor-pointer transform transition-all hover:scale-105 duration-300 hover:border-main-purple p-[1rem]  w-[90%] lg:w-[38rem]">
                            <div className="flex flex-col items-start">
                                <Typography className="font-[600] text-[1.25rem] tracking-[0.4px] leading-normal">
                                    I’m an Investor
                                </Typography>
                                <Typography className="font-[300] text-[1rem] tracking-[0.32px] leading-normal">
                                    I’m looking for a  good investment opportunity
                                </Typography>
                            </div>
                        </Link>
                        <Link to="/signup/entrepreneur" className="flex flex-row justify-between rounded-[1rem] border border-light-purple cursor-pointer transform transition-all hover:scale-105 duration-300 hover:border-main-purple p-[1rem] w-[90%] lg:w-[38rem]">
                            <div className="flex flex-col items-start">
                                <Typography className="font-[600] text-[1.25rem] tracking-[0.4px] leading-normal">
                                    I’m an Entrepreneur
                                </Typography>
                                <Typography className="font-[300] text-[1rem] tracking-[0.32px] leading-normal">
                                    I’m looking for an investor to invest on my business
                                </Typography>
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full">
                        <Typography
                            className="font-normal text-main-purple text-[1rem] tracking-[0.32px] leading-normal">
                            Already have an account?
                            <Link
                                className="font-[500] text-main-purple text-[1.25rem] tracking-[0.4px] leading-normal ml-[0.2rem]"
                                to="/Login">Sign in</Link>
                        </Typography>
                    </div>
                </div>
                <div className="signup w-[50%] p-[6rem]">
                    <div className="flex flex-col justify-center items-center gap-[1rem] bg-main-purple/40 p-[2rem]">
                        <Typography className="font-[400] text-white text-[1rem] tracking-[0.4px] leading-normal italic">
                            "Venture Verse is the ultimate platform for connecting entrepreneurs and investors. We have been truly amazed by the caliber of individuals using our platform. The level of talent and expertise showcased by our users is outstanding. Join Venture Verse today and experience the unparalleled opportunity to discover exceptional entrepreneurs and connect with visionary investors."
                        </Typography>
                        <Typography className="font-[600] text-main-gray text-[1rem] tracking-[0.32px] leading-normal">
                            -- Pasindu Fernando --
                        </Typography>
                        <Typography className="font-[400] text-white text-[1rem] tracking-[0.32px] leading-normal italic">
                            CEO, VentureVerse.com
                        </Typography>
                    </div>
                </div>
            </section>
            <Footer/>

        </div>

    );
}

export default Signup;