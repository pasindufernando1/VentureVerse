import React from "react";

const CustomBarChart = () => {

    return (
        <div className="flex flex-col h-30 justify-center ">
            <div
                className="flex flex-col items-center w-full max-w-screen-md p-6 pb-6 mt-10 bg-white rounded-lg shadow-xl sm:p-8">
                <h2 className="text-xl font-bold">Monthly Revenue</h2>
                <span className="text-sm font-semibold text-gray-500">2020</span>
                <div className="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$37,500</span>
                        <div className="flex items-end w-full">
                            {/* <div className="relative flex justify-center flex-grow h-8 bg-purple-200"></div> */}
                            <div className="relative flex justify-center flex-grow h-6 bg-purplevv/50"></div>
                            <div className="relative flex justify-center flex-grow h-16 bg-purplevv"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Jan</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$45,000</span>
                        <div className="flex items-end w-full">
                            {/* <div className="relative flex justify-center flex-grow h-10 bg-purple-200"></div> */}
                            <div className="relative flex justify-center flex-grow h-6 bg-purplevv/50"></div>
                            <div className="relative flex justify-center flex-grow h-20 bg-purplevv"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Feb</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$47,500</span>
                        <div className="flex items-end w-full">
                            {/* <div className="relative flex justify-center flex-grow h-10 bg-purple-200"></div> */}
                            <div className="relative flex justify-center flex-grow h-8 bg-purplevv/50"></div>
                            <div className="relative flex justify-center flex-grow h-20 bg-purplevv"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Mar</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$50,000</span>
                        <div className="flex items-end w-full">
                            {/* <div className="relative flex justify-center flex-grow h-10 bg-purple-200"></div> */}
                            <div className="relative flex justify-center flex-grow h-6 bg-purplevv/50"></div>
                            <div className="relative flex justify-center flex-grow h-24 bg-purplevv"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Apr</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$47,500</span>
                        <div className="flex items-end w-full">
                            {/* <div className="relative flex justify-center flex-grow h-10 bg-purple-200"></div> */}
                            <div className="relative flex justify-center flex-grow h-8 bg-purplevv/50"></div>
                            <div className="relative flex justify-center flex-grow h-20 bg-purplevv"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">May</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$55,000</span>
                        <div className="flex items-end w-full">
                            {/* <div className="relative flex justify-center flex-grow h-12 bg-purple-200"></div> */}
                            <div className="relative flex justify-center flex-grow h-8 bg-purplevv/50"></div>
                            <div className="relative flex justify-center flex-grow h-24 bg-purplevv"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Jun</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$60,000</span>
                        <div className="flex items-end w-full">
                            {/* <div className="relative flex justify-center flex-grow h-12 bg-purple-200"></div> */}
                            <div className="relative flex justify-center flex-grow h-16 bg-purplevv/50"></div>
                            <div className="relative flex justify-center flex-grow h-20 bg-purplevv"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Jul</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$57,500</span>
                        <div className="flex items-end w-full">
                            {/* <div className="relative flex justify-center flex-grow h-12 bg-purple-200"></div> */}
                            <div className="relative flex justify-center flex-grow h-10 bg-purplevv/50"></div>
                            <div className="relative flex justify-center flex-grow h-24 bg-purplevv"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Aug</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$67,500</span>
                        <div className="flex items-end w-full">
                            {/* <div className="relative flex justify-center flex-grow h-12 bg-purple-200"></div> */}
                            <div className="relative flex justify-center flex-grow h-10 bg-purplevv/50"></div>
                            <div className="relative flex justify-center flex-grow h-32 bg-purplevv"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Sep</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$65,000</span>
                        <div className="flex items-end w-full">
                            {/* <div className="relative flex justify-center flex-grow h-12 bg-purple-200"></div> */}
                            <div className="relative flex justify-center flex-grow h-12 bg-purplevv/50"></div>
                            <div className="relative flex justify-center flex-grow bg-purplevv h-28"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Oct</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$70,000</span>
                        <div className="flex items-end w-full">
                            {/* <div className="relative flex justify-center flex-grow h-8 bg-purple-200"></div> */}
                            <div className="relative flex justify-center flex-grow h-8 bg-purplevv/50"></div>
                            <div className="relative flex justify-center flex-grow h-40 bg-purplevv"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Nov</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$75,000</span>
                        <div className="flex items-end w-full">
                            {/* <div className="relative flex justify-center flex-grow h-12 bg-purple-200"></div> */}
                            <div className="relative flex justify-center flex-grow h-8 bg-purplevv/50"></div>
                            <div className="relative flex justify-center flex-grow h-40 bg-purplevv"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Dec</span>
                    </div>
                </div>
                <div className="flex w-full mt-3">
                    <div className="flex items-center ml-auto">
                        <span className="block w-4 h-4 bg-purplevv"></span>
                        <span className="ml-1 text-xs font-medium">Existing</span>
                    </div>
                    <div className="flex items-center ml-4">
                        <span className="block w-4  h-4 bg-purplevv/50"></span>
                        <span className="ml-1 text-xs font-medium">Upgrades</span>
                    </div>
                    <div className="flex items-center ml-4">
                        <span className="block w-4  h-4 bg-purple-200"></span>
                        <span className="ml-1 text-xs font-medium">New</span>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CustomBarChart