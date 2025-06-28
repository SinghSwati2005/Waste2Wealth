const express = require('express');
const OrderRoutesTrack = require('../models/OrderRoutesTrack');
const router = express.Router();


// Create new order (industry creates)
router.post('/create', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Fetch all orders for a farmer (for dashboard)
router.get('/farmer/:farmerId', async (req, res) => {
  try {
    const orders = await OrderRoutesTrack.find({ farmerId: req.params.farmerId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Update order status
router.put('/:orderId', async (req, res) => {
  try {
    const updated = await OrderRoutesTrack.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order' });
  }
});

module.exports = router;

