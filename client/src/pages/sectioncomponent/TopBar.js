import React from 'react';

function TopBar(){
    return (
        <div className='relative h-56 w-full mt-0'>
            <div className='h-36 w-full mt-0 py-16 px-4 bg-gradient-to-r from-main-purple to-light-purple' >
                <div className='absolute h-48 w-full py-0 px-12 flex flex-row left-0 ' >
                    <img
                        className="relative h-48 w-48  border-4 border-white  rounded-lg object-cover object-center"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        alt="nature image"
                    />
                    <div className=' m-4 mt-28 flex flex-col px-1 h-auto ' >
                        <h1 className=' font-bold text-4xl' >Chris Perera</h1>
                        <h3 className='mt-2'>email@gmail.com</h3>
                    </div>
                </div>
            </div>
        </div>
    )}

export default TopBar