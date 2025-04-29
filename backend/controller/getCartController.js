const CartProduct = require("../models/cartProduct");
const Listing = require("../models/Listing"); // ✅ Required for clarity and good practice

const getCartItems = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User is not authenticated." });
    }

    const cart = await CartProduct.findOne({ userId }).populate("items.listingId");

    if (!cart || !cart.items.length) {
      return res.status(404).json({ message: "Cart is empty." });
    }

    res.status(200).json(cart.items);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({
      message: error.message || "Something went wrong while fetching the cart.",
      error: true,
      success: false,
    });
  }
};

module.exports = getCartItems;
