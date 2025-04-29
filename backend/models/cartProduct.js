const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: [true, "Listing ID is required"],
  },
  quantity: {
    type: Number,
    default: 1,
    min: [1, "Quantity must be at least 1"], // Prevent adding items with zero or negative quantity
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  items: {
    type: [cartItemSchema],
    validate: {
      validator: function (items) {
        return items.length > 0; // Ensure that at least one item is added to the cart
      },
      message: 'Cart cannot be empty',
    },
  },
});

module.exports = mongoose.model("cartProduct", cartSchema);
