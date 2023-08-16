import React, {useEffect, useState} from "react";
import {Header, Input} from "../webcomponent";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import useAuth from "../../hooks/useAuth";
import {Avatar, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis, faImage, faPaperclip, faPaperPlane} from "@fortawesome/free-solid-svg-icons";

let stompClient = null;

const Inbox = () => {

    const {auth} = useAuth();

    let fake = {id:"", name:"", message1: {}, message2: {}};
    if (auth?.id === 102) {
        fake.id = 104;
        fake.name = "Bhasa Lanka";
        fake.message1 = {sender: "104", receiver: "102", message: "Hello", time: "11.20 AM", seen: true, type: 'MESSAGE'}
        fake.message2 = {sender: "102", receiver: "104", message: "hi", time: "11.50 AM", seen: true, type: 'MESSAGE'}
    } else {
        fake.id = 102;
        fake.name = "Samindu Cooray";
        fake.message1 = {sender: "104", receiver: "102", message: "Hello", time: "11.20 AM", seen: true, type: 'MESSAGE'}
        fake.message2 = {sender: "102", receiver: "104", message: "hi", time: "11.50 AM", seen: true, type: 'MESSAGE'}
    }

    const sender = auth.id.toString();
    const [receiver, setReceiver] = useState(fake.id.toString());
    const [message, setMessage] = useState("");

    const [chats, setChats] = useState(new Map());
    const [users, setUsers] = useState([]);

    const [room, setRoom] = useState(null);

    useEffect(() => {

        setUsers([])

        let socket = new SockJS('http://localhost:8080/api/auth/ws');
        stompClient = over(socket);
        stompClient.connect({}, onConnected, onError);

        const newItem = {
            id: fake.id,
            name: fake.name,
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            lastSeen: "Last Seen 12.20 A.M.",
            lastMessageDate: "Today",
            lastMessage: "Hello"
        }

        setUsers(prevArray => [...prevArray, newItem]);

        let list2 = [];
        list2.push(fake.message1);
        chats.set(receiver, list2);
        setChats(new Map(chats));

        list2.push(fake.message2);
        chats.set(receiver, list2);
        setChats(new Map(chats));

        console.log(chats)

    }, []);

    useEffect(() => {}, [chats]);

    const onConnected = () => {
        stompClient.subscribe('/user/' + sender + '/private', onMessageReceived);
    }

    const onError = () => {
        console.log("Error Connecting to Websocket");
    }

    const onMessageReceived = (payload) => {

        let entry = JSON.parse(payload.body);

        updateChats(entry);

        console.log(chats)

    }

    const onSendMessage = (event) => {

        event.preventDefault();

        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + " " + (today.getHours() >= 12 ? "PM" : "AM");

        let entry = {sender: sender, receiver: receiver, message: message, time: time, type: 'MESSAGE'};

        if (sender !== receiver) {
            updateChats(entry, 2);
        }

        if (stompClient && message !== '') {
            stompClient.send("/app/message", {}, JSON.stringify(entry));
            setMessage('');
        }

    }

    const updateChats = (entry, method = 1) => {
        if (method === 1) {
            if (chats.get(entry.sender)) {
                chats.get(entry.sender).push(entry);
                setChats(new Map(chats));
            } else {
                let list = [];
                list.push(entry);
                chats.set(entry.sender, list);
                setChats(new Map(chats));
            }
        } else if (method === 2) {
            if (chats.get(entry.receiver)) {
                chats.get(entry.receiver).push(entry);
                setChats(new Map(chats));
            } else {
                let list = [];
                list.push(entry);
                chats.set(entry.receiver, list);
                setChats(new Map(chats));
            }
        }

    }

    const Chatroom = (props) => {

        const {room} = props;

        return (
            <>
                <div
                    className="flex flex-row justify-between items-center border-b-[1px] p-4 bg-white sticky top-0 z-[1000]">
                    <div className="flex w-full px-[1rem] justify-between items-center">
                        <div className="flex items-center justify-center gap-4 w-full cursor-pointer">
                            <Avatar
                                src={users[0].image}
                                alt="avatar"
                            />
                            <div className="w-full">
                                <Typography variant="h6">{users[0].name}</Typography>
                                <Typography variant="small"
                                            className="text-main-gray/60 font-normal">
                                    {users[0].lastSeen}
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
                                [...chats.get(room.toString())].map((message, index) => (
                                    <div
                                        className={`flex flex-row gap-4 items-center ${message.sender === sender ? "justify-end" : ""}`} key={index}>
                                        <div
                                            className={`flex flex-row gap-[1rem] p-[0.7rem] ${message.sender === sender ? "bg-light-purple/30 rounded-xl rounded-br-none" : "bg-light-purple/20 rounded-xl rounded-tl-none"}`}>
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
                <div
                    className="flex flex-row justify-end items-center bg-white w-full p-4 gap-1 relative border-t-[1px]">
                    <div className="flex flex-row items-center w-full border rounded-full h-12 px-2">
                        <div className="w-full">
                            <Input
                                type="text"
                                label={"hidden"}
                                className="border-none w-full focus:outline-none text-sm h-10 flex items-center p-4"
                                value={message}
                                onInput={(event)=>{
                                    setMessage(event.target.value.trim());
                                }}
                            />
                        </div>
                        <div className="flex flex-row">
                            <button className="flex items-center justify-center h-10 w-8 text-gray-400">
                                <FontAwesomeIcon icon={faPaperclip} className="w-5 h-5"/>
                            </button>
                            <button className="flex items-center justify-center h-10 w-8 text-gray-400 ml-1 mr-2">
                                <FontAwesomeIcon icon={faImage} className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                    <button
                        className="flex items-center justify-center h-11 w-11 rounded-full bg-gray-200 hover:bg-main-purple text-main-purple hover:text-white"
                        onClick={(event) => onSendMessage(event)}
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5"/>
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
                            users.map((investor, index) => (
                                <div className="p-4 pb-0 hover:bg-light-purple/20" onClick={() => setRoom(investor.id)} key={index}>
                                    <div
                                        className="flex items-center justify-center gap-4 w-full cursor-pointer">
                                        <Avatar
                                            src={investor.image}
                                            alt="avatar"
                                            size="sm"
                                        />
                                        <div className="hidden lg:block w-full">
                                            <div className="flex justify-between items-center">
                                                <Typography variant="h6">{investor.name}</Typography>
                                                <Typography variant="small"
                                                            className="text-main-gray/60 font-normal hidden lg:block">
                                                    {investor.lastMessageDate}
                                                </Typography>
                                            </div>
                                            <Typography variant="small"
                                                        className="text-main-gray/60 font-normal hidden lg:block w-full">
                                                {investor.lastMessage}
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