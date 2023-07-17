import React from "react";
import { Input, Checkbox, Button } from "../webcomponent";

function Signup() {
    return (

        <main className="h-auto flex justify-center items-center bg-gray-200 lg:h-screen">
            <form className=" bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] lg:w-9/12">
                <div className="text-gray-700 p-20 w-full">
                    <h1 className="text-3xl text-black">Signup page </h1>
                    <p>
                        view this form
                    </p>

                    <div className="mt-6">

                        <div className="row">
                            <Input
                                type="text"
                                label="First Name"
                            />
                            <Input
                                type="text"
                                label="Last name"
                            />
                        </div>

                        <fieldset className='p-2 border-[1px] mb-[1rem] rounded-2xl border-light-purple'>

                            <legend className="bg-white px-[1rem] text-light-purple relative left-[0.1rem]">Address
                            </legend>

                            <div className="row">
                                <Input
                                    type="text"
                                    label="First Line"
                                />
                                <Input
                                    type="text"
                                    label="Second Line"
                                />
                            </div>

                            <div className="row">
                                <Input
                                    type="text"
                                    label="Town"
                                />
                                <Input
                                    type="text"
                                    label="District"
                                />
                            </div>

                        </fieldset>

                        <div className="row">
                            <Input
                                type="email"
                                label="Email"
                            />
                            <Input
                                type="text"
                                label="NIC"
                            />
                        </div>

                        <div className="row">
                            <Input
                                type="text"
                                label="Gender"
                            />
                            <Input
                                type="text"
                                label="mobile number"
                            />
                        </div>

                        <Checkbox label="Remember Me"/>

                        <Button type="button" label="Next" icon="next" />

                    </div>

                </div>
                <div className="bg-[url('http://localhost:3000/static/media/Listing.b277be0c23429c0c521c.png')] bg-no-repeat bg-cover w-[50%] rounded-r-[1rem] hidden lg:block">
                </div>
            </form>
        </main>


    );
}

export default Signup;