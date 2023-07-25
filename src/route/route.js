import { Component, useEffect, useState } from "react";
import { ReactDOM } from "react";
import Navbar from "../navbar/navbar";
import Viewproducts from "../products-page/viewproducts";
import Addproducts from "../products-page/addproducts";
import Deleteproducts from "../products-page/deleteproducts";
import  Auth  from "../auth/auth";
import {BrowserRouter as Router,
        Routes,
        Route,
        Link} from "react-router-dom";

function Route12(){
   return (
    <Router>
        <Navbar />
        <Routes>
            <Route exact path="/addproducts" Component={Addproducts} />
            <Route exact path="/viewproducts" Component={Viewproducts} />
            <Route exact path="/editproducts" Component={Deleteproducts} />
        </Routes>
    </Router>
    );
}

export default Route12;

