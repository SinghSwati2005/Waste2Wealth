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


//done today only
// const mongoose = require("mongoose");
// const CartProduct = require("../models/cartProduct");

// const addToCart = async (req, res) => {
//   try {
//     const { userId, listingId, quantity } = req.body;

//     if (!userId || !listingId || !quantity) {
//       return res.status(400).json({ error: "Missing required fields." });
//     }

//     const listingObjectId = new mongoose.Types.ObjectId(listingId); // ✅ Convert to ObjectId

//     let cart = await CartProduct.findOne({ userId });

//     if (!cart) {
//       cart = new CartProduct({
//         userId,
//         items: [{ listingId: listingObjectId, quantity }],
//       });
//     } else {
//       const existingItemIndex = cart.items.findIndex(item =>
//         item.listingId.toString() === listingObjectId.toString()
//       );

//       if (existingItemIndex > -1) {
//         cart.items[existingItemIndex].quantity += quantity;
//       } else {
//         cart.items.push({ listingId: listingObjectId, quantity });
//       }
//     }

//     await cart.save();
//     res.status(200).json({ message: "Item added to cart", cart });
//   } catch (error) {
//     console.error("Error in addToCart:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

// module.exports = addToCart;


// const CartProduct = require("../models/cartProduct");
// const Listing = require("../models/Listing");

// const addToCart = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const {  listingId, quantity } = req.body;

//     if (!userId) {
//       return res.status(401).json({ message: "User is not authenticated." });
//     }

//     const listing = await Listing.findById(listingId);

//     if (!listing) {
//       return res.status(404).json({ message: "Listing not found." });
//     }

//     if (listing.isAuctionClosed && listing.winner.toString() !== userId) {
//       return res.status(403).json({ message: "You are not the auction winner." });
//     }

//     // Proceed to add item to the cart if the auction is closed and user is the winner
//     const cart = await CartProduct.findOne({ userId });
//     if (!cart) {
//              cart = new CartProduct({
//                userId,
//               items: [{ listingId, quantity }],
//              });
//          }

//     // Check if item already exists in the cart
//     const itemIndex = cart.items.findIndex(item => item.listingId.toString() === listingId);
//     if (itemIndex !== -1) {
//       // Update quantity if the item already exists
//       cart.items[itemIndex].quantity += 1;
//     } else {
//       // Add new item to the cart
//       cart.items.push({ listingId, quantity: 1 });
//     }

//     await cart.save();
//     res.status(200).json({ message: "Item added to cart successfully." });
//   } catch (error) {
//     console.error("Error adding item to cart:", error);
//     res.status(500).json({
//       message: error.message || "Something went wrong while adding the item to the cart.",
//       error: true,
//       success: false,
//     });
//   }
// };

// module.exports = addToCart;
