import React from "react";
import { CommonNavbar, Footer, Swiper } from "../webcomponent";

const Home = () => {

    return (

        <div className="flex flex-col justify-between items-center w-full overflow-hidden bg-light-purple-700">

            <CommonNavbar active="Home"/>

            <Swiper />

            <Footer/>

        </div>

    )

}

export default Home