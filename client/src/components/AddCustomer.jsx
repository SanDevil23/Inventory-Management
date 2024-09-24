import React, { useState } from 'react'
import './css/MainCss.css'
import axios from 'axios';

const AddCustomer = ({onCancel}) => {
    const [name, setName] = useState("");
    const [add, setAdd] = useState("");
    const [PAN, setPAN] = useState("");
    const [GSTN, setGSTN] = useState("");
    const [active, setActive] = useState(true);


    const handleName = (event) => {

      setName(event.target.value)
    }
    
    const handleAdd = (event) => {

      setAdd(event.target.value)
    }
    
    const handlePAN = (event) => {

      setPAN(event.target.value)
    }
    
    const handleGSTN = (event) => {
      setGSTN(event.target.value)

    }
    
    const handleActive = (event) => {
      // logic for sending active state
      if (event.target.value === "active"){
        setActive(true);
      }else{
        setActive(false);
      }
    }


    // form submit
    const handleFormSubmit = async(event) => {
      if (!name) {
          console.log("Customer Name is Required");
        return;
      }
  
      if (!add) {
        console.log("Address is Required");
        return;
      }

      if (PAN.length !== 10) {
        console.log("PAN");

        return;
      }

      if (GSTN && GSTN.length !== 15) {
        console.log("GSTN");
        return;
      }

      console.log(name, add, PAN, GSTN, active);
      // sending data to the backend 
      try {
        
        const data = {
          name: name,
          add: add,
          pan: PAN,
          gst: GSTN,
          status: active,
        };
        
        const JSONdata = JSON.stringify(data);
        console.log(JSONdata)

        const response = await axios.post('http://localhost:5000/api/customer/add', data);
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
      <h1>Add New Customer</h1>
      <div className='form'>
        <div className='form-input'>
            <label htmlFor="name">Customer Name</label>
            <input type="text" id="name" value={name} required onChange={handleName} />

            <label htmlFor="add">Customer Address</label>
            <input type="text" id="add" value={add} required onChange={handleAdd} />
        </div>

        <div className='form-input'>
            <label htmlFor="PAN">Customer PAN Card Number</label>
            <input type="text" id="PAN" value={PAN} minLength={10} maxLength={10} onChange={handlePAN} required />

            <label htmlFor="GSTN">Customer GST Number</label>
            <input type="text" id="GSTN" value={GSTN} minLength={15} maxLength={15} onChange={handleGSTN} required />
        </div>

        <div className='form-input'>
            <label htmlFor="customerStatus">Customer Status</label>
            <select id="customerStatus"  onChange={handleActive} required>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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

export default AddCustomer
