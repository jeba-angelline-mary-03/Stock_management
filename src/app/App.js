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
import Route12 from "../route/route";
import Userpage from "../products-page/user";


function App(){
   return (
   <Router>
    <Routes>
        <Route path="/" Component={Auth} />
        <Route exact path="/adminpage" Component={Viewproducts} />
        <Route exact path="/userpage" Component={Userpage} />
        <Route exact path="/addproducts" Component={Addproducts} />
        <Route exact path="/viewproducts" Component={Viewproducts} />
        <Route exact path="/editproducts" Component={Deleteproducts} />
        <Route exact path="/logout" Component={Auth} />
    </Routes>
</Router>
   
    );
}

export default App;