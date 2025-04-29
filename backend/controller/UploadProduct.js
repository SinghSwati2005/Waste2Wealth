// controller/UploadProduct.js
const Listing = require("../models/Listing");

const Uplaod = async (req, res) => {
  try {
    const product = new Listing(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to add product" });
  }
};

const getAllListings = async (req, res) => {
  try {
    const all = await Listing.find();
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

module.exports = { Uplaod, getAllListings };
