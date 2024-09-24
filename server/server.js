const express = require('express');
const customerRoutes = require('./routes/customerRoutes');
const itemRoutes = require('./routes/itemRoutes');
const billRoutes = require('./routes/billRoutes');
const bodyParser = require('body-parser');
const connectDB = require("./config/db");

require('dotenv').config();
connectDB();

const port = process.env.PORT;

const app = express();
app.use(express.json())

// CORS config
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,                               
    optionSuccessStatus:200
}
app.use(cors(corsOptions));



// routes

app.use("/api/customer", customerRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/bill", billRoutes);

// app.use(notFound);
// app.use(errorHandler);





app.listen(port, ()=>{
    console.log(`The server is up and running on the port : ${port}`);
})
