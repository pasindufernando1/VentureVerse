import {Header} from "../webcomponent";
import AdminProfileInformation from "../admin/Profile";
import EntrepreneurProfileInformation from "../entrepreneur/Profile";
import InvestorProfileInformation from "../investor/Profile";
import React, {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosMethods from "../../hooks/useAxiosMethods";


const Profile = () => {

    const TopBar = () => {
        return (
            <div className='relative h-56 w-full mt-0'>
                <div className='h-36 w-full mt-0 py-16 px-4 bg-gradient-to-r from-main-purple to-light-purple' >
                    <div className='absolute h-48 w-full py-0 px-12 flex flex-row left-0 ' >
                            <img
                                className="relative h-48 w-48 border-4 border-white rounded-lg object-cover object-center"
                                src={
                                response.profileImage
                                }
                                alt="profile image"
                            />
                        <div className=' m-4 mt-28 flex flex-col px-1 h-auto ' >
                            <h1 className=' font-bold text-4xl' >{response.firstname} {response.lastname}</h1>
                            {/*get the email*/}
                            <h3 className='mt-2'>{response.email}</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const [ response, setResponse] = useState([]);
    const {auth} = useAuth();
    const id=auth.id;
    console.log(id);

    const {get} = useAxiosMethods();
    useEffect(()=>{
        get(`user/details/${id}`,setResponse, true);
    },[] )
    console.log(response)

    return (
        <Header active="Profile">
            <TopBar />
            {
                auth?.role === "ADMIN" || auth?.role === "CO ADMIN"
                    ? <AdminProfileInformation/>
                    : auth?.role === "ENTREPRENEUR"
                        ? <EntrepreneurProfileInformation/>
                        : <InvestorProfileInformation/>
            }
        </Header>

    )
}

export default Profile