const asyncHandler = require("express-async-handler");
const pool = require('../config/db');
const Customer = require("../model/customerModel");


const getCustomers = asyncHandler(async(req, res) => {
    try{
        const data = await Customer.find({});
        res.status(200).send(data);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});


// Function to generate the custom key
async function generateCustomKey() {
    const customer = await Customer.findOneAndUpdate(
        {},
        { $inc: { count: 1 } },
        { new: true, upsert: true }
    );

    const paddedCount = customer.count.toString().padStart(4, '0');
    const customKey = `C${paddedCount}`;
    return customKey;
}

const addCustomer =  asyncHandler(async(req, res) => {
    // generating customer id
    const custid = await generateCustomKey();
    console.log(custid);
    const { name, add, pan, gst, status } = req.body;
    try{
        await Customer.create({
            custid: custid ,
            custname: name,
            custadd: add,
            PAN: pan,
            GSTN: gst,
            active: status
        })
        res.status(200).send({message:"Successfully Added to the table"})
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});


const findCustomer = asyncHandler(async (req, res) => {
    try {
        const { custid } = req.body;
        if (!custid) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }
        const data = await Customer.findOne({ custid });
        if (!data) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(data);
    } catch (err) {
        console.error(err); 
        res.sendStatus(500); 
    }
});






module.exports = {getCustomers, addCustomer, findCustomer};