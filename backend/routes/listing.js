const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");

// GET all listings with optional filters
router.get("/", async (req, res) => {
  const { type, location, quantity, minPrice, maxPrice } = req.query;
  const query = {};

  if (type) query.title = new RegExp(type, "i");
  if (location) query.location = new RegExp(location, "i");
  if (quantity) query.quantity = new RegExp(quantity, "i");
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseInt(minPrice);
    if (maxPrice) query.price.$lte = parseInt(maxPrice);
  }

  try {
    const listings = await Listing.find(query).sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch listings." });
  }
});

// POST new listing
router.post("/", async (req, res) => {
  try {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(400).json({ error: "Failed to create listing." });
  }
});

module.exports = router;
