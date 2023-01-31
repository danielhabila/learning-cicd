import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddToList from "./Pages/AddToList";
import ListOfQuotes from "./Components/ListOfQuotes";
import ErrorPage from "./Pages/ErrorPage";
import MainCard from "./Components/MainCard";

import Navbar from "./Components/Navbar";
import FeaturedGrid from "./Components/FeaturedGrid";
import Buttons from "./Components/Buttons";

function App() {
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  const [addAuthor, setAddAuthor] = useState("");
  const [addQuote, setAddQuote] = useState("");

  const [listOfQuotes, setListOfQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState([]);

  const [updateQuote, setUpdateQuote] = useState("");
  const [updateAuthor, setUpdateAuthor] = useState("");
  //this renders everytime we refresh our page or if item in square brackets change
  useEffect(() => {
    collectQuote();
    aRandomQuote();
  }, []);

  async function collectQuote() {
    await Axios.get("http://localhost:3001/readAllQuotes").then((response) => {
      setListOfQuotes(response.data);
    });
  }
  // Generating a random quote
  async function aRandomQuote() {
    await Axios.get("http://localhost:3001/getRandom").then((response) => {
      setRandomQuote(response.data);
    });
  }

  const handleSubmit = (e) => {
    inputRef.current.value = "";
    inputRef2.current.value = "";
    Axios.post("http://localhost:3001/add", {
      author: addAuthor,
      quote: addQuote,
    }).then((response) => {
      //this allows us to update the list of quotes upon submission of form
      setListOfQuotes([
        ...listOfQuotes,
        {
          _id: response.data._id,
          author: addAuthor,
          quote: addQuote,
        },
      ]);
    });

    // we are connecting our app.js frontend to our index.js backend by passing the route from our backend and passing the objects of author and quote from the backend and connecting it to the states from the front end.
  };

  // The .put method is used to update. The object we pass is the called the "body" object which we can tap into in the backend
  const updateDBitem = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      updateQuote: updateQuote,
      updateAuthor: updateAuthor,
    }).then(() => {
      setListOfQuotes(
        listOfQuotes.map((value) => {
          return value._id === id
            ? { _id: id, quote: updateQuote, author: updateAuthor }
            : value;
        })
      );
    });
  };

  const deleteDBitem = async (id) => {
    await Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setListOfQuotes(
        listOfQuotes.filter((value) => {
          return value._id !== id;
        })
      );
    });
  };

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <MainCard
                  randomQuote={randomQuote}
                  aRandomQuote={aRandomQuote}
                />
                <Buttons aRandomQuote={aRandomQuote} />
              </div>
            }
          />
          <Route
            path="/Edit"
            element={
              <div>
                <AddToList
                  setAddQuote={setAddQuote}
                  setAddAuthor={setAddAuthor}
                  handleSubmit={handleSubmit}
                  inputRef={inputRef}
                  inputRef2={inputRef2}
                />
                <ListOfQuotes
                  listOfQuotes={listOfQuotes}
                  setUpdateQuote={setUpdateQuote}
                  setUpdateAuthor={setUpdateAuthor}
                  updateDBitem={updateDBitem}
                  deleteDBitem={deleteDBitem}
                />
              </div>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
