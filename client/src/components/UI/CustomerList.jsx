import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = ({onClose, createBill}) => {
    const [data, setData] = useState([]); 

    const fetchCustomers  = async() => {
        try {
            const response = await axios.get('http://localhost:5000/api/customer/data');
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    }

    const handleClick = (customer) => {
        if (customer.active === false) return (<div>Not Active</div>);
        createBill(customer)
        onClose();
    }

    // form cancel
    useEffect(() => {
        fetchCustomers();
      }, []);
      
  return (
        <div>
            <h1>Select Customer</h1>
            <div className="box-master">
            {data.map((customer, index) => (
            <button onClick={() => handleClick(customer)} key={index} className={`${customer.active ? 'card-md-master' : 'card-md-master-inactive'}`}>
                <h2>{customer.custname}</h2>
                <div className={`status ${customer.active ? 'active' : 'inactive'}`}>
                    {customer.active ? "Active":"Inactive"}
                </div>
            </button>
            ))}
            </div>
    </div>
  )
}

export default CustomerList