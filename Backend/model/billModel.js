const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  products: [
    { 
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  billDate: {
    type: Date,
    default: Date.now,
  },
 
});

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
