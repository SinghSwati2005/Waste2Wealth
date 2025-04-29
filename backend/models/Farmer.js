// const mongoose = require('mongoose');

// const appliedProductSchema = new mongoose.Schema({
//   industryName: String,
//   cropType: String,
//   quantity: String,
//   price: String,
//   image: String,
//   date: { type: Date, default: Date.now }
// });

// const farmerSchema = new mongoose.Schema({
//   name: String,
//   aadhaar: String,
//   phone: String,
//   appliedProducts: [appliedProductSchema]
// });

// module.exports = mongoose.model('Farmer', farmerSchema);
const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  agriWaste: { type: String, required: true },
  description: { type: String, required: true },
  role: { type: String, required: true, default: 'farmer' }, // Farmer role
  image: { type: String, required: false }, // If image is uploaded
}, { timestamps: true });

module.exports = mongoose.model('Farmer', farmerSchema);

