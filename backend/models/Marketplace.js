// models/Marketplace.js
const mongoose = require('mongoose');

const marketplaceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: String, required: true },
    location: { type: String, required: true },
    tag: { type: String, required: true },
    image: { type: String, required: true },
    baseBidValue: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the user uploading the product
}, { timestamps: true });

module.exports = mongoose.model('Marketplace', marketplaceSchema);
