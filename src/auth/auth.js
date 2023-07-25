import React from "react";
import { ReactDOM } from "react";
import { auth,googleProvider,db } from "./firebase-config";
import { createUserWithEmailAndPassword,signInWithPopup,signOut} from "firebase/auth";
import { useState } from "react";
import './auth.css';
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Route12 from "../route/route";


const Auth=()=>{
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[page,setPage]=useState("");
    let admin="angellinejeba@gmail.com";

    const signIn=async()=>{
        try{
            if(email===admin){
                setPage("/adminpage");
            }
            else{
                setPage("/userpage");
                await createUserWithEmailAndPassword(auth,email,password);
            }    
        }
        catch(err){
            console.log(err);
        }
    }
    const signInWithGoogle=async()=>{
        try{
            await signInWithPopup(auth,googleProvider);
        }
        catch(err){
            console.log(err);
        }
    }
    const logout=async()=>{
        try{
            await signOut(auth);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="login-form">
        <h3>Login form</h3>
        <input className="input-text" type="text" placeholder="enter your email" onChange={(e)=>setEmail(e.target.value)} />
        <input className="input-psw" type="password" placeholder="enter your password" onChange={(e)=>setPassword(e.target.value)} />
        <button className="button btn-1" type="button" onClick={signIn}><Link to={page} style={{color: "white",textDecoration:"none"}}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>SIGN UP/LOGIN</Link></button>
        </div>      
    );  
};

export default Auth;