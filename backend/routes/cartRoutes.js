const express = require("express");
const router = express.Router();
const addToCart = require("../controller/addToCartController");
const getCartItems = require("../controller/getCartController");
const authToken = require("../middleware/authToken");


router.post("/add", authToken, addToCart);
router.get("/get", authToken, getCartItems); // new route

module.exports = router;
