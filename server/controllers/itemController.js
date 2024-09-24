const asyncHandler = require("express-async-handler");
// const pool = require('../config/db')
const Item = require("../model/itemModel");


const getItems = asyncHandler(async(req, res) => {
    try{
        const data = await Item.find({});
        res.status(200).send(data);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

// Function to generate the custom key
async function generateCustomKey() {
    const item = await Item.findOneAndUpdate(
        {},
        { $inc: { count: 1 } },
        { new: true, upsert: true }
    );

    const paddedCount = item.count.toString().padStart(4, '0');
    const customKey = `IT${paddedCount}`;
    return customKey;
}

const addItems =  asyncHandler(async(req, res) => {
    //destructure the incoming data
    const id = await generateCustomKey();

    const { name, price, avail } = req.body;
    try{
        const item = await Item.create({
            itemid: id,
            itemname: name,
            price: price,
            avail: avail,
          });
        
        res.status(200).send({message:"Successfully Added to the table"})
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});


const findItem = asyncHandler(async (req, res) => {
    try {
        const { itemid } = req.body;
        if (!itemid) {
            return res.status(400).json({ message: 'Item ID is required' });
        }
        const data = await Item.findOne({ itemid });
        if (!data) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(data);
    } catch (err) {
        console.error(err); 
        res.sendStatus(500); 
    }
});

module.exports = { getItems, addItems, findItem}