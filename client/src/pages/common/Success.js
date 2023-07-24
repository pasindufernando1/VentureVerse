import React from "react";
import { CommonNavbar, Footer } from "../webcomponent";

function Success({formData, setFormData,validateFormData}) {
    return (
        <div>
        <CommonNavbar />
        <main className="h-auto flex justify-center items-center bg-gray-200 lg:h-screen">
          <form className="bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] lg:w-9/12">
            <div className="text-gray-700 p-[2rem] w-full">
                <h3 className="text-3xl text-main-purple self-center">
                    Registration request sent successfully.
                </h3>
                <p className="text-main-black">
                    Please wait for the admin to approve your request.<br></br>
                    Thank you.
                </p>
            </div> 
          </form>
        </main>
        <Footer />
        </div>  
    );  
}
export default Success;