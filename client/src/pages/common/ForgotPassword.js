import React, {useEffect, useState} from "react";
import {Avatar, Card, CardBody, CardHeader, Carousel, Typography} from "@material-tailwind/react";

import { Navbar, Footer, Input, Button } from "../webcomponent";

import axios from "../../api/axios";

const EMAIL_REGEX = /^[A-z0-9-_]+@[A-z0-9-_]+\.[A-z]{2,}$/;

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState({"State": "", "Message": ""});

    const [buttonDisable, setButtonDisable] = useState(true);

    const [successMsg, setSuccessMsg] = useState({});
    const [errorMsg, setErrorMsg] = useState({});

    useEffect(() => {
        let flag = EMAIL_REGEX.test(email);
        setButtonDisable(!flag);
        setValidEmail({State: (flag || !email) ? "Valid" : "Invalid", Message: (flag || !email) ? "" : "Invalid Email"});
        setErrorMsg('');
    }, [email])

    useEffect(() => {
        if (Object.keys(errorMsg).length > 0) {
            setButtonDisable(true);
            setValidEmail({State: "Invalid", Message: errorMsg?.message});
            setErrorMsg('');
        }
    }, [errorMsg])

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!EMAIL_REGEX.test(email)) {
            console.log("Invalid Entry");
            return;
        }

        try {

            const response = await axios.post('/auth/forgot-password',
                JSON.stringify({email}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            setEmail('');
            setSuccessMsg(response?.data);

        } catch (err) {

            if (!err?.response) {
                setErrorMsg('No Server Response');
            } else if (err.response?.data?.status === "404") {
                setErrorMsg(err.response?.data?.message);
            }
        }

    }

    const CarouselItem = () => {
        return (
            <div>
                <Card color="white" shadow={false}
                      className="w-full h-full justify-center overflow-hidden text-center gap-[1.5rem] p-[2rem]">
                    <CardHeader
                        color="transparent"
                        floated={false}
                        shadow={false}
                        className="mx-0 flex justify-center items-center gap-4"
                    >
                        <Avatar
                            size="lg"
                            variant="circular"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            alt="candice wu"
                            className=" items-center w-[5rem] h-[5rem]"
                        />
                    </CardHeader>
                    <CardBody className="flex flex-col gap-[1rem] mb-6 p-0">
                        <Typography className="font-[700] capitalize">
                            Our top Entrepreneur
                        </Typography>
                        <Typography>
                            &quot;I found solution to all my design needs from Creative Tim. I use
                            them as a freelancer in my hobby projects for fun! And its really
                            affordable, very humble guys !!!&quot;
                        </Typography>
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Candice Wu
                            </Typography>
                            <Typography>
                                San Francisco, CA
                            </Typography>
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    }

    return (

        <div className="flex flex-col justify-between items-center w-full overflow-hidden">

            <Navbar/>

            <section
                className="flex flex-col md:flex-row  md:space-y-0 md:space-x-16 justify-items-center md:mx-0 m-20 lg:my-[5rem]">
                <div className="lg:flex hidden bg-[#c7d2fe] place-items-center">
                    <div className="max-w-lg p-10">
                        <Carousel
                            prevArrow={() => ("")}
                            nextArrow={() => ("")}
                            autoplay={true}
                            autoplayspeed={5000}
                            loop={true}
                            className="rounded-xl"
                            navigation={({setActiveIndex, activeIndex, length}) => (
                                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                                    {new Array(length).fill("").map((_, i) => (
                                        <span
                                            key={i}
                                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                                activeIndex === i ? "bg-main-purple w-8" : "bg-light-purple w-4"
                                            }`}
                                            onClick={() => setActiveIndex(i)}
                                        />
                                    ))}
                                </div>
                            )}
                        >
                            <CarouselItem/>
                            <CarouselItem/>
                            <CarouselItem/>

                        </Carousel>
                    </div>
                </div>
                <div className="my-130">
                    <Card color="transparent" className="items-center lg:items-start" shadow={false}>
                        <Typography variant="h4"
                                    className="text-[1.5rem] md:text-[2rem] font-[200] text-main-gray mb-[2rem]">
                            Forgot your VentureVerse Account password?
                        </Typography>
                        {successMsg?.status === "Success" ?
                            <Typography variant="h5"
                                        className={`text-[1rem] md:text-[1rem] font-[400] text-main-purple mb-[2rem]`}>
                                We have send you instructions on how to reset your password to your email.
                            </Typography>
                            : null}
                        {successMsg?.status === "Success" ?
                            null
                            :
                            <form
                                className={`mt-2 mb-2 max-w-screen-lg w-full ${successMsg?.status === "Success" ? "hidden" : ""}`}
                                onSubmit={handleSubmit}>
                                <div className="flex flex-col lg:flex-row gap-[0.75rem] items-center">
                                    <Input
                                        type="text"
                                        label="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email || ''}
                                        state={validEmail}
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        label="Submit"
                                        className="w-[30%]"
                                        disabled={buttonDisable}
                                    />
                                </div>
                            </form>
                        }
                    </Card>
                </div>
            </section>

            <Footer/>

        </div>

    )

}

export default ForgotPassword