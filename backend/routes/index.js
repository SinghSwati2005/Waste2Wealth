const express = require('express')

const router =express.Router()



const userSignUpController =require('../controller/usersignup')
const userSignInController = require('../controller/userSignin')

const userDetailController = require('../controller/userDetail')
const userLogout = require('../controller/userLogout')


const {  submitProduct } = require('../controller/sellController')

 const productRoutes = require('./productRoutes');
const productforindustryroute = require('./productforindustryroute');
const cartRoutes = require('./cartRoutes');
const industries = require('./industries');
const Farmers = require('./Farmers');




const { submitProductIndustry } = require('../controller/buycontroller')
const { Uplaod, getAllListings } = require('../controller/UploadProduct')
const Listing = require('../models/Listing')
const addToCartController = require('../controller/addToCartController')
const getCartItems = require('../controller/getCartController')
const authToken = require('../middleware/authToken')



router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details", authToken,userDetailController)
router.get("/userLogout", userLogout)
router.post("/addtocart",authToken,addToCartController)
router.get("/addToCart",authToken,getCartItems)


router.post("/sell", submitProduct); 
router.post("/upload", Uplaod); 
router.get("/upload", getAllListings);
router.post("/buy", submitProductIndustry); 
 router.use('/api/product', productRoutes); 
 router.use('/api/product-industry', productforindustryroute); 
router.use('/api/cart', cartRoutes);
router.use('/api/industries', industries);
router.use('/api/farmers', Farmers);







router.get('/listings', async (req, res) => {
    try {
      const listings = await Listing.find();
      res.json(listings);
    } catch (err) {
      console.error('Error fetching listings:', err);
      res.status(500).json({ error: 'Failed to fetch listings' });
    }
  });
module.exports= router;
//1:36:46//