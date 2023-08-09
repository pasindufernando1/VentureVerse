import React,{useState} from "react";
import { Link } from "react-router-dom";
import Navbar from "../webcomponent/NavbarAll";
import { Button, Select } from "../webcomponent";
import { useEffect } from "react";
import useAxiosMethods from "../../hooks/useAxiosMethods";

const ViewRequests = () => {
  const { get } = useAxiosMethods();
  const [response, setResponse] = useState([]);
  const [investorRequests, setInvestorRequests] = useState([]);
  const [registrationRequests, setRegistrationRequests] = useState([]);

  useEffect(() => {
    get("/entrepreneurs/pending",setResponse);
  }, []);

  useEffect(() => {
    get("/investors/pending",setInvestorRequests);
  }, []);

  useEffect(() => {
    const requests = response.map((request) => ({
      id: request.id,
      firstname: request.firstname,
      lastname: request.lastname,
      email: request.email,
      role: "Entrepreneur",
    }));

    investorRequests.forEach((request) => {
      requests.push({
        id: request.id,
        firstname: request.firstname,
        lastname: request.lastname,
        email: request.email,
        role: "Investor",
      });
    });

    setRegistrationRequests(requests);
  }, [response, investorRequests]);

  const [sortBy, setSortBy] = useState("All");

  const handleSortByChange=(selectedOption)=> {
    setSortBy(selectedOption);
    if (selectedOption === "All") {
      get ("/entrepreneurs/pending",setResponse);
      get ("/investors/pending",setInvestorRequests);
    } else if (selectedOption === "Entrepreneur") {
      get ("/entrepreneurs/pending",setResponse);
      setInvestorRequests([]);
    }else if (selectedOption === "Investor") {
      get ("/investors/pending",setInvestorRequests);
      setResponse([]);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <main className="h-auto flex justify-center items-center bg-white lg:h-screen" style={{ marginTop: '-70px' }}>
          <form className="bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] lg:w-10/12">
            <div className="text-gray-700 p-[2rem] w-full">
              <div className="row flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold mb-4">Registration Requests</h2>  
                </div>
                <div className="register_select">
                  <Select
                    label="Sort By"
                    options={["All", "Entrepreneur", "Investor"]}
                    value={sortBy}
                    onChange={handleSortByChange}
                  />
                </div>
            </div>
              
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                View Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {registrationRequests.map((request) => (
                        <tr className="font-medium text-gray-700 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={request.id}>
                        <td className="px-6 py-4">{request.id}</td>
                        <td className="px-6 py-4">{request.firstname} {request.lastname}</td>
                        <td className="px-6 py-4">{request.email}</td>
                        <td className="px-6 py-4">{request.role}</td>
                        <td className="flex justify-center items-center py-2">
                            {request.role === "Entrepreneur" ? (
                              <Button>
                                <Link to={`/admin/view-entrepreneur-details/${request.id}`}>View</Link>
                              </Button>
                            ) : (
                              <Button>
                                <Link to={`/admin/view-investor-details/${request.id}`}>View</Link>
                              </Button>
                            )}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default ViewRequests;

