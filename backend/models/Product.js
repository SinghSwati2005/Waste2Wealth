const mongoose = require("mongoose");
// const { v4: uuidv4 } = require('uuid');
const productSchema = new mongoose.Schema({
  industryName: {
    type: String,
    required: true,
  },
  agriWaste: {
    type: [String],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  image: {
    type: String, // Base64 string for the image
    required: true,
  },
  status: { type: String, default: "pending" }, // ⬅️ Track status
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
  industryId: { type: mongoose.Schema.Types.ObjectId, ref: "Industry" },
  //  submissionId: { type: String, default: uuidv4 },  // ✅ Here
},{ timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
