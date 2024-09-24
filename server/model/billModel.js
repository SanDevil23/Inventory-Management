const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
  {
    invoiceid: {type:String, required:true},
    custid: { type: String, required: true },
    itemid: {type:String, required:true},
    quantity: { type: String, required: true},
    amount: { type: Number, required: true },
    count: { type: Number, default: 1 }
  },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
