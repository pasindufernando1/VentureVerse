import React, {useEffect, useState} from "react";
import {
    Accordion,
    AccordionBody,
    Avatar,
    Card,
    Chip,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Navbar,
    Typography
} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faCalendar,
    faChevronRight,
    faCircleExclamation,
    faCircleUser,
    faGear,
    faHouse,
    faInbox,
    faPowerOff,
    faSquarePollVertical,
    faCircleExclamation,
    faCalendar,
    faHeart
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import axios from "../../api/axios";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import {MenuButton} from "./index";

const CustomHeader = (props) => {

    let {active, children} = props;

    const {auth, setAuth} = useAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState();

    const [toggle, setToggle] = useState(false);

    const {get} = useAxiosMethods();

    useEffect(() => {
        get(`/user/details/${auth?.id}`, setUser);
    }, []);

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

    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    }, []);

    const menu = []
    const accountMenu = []

    if (auth?.role === "ADMIN") {
        menu.push(
            {'icon': faHouse, 'title': "Dashboard", 'link': "/admin/dashboard", 'subcategory': false},
            {
                'icon': faSquarePollVertical,
                'title': "Registration Requests",
                'link': "/admin/view-requests",
                'subcategory': false
            },
            {'icon': faCircleUser, 'title': "Users", 'link': "/admin/users", 'subcategory': false},
        );
        accountMenu.push(
            {'icon': faInbox, 'title': "Inbox", 'link': "#", "suffix": true},
            {'icon': faCircleUser, 'title': "Profile", 'link': "/admin/profile", "suffix": false},
            {'icon': faGear, 'title': "Settings", 'link': "#", "suffix": false},
        )
    } else if (auth?.role === "ENTREPRENEUR") {
        menu.push(
            {'icon': faHouse, 'title': "Dashboard", 'link': "/entrepreneur/dashboard", 'subcategory': false},
            {
                'icon': faSquarePollVertical, 'title': "Listings", 'link': null, 'subcategory': [
                    {'icon': faChevronRight, 'title': "View", 'link': "/entrepreneur/view-listing"},
                    {'icon': faChevronRight, 'title': "Add", 'link': "/entrepreneur/add-listing"},
                ]
            },
            {
                'icon': faCircleExclamation,
                'title': "Complains",
                'link': "/entrepreneur/add-complain",
                'subcategory': false
            },
            {'icon': faCalendar, 'title': "Schedules", 'link': "/entrepreneur/schedules", 'subcategory': false}
        );
        accountMenu.push(
            {'icon': faInbox, 'title': "Inbox", 'link': "#", "suffix": true},
            {'icon': faCircleUser, 'title': "Profile", 'link': "/entrepreneur/profile", "suffix": false},
            {'icon': faGear, 'title': "Settings", 'link': "#", "suffix": false},
        )
    } else if (auth?.role === "INDIVIDUAL INVESTOR" || auth?.role === "ENTERPRISE INVESTOR") {
        menu.push(
            {'icon': faHouse, 'title': "Dashboard", 'link': "/investor/dashboard", 'subcategory': false},
            {'icon': faSquarePollVertical, 'title': "Listing", 'link': "/investor/view-listing", 'subcategory': false},
        );
        accountMenu.push(
            {'icon': faInbox, 'title': "Inbox", 'link': "#", "suffix": true},
            {'icon': faCircleUser, 'title': "Profile", 'link': "/investor/profile", "suffix": false},
            {'icon': faGear, 'title': "Settings", 'link': "#", "suffix": false},
        )
    }

    let name = "";

    if (auth?.role === "ENTERPRISE INVESTOR") {
        name = user?.businessName
    } else {
        name = user?.firstname + " " + user?.lastname
    }

    const normalLink = ({icon, title, link, key}) => {
        return (<Typography
            as="a"
            href={link}
            className="font-normal"
            key={key}
        >
            <ListItem
                className={`${openNav ? "!flex" : "!hidden"} lg:!flex ${active === title ? "text-white bg-main-purple/90" : ""} hover:bg-light-purple/20 hover:text-main-purple/90 focus:bg-light-purple/20 focus:text-main-purple/90 active:bg-light-purple/20 active:text-main-purple/90`}>
                <ListItemPrefix>
                    <FontAwesomeIcon icon={icon} className="h-5 w-5"/>
                </ListItemPrefix>
                {title}
            </ListItem>
            <ListItem
                className={`${openNav ? "!hidden" : "!flex justify-center"} lg:!hidden ${active === title ? "text-white bg-main-purple/90" : ""} hover:bg-light-purple/20 hover:text-main-purple/90 focus:bg-light-purple/20 focus:text-main-purple/90 active:bg-light-purple/20 active:text-main-purple/90`}>
                <ListItemPrefix className=" m-0">
                    <FontAwesomeIcon icon={icon} className="h-5 w-5"/>
                </ListItemPrefix>
            </ListItem>
        </Typography>);
    }

    const subLink = ({icon, title, subcategory, key}) => {

        return (
            <Accordion
                open={toggle}
                key={key}
            >
                <ListItem
                    className={`custom ${openNav ? "!flex" : "!hidden"} lg:!flex ${active === title ? "text-white bg-main-purple/90 " : " "} ${toggle ? "bg-light-purple/20 !text-main-purple/90" : ""} hover:bg-light-purple/20 hover:!text-main-purple/90 focus:bg-light-purple/20 focus:text-main-purple/90 active:bg-light-purple/20 active:text-main-purple/90 p-0`}
                    selected={toggle}>
                    <ListItem
                        onClick={() => setToggle(!toggle)}
                        className={`${openNav ? "!flex" : "!hidden"} lg:!flex ${active === title ? "text-white bg-main-purple/90" : ""} hover:bg-light-purple/20 hover:text-main-purple/90 focus:bg-light-purple/20 focus:text-main-purple/90 active:bg-light-purple/20 active:text-main-purple/90`}>
                        <ListItemPrefix>
                            <FontAwesomeIcon icon={icon} className="h-5 w-5"/>
                        </ListItemPrefix>
                        {title}
                        <ListItemSuffix>
                            <FontAwesomeIcon icon={faAngleDown}
                                             className={`${toggle ? "rotate-180" : ""} transition-transform duration-500 w-4 h-4`}/>
                        </ListItemSuffix>
                    </ListItem>
                </ListItem>
                <AccordionBody className="py-1">
                    <List className="p-0">
                        {
                            subcategory.map(({icon, title, link}, key) => (
                                <Typography
                                    as="a"
                                    href={link}
                                    className="font-normal"
                                    key={key}
                                >
                                    <ListItem
                                        className={`${openNav ? "!flex" : "!hidden"} lg:!flex ${active === title ? "text-white bg-main-purple/90" : ""} hover:bg-light-purple/20 hover:text-main-purple/90 focus:bg-light-purple/20 focus:text-main-purple/90 active:bg-light-purple/20 active:text-main-purple/90`}>
                                        <ListItemPrefix>
                                            <FontAwesomeIcon icon={icon} className="ml-3 h-3 w-3"/>
                                        </ListItemPrefix>
                                        {title}
                                    </ListItem>
                                </Typography>
                            ))
                        }
                    </List>
                </AccordionBody>
            </Accordion>
        );
    }

    return (
        <div className="flex flex-row h-max">
            {/* SideBar */}
            <Card
                className={`transition-all duration-500 fixed z-[1000] flex items-center h-full max-h-full lg:!w-full lg:!max-w-[20rem] ${openNav ? "!w-full" : "!w-[5rem]"} p-4 shadow-xl shadow-blue-gray-900/5 rounded-none border-r-[1px]`}>
                <div
                    className={`mb-2 flex items-center ${openNav ? "!justify-between" : "!justify-center"} w-full lg:!justify-start h-[66.84px] lg:h-auto`}>
                    <img src="/assets/images/VentureVerse-Black.png"
                         className={`lg:!w-[10rem] h-auto ${openNav ? "w-[10rem]" : "!w-0"}`} alt="Logo"/>
                    <MenuButton className="lg:hidden" onClick={() => setOpenNav(!openNav)}/>
                </div>
                <div className={`flex flex-col justify-between w-full h-full`}>
                    <List className="px-0 py-6 min-w-[1.5rem]">
                        {
                            menu.map(({icon, title, link, subcategory}, key) => (
                                subcategory
                                    ? subLink({
                                        icon,
                                        title,
                                        subcategory,
                                        key
                                    })
                                    : normalLink({
                                        icon,
                                        title,
                                        link,
                                        key
                                    })
                            ))
                        }
                        <hr className="my-2 border-blue-gray-50"/>
                    </List>
                    <List className="px-0 py-6 min-w-[1.5rem]">
                        {
                            accountMenu.map(({icon, title, link, suffix}, key) => (
                                <Typography
                                    as="a"
                                    href={link}
                                    className="font-normal"
                                    key={key}
                                >
                                    <ListItem
                                        className={`${openNav ? "!flex" : "!hidden"} lg:!flex ${active === title ? "text-white bg-main-purple/90" : ""} hover:bg-light-purple/20 hover:text-main-purple/90 focus:bg-light-purple/20 focus:text-main-purple/90 active:bg-light-purple/20 active:text-main-purple/90`}>
                                        <ListItemPrefix>
                                            <FontAwesomeIcon icon={icon} className="h-5 w-5"/>
                                        </ListItemPrefix>
                                        {title}
                                        {
                                            suffix
                                                ? <ListItemSuffix>
                                                    <Chip value="0" size="sm" variant="ghost" color="blue-gray"
                                                          className="rounded-full bg-red-500/90 text-white"/>
                                                </ListItemSuffix>
                                                : ""
                                        }
                                    </ListItem>
                                    <ListItem
                                        className={`${openNav ? "!hidden" : "!flex justify-center"} lg:!hidden ${active === title ? "text-white bg-main-purple/90" : ""} hover:bg-light-purple/20 hover:text-main-purple/90 focus:bg-light-purple/20 focus:text-main-purple/90 active:bg-light-purple/20 active:text-main-purple/90`}>
                                        <ListItemPrefix className={`${suffix ? "dot notification" : ""} m-0`}>
                                            <FontAwesomeIcon icon={icon} className="h-5 w-5"/>
                                        </ListItemPrefix>
                                    </ListItem>
                                </Typography>
                            ))
                        }
                        <ListItem
                            className={`${openNav ? "!flex" : "!hidden"} lg:!flex hover:bg-red-500/10 hover:text-red-500 focus:bg-red-500/10 focus:text-red-500 text-red-500 active:bg-red-500/10 active:text-red-500`}
                            onClick={logout}
                        >
                            <ListItemPrefix>
                                <FontAwesomeIcon icon={faPowerOff} className="h-5 w-5"/>
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                        <ListItem
                            className={`${openNav ? "!hidden" : "!flex justify-center"} lg:!hidden hover:bg-red-500/10 hover:text-red-500 focus:bg-red-500/10 focus:text-red-500 text-red-500 active:bg-red-500/10 active:text-red-500`}>
                            <ListItemPrefix className=" m-0">
                                <FontAwesomeIcon icon={faPowerOff} className="h-5 w-5"/>
                            </ListItemPrefix>
                        </ListItem>
                    </List>
                </div>
            </Card>
            <div
                className={`flex flex-col lg:w-[calc(100%-20rem)] lg:ml-[20rem] ${openNav ? "ml-[20rem] w-[calc(100%-20rem)]" : "ml-[5rem] w-[calc(100%-5rem)]"}`}>
                {/* NavBar */}
                <Navbar
                    className={`max-w-full fixed z-[500] rounded-none px-4 py-2 w-[calc(100%-5rem)] lg:w-[calc(100%-20rem)]`}>
                    <div className="flex justify-end items-center lg:justify-end">
                        <div className="flex flex-row gap-[1rem]">
                            <div className="flex flex-col gap-0 items-end justify-center text-black">
                                <Typography
                                    className="text-[1rem] font-[600] text-black tracking-[0.2px]">
                                    {name}
                                </Typography>
                                <Typography
                                    className="text-[0.5rem] font-[400] text-main-gray tracking-[0.2px]">
                                    {auth?.role}
                                </Typography>
                            </div>
                            <Avatar
                                variant="circular"
                                size="md"
                                alt="tania andrew"
                                className="border border-main-purple p-0.5"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            />
                        </div>
                    </div>
                </Navbar>
                <div className={`m-[1rem] mt-[5rem] lg:m-[4rem] lg:mt-[8rem] w-auto`}>
                    {children}
                </div>
            </div>
        </div>
    );

}

export default CustomHeader;

