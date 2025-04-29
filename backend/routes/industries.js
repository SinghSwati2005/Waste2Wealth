// const express = require('express');
// const router = express.Router();
// const Industry = require('../models/IndustryModel'); 

// // @route   GET /api/industries/list
// router.get('/list', async (req, res) => {
//   try {
//     const industries = await Industry.find();
//     res.json(industries);
//   } catch (err) {
//     console.error('Error fetching industries:', err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // @route   POST /api/industries/add
// router.post("/add", async (req, res) => {
//   try {
//     const { name, requiredCrop, description } = req.body;
//     const newIndustry = new Industry({ name, requiredCrop, description });
//     await newIndustry.save();
//     res.status(201).json({ message: "Industry added successfully", industry: newIndustry });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   DELETE /api/industries/:id
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedIndustry = await Industry.findByIdAndDelete(id);
//     if (!deletedIndustry) {
//       return res.status(404).json({ message: "Industry not found" });
//     }
//     res.status(200).json({ message: "Industry deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting industry", error: error.message });
//   }
// });

// router.get('/', async (req, res) => {
//   const industries = await Industry.find();
//   res.json(industries);
// });
// module.exports = router;


const express = require("express");
const User = require("../models/userModel");
const productforIndustry = require("../models/ProductforIndustry");

const router = express.Router();

// Route to get all farmers
router.get("/", async (req, res) => {
  try {
    // Find users with role 'farmer'
    const industries = await User.find({ role: 'industry' });

    if (industries.length === 0) {
      return res.status(404).json({ message: "No industries found" });
    }

    res.status(200).json(industries); // Send the farmers' data as a response
  } catch (err) {
    console.error("Error fetching farmers:", err);
    res.status(500).json({ message: "Error fetching farmers", error: err });
  }
});

// Route to get all products (farmer applications) for a specific industry



module.exports = router;