const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  price: Number,
  quantity: String,
  seller: String,
  location: String,
  tag: String,
  image: String,
  baseBidValue: String,

  biddingEndTime: Date,      // ⏰ When the bidding ends
  isAuctionClosed: {
    type: Boolean,
    default: false,
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  isNotified: {
    type: Boolean,
    default: false,
  },
  finalBidAmount: {
    type: Number,
    default: null,
  },  
  

  

  
});

module.exports = mongoose.model("Listing",listingSchema);
