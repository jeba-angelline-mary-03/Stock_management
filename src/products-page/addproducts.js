import Navbar from '../navbar/navbar'
import { getDocs,addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../auth/firebase-config';
import { useState,useEffect} from 'react';

function AddProducts(){
    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 'electronics', text: 'electronics'},
        {value: 'homedecor', text: 'home decor'},
        {value: 'furniture', text: 'furniture'},
        {value:'cosmetics',text:'cosmetics'},
        {Value:'clothing',text:'clothing'},
      ];
     const [productList,setProductList]=useState([]);
     const productCollectionRef=collection(db,"Products");
     const[newproductName,setProductName]=useState("");
     const[newProductPrice,setProductPrice]=useState(0);
     const[newProductQuantity,setProductQuantity]=useState(0);
     const[selected,setSelected]=useState(options[0].value);
     const[newDescription,setDescription]=useState("");
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
  
       const submitted=async()=>{
        console.log(newproductName);
        try{
        await addDoc(productCollectionRef,{
          productName:newproductName,
          price:newProductPrice,
          quantity:newProductQuantity,
          category:selected,
          description:newDescription,
       });
      }catch(err){
        console.error(err);
      }
      getProductList();
       };
  
       const handleChange = event => {
        console.log(event.target.value);
        setSelected(event.target.value);
      };

    return(
        
        <div className='total'>
        <Navbar />
        <h4 className='productHeading'>Add your product details</h4>
        <div className='form'>
        <div className='inline1'>
        <input type='text' placeholder='Product name...' className='name' onChange={(e)=>setProductName(e.target.value)}></input>
        <select value={selected} onChange={handleChange} className='category'>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
        </div>
        <div className='inline2'>
        <input type='text' placeholder='Price of your product..' className='price'
        onChange={(e)=>setProductPrice(Number(e.target.value))}></input>
        <input type='number' placeholder='Quantity...' className='quantity' 
        onChange={(e)=>setProductQuantity(Number(e.target.value))}></input>
        </div>
        <textarea cols={30} rows={20} placeholder='description of your product..' className='description'
        onChange={(e)=>setDescription(e.target.value)}></textarea>
        </div>
        <button type='button' className='addProductbtn' onClick={submitted}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg>Add product</button>
        </div>
    );
}

export default AddProducts;