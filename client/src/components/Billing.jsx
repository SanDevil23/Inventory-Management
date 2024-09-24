import React, { useState } from 'react'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { Button } from '@mui/material';
import CustomerList from '../components/UI/CustomerList'
import DialogBox from './UI/DialogBox';
import './css/MainCss.css'
import ItemList from './UI/ItemList';
import axios from 'axios';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

const Billing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [billState, setBillState] = useState(false);
  const [itemState, setItemState] = useState(false);
  var [q,setQ] = useState(2);
  const [data, setData] = useState({})   
  const [item, setItem] = useState({})   

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const clearBillState = () => {
    setQ(0);
    setItem({});
    setItemState(false);
    setBillState(!billState);
  }

  const createBill = (customer) => {
    console.log('Creating bill for customer:', customer);
    setData(customer)
    setBillState(!billState);
  };

  const createItem = (item) => {
    console.log('Creating bill for customer:', item);
    setItem(item);
    setItemState(!itemState)
  };

  const addBill = async() => {
    const totalAmount = (data.GSTN !== ""? 1.18*item.price*q : item.price*q);  
    try {
        const billData = {
          cid: data.custid,
          iid: item.itemid,
          qty: q,
          amt: totalAmount
        } 

        const response = await axios.post('http://localhost:5000/api/bill/add', billData);
        console.log(response);
        clearBillState();
      } catch (err) {
        console.log(err);
      }
  }

  const minusItem = () => {
    setQ(--q);
  }

  const plusItem = () => {
    setQ(++q);
  }
  return (
    <div>
      <h1>Billing</h1>
      {billState ? (
        <div>  
        <div className="customer-details-container">
          <h1 className='padded-heading'>Customer Details</h1>
          <div className="content">
            <p>Name : <b>{data.custname}</b></p>
            <p>Address : <b>{data.custadd}</b></p>
            <p>PAN Card : <b>{data.PAN}</b></p>
            <p>GST Number : <b>{data.GSTN}</b></p>

          </div>
        </div>
          <div className="customer-details-container">
          <h1 className='padded-heading'>Items</h1>
          {itemState ?(
    <div>
    <table className="bill-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{item.itemname}</td>
          <td >
            <div className='inc_btn'>
            <Button onClick={plusItem}><AddOutlinedIcon/></Button>
            {q}
            <Button onClick={minusItem}><RemoveOutlinedIcon/></Button>
            </div>
          </td>
          <td>{item.price*q}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr >
          <td colSpan="2">Total Amount</td>
          <td>{data.GSTN !== ""? 118*item.price*q/100 : item.price*q}</td>
        </tr>
      </tfoot>
    </table>
    <div className="button-container">
      <button className="cancel" onClick={clearBillState}>Cancel</button>
      <button onClick={addBill}>Create</button>
    </div>
  </div>
          ):(
          <div className="content">
            <Button onClick={openDialog} startIcon={<AddCircleSharpIcon fontSize='medium'/>}>ADD</Button>
            <DialogBox isOpen={isOpen} onClose={closeDialog}>
              <ItemList onClose={closeDialog} createItem={createItem}/>
            </DialogBox> 
          </div>)}
        </div> </div>):(         
          <div>
      <Button onClick={openDialog} startIcon={<AddCircleSharpIcon fontSize='medium'/>}>ADD</Button>
      <DialogBox isOpen={isOpen} onClose={closeDialog}>
        <CustomerList onClose={closeDialog} createBill={createBill}/>
      </DialogBox> 
      </div> )}
    </div>
  )
}

export default Billing;
