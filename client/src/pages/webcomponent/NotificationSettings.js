import React, {useState} from "react";
import {Checkbox} from "./index";

function NotificationSettings() {
    const handleSubmit=()=>{
        console.log(settings);
    }
    const setting = [
        {label : 'Email me when I am ranked in the leaderboard'},
        {label: 'Email me memberships and subscription details'},
        {label: 'Email me when preferred projects are posted'},
        {label: 'Email me when messages are received'},
        {label: 'Email me when video sessions are requested'},
        {label: 'Email me complaint status'},
        {label: 'Email me monthly analysis and reports'}

    ]

    const [settings, setSettings] = useState({
        email_me_when_i_am_ranked_in_the_leaderboard : true,
        email_me_memberships_and_subscription_details : true,
        email_me_when_preferred_projects_are_posted : true,
        email_me_when_messages_are_received : true,
        email_me_when_video_sessions_are_requested : true,
        email_me_complaint_status : true,
        email_me_monthly_analysis_and_reports : true,
    })

    const [check, setCheck] = useState(false)

    const handleCheck = (event) => {
        if(event.target.checked){
            console.log(event.target.label);
        }
    }

    return (
        <div className='mt-24 relative justify-cen ter items-start w-auto rounded-2xl px-[1rem] lg:px-[5rem] py-[2rem] border border-main-purple'>
            <h1 className="text-2xl text-main-purple self-center ">Notification settings</h1>
            <p className="text-sm text-main-purple">Check the box to update your Email Preferences</p>
            <div className='grid grid-cols-2 m-4 p-6'>
                <div className="accountNotificationsSettings">
                    <h4 className="text-main-purple self-center">Account Notification settings</h4>
                    <div className='w-full mt-4 py-[2rem] px-4 bg-white flex flex-col space-y-4  '>
                        {setting.slice(0,2).map((member, index) => (
                            <div className=" flex items-center" key={index} >
                                <Checkbox
                                    defaultChecked
                                    ripple={true}
                                    className="h-6 w-6 rounded-full transition-all hover:scale-105 hover:before:opacity-0"
                                    label = {member.label}
                                    name={member.label.toLowerCase().replace(/ /g,'_')}
                                    onChange = {(e)=>{
                                        setSettings({...settings,[e.target.name]: e.target.checked})
                                        // console.log(settings);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="applicationNotificationsSettings">
                    <h4 className=" text-main-purple self-center">Application Notification settings</h4>
                    <div className='w-full mt-4 py-[2rem] px-4 bg-white flex flex-col space-y-4 '>
                        {setting.slice(2).map((member, index) => (
                            <div className=" flex items-center" key={index} >
                                <Checkbox
                                    defaultChecked
                                    ripple={true}
                                    className="h-6 w-6 rounded-full transition-all hover:scale-105 hover:before:opacity-0"
                                    label = {member.label}
                                    name={member.label.toLowerCase().replace(/ /g,'_')}
                                    onChange = {(e)=>{
                                        setSettings({...settings,[e.target.name]: e.target.checked})
                                        //console.log(settings);
                                    }}
                                />

                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default NotificationSettings