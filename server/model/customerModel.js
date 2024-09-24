const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    custid: {type:String, required:true},
    custname: { type: String, required: true },
    custadd: {type:String, required:true},
    PAN: { type: String, required: true},
    GSTN: { type: String, required: true },
    active: {type: Boolean, required: true},
    count: { type: Number, default: 1 }
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
