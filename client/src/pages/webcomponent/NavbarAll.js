import React from "react";
import {
    Navbar,
    Avatar,
} from "@material-tailwind/react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faBell,
    faMessage,
} from '@fortawesome/free-solid-svg-icons'

import logo from "../../assets/images/VentureVerse-Black.png";

const ProfileMenu = () => {

    return (<div className="flex items-center gap-[2rem]">
        <div className="dot like">
            <FontAwesomeIcon icon={faHeart} className="hover:!text-main-purple"/>
        </div>
        <div className="dot message">
            <FontAwesomeIcon icon={faMessage} className="hover:!text-main-purple"/>
        </div>
        <div className="dot notification">
            <FontAwesomeIcon icon={faBell} className="hover:!text-main-purple"/>
        </div>
        <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
    </div>);
}

const NavbarAll = () => {

    return (
        <Navbar className="mx-auto max-w-screen-xl px-4 py-2">
        <div className="flex items-center justify-between text-blue-gray-900">
            <img src={logo} className="w-[6rem] h-[2.5rem]" alt="Logo"/>

            <div className="flex gap-[1rem]">
                <ProfileMenu/>
            </div>
        </div>
    </Navbar>
    );
}

export default NavbarAll;

