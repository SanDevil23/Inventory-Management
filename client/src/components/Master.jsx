import React from 'react'
import './css/MainCss.css'

const Master = () => {
  return (
    <div>
      <h1>Master</h1>

    <div className='box'>
        <button className='card-md'>
        <a href="/customers">
            <b>Customer</b>
            <p className='normal-txt'>Read or Create customer data</p>
        </a>
        </button>

        <button className='card-md'>
        <a href="/items">     
            <b>Item</b>
            <p className='normal-txt'>Read or Create item data</p>
        </a>
        </button>        
    </div>


    </div>
  )
}

export default Master
