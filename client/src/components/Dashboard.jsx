import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/MainCss.css';

const Dashboard = () => {
  const [bill, setBill] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [view, setView] = useState(false);
  const [viewCard, setViewCard] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [billResponse, customerResponse, itemResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/bill/data'),
          axios.get('http://localhost:5000/api/customer/data'),
          axios.get('http://localhost:5000/api/item/data'),
        ]);

        setBill(billResponse.data);
        setCustomers(customerResponse.data);
        setItems(itemResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    // function call
      
    }, );

  useEffect(() => {
    const prepareInvoiceData = () => {
      if (bill.length && customers.length && items.length) {
        const preparedData = bill.map(b => {
          const customer = customers.find(c => c.custid === b.custid);
          const item = items.find(i => i.itemid === b.itemid);

          return {
            ...b,
            customerName: customer ? customer.custname : 'Unknown Customer',
            itemName: item ? item.itemname : 'Unknown Item',
            customerAdd: customer ? customer.custadd : "N.A.",
            PAN: customer ? customer.PAN : "N.A.",
            GST: customer ? customer.GSTN : "N.A.",
            amount: b.amount.toFixed(2),
            quantity: item ? item.quantity : 0,
          };
        });
        console.log(preparedData);
        setInvoiceData(preparedData);               // storing all the prepared data into Invoice Data
      }
    };

    prepareInvoiceData();
  }, [bill, customers, items]);


  // search by invoice id
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);             // setting the target variable to invoice id
  };

  const filteredInvoices = invoiceData.filter(invoice =>
    invoice.invoiceid.toString().includes(searchQuery)
  );

  const handleViewClick = (invoice) => {
    setView(true);
    setViewCard(invoice);
  };

  const clearView = () => {
    setView(false);
  };

  return (
    <div>


      {invoiceData.length ? (
        view ? (
          <div>
            <h1>Invoice Details</h1>
            <div className="customer-details-container">
              <div className='invoice-header'>
                <div>Customer Details</div>
                <div>Invoice ID : {viewCard.invoiceid}</div>
              </div>
              <div className="content">
                <p>Name : <b>{viewCard.customerName}</b></p>
                <p>Address : <b>{viewCard.customerAdd}</b></p>
                <p>PAN Card : <b>{viewCard.PAN}</b></p>
                <p>GST Number : <b>{viewCard.GST}</b></p>
              </div>
            </div>
            <div className="customer-details-container">
              <h1>Items</h1>
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
                      <td>{viewCard.itemName}</td>
                      <td>{viewCard.quantity}</td>
                      <td>{viewCard.amount}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2">Total Amount</td>
                      <td>{viewCard.amount}</td>
                    </tr>
                  </tfoot>
                </table>
                <div className="button-container">
                  <button className="cancel" onClick={clearView}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1>Dashboard</h1>
            <div className="search-invoice">
              <input
                type="text"
                placeholder="Search by Invoice ID"
                value={searchQuery}
                onChange={handleSearchChange}                 // handling the search by invoice id query
              />
          </div>
            <table>
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Customer Name</th>
                  <th>Item Name</th>
                  <th>Amount</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.length ? (
                  filteredInvoices.map((invoice, index) => (
                    <tr key={index}>
                      <td>{invoice.invoiceid}</td>
                      <td>{invoice.customerName}</td>
                      <td>{invoice.itemName}</td>
                      <td>{invoice.amount}</td>
                      <td>
                        <button className='view-btn' onClick={() => handleViewClick(invoice)}>View</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No matching invoices found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <p>Loading invoice details...</p>
      )}
    </div>
  );
};

export default Dashboard;
