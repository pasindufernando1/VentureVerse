import React from 'react';
import { Header} from "../webcomponent";
import {DisableAccount, NotificationSettings, ProfileInfo} from "../sectioncomponent";
import TopBar from "../sectioncomponent/TopBar";
const UpdatedDocuments = () => {
    return (
        <div
            className=' mb-24 flex flex-col mt-24 relative justify-center items-start w-auto rounded-2xl px-[1rem] lg:px-[5rem] py-[2rem] border border-main-purple'>
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
    )
}

const Profile = () => {
    return (
        <Header active="Profile">
            <TopBar />
            <ProfileInfo/>
            <NotificationSettings/>
            <UpdatedDocuments/>
            <DisableAccount/>
        </Header>
    )
}

export default Profile

