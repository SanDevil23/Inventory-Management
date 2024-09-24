import React, { useState } from 'react'
import './css/MainCss.css'
import axios from 'axios';

const AddItems = ({onCancel}) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(-1);
    const [avail, setAvail] = useState(true);


    const handleName = (event) => {

      setName(event.target.value)
    }

    
    const handlePrice = (event) => {

      setPrice(event.target.value)
    }

    
    const handleAvail = (event) => {
      // logic for sending active state
      if (event.target.value === "available"){
        setAvail(true);
      }else{
        setAvail(false);
      }
    }


// form submit
const handleFormSubmit = async(event) => {
      if (!name) {
          console.log("Customer Name is Required");
        return;
      }

      if (price === -1){
        console.log("Price required");
        return;
      }
      
      console.log(name, price, avail);
      // sending data to the backend 
      try {
        
        const data = {
            name: name,
            price: price,
            avail: avail,
        };
    
        const response = await axios.post('http://localhost:5000/api/item/add', data);
        console.log(response);
      } catch (err) {
          console.log(err)
      }
      onCancel();                                         // Close the AddCustomer component
      };
    
    // form cancel
      const CloseForm = () => {
        onCancel();                                         // Close the AddCustomer component
      };

  return (
    <div className='base'>
      <h1>Add New Item</h1>
      <div className='form'>
        <div className='form-input'>
            <label htmlFor="name">Item Name</label>
            <input type="text" id="name" value={name} required onChange={handleName} />
        </div>

        <div className='form-input'>
            <label htmlFor="price">Customer Selling Price</label>
            <input type="text" id="PAN" value={price} onChange={handlePrice} required />
        </div>

        <div className='form-input'>
            <label htmlFor="itemStatus">Customer Status</label>
            <select onChange={handleAvail} required>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
            </select>
        </div>

        <div className='form-buttons'>
            <button className='form-button cancel' onClick={CloseForm}>Cancel</button>
            <button className='form-button submit' onClick={handleFormSubmit}>Create</button>
        </div>
      </div>


    </div>
  )
}

export default AddItems
