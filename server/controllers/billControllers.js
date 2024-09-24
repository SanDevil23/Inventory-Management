const asyncHandler = require("express-async-handler");
const pool = require('../config/db');
const Bill = require('../model/billModel')

    const getBill = asyncHandler(async(req, res) => {
        try{
            const data = await Bill.find({});
            res.status(200).send(data);
        }catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });


// Function to generate the custom key
generateCustomKey = async() => {
    const bill = await Bill.findOneAndUpdate(
        {},
        { $inc: { count: 1 } },             // incrementing the count if exist else will create a new count variable
        { new: true, upsert: true }             // returns the updated data and creates a new one if it doesn't exists
    );

    const paddedCount = bill.count.toString().padStart(4, '0');
    const customKey = `INVC${paddedCount}`;
    return customKey;
}

const addBill =  asyncHandler(async(req, res) => {
    // generating customer id
    const inv_id = await generateCustomKey();
    console.log(inv_id);
    const { cid, iid, qty, amt } = req.body;
    try{
        await Bill.create({
            invoiceid: inv_id,
            custid: cid ,
            itemid: iid,
            quantity: qty,
            amount: amt,
        })
        res.status(200).send({message:"Successfully Added to the table"})
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});



module.exports = {getBill, addBill};