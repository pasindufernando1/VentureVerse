import React, { useState } from 'react';
import {Checkbox, CommonNavbar, Footer, Input, Select} from "../webcomponent";
import { Navbar } from "../webcomponent";
import Topbar from "../common/Topbar";
import ProfileInformation from "../webcomponent/ProfileInformation";
import NotificationSettings from "../webcomponent/NotificationSettings";
import DisableAccount from "../webcomponent/DisableAccount";
function UpdatedDocuments(){
    return(
        <div className=' mb-24 flex flex-col mt-24 relative justify-center items-start w-auto rounded-2xl px-[1rem] lg:px-[5rem] py-[2rem] border border-main-purple'>
            <h1 className="text-2xl text-main-purple self-center ">Documents Uploaded</h1>
            <div className="flex flex-row items-center w-full text-center mt-6">
                <div className="applicationNotifications w-1/2">
                    <h4 className="text-main-purple self-center">Bank Statement</h4>
                    <div className='w-full mt-4 py-[2rem] px-4 bg-white flex flex-col space-y-4 mr-4'>
                        <embed
                            className="h-[600px] w-full"
                            src="/assets/documents/Bank%20Account%20Statement.pdf"
                            type="application/pdf"
                        />
                    </div>
                </div>

                <div className="applicationNotificationsSettings w-1/2">
                    <h4 className=" text-main-purple self-center">Police Report</h4>
                    <div className='w-full mt-4 py-[2rem] px-4 bg-white flex flex-col space-y-4 mr-4'>
                        <embed
                            className="h-[600px] w-full"
                            src="/assets/documents/clearance_application.pdf"
                            type="application/pdf"
                        />
                    </div>
                </div>

                <div className="applicationNotifications w-1/2">
                    <h4 className="text-main-purple self-center">Business Registration Document</h4>
                    <div className='w-full mt-4 py-[2rem] px-4 bg-white flex flex-col space-y-4 mr-4'>
                        <embed
                            className="h-[600px] w-full"
                            src="/assets/documents/registration%20dicument.BR.pdf"
                            type="application/pdf"
                        />
                    </div>
                </div>
            </div>
        </div>
    )}
const ProfileEntrepreneur = () => {
    return (
        <div className="flex flex-col justify-between items-center w-full overflow-hidden ">
            <Navbar />
            <Topbar/>
            <div className='grid grid-cols-3'></div>
            <div >
                {/*left*/}
            </div>
            <div>
                <ProfileInformation/>
                <NotificationSettings/>
                <UpdatedDocuments/>
                <DisableAccount/>
            </div>
            <div>
                {/*right*/}
            </div>
            <Footer/>
        </div>

    )
}

export default ProfileEntrepreneur

