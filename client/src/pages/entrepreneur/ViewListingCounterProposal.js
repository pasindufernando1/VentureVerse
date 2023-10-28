import { Avatar } from "@material-tailwind/react";
import {Header, Button} from "../webcomponent";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import {useParams} from "react-router-dom";

function ViewListingCounterProposal() {
    const { get } = useAxiosMethods();
    const [response, setResponse] = useState([]);
    const {id} = useParams();

    const listingId = id;

    useEffect(() => {
        get(`entrepreneurs/offers/${listingId}`, setResponse);
    }, []);

    console.log(response);

    const handleVideoCAll = () =>{
        const conferenceWindow = window.open(
            '/meeting/01/entrepreneur/' + new Date().toISOString(),
            '_blank'
        );
        if (conferenceWindow) {
            localStorage.setItem('meetngInProgress', 'true');
            conferenceWindow.focus();
        }
    }

    const [showsuccessNotification, setshowsuccessNotification] = useState(false);

    return (
        <div>
            <Header active="Listing">
                <main className="h-auto flex justify-center items-center bg-white mt-[-2rem] w-full ml-2 border-[1px] border-main-purple rounded-[1rem]"
                >
                    <form className="bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem]">
                        <div className="text-gray-700 p-[2rem] w-full">
                            <div className="row flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold mb-4 text-main-purple">Current investor
                                        offerings</h2>
                                </div>
                            </div>

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead
                                        className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Investor interested
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Amount offered
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Equity expected
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Profit per unit expected
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {response.map((request) => (
                                        <tr className="font-medium text-gray-700 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            key={request.id}>
                                            <td>
                                                <Avatar
                                                    variant="circular"
                                                    alt="tania andrew"
                                                    className="cursor-pointer border-2 border-main-purple hover:z-10 focus:z-10 ml-1"
                                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"/>
                                                <span className="ml-2">{request.Investor}</span>
                                            </td>
                                            <td className="px-6 py-4">Rs. {request.amount}</td>
                                            <td className="px-6 py-4">{request.equity} %</td>
                                            <td className="px-6 py-4">{request.profit} %</td>
                                            {/* Two icons to start messaging and start video call */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-4 text-sm">
                                                    <img src="/assets/images/chat.png" alt="View"
                                                         className="cursor-pointer"/>

                                                    <img src="/assets/images/videocall.png" alt="View"
                                                         className="cursor-pointer" onClick={handleVideoCAll}/>

                                                </div>

                                            </td>

                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                            </div>
                            <Button
                                variant="clear"
                                label="Show less"
                                icon="previous"
                                className="mt-4"
                            >
                                <Link to="/entrepreneur/view-listingfull">Back</Link>
                            </Button>
                        </div>

                    </form>

                </main>
            </Header>

        </div>
    )
}

export default ViewListingCounterProposal