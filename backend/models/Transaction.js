// models/Transaction.js
const mongoose = require ('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  cropType: String,
  quantity: Number, // in tons
  totalPrice: Number,
  buyer: String,
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending'],
    default: 'Pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
