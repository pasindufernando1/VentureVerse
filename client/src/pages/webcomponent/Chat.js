import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

import { Button, Avatar, IconButton, ListItem, ListItemPrefix, Textarea } from '@material-tailwind/react';
import {
    Popover,
    PopoverHandler,
    PopoverContent,
} from '@material-tailwind/react';

const Chat = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState('CHATROOM');
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: '',
    });

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    let stompClient = null;

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/api/auth/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        setUserData({ ...userData, connected: true });
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        userJoin();
    };

    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username,
            status: 'JOIN',
        };
        stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
    };

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case 'JOIN':
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case 'MESSAGE':
                setPublicChats((prevChats) => [...prevChats, payloadData]);
                break;
            default:
                break;
        }
    };

    const onPrivateMessage = (payload) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    };

    const onError = (err) => {
        console.log(err);
    };

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, message: value });
    };

    const sendValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: 'MESSAGE',
            };
            console.log(chatMessage);
            stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: '' });
        }
    };

    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: 'MESSAGE',
            };

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: '' });
        }
    };

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, username: value });
    };

    const registerUser = () => {
        connect();
    };

    return (
        <>
            <Popover>
                <PopoverHandler>
                    <Button>More Info</Button>
                </PopoverHandler>
                <PopoverContent className="z-[999] flex w-[42rem] h-auto overflow-hidden p-0">
                    <div className="container relative ">
                        {userData.connected ? (
                            <div className="chat-box p-2 flex flex-row md:flex-row sm:flex-row">
                                <div className="member-list  w-1/5 ">
                                    <ul>
                                        <ListItem
                                            onClick={() => {
                                                setTab('CHATROOM');
                                            }}
                                            className={`member ${
                                                tab === 'CHATROOM' && 'active p-2 cursor-pointer bg-purple-100 '
                                            } `}
                                        >
                                            <ListItemPrefix>
                                                <Avatar variant="circular" alt="candice" src="/images/avatar.svg" />
                                            </ListItemPrefix>
                                            Chatroom
                                        </ListItem>
                                        {[...privateChats.keys()].map((name, index) => (
                                            <ListItem
                                                onClick={() => {
                                                    setTab(name);
                                                }}
                                                className={`member ${
                                                    tab === name && 'active p-2 cursor-pointer bg-purple-100'
                                                } `}
                                                key={index}
                                            >
                                                <ListItemPrefix>
                                                    <Avatar variant="circular" alt="candice" src="/images/avatar.svg" />
                                                </ListItemPrefix>
                                                {name}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </div>
                                {tab === 'CHATROOM' && (
                                    <div className="chat-content w-full h-4/5  md:w-4/5 ml-2 border-2 md:border-0 overflow-y-auto ">
                                        <ul className="chat-messages h-4/5 rounded-2xl flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                                            {publicChats.map((chat, index) => (
                                                <li
                                                    className={`message p-1 w-auto flex flex-row ${
                                                        chat.senderName === userData.username ? 'justify-start' : 'justify-end'
                                                    }`}
                                                    key={index}
                                                >
                                                    {chat.senderName !== userData.username && (
                                                        <div className="avatar bg-cornflowerblue p-1 rounded-lg text-blue-700"></div>
                                                    )}
                                                    <div
                                                        className={`message-data p-1 ${
                                                            chat.senderName === userData.username ? 'justify-start' : 'justify-end'
                                                        }`}
                                                    >
                            <span
                                className={`px-4 py-2 rounded-lg inline-block ${
                                    chat.senderName === userData.username
                                        ? 'bg-gray-300 text-gray-600'
                                        : 'bg-gray-300 text-gray-600'
                                }`}
                            >
                              <div
                                  className={chat.senderName === userData.username ? 'text-blue-700' : 'text-blue-700'}
                              >
                                {chat.senderName}
                              </div>
                                {chat.message}
                            </span>
                                                    </div>
                                                    {chat.senderName === userData.username && (
                                                        <div className="avatar self bg-greenyellow p-1 rounded-lg text-black"></div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex w-full flex-col md:flex-row items-center gap-2 rounded-[99px] border border-light-purple bg-purple-50 p-2 mt-8 ">
                                            <div className="flex">
                                                <IconButton variant="text" className="rounded-full">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={2}
                                                        stroke="purple"
                                                        className="h-5 w-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                                        />
                                                    </svg>
                                                </IconButton>
                                                <IconButton variant="text" className="rounded-full">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="purple"
                                                        strokeWidth={2}
                                                        className="h-5 w-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                                                        />
                                                    </svg>
                                                </IconButton>
                                            </div>
                                            <Textarea
                                                rows={1}
                                                resize={true}
                                                placeholder="Enter the message"
                                                value={userData.message}
                                                onChange={handleMessage}
                                                className="min-h-full !border-0 focus:border-transparent"
                                                containerProps={{
                                                    className: 'grid h-full',
                                                }}
                                                labelProps={{
                                                    className: 'before:content-none after:content-none',
                                                }}
                                            />
                                            <div>
                                                <IconButton variant="text" className="rounded-full" label="Send" onClick={sendValue}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="purple"
                                                        strokeWidth={2}
                                                        className="h-5 w-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                                        />
                                                    </svg>
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {tab !== 'CHATROOM' && (
                                    <div className="chat-content  w-full h-4/5  md:w-4/5 ml-2 border-2 md:border-0 overflow-y-auto">
                                        <ul className="chat-messages h-4/5 rounded-2xl flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                                            {[...privateChats.get(tab)].map((chat, index) => (
                                                <li
                                                    className={`message p-1 w-auto flex flex-row ${
                                                        chat.senderName === userData.username ? 'justify-start' : 'justify-end'
                                                    }`}
                                                    key={index}
                                                >
                                                    {chat.senderName !== userData.username && (
                                                        <div className="avatar bg-cornflowerblue p-1 rounded-lg text-blue-700"></div>
                                                    )}
                                                    <div
                                                        className={`message-data p-1 ${
                                                            chat.senderName === userData.username ? 'justify-start' : 'justify-end'
                                                        }`}
                                                    >
                            <span
                                className={`px-4 py-2 rounded-lg inline-block ${
                                    chat.senderName === userData.username
                                        ? 'bg-gray-300 text-gray-600'
                                        : 'bg-gray-300 text-gray-600'
                                }`}
                            >
                              <div
                                  className={chat.senderName === userData.username ? 'text-blue-700' : 'text-blue-700'}
                              >
                                {chat.senderName}
                              </div>
                                {chat.message}
                            </span>
                                                    </div>
                                                    {chat.senderName === userData.username && (
                                                        <div className="avatar self bg-greenyellow p-1 rounded-lg text-black"></div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex w-full flex-col md:flex-row items-center gap-2 rounded-[99px] border border-light-purple bg-purple-50 p-2  mt-8">
                                            <div className="flex">
                                                <IconButton variant="text" className="rounded-full">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={2}
                                                        stroke="purple"
                                                        className="h-5 w-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                                        />
                                                    </svg>
                                                </IconButton>
                                                <IconButton variant="text" className="rounded-full">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="purple"
                                                        strokeWidth={2}
                                                        className="h-5 w-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                                                        />
                                                    </svg>
                                                </IconButton>
                                            </div>
                                            <Textarea
                                                rows={1}
                                                resize={true}
                                                placeholder="Enter the message"
                                                value={userData.message}
                                                onChange={handleMessage}
                                                className="min-h-full !border-0 focus:border-transparent "
                                                containerProps={{
                                                    className: 'grid h-full',
                                                }}
                                                labelProps={{
                                                    className: 'before:content-none after:content-none',
                                                }}
                                            />
                                            <div>
                                                <IconButton
                                                    variant="text"
                                                    className="rounded-full"
                                                    label="Send"
                                                    onClick={sendPrivateValue}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="purple"
                                                        strokeWidth={2}
                                                        className="h-5 w-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                                        />
                                                    </svg>
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="register shadow-lg fixed p-8 flex flex-row ">
                                <input
                                    id="user-name"
                                    placeholder="Enter your name"
                                    name="userName"
                                    value={userData.username}
                                    onChange={handleUsername}
                                    className="p-8 flex flex-row text-black"
                                />
                                <Button type="button" variant="oval" label="Send" onClick={registerUser}>
                                    Send
                                </Button>
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default Chat;
