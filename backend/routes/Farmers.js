// const express = require('express');
// const FarmerModel = require('../models/FarmerModel');
// const router = express.Router();

// // @route   GET /api/farmers/list
// router.get('/list', async (req, res) => {
//   try {
//     const farmers = await FarmerModel.find();
//     res.json(farmers);
//   } catch (err) {
//     console.error('Error fetching farmers:', err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // @route   POST /api/farmers/add
// router.post("/add", async (req, res) => {
//   try {
//     const { name, requiredCrop, description } = req.body;
//     const newfarmer = new FarmerModel({ name, requiredCrop, description });
//     await newfarmer.save();
//     res.status(201).json({ message: "Farmer added successfully", farmer: newfarmer });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   DELETE /api/farmers/:id
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedfarmer = await FarmerModel.findByIdAndDelete(id);
//     if (!deletedfarmer) {
//       return res.status(404).json({ message: "Farmer not found" });
//     }
//     res.status(200).json({ message: "Farmer deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting farmer", error: error.message });
//   }
// });

// // @route   GET /api/farmers
// router.get('/', async (req, res) => {
//   try {
//     const farmers = await FarmerModel.find();
//     res.json(farmers);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// });


// module.exports = router;


// farmerRoutes.js


const express = require("express");
const User = require("../models/userModel");
const router = express.Router();

// Route to get all farmers
router.get("/", async (req, res) => {
  try {
    // Find users with role 'farmer'
    const farmers = await User.find({ role: 'farmer' });

    if (farmers.length === 0) {
      return res.status(404).json({ message: "No farmers found" });
    }

    res.status(200).json(farmers); // Send the farmers' data as a response
  } catch (err) {
    console.error("Error fetching farmers:", err);
    res.status(500).json({ message: "Error fetching farmers", error: err });
  }
});
router.post('/submit-order', async (req, res) => {
  try {
    const { industryId, agriWaste, quantity, price } = req.body;
    const farmerId = req.user.id;  // Assuming you use JWT and farmer is logged in

    const newOrder = new OrderForm({
      farmerId,
      industryId,
      agriWaste,
      quantity,
      price
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order submitted successfully' });
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
router.get("/farmer-orders", async (req, res) => {
  try {
    const farmerId = req.user.id; // Assuming authentication middleware is used

    const orders = await Product.find({ farmerId }).populate('industryId', 'industryName');

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching farmer orders:", error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;



