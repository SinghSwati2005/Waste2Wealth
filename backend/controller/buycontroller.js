



const productforIndustry = require("../models/ProductforIndustry");

const submitProductIndustry = async (req, res) => {
  try {
    const { farmerName, agriWaste, quantity, price, image, industryId,farmerId  } = req.body;
    if (!farmerName || !agriWaste || !quantity || !image || !industryId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new productforIndustry({
      farmerName,
      agriWaste,
      quantity,
      price,
      image,
      industryId,
      farmerId
    });

    await newOrder.save();

    // ✅ Emit socket event to notify farmers
    const io = req.app.get('io');
    io.emit("newOrderFromIndustry", newOrder); // 👈 Broadcast the event

    res.status(201).json({ message: "Product submitted successfully" });
  } catch (err) {
    console.error("Error in submitProduct:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { submitProductIndustry };

