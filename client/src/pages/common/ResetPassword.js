import React, {useEffect, useState} from "react";
import {Avatar, Card, CardBody, CardHeader, Carousel, Typography} from "@material-tailwind/react";
import axios from "../../api/axios";
import {useParams, useNavigate} from "react-router-dom";
import { Navbar, Footer, Input, Button } from "../webcomponent";


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ForgotPassword = () => {

    const {token} = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState({"State": "", "Message": ""});

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState({"State": "", "Message": ""});

    const [buttonDisable, setButtonDisable] = useState(false);

    const [successMsg, setSuccessMsg] = useState({});
    const [errorMsg, setErrorMsg] = useState({});

    useEffect(() => {

        const expiration = JSON.parse(atob(token.split('.')[1])).exp;
        const currentTime = Math.floor(Date.now() / 1000);
        if (expiration < currentTime) {
            setErrorMsg('Token Expired');
        }

        const checkToken = async () => {
            const response = await axios.post('/auth/reset-password/' + token,
                JSON.stringify({password: 'Token Check'}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            if (response?.data?.status === "Error") {
                setErrorMsg(response?.data?.message);
            }
        }

        checkToken().then();

    }, [])

    useEffect(() => {
        let flag = PWD_REGEX.test(password);
        setButtonDisable(!flag);
        setValidPassword({State: (flag || !password) ? "Valid" : "Invalid", Message: "Invalid Password"});
        setErrorMsg('');
    }, [password])

    useEffect(() => {

        if (!confirmPassword) {
            setValidConfirmPassword({"State": "", "Message": ""});
            return;
        }

        let flag = (password === confirmPassword);
        setButtonDisable(!flag);
        setValidConfirmPassword({State: (flag) ? "Success" : "Invalid", Message: (flag) ? "" : "Password Mismatch"});
        setErrorMsg('');
    }, [confirmPassword])

    useEffect(() => {

    }, [errorMsg])

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!PWD_REGEX.test(password)) {
            console.log("Invalid Entry");
            return;
        }

        try {

            const response = await axios.post('/auth/reset-password/' + token,
                JSON.stringify({password}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            setPassword('');
            setConfirmPassword('');

            navigate({pathname: '/login'}, {replace: true});

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
                            Reset Your Password
                        </Typography>
                        {errorMsg === "Token Expired" ?
                            <Typography variant="h5"
                                        className={`text-[1rem] md:text-[1rem] font-[400] text-main-purple mb-[2rem]`}>
                                Reset Link is Expired
                            </Typography>
                            : null}
                        {errorMsg === "Token Expired" ?
                            null
                            :
                            <form
                                className={`mt-2 mb-2 max-w-screen-lg w-full ${errorMsg === "Token Expired" ? "hidden" : ""}`}
                                onSubmit={handleSubmit}>
                                <div className="flex flex-col lg:flex-row gap-[0.75rem] items-center">
                                    <Input
                                        type="password"
                                        label="New Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password || ''}
                                        state={validPassword}
                                        required
                                    />
                                    <Input
                                        type="password"
                                        label="Confirm Password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        value={confirmPassword || ''}
                                        state={validConfirmPassword}
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