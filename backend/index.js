// const express= require ('express')
// const cors = require ('cors')
// const cookieParser =require('cookie-parser')
//     require('dotenv').config()
// const connectDB=require ('./config/db')
// const router=require('./routes')
// const productRoutes = require('./routes/productRoutes');
// const productforindustryroute = require('./routes/productforindustryroute');
// const marketplace = require('./routes/marketplace');
//     const app = express()
   
//     app.use(cors(
//         {
//             origin : process.env.FRONTEND_URL,
//             credentials: true
//         }
//     ))
//     app.use(express.json())
//     app.use(cookieParser())
//     app.use("/api",router) 
//     app.use('/api/product', productRoutes);
//     app.use('/api/product-industry', productforindustryroute);
//     app.use('/api/marketplace', marketplace);

//     const PORT = 8080 || process.env.PORT
// connectDB().then(()=>{
//     app.listen(PORT,()=>{
//         console.log("Connected to DB")
//         console.log("Server is running");
//     })

// })
   





const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
require("./auctionScheduler");


// Route imports
const router = require('./routes');
const productRoutes = require('./routes/productRoutes');
const productforIndustryRoutes = require('./routes/productforindustryroute');
const listing = require("./routes/listing");
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const transactions = require('./routes/transactions');
const bidRoutes = require('./routes/bidRoutes');

const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api", router);
app.use('/api/product', productRoutes);
app.use('/api/product-industry', productforIndustryRoutes);
app.use("/api/listings", listing);
app.use('/api/addToCart', cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/transaction', transactions);
app.use('/api/industries', require('./routes/industries'));
app.use('/api/farmers', require('./routes/Farmers'));
app.use("/api", bidRoutes);
app.use('/api/analytics', require('./routes/analytics'));
const OrderRoutes = require('./routes/OrderRoutes');
app.use('/api/orders', OrderRoutes);
// app.use('/api/product', OrderRoutes)




// Socket.IO Server
const io = new Server(http, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"]
    }
});
app.set('io', io);



// Temporary mock listings data
let listings = [
    { id: 1, cropType: 'Wheat', quantity: 100, price: 2500, industryName: 'BioSolutions', status: 'Online' },
    // Add more listings if needed
];

// Function to emit listing updates
function emitStatusUpdate() {
    io.emit('statusUpdate', listings);
}

// Status update endpoint
app.put('/api/product/update-status', (req, res) => {
    const { id, status } = req.body;
    const listing = listings.find((item) => item.id === id);
    if (listing) {
        listing.status = status;
        emitStatusUpdate();
        res.status(200).send('Status updated');
    } else {
        res.status(404).send('Listing not found');
    }
});
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('newProduct', (product) => {
    socket.broadcast.emit('updateProductList', product); // to all except sender
  });

  socket.on('newOrder', (order) => {
    socket.broadcast.emit('updateOrderList', order);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start Server
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    http.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is running on port ${PORT}`);
    });
});
