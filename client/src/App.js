import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getPosts } from "./actions/posts";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  //fetching posts from the database
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home currentId={currentId} setCurrentId={setCurrentId} />}
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
