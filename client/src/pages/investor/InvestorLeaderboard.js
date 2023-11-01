import React, {useState, useEffect} from "react";
import { Input, Select, Button, Header, StatusPopUp } from "../webcomponent";
import axios from '../../api/axios';
import { Rating } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import useAuth from "../../hooks/useAuth";
import { interactionSettingsStore } from "@fullcalendar/core/internal";


const InvestorLeaderboard = () => {
    const { get,put} = useAxiosMethods();
    const [rated, setRated] = React.useState(4);
    const [response, setResponse] = useState([]);
    const [filteredList, setFilteredList] =useState([]);
    const [firstArrayOfObjects, setfirstArrayOfObjects] =useState([]);
    const {auth}=useAuth();

  

    
    useEffect(() => {
            get(`auth/GivingStarRatingBoth/${auth.id}`, setResponse);
            get(`auth/GivingStarRatingBoth/${auth.id}`, setFilteredList);
            
        }, []);

        useEffect(() => {
            if (filteredList.length > 0) {
              setfirstArrayOfObjects(filteredList[0]);
            }
          }, [filteredList]);




     
    
  

       

    const filterBySearch = (event) => {
        const query = event.target.value; // Convert query to lowercase
        console.log(query);
        if(query === ''){
            console.log("hi");
            setFilteredList(response);
            setfirstArrayOfObjects(response[0]);
        }

        else{
        var updatedList = [...response];
        
        updatedList = response[0].filter((user) => {
            const firstName = `${user.firstname}${user.lastname}`.toLowerCase();
            const queryLowerCase = query.toLowerCase();
            
        
        
          return firstName.includes(queryLowerCase);

        }); 
         setfirstArrayOfObjects(updatedList);
         
        
        }
      };


    const findIndex = (id) =>{
        for (let i = 0; i < response[0].length; i++) {
            const user = response[0][i];
            if (user.id === id) {
              return i+1; // Return the index where the ID matches
            }
          }
          return -1; // Return -1 if ID is not found in the response
        }


        

        const getstarvalue = (id) =>{
            for (let i = 0; i < response[0].length; i++) {
                const user = response[0][i];
                if (user.id === id) {
                   var star= Math.round(5/response[1][0]* response[1][i]);
                   
                  return star; // Return the index where the ID matches

                }
              }
              return -1; // Return -1 if ID is not found in the response
            }   


    console.log(filteredList);


     
    return(
        <div className="">
        <Header active="Leaderboard">
            <br></br>        
            <main className="h-auto flex justify-center items-center g:h-screen border-[1px] border-main-purple rounded-[1rem]">
            <div className="relative  sm:rounded-lg p-2 w-full">
                <h2 className="text-2xl font-extrabold my-5">
                   Leaderboard
                </h2>
                <div className="flex items-center justify-between pb-4 bg-white">
                    <div className="flex">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="table-search-users"
                                className="block p-2 pl-10 text-[15px]text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search by name"
                                onChange={filterBySearch}
                            />
                        </div>
                    </div>
                    
                </div>
                <table className="w-full text-[15px]text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-[15px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="w-1/3">
                            Position
                        </th>
                        <th scope="col" className="w-1/3">
                            Name
                        </th>
                        
                        <th scope="col" className="w-1/3">
                            Rating
                        </th>
                        
                    </tr>
                    </thead>
                    <tbody>
                      {firstArrayOfObjects.map((user, key=user.id) => (


                        
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                             <td className="px-12 py-3 text-sm justify-end">
                            <div className="flex items-center justify-center">

                                <span className="text-[15px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    {findIndex(user.id)}
                                </span>
                            </div>
                        </td>
                        
                        <th scope="row"
                            className="flex items-center px-4 py-2 text-gray-700 whitespace-nowrap dark:text-white justify-left">
                            <img className="w-8 h-8 rounded-full"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                                alt="Jese"/>
                           <div className="pl-2">
                            {user.lastname == null ? (
                                <div className="text-[15px] font-semibold">{user.firstName}</div>
                            ) : (
                                <div className="text-[15px] font-semibold">{user.firstname} {user.lastname}</div>
                            )}
                            <div className="text-[13px] text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>


                        </th>
                       
                        <td>
                            <div className="px-48	 py-3">
                           
                                <Rating value={getstarvalue(user.id)}  edit={false}/>
                            </div>
                        </td>
                        
                        </tr>  
                        ))}
                    </tbody>
                </table>
            </div>
            </main> 
            
        </Header>
        </div>   
    )

}

export default InvestorLeaderboard;