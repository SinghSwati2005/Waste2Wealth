
const Product = require("../models/Product");
const submitProduct = async (req, res) => {
  try {
    const { industryName, agriWaste, quantity, price, image, farmerId, industryId } = req.body;

    if (!industryName || !agriWaste || !quantity || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({
      industryName,
      agriWaste,
      quantity,
      price,
      image,
      industryId,
        farmerId,    // ✅ now added

    });

    await newProduct.save();

    // ✅ Emit socket event to notify industries
    const io = req.app.get('io');
    io.emit("newOrderFromFarmer", newProduct); // 👈 Broadcast the event

    res.status(201).json({ message: "Product submitted successfully" });
  } catch (err) {
    console.error("Error in submitProduct:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { submitProduct };
