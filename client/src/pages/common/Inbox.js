import {Header, Input} from "../webcomponent";
import {Avatar, Typography} from "@material-tailwind/react";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis, faImage, faPaperclip, faPaperPlane} from "@fortawesome/free-solid-svg-icons";

const Inbox = () => {

    const [room, setRoom] = useState(null);

    const chats = [
        {
            user: {
                name: "Bhasa Lanka",
                image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
                lastSeen: "Last Seen 12.20 A.M.",
                lastMessageDate: "Today",
                lastMessage: "Hello"
            },
            messages: [
                {
                    from: "Me",
                    to: "Bhasa Lanka",
                    message: "Hello",
                    time: "12.18 AM",
                    seen: true
                },
            ]
        },
        {
            user: {
                name: "Wishwa Lanka",
                image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
                lastSeen: "Last Seen 12.20 A.M.",
                lastMessageDate: "Yesterday",
                lastMessage: "Hi!"
            },
            messages: [
                {
                    from: "Me",
                    to: "Wishwa Lanka",
                    message: "Hello",
                    time: "12.18 AM",
                    seen: true
                },
                {
                    from: "Wishwa Lanka",
                    to: "Me",
                    message: "Hi!",
                    time: "12.20 AM",
                    seen: false
                }
            ]
        },
        {
            user: {
                name: "Pamith Welikala",
                image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
                lastSeen: "Last Seen 12.20 A.M.",
                lastMessageDate: "13/08/2023",
                lastMessage: "I sending this message..."
            },
            messages: [
                {
                    from: "Me",
                    to: "Pamith Welikala",
                    message: "Hello",
                    time: "12.18 AM",
                    seen: true
                },
                {
                    from: "Pamith Welikala",
                    to: "Me",
                    message: "Hey",
                    time: "12.20 AM",
                    seen: false
                },
                {
                    from: "Me",
                    to: "Pamith Welikala",
                    message: "I sending this message regarding my Listing",
                    time: "12.21 AM",
                    seen: true
                },
            ]
        },
    ]

    const Chatroom = (props) => {

        const {room} = props;

        return (
            <>
                <div
                    className="flex flex-row justify-between items-center border-b-[1px] p-4 bg-white sticky top-0 z-[1000]">
                    <div className="flex w-full px-[1rem] justify-between items-center">
                        <div className="flex items-center justify-center gap-4 w-full cursor-pointer">
                            <Avatar
                                src={chats[room].user.image}
                                alt="avatar"
                            />
                            <div className="w-full">
                                <Typography variant="h6">{chats[room].user.name}</Typography>
                                <Typography variant="small"
                                            className="text-main-gray/60 font-normal">
                                    {chats[room].user.lastSeen}
                                </Typography>
                            </div>
                        </div>
                        <FontAwesomeIcon icon={faEllipsis} className="cursor-pointer"/>
                    </div>
                </div>
                <div className="relative h-full overflow-y-scroll container">
                    <div className="w-full absolute">
                        <div className="flex flex-col gap-[0.5rem] p-4">
                            {
                                chats[room].messages.map((message, index) => (
                                    <div
                                        className={`flex flex-row gap-4 items-center ${message.from === "Me" ? "justify-end" : ""}`}>
                                        <div
                                            className={`flex flex-row gap-[1rem] p-[0.7rem] ${message.from === "Me" ? "bg-light-purple/30 rounded-xl rounded-br-none" : "bg-light-purple/20 rounded-xl rounded-tl-none"}`}>
                                            <Typography
                                                className="text-black text-[1rem] font-[300]">{message.message}</Typography>
                                            <Typography
                                                className={`inline-flex items-end text-black text-[0.5rem] font-[300]`}>{message.time}</Typography>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end items-center bg-white w-full p-4 gap-1 relative border-t-[1px]">
                    <div className="flex flex-row items-center w-full border rounded-full h-12 px-2">
                        <div className="w-full">
                            <input type="text"
                                   className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center p-4"
                                   placeholder="Type your message...."/>
                        </div>
                        <div className="flex flex-row">
                            <button className="flex items-center justify-center h-10 w-8 text-gray-400">
                                <FontAwesomeIcon icon={faPaperclip} className="w-5 h-5" />
                            </button>
                            <button className="flex items-center justify-center h-10 w-8 text-gray-400 ml-1 mr-2">
                                <FontAwesomeIcon icon={faImage} className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                    <button
                        className="flex items-center justify-center h-11 w-11 rounded-full bg-gray-200 hover:bg-main-purple text-main-purple hover:text-white">
                        <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5" />
                    </button>
                </div>

            </>
        );

    }

    return (
        <Header active="Inbox">
            <div className="flex flex-row min-h-full min-w-full bg-white rounded-lg border-[1px]">
                <div className="w-[25%] border-r-[1px] relative overflow-hidden overflow-y-scroll container">
                    <div className="bg-white flex p-4 justify-between items-center sticky top-0 z-[1000]">
                        <Typography variant="h6">Message</Typography>
                        <FontAwesomeIcon icon={faEllipsis} className="cursor-pointer"/>
                    </div>
                    <div className="w-full absolute">
                        {
                            chats.map((investor, index) => (
                                <div className="p-4 pb-0 hover:bg-light-purple/20" onClick={() => setRoom(index)}>
                                    <div
                                        className="flex items-center justify-center gap-4 w-full cursor-pointer">
                                        <Avatar
                                            src={investor.user.image}
                                            alt="avatar"
                                            size="sm"
                                        />
                                        <div className="hidden lg:block w-full">
                                            <div className="flex justify-between items-center">
                                                <Typography variant="h6">{investor.user.name}</Typography>
                                                <Typography variant="small"
                                                            className="text-main-gray/60 font-normal hidden lg:block">
                                                    {investor.user.lastMessageDate}
                                                </Typography>
                                            </div>
                                            <Typography variant="small"
                                                        className="text-main-gray/60 font-normal hidden lg:block w-full">
                                                {investor.user.lastMessage}
                                            </Typography>
                                        </div>
                                    </div>
                                    <hr className="mt-4 border-blue-gray-50"/>
                                </div>

                            ))
                        }
                    </div>
                </div>
                <div className="w-[75%] flex flex-col">
                    {
                        room !== null
                            ? <Chatroom room={room}/>
                            : null
                    }
                </div>
            </div>
        </Header>
    );
}

export default Inbox;