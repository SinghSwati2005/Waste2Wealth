// const express = require("express");
// const productforIndustry = require("../models/ProductforIndustry");
// const router = express.Router();

// // POST - Update product status
// router.put("/update-status/:productId", async (req, res) => {
//   const { status } = req.body; // Get the new status from the request body

//   if (!status || !['pending', 'approved', 'sold'].includes(status)) {
//     return res.status(400).json({ error: "Invalid status" });
//   }

//   try {
//     const product = await productforIndustry.findByIdAndUpdate(req.params.productId, { status }, { new: true });
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.status(200).json({ message: "Product status updated", product });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update status" });
//   }
// });

// // POST - Save product
// router.post("/submit-order", async (req, res) => {
//   try {
//     const product = new productforIndustry(req.body);
//     await product.save();
//     res.status(201).json({ message: "Product saved" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to save product" });
//   }
// });

// // ✅ GET - Fetch all products
// router.get("/allindustry", async (req, res) => {
//   try {
//     const allProducts = await productforIndustry.find({});
//     res.status(200).json(allProducts);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

// module.exports = router;


const express = require("express");
const productforIndustry = require("../models/ProductforIndustry");
const router = express.Router();

// PUT - Update product status and emit socket event
router.put("/update-status/:productId", async (req, res) => {
  const { status } = req.body;

  if (!status || !['pending', 'approved', 'sold'].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const product = await productforIndustry.findByIdAndUpdate(
      req.params.productId,
      { status },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // ✅ Emit status update to all clients
    const io = req.app.get("io");
    io.emit("statusUpdated", product);

    res.status(200).json({ message: "Product status updated", product });
  } catch (err) {
    console.error("Error updating product status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

// POST - Save product and emit new order event
router.post("/submit-order", async (req, res) => {
  try {
    const product = new productforIndustry(req.body);
    await product.save();

    // ✅ Emit event to notify farmers
    const io = req.app.get("io");
    io.emit("newOrderFromIndustry", product);

    res.status(201).json({ message: "Product saved" });
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ error: "Failed to save product" });
  }
});

// GET - Fetch all products
router.get("/allindustry", async (req, res) => {
  try {
    const allProducts = await productforIndustry.find({});
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// /routes/industryProductRoutes.js

router.get("/:industryId", async (req, res) => {
  try {
    const { industryId } = req.params;

    // Fetch applications for the specific industry
    const applications = await productforIndustry.find({ industryId });

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found for this industry" });
    }

    res.status(200).json(applications);
  } catch (err) {
    console.error("Error fetching applications for industry:", err);
    res.status(500).json({ message: "Server Error" });
  }
});



module.exports = router;

