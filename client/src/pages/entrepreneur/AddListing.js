import React from "react";
import InputField from "../webcomponent/InputField";
import Button from "../webcomponent/Button";
import { useState } from "react";

function AddListing() {
    const [currentSection, setCurrentSection] = useState(1);
    const [previouseSection, setPrevSection] = useState(0);

    const handleNext = () => {
        setCurrentSection(currentSection + 1);
        setPrevSection(previouseSection + 1);
    }

    
    return (
        <main className="h-screen flex justify-center items-center bg-gray-200">
            <form className=" bg-white flex drop-shadow-md mb-4 w-full h-full  rounded-[1rem] lg:w-9/12 lg:h-auto">
                <div className="text-gray-700 p-20 w-full">
                    {currentSection === 1 && (
                        <>
                            <h1 className="text-3xl text-main-purple self-center">Add investment opportunity</h1>
                            <p className="text-main-purple">Tell us about your business</p>
                            <div className="mt-6">

                                <div className="row wd-full">
                                    <div>
                                    <label htmlFor="last-name" className="text-main-gray block mb-2 ">
                                    What are your plans with the investment fund ? Where will the money go?</label>
                                    <InputField type="text" id="INTEN" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div>
                                    <label htmlFor="startdate" className="text-main-gray block mb-2">
                                    When did you start the business?
                                    </label>
                                    <InputField type="date" id="date" />
                                    </div>
                                    <div>
                                    <label htmlFor="howlong" className="text-main-gray block mb-2">
                                    How long have you been operating as a business (Years) ?
                                    </label>
                                    <InputField type="text" id="years" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div>
                                    <label htmlFor="lifetimesales" className="text-main-gray block mb-2">
                                    What are your business's total lifetime sales since starting (Rs.)?</label>
                                    <InputField type="text" id="lifesales" />
                                    </div>
                                    <div>
                                    <label htmlFor="grossincome" className="text-main-gray block mb-2">
                                    What was the gross income from your business last year?
                                    </label>
                                    <InputField type="text" id="grossincome" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div>
                                    <label htmlFor="netincome" className="text-main-gray block mb-2">
                                    What was the net income from your business last year?</label>
                                    <InputField type="text" id="netincome" />
                                    </div>
                                    <div>
                                    <label htmlFor="grossincome" className="text-main-gray block mb-2">
                                    What are your sale projections for THIS CALENDAR YEAR ? 
                                    </label>
                                    <InputField type="text" id="salesprojections" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div>
                                    <label htmlFor="nextsales" className="text-main-gray block mb-2">
                                    What are your sale projections for NEXT CALENDAR YEAR ?
                                    </label>
                                    <InputField type="text" id="lifesales" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div>
                                    <label htmlFor="projectionlogic" className="text-main-gray block mb-2">
                                    How did you come up with those projections?
                                    </label>
                                    <InputField type="text" id="projectionlogic"/>
                                    </div>
                                </div>
                                <button onClick={handleNext}>Next</button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    innerHtml="Next"
                                    icon="next"
                                    className="my-4"
                                    onClick={handleNext}
                                />
                            </div>
                        </>
                    )}
                    {currentSection === 2 && (
                        <>
                            <h1>2</h1>
                        </>
                    )}
                    

                </div>
                <div className="listing w-[50%] rounded-r-[1rem] hidden lg:block">
                </div>
            </form>
        </main>
    );
}

export default AddListing;


