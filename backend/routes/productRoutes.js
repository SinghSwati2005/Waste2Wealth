


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
