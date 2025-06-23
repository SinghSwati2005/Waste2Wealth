const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // 👈 assuming you have a User model
    required: true,
  },
  
  bid: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bid", bidSchema);