import React from "react";
import InputField from "../webcomponent/InputField";
import { useState } from "react";
import Checkbox from "../webcomponent/CustomCheckbox";
function AddListing() {
    const [currentSection, setCurrentSection] = useState(1);
    const [previouseSection, setPrevSection] = useState(0);

    const handleNext = () => {
        setCurrentSection(currentSection + 1);
        setPrevSection(previouseSection + 1);
    }

    const handlePrevious = () => {
        setCurrentSection(currentSection - 1);
        setPrevSection(previouseSection - 1);
    }

    
    return (
        <main className="h-auto min-h-[100vh] p-[2rem] flex justify-center items-center bg-gray-200">
            <form className=" bg-white flex drop-shadow-md mb-4 w-full h-full  rounded-[1rem] lg:w-9/12 lg:h-auto">
                <div className="text-gray-700 p-[2rem] w-full">
                    {currentSection === 1 && (
                        <>
                            <h1 className="text-3xl text-main-purple self-center">Add investment opportunity</h1>
                            <p className="text-main-purple">Tell us about your business</p>
                            <div className="mt-6">

                                <div className="row">
                                    <div className="w-full">
                                    <label htmlFor="last-name" className="text-main-gray block mb-2 text-[14px] ">
                                    What are your plans with the investment fund ? Where will the money go?</label>
                                    <InputField type="text" id="INTEN" className="w-full"/>
                                    </div>
                                </div>
                                <div className="row flex-auto">
                                    <div className="flex-grow">
                                    <label htmlFor="startdate" className="text-main-gray block mb-2 text-[14px]">
                                    When did you start the business?
                                    </label>
                                    <InputField type="date" id="date" />
                                    </div>
                                    <div className="flex-grow">
                                    <label htmlFor="howlong" className="text-main-gray block mb-2 text-[14px]">
                                    How long have you been operating as a business (Years) ?
                                    </label>
                                    <InputField type="text" id="years" />
                                    </div>
                                </div>
                                <div className="row flex-grow">
                                    <div>
                                    <label htmlFor="lifetimesales" className="text-main-gray block mb-2 text-[14px]">
                                    What are your business's total lifetime sales since starting (Rs.)?</label>
                                    <InputField type="text" id="lifesales" />
                                    </div>
                                    <div>
                                    <label htmlFor="grossincome" className="text-main-gray block mb-2 text-[14px]">
                                    What was the gross income from your business last year?
                                    </label>
                                    <InputField type="text" id="grossincome" />
                                    </div>
                                </div>
                                <div className="row flex-grow">
                                    <div>
                                    <label htmlFor="netincome" className="text-main-gray block mb-2 text-[14px]">
                                    What was the net income from your business last year?</label>
                                    <InputField type="text" id="netincome" />
                                    </div>
                                    <div>
                                    <label htmlFor="grossincome" className="text-main-gray block mb-2 text-[14px]">
                                    What are your sale projections for THIS CALENDAR YEAR ? 
                                    </label>
                                    <InputField type="text" id="salesprojections" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="w-full">
                                    <label htmlFor="nextsales" className="text-main-gray block mb-2 text-[14px]">
                                    What are your sale projections for NEXT CALENDAR YEAR ?
                                    </label>
                                    <InputField type="text" id="lifesales" />
                                    </div>
                                </div>
                                {/* Take up the maximum width */}
                                <div className="row">
                                    <div className="w-full">
                                    <label htmlFor="projectionlogic" className="text-main-gray block mb-2 text-[14px]">
                                    How did you come up with those projections?
                                    </label>
                                    <InputField type="text" id="projectionlogic" className="w-full"/>
                                    </div>
                                </div>
                                <div className="row flex justify-end">
                                    <button onClick={handleNext} className="text-main-purple">Next</button>
                                </div>
                            </div>
                        </>
                    )}
                    {currentSection === 2 && (
                        <>
                            <p className="text-main-purple">Tell us more about your business ...</p>
                            <div className="mt-6">

                                {/* Radio button to select either yes or no for outside funding */}
                                <div className="row">
                                    <div>
                                        <label htmlFor="outside-sources" className="text-main-gray block mb-2 text-[14px]">
                                        Have you ever tried to raise money from outside sources?
                                        </label>
                                            <input type="radio" id="yes" name="outsource" value="yes"/>
                                            <label htmlFor="yes" className="ml-2">Yes</label>
                                        
                                            <input type="radio"  className="ml-5" id="no" name="outsource" value="no" />
                                            <label htmlFor="no" className="ml-2">No</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="w-full">
                                    <label htmlFor="outside-details" className="text-main-gray block mb-2 text-[14px]">
                                    If yes provide details
                                    </label>
                                    <InputField type="text" id="outsidedetails" className="w-full"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="w-full">
                                    <label htmlFor="attempts" className="text-main-gray block mb-2 text-[14px]">
                                    What attempts have you made to build your business? Have you been successful?
                                    </label>
                                    <InputField type="text" id="attempts" className="w-full"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="w-full">
                                    <label htmlFor="proposition" className="text-main-gray block mb-2 text-[14px]">
                                    What is your unique selling proposition? What is your “hook”, and why is your business Notable?
                                    </label>
                                    <InputField type="text" id="proposition" className="w-full"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="w-full">
                                    <label htmlFor="awards" className="text-main-gray block mb-2 text-[14px]">
                                    List any awards or accolades you've received?
                                    </label>
                                    <InputField type="text" id="awards" className="w-full"/>
                                    </div>
                                </div>
                                <div className="row w-full flex">
                                    <div className="justify-begin">
                                        <button onClick={handlePrevious}  className="text-main-purple">Previous</button>
                                    </div>
                                    <div className="justify-end">
                                        <button onClick={handleNext} className="text-main-purple">Next</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {currentSection === 3 && (
                        <>
                            <p className="text-main-purple">Tell us more about your business ...</p>
                            <div className="mt-6">  
                                <div className="row">
                                    {/* Label */}
                                    <div className="w-full">
                                        <label htmlFor="category" className="text-main-gray block mb-2 text-[14px]">
                                            What category describes your business or product? (check all that apply): *
                                        </label>
                                        <div className="flex flex-cols gap-2">
                                            <div className="row">
                                            <Checkbox label="Food & Beverage" name="Food" />
                                            <Checkbox label="Technology" name="Technology" />
                                            <Checkbox label="App/Website" name="App/Website" />
                                            </div>
                                        </div>
                                        <div className="flex flex-cols gap-2">
                                            <div className="row">
                                            <Checkbox label="Fitness" name="Fitness" />
                                            <Checkbox label="Health / Wellness / Nutrition" name="Healthcare" />
                                            <Checkbox label="Sports" name="Sports" />
                                            </div>
                                        </div>
                                        <div className="flex flex-cols gap-2">
                                            <div className="row">
                                            <Checkbox label="Beauty" name="Beauty" />
                                            <Checkbox label="Clothing / Fashion" name="Clothing / Fashion" />
                                            <Checkbox label="Toys / Games" name="Toys / Games" />
                                            </div>
                                        </div>
                                        <div className="flex flex-cols gap-2">
                                            <div className="row">
                                            <Checkbox label="Entertainment / Experiential" name="Entertainment / Experiential" />
                                            <Checkbox label="Pets" name="Pets" />
                                            <Checkbox label="Music" name="Music" />
                                            </div>
                                        </div>
                                        <div className="flex flex-cols gap-2">
                                            <div className="row">
                                            <Checkbox label="Holiday" name="Holiday" />
                                            <Checkbox label="Children" name="Children" />
                                            <Checkbox label="Housewares / Home Design" name="Housewares / Home Design" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="w-full">
                                    <label htmlFor="stage" className="text-main-gray block mb-2 text-[14px]">
                                    What stage describes your business or product? (check all that apply): *
                                    </label>
                                    <div className="flex flex-rows">
                                        <div className="row">
                                        <Checkbox label="Shopping live" name="Shopping live" />
                                        <Checkbox label="Revenue" name="Revenue" />
                                        <Checkbox label="Expansion" name="Expansion" />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                        
                                <div className="row w-full flex">
                                    <div className="justify-begin">
                                        <button onClick={handlePrevious}  className="text-main-purple">Previous</button>
                                    </div>
                                    <div className="justify-end">
                                        <button onClick={handleNext} className="text-main-purple">Next</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {currentSection === 4 && (
                        <>
                            <div className="mt-6">
                                <p className="text-main-purple">Tell us more about your business ...</p>
                                <div className="row">
                                    <div className="w-full">
                                        <label htmlFor="images" className="text-main-gray block mb-2 text-[14px]">
                                        Please upload a photo of your business or product if applicable:
                                        </label>
                                        {/* Three divs to hold the three images uploaded */}
                                        <div className="flex flex-cols gap-2">
                                            <div className="row">
                                            <div className="w-[100px] h-[100px] border-2 border-main-purple rounded-[1rem]"></div>
                                            <div className="w-[100px] h-[100px] border-2 border-main-purple rounded-[1rem]"></div>
                                            <div className="w-[100px] h-[100px] border-2 border-main-purple rounded-[1rem]"></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="file-input-container">
                                            <input type="file" id="images" name="images" accept="image/*" className="hidden" />
                                            <label htmlFor="images" className="file-input-button">
                                                Select File
                                            </label>
                                            <span className="file-input-text">No file chosen</span>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Div to upload  SINGLE video  */}
                                <div className="row">
                                    <div className="w-full">
                                        <label htmlFor="video" className="text-main-gray block mb-2 text-[14px]">
                                        Please upload a pitch video of your business:
                                        </label>
                                        <div className="flex flex-cols gap-2">
                                            <div className="row">
                                                <div className="w-[600px] h-[300px] border-2 border-main-purple rounded-[1rem] video-container">
                                                    {/* Dive to hold the play button  */}
                                                    <div className="w-[80px] h-[80px] mx-[15rem] my-[6rem] play-image">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="file-input-container">
                                                <input type="file" id="video" name="video" accept="video/*" className="hidden" />
                                                <label htmlFor="video" className="file-input-button">
                                                    Select File
                                                </label>
                                                <span className="file-input-text">No file chosen</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>        
                                <div className="row w-full flex">
                                    <div className="justify-begin">
                                        <button onClick={handlePrevious}  className="text-main-purple">Previous</button>
                                    </div>
                                    <div className="justify-end">
                                        <button onClick={handleNext} className="text-main-purple">Next</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {currentSection === 5 && (
                        <>  
                            <div className="mt-6">
                                {/* Container for the logo  */}
                                <div className="flex justify-center items-center">
                                    <div className="venture-logo w-[200px] h-[80px] rounded-[1rem] justify-center drop-shadow">
                                    </div>
                                </div> 
                                <div className="flex justify-center items-center row">
                                    <p className="text-main-purple font-bold mt-[1rem]">Let's begin</p>
                                </div>   
                                <div className="row">
                                    <div className="w-full">
                                        <label htmlFor="venture-name" className="text-main-gray block mb-2 text-[14px]">
                                        What investment amount are you seeking and what percentage of equity are you willing to give in exchange?
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="w-full">
                                        {/* Rectangular div */}
                                        <div className="flex flex-cols gap-2">
                                            <div className="row">
                                                <div className="w-[200px] h-[100px] border-2 border-main-purple rounded-[1rem]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row w-full flex">
                                    <div className="justify-begin">
                                        <button onClick={handlePrevious}  className="text-main-purple">Previous</button>
                                    </div>
                                    <div className="justify-end">
                                        <button onClick={handleNext} className="text-main-purple">Next</button>
                                    </div>
                                </div>
                            </div>
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


