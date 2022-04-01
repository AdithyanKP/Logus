import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { getPosts } from "./actions/posts";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  //fetching posts from the database
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <Navbar />
      <Home currentId={currentId} setCurrentId={setCurrentId} />
    </Container>
  );
};

export default App;
