// 📍 BACKEND: routes/analytics.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const ProductIndustry = require('../models/ProductforIndustry');

router.get('/summary/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const farmerProducts = await Product.find({ farmerId: userId });
    const industryOrders = await ProductIndustry.find({ industryId: userId });

    const farmerStats = {
      total: farmerProducts.length,
      sold: farmerProducts.filter(p => p.status === 'sold').length,
      pending: farmerProducts.filter(p => p.status === 'pending').length,
    };

    const industryStats = {
      total: industryOrders.length,
      approved: industryOrders.filter(p => p.status === 'approved').length,
    };

    res.json({ farmerStats, industryStats });
  } catch (error) {
    console.error('Analytics summary error:', error);
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
});

module.exports = router;
