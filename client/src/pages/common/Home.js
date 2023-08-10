import React from "react";
import {Button, Carousel, Navbar, Footer, Swiper} from "../webcomponent";
import {Avatar, Card, CardBody, CardHeader, Typography,} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

const Home = () => {

    const ListingCardDetails = [
        {
            image: "placeholder-1.png",
            title: "Title",
            owner: "Owner",
            description: "I found solution to all my design needs from Creative Tim. I use them as a freelancer in my hobby projects for fun! And its really affordable, very humble guys !!!"
        },
        {
            image: "placeholder-1.png",
            title: "Title",
            owner: "Owner",
            description: "I found solution to all my design needs from Creative Tim. I use them as a freelancer in my hobby projects for fun! And its really affordable, very humble guys !!!"
        },
        {
            image: "placeholder-1.png",
            title: "Title",
            owner: "Owner",
            description: "I found solution to all my design needs from Creative Tim. I use them as a freelancer in my hobby projects for fun! And its really affordable, very humble guys !!!"
        }
    ]

    const InvestorCardDetails = [
        {
            image: "placeholder-2.png",
            rating: 4,
            investor: "Regina Miles",
            description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
            designation: "Designer"
        },
        {
            image: "placeholder-2.png",
            rating: 5,
            investor: "Regina Miles",
            description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
            designation: "Designer"
        },
        {
            image: "placeholder-2.png",
            rating: 4,
            investor: "Regina Miles",
            description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
            designation: "Designer"
        }
    ]

    const renderStars = (rating) => {
        const filledStars = Math.floor(rating);
        const remainingStar = 5 - filledStars;

        const stars = [];

        for (let i = 0; i < filledStars; i++) {
            stars.push(
                <FontAwesomeIcon
                    icon={faStar}
                    className="text-yellow-700"
                    key={i}
                />
            );
        }

        for (let i = 0; i < remainingStar; i++) {
            stars.push(
                <FontAwesomeIcon
                    icon={faStar}
                    className="text-gray-300"
                    key={filledStars + i}
                />
            );
        }

        return stars;
    };

    const clients = [
        {
            id: "client-1",
            logo: "stripe.svg",
        },
        {
            id: "client-2",
            logo: "hooli.svg",
        },
    ];

    const navigate = useNavigate()

    return (

        <div className="flex flex-col justify-between items-center w-full overflow-hidden">

            <Navbar active="Home"/>

            <section className="flex justify-center items-start w-full px-[1rem] lg:px-[5rem] py-[2rem]">
                <Carousel
                    navigationActive="light-purple"
                    navigationInactive="white"
                >
                    <div
                        className="flex lg:flex-row flex-col bg-purple-400 p-[1rem] gap-[2rem] lg:gap-0 lg:p-[10rem] rounded-[1.75rem] bg-gradient-to-r from-[#dec7f6] to-[#c084fc] relative">
                        <div
                            className="flex flex-col justify-center items-center lg:items-start gap-[1.875rem] text-white lg:w-[548px] lg:h-fit w-auto">
                            <div className="text-[1rem] font-[700] tracking-[0.1px] leading-[1.5rem]">
                                SUMMER 2020
                            </div>
                            <h1 className="text-[3rem] sm:text-[4rem] font-[700] tracking-[0.1px] leading-[5rem]">
                                Investments
                            </h1>
                            <div className="text-[1.25rem] font-[400] tracking-[0.1px] leading-[1.875rem]">
                                We know how large objects will act, <br
                                className="sm:block hidden "
                            />
                                but things on a small scale.
                            </div>
                            <Button
                                type="button"
                                variant="primary"
                                className="hover:!bg-light-purple hover:!border-light-purple hover:!text-white !rounded-[2.5rem] w-[50%] !self-center lg:!self-start"
                            >
                                Browse Investments
                            </Button>
                        </div>
                        <div className="lg:absolute lg:w-[50%] top-[5rem] right-[5rem]">
                            <img src="/assets/images/investor-hero.png" alt="billing" className=""/>
                        </div>
                    </div>

                    <div
                        className="flex lg:flex-row flex-col bg-purple-400 p-[1rem] gap-[2rem] lg:gap-0 lg:p-[10rem] rounded-[1.75rem] bg-gradient-to-r from-[#334155] to-[#c084fc] relative">
                        <div
                            className="flex flex-col justify-center items-center lg:items-start gap-[1.875rem] text-white lg:w-[548px] lg:h-fit w-auto">
                            <div className="text-[1rem] font-[700] tracking-[0.1px] leading-[1.5rem]">
                                SUMMER 2020
                            </div>
                            <h1 className="text-[4rem] font-[700] tracking-[0.1px] leading-[5rem]">
                                Investors
                            </h1>
                            <div className="text-[1.25rem] font-[400] tracking-[0.1px] leading-[1.875rem]">
                                We know how large objects will act, <br
                                className="sm:block hidden "
                            />
                                but things on a small scale.
                            </div>
                            <Button
                                type="button"
                                variant="primary"
                                className="hover:!bg-light-purple hover:!border-light-purple hover:!text-white !rounded-[2.5rem] w-[50%] !self-center lg:!self-start"
                            >
                                Browse Investments
                            </Button>
                        </div>
                        <div className="flex justify-center lg:absolute lg:w-[50%] top-[4.1rem] right-[5rem]">
                            <img src="/assets/images/investment-hero.png" alt="billing" className="w-[80%] lg:w-auto"/>
                        </div>
                    </div>
                </Carousel>
            </section>

            <section className="flex flex-col lg:flex-row justify-center items-center w-full px-[5rem] py-[2rem]">
                {
                    clients
                        ? clients.map((client) => (
                            <div key={client.id}
                                 className="flex justify-center items-center w-[50%] sm:min-w-[192px] min-w-[240px] m-4">
                                <img src={"/assets/images/company/" + client.logo} alt="client_logo"
                                     className="sm:w-[92px] w-[100px] m-4"/>
                            </div>
                        ))
                        : null
                }
            </section>

            <section
                className="flex flex-col lg:flex-row gap-[1rem] justify-center items-center px-[1rem] py-[2rem] h-auto lg:h-[95vh] w-full">
                <div className="h-[95vh] lg:h-full w-full lg:w-[45%]">
                    <Card
                        shadow={false}
                        className="relative grid  h-full  items-end justify-start overflow-hidden text-start"
                    >
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
                        >
                            <div
                                className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50"/>
                        </CardHeader>
                        <CardBody className="relative justify-self-start p-0 mt-10">
                            <div className=" p-6 lg:mr-7 w-full" style={{backgroundColor: 'rgba(196 ,181, 253,0.7)'}}>
                                <Typography
                                    variant="h2"
                                    color="white"
                                    className="mb-6 text-[1.25] text-white font-[400] leading-[1.5]"
                                >
                                    Top investor Of the Week
                                </Typography>
                                <Button type="button"
                                        className="hover:!bg-transparent hover:!border-white hover:!text-white">
                                    EXPLORE NOW
                                </Button>

                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="flex flex-col gap-[1rem] h-[100vh] lg:h-full lg:w-[45%]">
                    <div className="h-full">

                        <Card
                            shadow={false}
                            className="relative grid h-full  items-end justify-start overflow-hidden text-start"
                        >
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80')] bg-cover bg-center"
                            >
                                <div
                                    className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50"/>
                            </CardHeader>
                            <CardBody className="relative justify-self-start p-0 mt-10">
                                <div className="p-6 lg:mr-7 "
                                     style={{backgroundColor: 'rgba(196 ,181, 253,0.7)'}}>


                                    <Typography
                                        variant="h2"
                                        color="white"
                                        className="mb-6 text-[1.25] text-white font-[400] leading-[1.5]"
                                    >
                                        Top investment Of the Week
                                    </Typography>
                                    <Button type="button"
                                            className="hover:!bg-transparent hover:!border-white hover:!text-white">EXPLORE
                                        NOW</Button>

                                </div>
                            </CardBody>
                        </Card>

                    </div>
                    <div className="h-full">

                        <Card
                            shadow={false}
                            className="relative grid  h-full items-end justify-start overflow-hidden text-start"
                        >
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center"
                            >
                                <div
                                    className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50"/>
                            </CardHeader>
                            <CardBody className="relative justify-self-start p-0 mt-10">
                                <div className=" p-6 lg:mr-7 " style={{backgroundColor: 'rgba(196 ,181, 253,0.7)'}}>


                                    <Typography
                                        variant="h2"
                                        color="white"
                                        className="mb-6 text-[1.25] text-white font-[400] leading-[1.5]"
                                    >
                                        Top entrepreneur of the Week
                                    </Typography>
                                    <Button type="button"
                                            className="hover:!bg-transparent hover:!border-white hover:!text-white">EXPLORE
                                        NOW</Button>
                                </div>
                            </CardBody>
                        </Card>

                    </div>
                </div>
            </section>

            <section className="flex flex-col justify-center items-center py-[2rem] gap-[1rem] w-full">
                <div className="grid justify-items-center">
                    <p className="font-normal text-main-gray text-[1.25rem] tracking-[0.2px] leading-[30px]">
                        <span className="text-gray-500">Featured Start-ups</span>
                    </p>
                    <p className="font-[700] text-black uppercase text-[1.5rem] tracking-[0.1px] leading-[32px]">
                        <span className=" font-semibold">Popular Investments</span>
                    </p>
                    <p className="font-normal text-main-gray text-[1rem] tracking-[0.2px] leading-[20px]">
                        <span className="text-gray-500">Problems trying to resolve the conflict between </span>
                    </p>
                </div>
                <Swiper>
                    {ListingCardDetails.map((item, index) => (
                        <Card color="white" shadow={true} key={index}
                              className="justify-center overflow-hidden text-center gap-[1.5rem] my-[2rem] rounded-[1.25rem]">
                            <CardBody className="flex flex-col lg:flex-row justify-between p-[1.5rem]">
                                <img src={`/assets/images/${item.image}`} alt="placeholder"
                                     className="rounded-[1.25rem] w-[20.5rem] h-[18.75rem] lg:w-[12.5rem] lg:h-[25.125rem]"/>
                                <div className="flex flex-col items-start self-stretch gap-[1rem] p-[1.5rem]">
                                    <div className="flex justify-between items-center w-full">
                                        <Typography
                                            className="text-[1.5rem] font-[700] text-main-purple uppercase tracking-[2px]">
                                            {item.title}
                                        </Typography>
                                        <div
                                            className="flex items-center gap-[5px] p-[5px] rounded-[1.25rem] bg-gray-900">
                                            <FontAwesomeIcon icon={faStar} className="text-yellow-700"/>
                                            <Typography
                                                className="text-[0.75rem] font-[400] tracking-[0.2px] leading-[1rem] text-white">4.9</Typography>
                                        </div>
                                    </div>
                                    <Typography
                                        className="text-[1rem] font-[400] text-light-purple tracking-[0.2px] leading-[1.5rem]">
                                        {item.owner}
                                    </Typography>
                                    <Typography className="w-[14rem] text-justify">
                                        {item.description}
                                    </Typography>
                                    <Button
                                        type="button"
                                        variant="clear"
                                        icon="next"
                                        className="!rounded-[2.5rem]"
                                    >
                                        Read More
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                    }
                </Swiper>
                <div className="flex flex-col lg:hidden gap-[2rem] px-[2rem] mb-[1rem]">
                    {ListingCardDetails.map((item, index) => (
                        <Card color="white" shadow={true} key={index}
                              className="justify-center overflow-hidden text-center gap-[1.5rem] rounded-[1.25rem]">
                            <CardBody className="flex flex-col lg:flex-row justify-between p-[1.5rem]">
                                <img src={`/assets/images/${item.image}`} alt="placeholder"
                                     className="rounded-[1.25rem] w-[100%] h-[18.75rem]"/>
                                <div className="flex flex-col items-start self-stretch gap-[1rem] p-[1.5rem]">
                                    <div className="flex justify-between items-center w-full">
                                        <Typography
                                            className="text-[1.5rem] font-[700] text-main-purple uppercase tracking-[2px]">
                                            {item.title}
                                        </Typography>
                                        <div
                                            className="flex items-center gap-[5px] p-[5px] rounded-[1.25rem] bg-gray-900">
                                            <FontAwesomeIcon icon={faStar} className="text-yellow-700"/>
                                            <Typography
                                                className="text-[0.75rem] font-[400] tracking-[0.2px] leading-[1rem] text-white">4.9</Typography>
                                        </div>
                                    </div>
                                    <Typography
                                        className="text-[1rem] font-[400] text-light-purple tracking-[0.2px] leading-[1.5rem]">
                                        {item.owner}
                                    </Typography>
                                    <Typography className="lg:w-[14rem] text-justify">
                                        {item.description}
                                    </Typography>
                                    <Button
                                        type="button"
                                        variant="clear"
                                        icon="next"
                                        className="!rounded-[2.5rem]"
                                    >
                                        Read More
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                    }
                </div>
                <Button
                    type="button"
                    variant="clear"
                    icon="next"
                    onClick={() => navigate('/login')}
                    className="!rounded-[2.5rem] !self-center">VIEW MORE</Button>
            </section>

            <section className="flex flex-col justify-center items-center py-[2rem] gap-[1rem] w-full">
                <div className="grid justify-items-center">
                    <p className="font-normal text-main-gray text-[1.25rem] tracking-[0.2px] leading-[30px]">
                        <span className="text-gray-500">Featured Investors</span>
                    </p>
                    <p className="font-[700] text-black uppercase text-[1.5rem] tracking-[0.1px] leading-[32px]">
                        <span className=" font-semibold">Popular Investors</span>
                    </p>
                    <p className="font-normal text-main-gray text-[1rem] tracking-[0.2px] leading-[20px]">
                        <span className="text-gray-500">Problems trying to resolve the conflict between </span>
                    </p>
                </div>
                <Swiper>
                    {InvestorCardDetails.map((item, index) => (
                        <Card color="white" shadow={true} key={index}
                              className="justify-center overflow-hidden text-center gap-[1.5rem] my-[2rem] rounded-[1.25rem]">
                            <CardBody className="flex flex-col lg:flex-row items-center justify-between p-[1.5rem]">
                                <img src={`/assets/images/${item.image}`} alt="placeholder"
                                     className="rounded-[1.25rem] w-[14rem] h-[13.25rem]"/>
                                <div className="flex flex-col items-start self-stretch gap-[1rem] p-[1.5rem]">
                                    <div className="flex justify-between items-center w-full">
                                        {renderStars(item.rating)}
                                    </div>
                                    <Typography
                                        className="w-[14rem] text-[0.875] font-[400] tracking-[0.2px] leading-[1.25rem] text-justify">
                                        {item.description}
                                    </Typography>
                                    <Typography
                                        className="text-[1.5rem] text-[#252B42] font-[700] tracking-[0.1px] leading-[1.5rem]">
                                        {item.investor}
                                    </Typography>
                                    <Typography
                                        className="text-[1rem] text-main-purple font-[400] tracking-[0.2px] leading-[1rem]">
                                        {item.designation}
                                    </Typography>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                    }
                </Swiper>
                <div className="flex flex-col lg:hidden gap-[2rem] px-[2rem] mb-[1rem]">
                    {InvestorCardDetails.map((item, index) => (
                        <Card color="white" shadow={true} key={index}
                              className="justify-center overflow-hidden text-center gap-[1.5rem] rounded-[1.25rem]">
                            <CardBody className="flex flex-col lg:flex-row items-center justify-between p-[1.5rem]">
                                <div className="flex flex-col items-center self-stretch gap-[1rem] p-[1.5rem]">
                                    <div className="flex justify-between items-center w-full">
                                        {renderStars(item.rating)}
                                    </div>
                                    <Typography
                                        className="lg:w-[14rem] text-[0.875] font-[400] tracking-[0.2px] leading-[1.25rem] text-center">
                                        {item.description}
                                    </Typography>
                                    <div className="flex flex-row items-center gap-[0.5rem]">
                                        <Avatar
                                            size="lg"
                                            variant="circular"
                                            src={`/assets/images/${item.image}`}
                                            alt="candice wu"
                                            className=" items-center w-[5rem] h-[5rem]"
                                        />
                                        <div className="flex flex-col items-start gap-[0.5rem]">
                                            <Typography
                                                className="text-[1.5rem] text-[#252B42] font-[700] tracking-[0.1px] leading-[1.5rem]">
                                                {item.investor}
                                            </Typography>
                                            <Typography
                                                className="text-[1rem] text-main-purple font-[400] tracking-[0.2px] leading-[1rem]">
                                                {item.designation}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                    }
                </div>
                <Button
                    type="button"
                    variant="clear"
                    icon="next"
                    onClick={() => navigate('/login')}
                    className="!rounded-[2.5rem] !self-center">VIEW MORE</Button>
            </section>

            <section className="flex flex-col justify-center items-center py-[2rem] gap-[1rem] w-full">
                <div className="grid justify-items-center">
                    <p className="font-normal text-main-gray text-[1.25rem] tracking-[0.2px] leading-[30px]">
                        <span className="text-gray-500">Start  your journey with us</span>
                    </p>
                    <p className="font-[700] text-black uppercase text-[1.5rem] tracking-[0.1px] leading-[32px]">
                        <span className=" font-semibold">Categories</span>
                    </p>
                    <p className="font-normal text-main-gray text-[1rem] tracking-[0.2px] leading-[20px]">
                        <span className="text-gray-500">Problems trying to resolve the conflict between </span>
                    </p>
                </div>
                <div
                    className="flex justify-center items-center text-center flex-wrap m-7 bg-[#efefef] w-full p-[5rem] gap-[2rem] lg:gap-[4rem]">
                    <div
                        className="rounded-[1.75rem] shadow-lg bg-gray-600 flex flex-row flex-wrap p-3 bg-no-repeat h-[16rem] w-[28rem] bg-cover bg-blend-multiply bg-[url('http://localhost:3000/assets/images/investments-home-category.png')] bg-bottom">
                        <div className="w-full px-3 flex flex-row flex-wrap justify-end content-center">
                            <div
                                className="flex flex-col items-start gap-[0.5rem] font-semibold">
                                <div className="text-2xl text-white leading-tight">Investments</div>
                                <Button
                                    variant="primary"
                                    className="hover:!border-light-purple hover:!bg-light-purple hover:!text-white"
                                >
                                    EXPLORE
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="rounded-[1.75rem] shadow-lg bg-gray-600 flex flex-row flex-wrap p-3 bg-no-repeat h-[16rem] w-[28rem] bg-cover bg-blend-multiply bg-[url('http://localhost:3000/assets/images/investor-home-category.png')]">
                        <div className="w-full px-3 flex flex-row flex-wrap justify-end content-center">
                            <div className="flex flex-col items-start gap-[0.5rem] font-semibold">
                                <div className="text-2xl text-white leading-tight">Investors</div>
                                <Button
                                    variant="primary"
                                    className="hover:!border-light-purple hover:!bg-light-purple hover:!text-white"
                                >
                                    EXPLORE
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col justify-center items-center py-[2rem] gap-[1rem] w-full">
                <div className="grid justify-items-center">
                    <p className="font-normal text-main-gray text-[1.25rem] tracking-[0.2px] leading-[30px]">
                        <span className="text-gray-500">Our Featured Services</span>
                    </p>
                    <p className="font-[700] text-black uppercase text-[1.5rem] tracking-[0.1px] leading-[32px]">
                        <span className=" font-semibold">The Best Services</span>
                    </p>
                    <p className="font-normal text-main-gray text-[1rem] tracking-[0.2px] leading-[20px]">
                        <span className="text-gray-500">Problems trying to resolve the conflict between </span>
                    </p>
                </div>
                <div
                    className="flex justify-center justify-items-center items-start text-center flex-wrap w-full lg:gap-[2rem]">
                    <div className="flex flex-col items-center gap-[1.25rem] py-[2.5rem] w-[17.5rem]">
                        <img src="/assets/images/company/Easywins.svg" alt="alt"/>
                        <p className="font-[700] text-[1.5rem] leading-[32px] tracking-[0.1px]">
                            <span className=" font-semibold">Easy Wins</span>
                        </p>
                        <p className="font-normal text-main-gray text-[1rem] leading-[20px] tracking-[0.2px]">
                            <span className="text-gray-500">Get your best looking smile now! </span>
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-[1.25rem] py-[2.5rem] w-[17.5rem]">
                        <img src="/assets/images/company/Concrete.svg" alt="alt"/>
                        <p className="font-[700] text-[1.5rem] leading-[32px] tracking-[0.1px]">
                            <span className=" font-semibold">Concrete</span>
                        </p>
                        <p className="font-normal text-main-gray text-[1rem] leading-[20px] tracking-[0.2px]">
                            <span className="text-gray-500">Defalcate is most focused in helping you discover your most beautiful smile</span>
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-[1.25rem] py-[2.5rem] w-[17.5rem]">
                        <img src="/assets/images/company/Hackgrowth.svg" alt="alt"/>
                        <p className="font-[700] text-[1.5rem] leading-[32px] tracking-[0.1px]">
                            <span className=" font-semibold">Hack Growth</span>
                        </p>
                        <p className="font-normal text-main-gray text-[1rem] leading-[20px] tracking-[0.2px]">
                            <span className="text-gray-500">Overcame any hurdle or any other problem.</span>
                        </p>
                    </div>
                </div>
            </section>

            <Footer/>

        </div>

    )

}

export default Home
