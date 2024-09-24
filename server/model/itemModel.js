const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const itemSchema = mongoose.Schema(
  {
    itemid: {type:String, required:true},
    itemname: { type: String, required: true },
    price: { type: String, required: true, unique: true },
    avail: { type: Boolean, required: true },
    count: { type: Number, default: 1 }
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
