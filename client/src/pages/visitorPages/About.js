import React from "react";
import NavbarHome from "../webcomponent/NavbarHome";
import hero from "../../assets/images/hero.png";
import chris from "../../assets/images/chris.jpg";
import entlogo1 from "../../assets/images/entlogo1.png";
import entlogo2 from "../../assets/images/entlogo2.png";
import entlogo3 from "../../assets/images/entlogo3.png";
import entlogo4 from "../../assets/images/entlogo4.png";
import entlogo5 from "../../assets/images/logo5.png";
import logo from "../../assets/images/VentureVerse-Black.png";
import button from "../webcomponent/Button";
function Jumbotron() {
    // do something to the image
    return (
        <div className={'w-full bg-main-purple py-16 px-14'}>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                <div className='flex flex-col justify-center'>
                    <div className="text-white">
                        <h2 className="mb-4 md:text-7xl sm:text-5xl text-4xl font-bold md:py-6">About us</h2>
                        <h4 className="mb-6 md:text-2xl sm:text-xl text-4xl font-semibold ">Unlocking Opportunities by Connecting dreams </h4>
                    </div>
                </div>
                <img className='w-[600px] mx-auto my-4' src={hero} alt='/' />
            </div>
        </div>
    );
}
const Cards = () => {
    const stats = [
        {num : '150k', des:'Happy Entrepreneurs'},
        {num : '15k', des:'Happy Investors'},
        {num : '10k', des:'Monthly Visitors'},
        {num : '100+', des:'Partners'},
    ]
    return (
        <div className='w-full py-[1rem] px-4 bg-white mt-10'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-4 gap-8 '>
                {stats.map((number,index) =>
                    (
                        <div className='w-full flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                            <p className='text-center text-4xl font-bold'>{number.num}</p>
                            <p className='text-center text-sm '>{number.des}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )}
const Video1 = () => {
    // try to loop the video or play related videos
        return (
            <div className="mx-44 mt-10">
            <div className="embed-responsive bg-light-purple rounded-3xl embed-responsive-21by9 relative w-full overflow-hidden" style={{ paddingTop: '42.857143%' }}>
                <iframe
                    className="embed-responsive-item absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-3xl"
                    src="https://www.youtube.com/embed/h-KHWUq3B7I"
                    allowFullScreen
                    data-gtm-yt-inspected-2340190_699="true"
                    id="240632615"
                ></iframe>
            </div>
            </div>
        );
}

const OurTeam = () => {
    const teamMembers = [
        { name: 'Pasindu Fernando', image: chris },
        { name: 'Nadeesha Epa', image: chris },
        { name: 'Samidu Cooray', image: chris },
        { name: 'Kavishka Fernando', image: chris },
        { name: 'Pamith Welikala', image: chris },
        { name: 'Chris M. Perera', image: chris },
    ];
    return (
        <div className='w-full py-[1rem] px-4 bg-white mt-10'>
            <div className="text-center">
                <h2 className="mb-4 md:text-3xl sm:text-xl text-4xl font-bold md:py-1">Meet Our Team</h2>
                <h4 className="mb-6 md:text-xl font-semibold text-main-gray">Our Commitment is for your Success</h4>
            </div>
            <div className='w-full py-[1rem] px-4 bg-white flex justify-center items-center  '>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8 justify-center items-center' >
                {teamMembers.map((member, index) => (
                    <div key={index} className="flex justify-center items-center flex-col w-48 h-auto rounded-xl bg-main-gray hover:scale-105 duration-300">
                        <div className="relative overflow-hidden bg-cover bg-no-repeat">
                            <img className="w-48 h-auto rounded-t-xl" src={member.image} alt="/" />
                        </div>
                        <div className="p-6">
                            <h5 className="text-center text-xl text-white font-bold">{member.name}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
            </div>
    );
};

const EnterpriseInvestors = () => {
    const logos = [
        {Image: entlogo1},
        {Image: entlogo2},
        {Image: entlogo3},
        {Image: entlogo4},
        {Image: entlogo5},
    ]
    return (
        <div className='w-full py-[1rem] px-4 bg-white mt-10'>
            <div className="text-center">
                <h2 className="mb-4 md:text-3xl sm:text-xl text-4xl font-bold md:py-1">Enterprise Investors</h2>
                <h4 className="mb-6 md:text-xl font-semibold text-main-gray">Our esteemed collaborations with renowned investors</h4>
            </div>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-5 gap-8 justify-center items-center'>
                {logos.map((img,index) =>
                    (
                        <img className="w-48 text-center content-center" src={img.Image} alt="logo" />
                    )
                )}
            </div>
        </div>
    )}

const JoinUs = () => {
    return (
        <div className='w-full justify-center items-center py-16 px-4 mt-10 border-2 bg-light-purple'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-black font-bold '>Join Us Now</p>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Register with us to Unlock Your Opportunities</h1>
                    <p>
                        Join our platform and gain access to a vibrant network of investors and entrepreneurs.
                        Discover exciting projects, showcase your own ideas, and foster meaningful connections that can propel your business forward.
                        Don't miss out on the chance to unlock your potential and seize opportunities for growth and success.
                        Register now and embark on an exciting entrepreneurial journey with us.
                    </p>
                    <button className='bg-black text-white w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Get Started</button>
                </div>
                <img className='w-[500px] mx-auto my-4' src={logo} alt='/' />
            </div>
        </div>
    );
};

const ContactUs = () =>{
    return (
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
            <div>
                <h2 className="mb-4 md:text-7xl sm:text-5xl text-4xl font-bold md:py-6 m-44 p-6">Contact Us</h2>
            </div>
            <div className='max-w-[1240px] mx-auto  md:grid-cols-2 flex flex-col m-48'>
                <div>
                    <h2 className="mb-4 md:text-3xl sm:text-xl text-4xl font-bold md:py-1">Telephone</h2>
                    <h4 className="mb-6 md:text-xl font-semibold text-main-gray">+94770562741</h4>
                </div>
                <div>
                    <h2 className="mb-4 md:text-3xl sm:text-xl text-4xl font-bold md:py-1">Email</h2>
                    <h4 className="mb-6 md:text-xl font-semibold text-main-gray">ventureverse@gmail.com</h4>
                </div>


            </div>
        </div>
    )
}




function About(){
    return(
        <div>
        <NavbarHome/>
            <Jumbotron/>
            <Cards/>
            <Video1/>
            <OurTeam/>
            <EnterpriseInvestors/>
            <JoinUs/>
            <ContactUs/>
        </div>


    )
}
export default About;