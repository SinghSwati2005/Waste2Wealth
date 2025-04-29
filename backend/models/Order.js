// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   industryId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   status: { type: String, default: 'Pending' },
//   message: String,
//   from: { type: String, enum: ['farmer', 'industry'] }, // who initiated
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Order', orderSchema);


const mongoose = require('mongoose');

const orderFormSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmers',      // your Farmer Model name
    required: true
  },
  industryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Industries',    // your Industry Model name
    required: true
  },
  // All other form fields
  agriWaste: [String],
  quantity: Number,
  price: Number,
  status: {
    type: String,
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Order', orderFormSchema);
