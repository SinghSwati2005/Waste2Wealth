const express = require('express');
const OrderRoutesTrack = require('../models/OrderRoutesTrack');
const router = express.Router();
const Product = require('../models/Product'); // Adjust path as needed


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


router.patch('/order-status/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await OrderRoutesTrack.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the related product listing too (assuming it has _id or some relation)
    await Product.findOneAndUpdate(
      {
        farmerId: updatedOrder.farmerId,
        agriWaste: updatedOrder.agriWaste,
        quantity: updatedOrder.quantity,
        price: updatedOrder.price,
      },
      { status }, // update product status
      { new: true }
    );

    const io = require('../socket');
    io.getIO().emit('orderStatusUpdated', updatedOrder);

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;

