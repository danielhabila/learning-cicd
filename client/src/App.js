import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getNames();
  }, []);

  const getNames = () => {
    try {
      const res = axios.get("/names");
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return <h1>My frontend</h1>;
}

export default App;
