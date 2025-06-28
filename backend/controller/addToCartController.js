const CartProduct = require("../models/cartProduct");

const addToCart = async (req, res) => {
  try {
    const { userId, listingId, quantity } = req.body;

    if (!userId || !listingId || !quantity) {
      return res.status(400).json({ error: "Missing required fields." });
    }


    
    let cart = await CartProduct.findOne({ userId });

    // If cart doesn't exist, create one
    if (!cart) {
      cart = new CartProduct({
        userId,
        items: [{ listingId, quantity }],
      });
    } else {
      const existingItemIndex = cart.items.findIndex(item =>
        item.listingId.toString() === listingId
      );

      if (existingItemIndex > -1) {
        // If item exists, update quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Else, push new item
        cart.items.push({ listingId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = addToCart;


