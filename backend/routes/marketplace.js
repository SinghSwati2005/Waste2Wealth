const express = require('express');
const router = express.Router();
const multer = require('multer');
const Marketplace = require('../models/Marketplace');
const jwt = require('jwt-simple');
const path = require('path');
const fs = require('fs');

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Auth Middleware
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).send('Access denied');

    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).send('Invalid token');
    }
};

// ✅ Add a new marketplace item (Farmer-only)
router.post('/add', authenticateUser, upload.single('image'), async (req, res) => {
    try {
        const { title, price, quantity, location, tag } = req.body;

        if (req.user.role !== 'farmer') {
            return res.status(403).send('Only farmers can add listings');
        }

        const newMarketplaceItem = new Marketplace({
            title,
            price,
            quantity,
            location,
            tag,
            image: req.file.path,
            user: req.user._id
        });

        await newMarketplaceItem.save();
        res.status(201).json(newMarketplaceItem);
    } catch (err) {
        res.status(500).send('Error adding marketplace item: ' + err.message);
    }
});

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Marketplace.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).send('Error fetching marketplace items: ' + err.message);
    }
});

// Filter marketplace items
router.get('/filter', async (req, res) => {
    const { wasteType, location, priceRange } = req.query;
    const filters = {};
    if (wasteType) filters.title = wasteType;
    if (location) filters.location = location;
    if (priceRange) filters.price = { $lte: priceRange };

    try {
        const filteredItems = await Marketplace.find(filters);
        res.status(200).json(filteredItems);
    } catch (err) {
        res.status(500).send('Error filtering marketplace items: ' + err.message);
    }
});

// ✅ Delete item - only by owner
router.delete('/:id', authenticateUser, async (req, res) => {
    try {
        const item = await Marketplace.findById(req.params.id);
        if (!item) return res.status(404).send('Item not found');

        if (item.user.toString() !== req.user._id.toString()) {
            return res.status(403).send('Unauthorized to delete this item');
        }

        await Marketplace.findByIdAndDelete(req.params.id);
        res.status(200).send('Item deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting item: ' + err.message);
    }
});

module.exports = router;
