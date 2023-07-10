import React from "react";
import InputField from "../webcomponent/CustomInput";
import Button from "../webcomponent/CustomButton";

function AddListing() {
  return (
    <main className="h-screen flex justify-center items-center bg-gray-200">
      <form className="bg-white flex flex-col lg:flex-row drop-shadow-md mb-4 w-full h-full rounded-[1rem] lg:w-9/12 lg:h-auto">
        <div className="text-gray-700 p-20 w-full lg:w-1/2">
          <h1 className="text-3xl text-main-purple self-center">Add investment opportunity</h1>
          <p className="text-main-purple">Tell us about your business</p>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="INTEN" className="text-main-gray block mb-2">
                What are your plans with the investment fund? Where will the money go?
              </label>
              <InputField type="text" id="INTEN" />
            </div>

            <div>
              <label htmlFor="date" className="text-main-gray block mb-2">
                When did you start the business?
              </label>
              <InputField type="date" id="date" />
            </div>

            <div>
              <label htmlFor="years" className="text-main-gray block mb-2">
                How long have you been operating as a business (Years)?
              </label>
              <InputField type="text" id="years" />
            </div>

            <div>
              <label htmlFor="lifesales" className="text-main-gray block mb-2">
                What are your business's total lifetime sales since starting (Rs.)?
              </label>
              <InputField type="text" id="lifesales" />
            </div>

            <div>
              <label htmlFor="grossincome" className="text-main-gray block mb-2">
                What was the gross income from your business last year?
              </label>
              <InputField type="text" id="grossincome" />
            </div>

            <div>
              <label htmlFor="netincome" className="text-main-gray block mb-2">
                What was the net income from your business last year?
              </label>
              <InputField type="text" id="netincome" />
            </div>

            <div>
              <label htmlFor="salesprojections" className="text-main-gray block mb-2">
                What are your sale projections for THIS CALENDAR YEAR?
              </label>
              <InputField type="text" id="salesprojections" />
            </div>

            <div>
              <label htmlFor="nextsales" className="text-main-gray block mb-2">
                What are your sale projections for NEXT CALENDAR YEAR?
              </label>
              <InputField type="text" id="nextsales" />
            </div>

            <div>
              <label htmlFor="projectionlogic" className="text-main-gray block mb-2">
                How did you come up with those projections?
              </label>
              <InputField type="text" id="projectionlogic" />
            </div>
          </div>
          <div className="mt-6 lg:mt-12">
            <Button type="button" innerHtml="Next" icon="next" />
          </div>
        </div>

        <div className="listing w-full lg:w-1/2 bg-main-purple rounded-r-[1rem] hidden lg:block"></div>
      </form>
    </main>
  );
}

export default AddListing;
