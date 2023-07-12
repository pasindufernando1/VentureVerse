import React from "react";
import {Navbar, Avatar, Typography, MenuItem, MenuList, MenuHandler, Button, Menu} from "@material-tailwind/react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faBell,
    faMessage,
    faPowerOff,
    faAngleDown,
    faUser,
    faCircleInfo
} from '@fortawesome/free-solid-svg-icons'

import logo from "../../assets/images/VentureVerse-Black.png";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import axios from "../../api/axios";

const NavbarAll = () => {

    const {auth, setAuth} = useAuth();
    const navigate = useNavigate();

    const logout = async () => {

        try {
            await axios.post('/auth/logout', {},
                {
                    headers: {
                        'Authorization': `Bearer ${auth?.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            setAuth({});
            navigate('/login');
        } catch (err) {
            console.log(err);
        }

    }

    const profileMenuItems = [
        {
            label: "My Profile",
            icon: faUser,
        },
        {
            label: "Help",
            icon: faCircleInfo,
        }
    ];

    const ProfileMenu = () => {

        const [isMenuOpen, setIsMenuOpen] = React.useState(false);
        const closeMenu = () => setIsMenuOpen(false);

        return (
            <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                <MenuHandler>
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                    >
                        <Avatar
                            variant="circular"
                            size="sm"
                            alt="tania andrew"
                            className="border border-main-purple p-0.5"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        />
                        <FontAwesomeIcon icon={faAngleDown}
                                         strokeWidth={2.5}
                                         className={`h-3 w-3 transition-transform ${
                                             isMenuOpen ? "rotate-180" : ""
                                         }`}
                        />
                    </Button>
                </MenuHandler>
                <MenuList className="p-1">
                    {profileMenuItems.map(({label, icon}, key) => {
                        return (
                            <MenuItem
                                key={label}
                                onClick={closeMenu}
                                className="flex items-center gap-2 rounded"
                            >
                                <FontAwesomeIcon icon={icon} className="h-4 w-4"/>
                                <Typography
                                    as="span"
                                    variant="small"
                                    className="font-normal"
                                    color="inherit"
                                >
                                    {label}
                                </Typography>
                            </MenuItem>
                        );
                    })}
                    <MenuItem
                        key="Log Out"
                        onClick={closeMenu}
                        className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    >
                        <FontAwesomeIcon icon={faPowerOff} className="h-4 w-4 text-red-500" />
                        <Typography
                            as="span"
                            variant="small"
                            className="font-normal"
                            color="red"
                            onClick={logout}
                        >
                            Log Out
                        </Typography>
                    </MenuItem>
                </MenuList>
            </Menu>
        );
    }

    const Items = () => {

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
            <ProfileMenu/>
        </div>);
    }

    return (
        <Navbar className="max-w-full rounded-none px-4 py-2">
            <div className="flex items-center justify-between text-blue-gray-900">
                <img src={logo} className="w-[6rem] h-[2.5rem]" alt="Logo"/>

                <div className="flex gap-[1rem]">
                    <Items/>
                </div>
            </div>
        </Navbar>
    );
}

export default NavbarAll;

