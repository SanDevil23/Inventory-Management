import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './css/MainCss.css'
import {useNavigate} from 'react-router-dom';
// import AddIcon from '@mui/icons-material/Add';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { Button } from '@mui/material';
import AddCustomer from './AddCustomer';


const Customers = () => {
    const [data, setData] = useState([]);    
    const navigate = useNavigate();

    const [showAddCustomer, setShowAddCustomer] = useState(false);

    // switch between the forms on the same page
    const toggleAddCustomer = () => {
      setShowAddCustomer(!showAddCustomer);
      fetchCustomers();
    };    
    
    const fetchCustomers  = async() => {
        try {
            const response = await axios.get('http://localhost:5000/api/customer/data');
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    }

    useEffect(() => {
        fetchCustomers();
      }, []);

    const Back = () => {
        navigate(-1);
    }



    return (
        <div className='base'>

            {showAddCustomer ? (
            <AddCustomer  onCancel={toggleAddCustomer}/>            // onCancel is passed to toggle from the form
            ) : (
            <div>   
            <div className='add-btn'>
            <div className='header-lg'>CUSTOMERS</div>
            <Button  onClick={toggleAddCustomer} variant="contained" startIcon={<AddCircleSharpIcon fontSize='medium'/>}>
                Add
            </Button>
            
            </div>     
            <div className="box-master">
            {data.map((customer, index) => (
            <div key={index} className={`${customer.active ? 'card-md-master' : 'card-md-master-inactive'}`}>
                <h2>{customer.custname}</h2>
                <div className={`status ${customer.active ? 'active' : 'inactive'}`}>
                    {customer.active ? "Active":"Inactive"}
                </div>
            </div>
            ))}
            </div>
            <button className="btn-md" onClick={Back}>Back</button>
            </div>)}
            </div>
        )
}

export default Customers
