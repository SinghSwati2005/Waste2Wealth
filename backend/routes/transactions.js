const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // or adjust path accordingly

// routes/transactions.js
router.post('/add', async (req, res) => {
    try {
      const newTransaction = new Transaction(req.body);
      const saved = await newTransaction.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ message: 'Error creating transaction', error: err });
    }
  });
  router.get('/user/:userId', async (req, res) => {
    try {
      const transactions = await Transaction.find({ userId: req.params.userId });
      res.status(200).json(transactions);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching transactions', error: err });
    }
  });
  module.exports = router;    