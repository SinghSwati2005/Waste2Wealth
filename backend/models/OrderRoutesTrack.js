const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  farmerId: String,
  farmerName: String,
  industryId: String,
  industryName: String,
  agriWaste: String,
  quantity: Number,
  price: Number,
  image: String,
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'In Transit', 'Completed', 'Rejected'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
