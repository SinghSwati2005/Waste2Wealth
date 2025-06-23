// const cron = require("node-cron");
// const Listing = require("./models/Listing");
// const Bid = require("./models/Bid");

// cron.schedule("* * * * *", async () => {
//   console.log("⏰ Checking for expired auctions...");

//   const now = new Date();
//   const expiredListings = await Listing.find({
//     biddingEndTime: { $lte: now },
//     isAuctionClosed: false,
//   });

//   for (const listing of expiredListings) {
//     const highestBid = await Bid.find({ listingId: listing._id })
//       .sort({ bid: -1 })
//       .limit(1)
//       .populate("bidder", "name email");

//     if (highestBid.length > 0) {
//       const winner = highestBid[0].bidder;
//       //added
//       const finalBidAmount = highestBid[0].bid; 
//       listing.isAuctionClosed = true;
//       listing.winner = winner._id;
//       //aded
//       listing.finalBidAmount = finalBidAmount; 
//       await listing.save();

//       console.log(`✅ Auction ended. Winner: ${winner.name}.`);
//       // Optional: trigger email/notification here
//     } else {
//       listing.isAuctionClosed = true;
//       await listing.save();
//       console.log(`⚠️ Auction ended for listing ${listing._id}, no bids placed.`);
//     }
//   }
// });

const cron = require("node-cron"); 
const Listing = require("./models/Listing");
const Bid = require("./models/Bid");

cron.schedule("* * * * *", async () => {
  console.log("⏰ Checking for expired auctions...");

  const now = new Date();
  const expiredListings = await Listing.find({
    biddingEndTime: { $lte: now },
    isAuctionClosed: false,
  });

  for (const listing of expiredListings) {
    const highestBid = await Bid.find({ listingId: listing._id })
      .sort({ bid: -1 })
      .limit(1)
      .populate("bidder", "name email");

    if (highestBid.length > 0) {
      const winner = highestBid[0].bidder;
      const finalBidAmount = highestBid[0].bid; 
      listing.isAuctionClosed = true;
      listing.winner = winner._id;
      listing.finalBidAmount = finalBidAmount; 
      await listing.save();

      console.log(`✅ Auction ended. Winner: ${winner.name}.`);

      // Optional: trigger email/notification here
    } else {
      listing.isAuctionClosed = true;
      await listing.save();
      console.log(`⚠️ Auction ended for listing ${listing._id}, no bids placed.`);
    }
  }
});
