import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './css/MainCss.css'
import {useNavigate} from 'react-router-dom';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { Button } from '@mui/material';
import AddItems from './AddItems';

const Items = () => {
    const [data, setData] = useState([]);  
    const navigate = useNavigate(); // Initialize useHistory  

    const [showAddItems, setShowAddItems] = useState(false);

    // switch between the forms on the same page
    const toggleAddItems = () => {
      setShowAddItems(!showAddItems);
      fetchItems();
    };    
    
    
    const fetchItems  = async() => {
        try {
            const response = await axios.get('http://localhost:5000/api/item/data');
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }


    const Back = () => {
        navigate(-1); // Go back to previous page
    };

    useEffect(() => {
        fetchItems();
      }, []);

    return (
        <div className='base'>

            {showAddItems ? (
            <AddItems  onCancel={toggleAddItems}/>            // onCancel is passed to toggle from the form
            ) : (
            <div>   
            <div className='add-btn'>
            <div className='header-lg'>ITEMS</div>
            <Button  onClick={toggleAddItems} variant="contained" startIcon={<AddCircleSharpIcon fontSize='medium'/>}>
                Add
            </Button>
            
            </div>     
            <div className="box-master">
            {data.map((items, index) => (
            <div key={index} className={`${items.avail ? 'card-md-master' : 'card-md-master-inactive'}`}>
                <h2>{items.itemname}</h2>
                <div className={`status ${items.avail ? 'active' : 'inactive'}`}>
                    {items.avail ? "Available":"Out-of-Stock"}
                </div>
            </div>
            ))}
            </div>
            <button className="btn-md" onClick={Back}>Back</button>
            </div>)}
            </div>
    )
}

export default Items
