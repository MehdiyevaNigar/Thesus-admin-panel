import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";
import axios from "axios";
import SingleProduct from "./pages/SingleProduct";
import Edit from "./pages/Edit";
import Create from "./pages/Create";
axios.defaults.baseURL = "http://localhost:5000";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
};

export default App;
