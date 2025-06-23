// const express = require("express");
// const router = express.Router();
// const Listing = require("../models/Listing");

// // GET all listings with optional filters
// router.get("/", async (req, res) => {
//   const { type, location, quantity, minPrice, maxPrice } = req.query;
//   const query = {};

//   if (type) query.title = new RegExp(type, "i");
//   if (location) query.location = new RegExp(location, "i");
//   if (quantity) query.quantity = new RegExp(quantity, "i");
//   if (minPrice || maxPrice) {
//     query.price = {};
//     if (minPrice) query.price.$gte = parseInt(minPrice);
//     if (maxPrice) query.price.$lte = parseInt(maxPrice);
//   }

//   try {
//     const listings = await Listing.find(query).sort({ createdAt: -1 });
//     res.json(listings);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch listings." });
//   }
// });

// // POST new listing
// router.post("/", async (req, res) => {
//   try {
//     const newListing = new Listing(req.body);
//     await newListing.save();
//     res.status(201).json(newListing);
//   } catch (err) {
//     res.status(400).json({ error: "Failed to create listing." });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");

// GET all listings with optional filters
router.get("/", async (req, res) => {
  const { type, location, quantity, minPrice, maxPrice, minBidValue, maxBidValue } = req.query;
  const query = {};

  if (type) query.title = new RegExp(type, "i");
  if (location) query.location = new RegExp(location, "i");
  if (quantity) query.quantity = new RegExp(quantity, "i");

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseInt(minPrice);
    if (maxPrice) query.price.$lte = parseInt(maxPrice);
  }

  // Add filters for baseBidValue
  if (minBidValue || maxBidValue) {
    query.baseBidValue = {};
    if (minBidValue) query.baseBidValue.$gte = parseInt(minBidValue);
    if (maxBidValue) query.baseBidValue.$lte = parseInt(maxBidValue);
  }

  try {
    const listings = await Listing.find(query).sort({ createdAt: -1 })   .populate("winner", "name email");;
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch listings." });
  }
});

// POST new listing
router.post("/", async (req, res) => {
  try {
    const { title, price, quantity, seller, location, tag, image, baseBidValue,  } = req.body;
    
    // Ensure baseBidValue is a number before saving
    if (baseBidValue) {
      req.body.baseBidValue = parseFloat(baseBidValue); // Ensure it's treated as a number
    }

    // const newListing = new Listing(req.body);
    // await newListing.save();
    // res.status(201).json(newListing);

  //adeed new now
  const newListing = new Listing({
    ...req.body,
    biddingEndTime: new Date(Date.now() + 2 * 60 * 1000), // ⏰ 10 minutes
  });
  await newListing.save();
  res.status(201).json(newListing);
  


  } catch (err) {
    res.status(400).json({ error: "Failed to create listing." });
  }

})
  //adeed new now
 
// Add this route
router.get("/checkAuctionWinner/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const wonListings = await Listing.find({
      winner: userId,
      isAuctionClosed: true,
      isNotified: { $ne: true },
    });

    if (wonListings.length > 0) {
      await Listing.updateMany(
        { winner: userId, isAuctionClosed: true },
        { $set: { isNotified: true } }
      );
      return res.json({ won: true, listings: wonListings });
    }

    res.json({ won: false });
  } catch (err) {
    console.error("Error checking auction winner:", err);
    res.status(500).json({ error: "Server error" });
  }
});




module.exports = router;
