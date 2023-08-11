import React from "react";
import {NavLink} from "react-router-dom";
import {Button} from "../webcomponent";


function DisableAccount(){
    return (
        <div className='flex flex-col mt-24 relative justify-center items-center text-center w-auto rounded-2xl py-[2rem] border border-main-purple gap-3 mb-24 '>
            <h1 className="text-2xl text-main-purple">Disable Account</h1>
            <p className="text-sm text-main-purple">By disabling your account, you will permanently lose access to all your data and settings.</p>
            <p className="text-sm text-red-900"><strong>Warning:</strong> Disabling your account will result in the removal of all your account details and content from the system.</p>
            <NavLink to={'/'}><Button color="purple" size="sm" ripple={true} type='disable' >Disable</Button></NavLink>
        </div>
    )
}

export default DisableAccount