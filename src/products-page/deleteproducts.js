import React from 'react';
import { useEffect, useState } from "react";
import { addDoc, deleteDoc, getDocs, doc,updateDoc} from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../auth/firebase-config';
import { Modal, ModalBody, ModalHeader, Row, Col} from "reactstrap";
import Navbar from '../navbar/navbar';


function Deleteproducts() {
  const options = [
    { value: '', text: '--Choose an option--' },
    { value: 'electronics', text: 'electronics' },
    { value: 'homedecor', text: 'home decor' },
    { value: 'furniture', text: 'furniture' },
    { value: 'cosmetics', text: 'cosmetics' },
    { Value: 'clothing', text: 'clothing' },
  ];
  const [productList, setProductList] = useState([]);
  const productCollectionRef = collection(db, "Products");
  const [visible, setVisible] = useState(false);
  const[updatedProductName,setUpdatedProductName]=useState("");
  const[updatedCategory,setUpdatedCategory]=useState(options[0].value);
  const[updatedPrice,setUpdatedPrice]=useState(0);
  const[updatedQuantity,setUpdatedQuantity]=useState(0);
  const[updatedDescription,setUpdatedDescription]=useState("");
  const[productId,setProductId]=useState("");
  const getProductList = async () => {
    try {
      const data = await getDocs(productCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setProductList(filteredData);
      console.log(filteredData);
    }
    catch (err) {
      console.error(err);
    }

  };
  useEffect(() => {
    getProductList();
  }, []);

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "Products", id);
    await deleteDoc(productDoc);
    getProductList();
  };

  const updateProduct= async (id) => {
    const productDoc = doc(db, "Products", id);
    await updateDoc(productDoc,
      {productName:updatedProductName,
      category:updatedCategory,
      price:updatedPrice,
      quantity:updatedQuantity,
      description:updatedDescription,});
    getProductList();
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setUpdatedCategory(event.target.value);
  };

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
          {productList.map((product) => (
            <tr>
              <td>{product.index}</td>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.description}</td>
              <button className="dltbtn" onClick={() => { deleteProduct(product.id) }}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg></button>
              <button className="updatebtn"  onClick={() => {
                  setVisible(true);
                  setProductId(product.id);
                }}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></button>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal size="lg" isOpen={visible} toggle={() => setVisible(!visible)}>
        <ModalHeader toggle={() => setVisible(!visible)}>Update Product</ModalHeader>
        <ModalBody>
          <form>
            <Row>
              <Col lg={12}>
                <div>
                  <label htmlFor='name'>
                    Name
                  </label>
                  <input type='text' placeholder='enter product name..' className='productname'
                  onChange={(e)=>setUpdatedProductName(e.target.value)}

                  />
                  <label htmlFor='category'>
                    Category
                  </label>
                  <select value={updatedCategory} onChange={handleChange} className='productcategory'>
                    {options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                  <label htmlFor='price'>
                    Price
                  </label>
                  <input type='number' className='productprice' placeholder='enter price...' 
                    onChange={(e)=>setUpdatedPrice(Number(e.target.value))}
                  />
                </div>
                <div>
                <label htmlFor='quantity'>Quantity</label>
                <input type='number' className='productquantity' placeholder='enter quantity'
                onChange={(e)=>setUpdatedQuantity(Number(e.target.value))} />
                
                <label htmlFor='description'>Description</label>
                <input type='text' className='productdescription' placeholder='Describe it'
                onChange={(e)=>setUpdatedDescription(e.target.value)} />
                
                </div>
                <div>
                  <button type='button' className='updatebutton' onClick={(e)=>updateProduct(productId)}>Update button</button>
                </div>

              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </div>

  );
}
export default Deleteproducts;