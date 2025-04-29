// const mongoose = require('mongoose');

// const requestedProductSchema = new mongoose.Schema({
//   farmerId: mongoose.Schema.Types.ObjectId,
//   cropType: String,
//   quantity: String,
//   price: String,
//   image: String,
//   date: { type: Date, default: Date.now }
// });

// const industrySchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   requestedProducts: [requestedProductSchema]
// });

// module.exports = mongoose.model('Industry', industrySchema);
const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  agriWaste: { type: String, required: true },
  description: { type: String, required: true },
  role: { type: String, required: true, default: 'farmer' }, // Farmer role
  image: { type: String, required: false }, // If image is uploaded
}, { timestamps: true });

module.exports = mongoose.model('Farmer', farmerSchema);