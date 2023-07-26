import React, { useEffect, useState } from "react";
import useAxiosMethods from "../../hooks/useAxiosMethods";

const ViewRequest = () => {
  const { get } = useAxiosMethods();
  const [response, setResponse] = useState([]);

  useEffect(() => {
    // Use an async function to handle the asynchronous API call
    const fetchData = async () => {
      try {
        const data = await get("/auth/pending");
        setResponse(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(response); // This will show the updated state value after the API call

  return (
    <div>
      <h2>Registration Requests - Not Accepted</h2>
      {response && response.length > 0 ? (
        <ul>
          {response.map(request => (
            <li key={request.id}>
              <p>Name: {request.name}</p>
              <p>Email: {request.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No registration requests found.</p>
      )}
    </div>
  );
};

export default ViewRequest;
