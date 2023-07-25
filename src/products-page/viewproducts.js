import React from 'react';
import {useEffect,useState} from "react";
import { addDoc, getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../auth/firebase-config';
import './products.css';
import Navbar from '../navbar/navbar';

function Viewproducts(){
     const [productList,setProductList]=useState([]);
     const productCollectionRef=collection(db,"Products");
     const getProductList=async()=>{
      try{
      const data=await getDocs(productCollectionRef);
      const filteredData=data.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id,
      }))
      setProductList(filteredData);
      console.log(filteredData);
      }
      catch(err){
        console.error(err);
      }

    };
     useEffect(()=>{
        getProductList();
     },[]);
   return (
        <div className="viewproducts">
        <Navbar />
        <table>
        <thead>
        <tr>
          <th>S.no</th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>
        {productList.map((product)=>(
          <tr>
          <td></td>
          <td>{product.productName}</td>
          <td>{product.category}</td>
          <td>{product.price}</td>
          <td>{product.quantity}</td>    
          <td>{product.description}</td>
          </tr> 
        ))}
        </tbody>
        </table>
        </div>

        );
        }
export default Viewproducts;