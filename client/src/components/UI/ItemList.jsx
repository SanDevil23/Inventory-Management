import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemList = ({onClose, createItem}) => {
    const [data, setData] = useState([]); 

    const fetchItems  = async() => {
        try {
            const response = await axios.get('http://localhost:5000/api/item/data');
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    }

    const handleClick = (item) => {
        if (item.avail === false) return;
        createItem(item);
        onClose();
    }

    // form cancel
    useEffect(() => {
        fetchItems();
      }, []);
      
  return (
        <div>
            <h1>Select Item</h1>
            <div className="box-master">
            {data.map((item, index) => (
            <button onClick={() => handleClick(item)} key={index} className={`${item.avail ? 'card-md-master' : 'card-md-master-inactive'}`}>
                <h2>{item.itemname}</h2>
                <div className={`status ${item.avail ? 'active' : 'inactive'}`}>
                    {item.avail ? "Active":"Inactive"}
                </div>
            </button>
            ))}
            </div>
    </div>
  )
}

export default ItemList