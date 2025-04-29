const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  price: String,
  quantity: String,
  seller: String,
  location: String,
  tag: String,
  image: String,
});

module.exports = mongoose.model("Listing",listingSchema);
