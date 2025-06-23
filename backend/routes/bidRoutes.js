// routes/bidRoutes.js
const express = require("express");
const router = express.Router();
const Bid = require("../models/Bid");
const mongoose = require("mongoose");
const Listing = require("../models/Listing");

router.get("/getBids/:listingId", async (req, res) => {
  try {
    const listingId = req.params.listingId;

    // Validate ObjectId for listingId
    if (!mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({ error: "Invalid listing ID" });
    }

    const bids = await Bid.find({ listingId })  // Use listingId instead of listing

  .populate("bidder", "name email")
  .sort({ bid: -1 });

    res.json(bids);  // Ensure this is correctly returning JSON
  } catch (error) {
    console.error("Error fetching bids:", error);
    res.status(500).json({ error: "Failed to fetch bids" });
  }
});




router.post("/placeBid", async (req, res) => {
  const { listingId, bidder, bid } = req.body;

  console.log("Received data:", req.body);

  if (!listingId || !bidder || !bid) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (!mongoose.Types.ObjectId.isValid(listingId) || !mongoose.Types.ObjectId.isValid(bidder)) {
    return res.status(400).json({ error: "Invalid listingId or bidder ID" });
  }

  //new now
  const listing = await Listing.findById(listingId);

  if (!listing || listing.isAuctionClosed || listing.biddingEndTime <= new Date()) {
    return res.status(400).json({ error: "Bidding has ended for this listing" });
  }
  

  // till hwere
  try {
    const existingBids = await Bid.find({ listingId }).sort({ bid: -1 });
    const highestBid = existingBids.length > 0 ? existingBids[0].bid : 0;

    if (bid <= highestBid) {
      return res.status(400).json({ error: "Bid must be higher than current highest" });
    }

    const newBid = new Bid({ listingId, bidder, bid });
    await newBid.save();

    const updatedBids = await Bid.find({ listingId })  // ✅ corrected variable name
      .populate("bidder", "name email")
      .sort({ bid: -1 });

    res.json(updatedBids);  // ✅ correctly sending to frontend
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ error: "Failed to place bid" });
  }
});


// routes/bidRoutes.js
router.get('/farmer/:farmerId', async (req, res) => {
  const { farmerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(farmerId)) {
    return res.status(400).json({ error: 'Invalid farmer ID' });
  }

  try {
    const bids = await Bid.find()
      .populate({
        path: 'listingId',
        match: { farmer: farmerId }, // Only listings created by this farmer
        populate: { path: 'farmer', select: 'name email' },
      })
      .populate('bidder', 'name email')
      .sort({ bid: -1 });

    // Filter out null listings (those not belonging to this farmer)
    const filteredBids = bids.filter(b => b.listingId !== null);

    res.json(filteredBids);
  } catch (error) {
    console.error('Error fetching bids for farmer:', error);
    res.status(500).json({ error: 'Failed to fetch bids for farmer' });
  }
});


module.exports = router;