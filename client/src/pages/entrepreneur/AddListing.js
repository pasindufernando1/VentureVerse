import React from "react";
import Components from "../webcomponent/Components";
import InputField from "../webcomponent/InputField";

function AddListing() {
  return (
    <main className="h-screen flex justify-center items-center bg-gray-200">
      <form className="bg-white flex drop-shadow-md w-9/12 mb-4">
        <div className="bg-white text-gray-700 p-20 w-full">
          <h1 className="text-3xl text-main-purple self-center">Add investment opportunity</h1>
          <p className="text-main-purple">Tell us about your business</p>

          <div className="mt-6">
            <div className="row">
              <div>
                <label htmlFor="last-name" className="text-main-purple block mb-2">
                  Last Name
                </label>
                <InputField type="text" id="last-name" />
              </div>
            </div>

            <fieldset className="p-2 border-[1px] mb-[1rem] rounded-2xl border-light-purple">
              <legend className="bg-white px-[1rem] text-light-purple relative left-[0.1rem]">
                Address
              </legend>

              <div className="row">
                <div>
                  <label htmlFor="first-line" className="text-main-purple block mb-2">
                    First Line
                  </label>
                  <InputField type="text" id="first-line" />
                </div>
                <div>
                  <label htmlFor="second-line" className="text-main-purple block mb-2">
                    Second Line
                  </label>
                  <InputField type="text" id="second-line" />
                </div>
              </div>

              <div className="row">
                <div>
                  <label htmlFor="town" className="text-main-purple block mb-2">
                    Town
                  </label>
                  <InputField type="text" id="town" />
                </div>
                <div>
                  <label htmlFor="district" className="text-main-purple block mb-2">
                    District
                  </label>
                  <InputField type="text" id="district" />
                </div>
              </div>
            </fieldset>

            <div className="row">
              <div>
                <label htmlFor="email" className="text-main-purple block mb-2">
                  Email
                </label>
                <InputField type="email" id="email" />
              </div>
              <div>
                <label htmlFor="nic" className="text-main-purple block mb-2">
                  NIC
                </label>
                <InputField type="text" id="nic" />
              </div>
            </div>

            <div className="row">
              <div>
                <label htmlFor="gender" className="text-main-purple block mb-2">
                  Gender
                </label>
                <InputField type="text" id="gender" />
              </div>
              <div>
                <label htmlFor="mobile-number" className="text-main-purple block mb-2">
                  Mobile Number
                </label>
                <InputField type="text" id="mobile-number" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-main-purple w-full"></div>
      </form>
    </main>
  );
}

export default AddListing;