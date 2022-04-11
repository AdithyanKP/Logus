import React from "react";
import { Container } from "@material-ui/core";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
