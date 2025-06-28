


const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// POST - Save product and emit socket event
router.post("/submit-product", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    // ✅ Emit event to notify industries
    const io = req.app.get("io");
    io.emit("newOrderFromFarmer", product);

    res.status(201).json({ message: "Product saved" });
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ error: "Failed to save product" });
  }
});



// ✅ All listings created by this farmer
router.get("/farmer/:farmerId", async (req, res) => {
  try {
    const { farmerId } = req.params;
    const products = await Product.find({ farmerId });
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching farmer listings:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ All listings received by this industry
router.get("/industry/:industryId", async (req, res) => {
  try {
    const { industryId } = req.params;
    const products = await Product.find({ industryId });
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching industry received listings:", err);
    res.status(500).json({ error: "Server error" });
  }
});



// GET - Fetch all products
router.get("/all", async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// /routes/farmerProductRoutes.js





module.exports = router;
