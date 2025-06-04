import React, { useState } from "react";
import axios from "axios";

const GetApiToken= () => {
  const [response, setResponse] = useState( {token: "", refreshToken: "" });

  const handleRequest = async () => {
    try {
      const res = await axios.post("http://localhost:3000/token", {
      // Dane, które chcesz wysłać w body
       // key: "value",
      });

      setResponse(res.data); // Zakładamy, że backend zwraca string
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>React POST Request</h1>
      <button onClick={handleRequest}>Send POST Request</button>
      <p>Response: {response.token}</p>
    </div>
  );
};

export default GetApiToken;
