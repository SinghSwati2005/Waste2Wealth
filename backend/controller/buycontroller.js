
// const productforIndustry = require("../models/ProductforIndustry");

// // Controller to handle product submission
// const submitProductIndustry = async (req, res) => {
//   try {
//     const { farmerName, cropType, quantity, price,image } = req.body;

//     if (!farmerName || !cropType || !quantity ||!image ) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const newOrder = new productforIndustry({
//       farmerName,
//       cropType,
//       quantity,
//       price,
//       image,
//     });

//     await newOrder.save(); // Save the new product to the database
//     res.status(201).json({ message: "Product submitted successfully" });
//   } catch (err) {
//     console.error("Error in submitProduct:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// module.exports = { submitProductIndustry };



const productforIndustry = require("../models/ProductforIndustry");

const submitProductIndustry = async (req, res) => {
  try {
    const { farmerName, agriWaste, quantity, price, image, industryId } = req.body;
    if (!farmerName || !agriWaste || !quantity || !image || !industryId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new productforIndustry({
      farmerName,
      agriWaste,
      quantity,
      price,
      image,
      industryId
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

