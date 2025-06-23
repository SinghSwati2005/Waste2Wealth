
const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  agriWaste: { type: String, required: true },
  description: { type: String, required: true },
  role: { type: String, required: true, default: 'farmer' }, // Farmer role
  image: { type: String, required: false }, // If image is uploaded
}, { timestamps: true });

module.exports = mongoose.model('Farmer', farmerSchema);

