// // pages/Industry.jsx
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Button } from '../components/ui/CustomUI';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { CalendarDays } from 'lucide-react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Sidebar_industry from '../components/Sidebar_industry';
// import { useSelector } from 'react-redux';
// import { io } from 'socket.io-client';
// import { toast } from 'react-toastify';

// const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);

// export default function Industry({ industryId }) {
//   const [farmersData, setFarmersData] = useState([]);
//   const [selectedFarmer, setSelectedFarmer] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [listings, setListings] = useState([]);
//   const user = useSelector((state) => state?.user?.user);
//   const navigate = useNavigate();
//   const [applications, setApplications] = useState([]);
// const [userName, setUserName] = useState('');
// const [receivedApplicationsFromIndustry, setReceivedApplicationsFromIndustry] = useState([]);


//   // useEffect(() => {
//   //   const fetchListings = async () => {
//   //     try {
//   //       const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product-industry/allindustry`);
//   //       if (response.data) setListings(response.data);
//   //     } catch (error) {
//   //       console.error('Error fetching listings:', error);
//   //     }
//   //   };

//   //   fetchListings();
//   // }, []);

//   // useEffect(() => {
//   //   const fetchApplications = async () => {
//   //     try {
//   //       const industryId = useParams.industryId;
//   //       console.log(industryId)
//   //       const response = await axios.get(`http://localhost:8080/api/product-industry/${industryId}`);
//   //       setApplications(response.data);
//   //     } catch (err) {
//   //       console.error("Error fetching applications:", err);
//   //     }
//   //   };

//   //   fetchApplications();
//   // }, [industryId]);


//   useEffect(() => {
//     if (!user?._id) return;
  
//     const fetchOwnListings = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/api/product-industry/allindustry`
//         );
//         if (response.data) setListings(response.data);
//       } catch (error) {
//         console.error("Error fetching own listings:", error);
//       }
//     };
  
//     const fetchReceivedApplicationsFromIndustry = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/api/product/industry/${user._id}`
//         );
//         if (response.data) setReceivedApplicationsFromIndustry(response.data);
//       } catch (error) {
//         console.error("Error fetching received applications from industry:", error);
//       }
//     };
  
//     fetchOwnListings(); // ✅ Farmer's own listings
//     fetchReceivedApplicationsFromIndustry(); // ✅ Industry's interest
  
//     setUserName(user.name);
//   }, [user]);

//   useEffect(() => {
//     socket.on('updateFarmerList', (newOrder) => {
//       setFarmersData((prev) => [...prev, newOrder]);
//     });

//     return () => {
//       socket.off('updateFarmerList');
//     };
//   }, []);

//   const handleOrderSubmit = async (orderData) => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/industry-orders/${user?._id}`, orderData);
//       if (response.status === 201) {
//         socket.emit('newOrderSubmission', response.data);
//         toast.success("Order submitted successfully!");
//       }
//     } catch (error) {
//       console.error("Error submitting order", error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#f9f9f6] dark:bg-[#121a13] text-[#1a1a1a] dark:text-white">
//       <Sidebar_industry />
//       <main className="flex-1 p-6 space-y-6">
//         <header className="flex justify-between items-center">
//           <div>
//             <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
//             <p className="text-sm font-bold text-green-900">Industry Dashboard</p>
//           </div>
//           <input
//             type="text"
//             placeholder="Search..."
//             className="px-4 py-2 rounded-md border dark:border-gray-700 bg-white dark:bg-[#1c2d22]"
//           />
//         </header>

//         <div className="grid grid-cols-4 gap-4">
//           <Card><CardContent className="p-4"><h2 className="font-medium mb-2">Sales Summary</h2><ul className="space-y-1 text-sm"><li>Wheat Straw (45%)</li><li>Rice Husk (30%)</li><li>Bagasse (25%)</li></ul></CardContent></Card>

//             <Card><CardContent className="p-4 space-y-2"><div className="flex items-center space-x-2"><CalendarDays size={20} /><h2 className="font-medium">Select Date</h2></div><DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} className="mt-2 w-full px-3 py-2 border rounded-md text-sm" dateFormat="dd MMMM yyyy" /></CardContent></Card>

//           <Card><CardContent className="p-4"><h2 className="font-medium mb-1">Details</h2><p className="text-xs text-muted-foreground">Description panel for waste items and status.</p></CardContent></Card>
//         </div>

//         <div>
//           <h2 className="text-lg font-semibold mb-2">Industry Orders</h2>
//           <div className="space-y-2">
//             {farmersData.map((farmer, index) => (
//               <div key={index} className="flex justify-between items-center p-2 border rounded-md">
//                 <p>{farmer.name} - {farmer.crop}</p>
//                 <Button onClick={() => setSelectedFarmer(farmer)}>Order</Button>
//               </div>
//             ))}
//           </div>

//           {selectedFarmer && (
//             <div className="mt-4 p-4 border rounded-md bg-white dark:bg-[#1c2d22]">
//               <h3 className="font-semibold mb-2">Place Order with {selectedFarmer.name}</h3>
//               <Button onClick={() => handleOrderSubmit({ farmerId: selectedFarmer.id })}>Submit Order</Button>
//             </div>
//           )}
//         </div>

//         <Card>
//           <CardContent className="p-4">
//             <h2 className="font-semibold mb-4">Current Listings</h2>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left">
//                   <th>Waste Type</th>
//                   <th>Quantity</th>
//                   <th>Price/ton</th>
//                   <th>Farmer</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {listings.map((listing) => (
//                   <tr key={listing.id}>
//                     <td>{listing.agriWaste}</td>
//                     <td>{listing.quantity} tons</td>
//                     <td>₹{listing.price}</td>
//                     <td>{listing.farmerName}</td>
//                     <td className={listing.status === 'Online' ? 'text-green-600' : 'text-red-500'}>{listing.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
            
//             </table>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4 overflow-x-auto">
//             <h2 className="text-lg font-semibold mb-4">Received Applications from Industries</h2>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left">
//                   <th>Farmer Name</th>
//                   <th>Agri Waste</th>
//                   <th>Quantity</th>
//                   <th>Price</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {receivedApplicationsFromIndustry.map((application) => (
//                   <tr key={application._id} className="border-t">
//                     <td>{application.farmerId}</td>
//                     <td>{application.agriWaste}</td>
//                     <td>{application.quantity} tons</td>
//                     <td>₹{application.price}</td>
//                     <td className="capitalize">{application.status || 'pending'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-3 gap-4">
//           <Card>
//             <CardContent className="p-4">
//               <h2 className="font-semibold mb-2">Recent Transactions</h2>
//               <ul className="text-sm space-y-2">
//                 <li>Wheat Straw - ₹120,000 (100 tons) <span className="text-green-500">Paid</span></li>
//                 <li>Rice Husk - ₹47,500 (50 tons) <span className="text-red-400">Pending</span></li>
//               </ul>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-4">
//               <h2 className="font-semibold mb-2">Market Insights</h2>
//               <p>📈 Weekly Growth: 12%</p>
//               <p>🔥 Most Demanded: Wheat Straw</p>
//             </CardContent>
//           </Card>

//            <Card>
//               <CardContent className="p-4 space-y-4">
//                 <h2 className="text-lg font-semibold">Active Buyer Requests</h2>
//                 <div className="text-sm space-y-4">
//                   {[
//                     {
//                       company: 'Green Energy Co.',
//                       quantity: 200,
//                       price: 1150,
//                       phone: '919038593493',
//                     },
//                     {
//                       company: 'Bio Solutions Ltd.',
//                       quantity: 150,
//                       price: 900,
//                       phone: '917439132206',
//                     },
//                     {
//                       company: 'Eco Fuels Inc.',
//                       quantity: 100,
//                       price: 850,
//                       phone: '919749611551',
//                     },
//                   ].map((buyer, index) => (
//                     <div key={index}>
//                       <p>{buyer.company} wants {buyer.quantity} tons @ ₹{buyer.price}/ton</p>
//                       <a
//                         href={`https://wa.me/${buyer.phone}?text=Hello%2C%20I'm%20interested%20in%20your%20request%20for%20${buyer.quantity}%20tons%20at%20₹${buyer.price}%2Fton Before we proceed, here are my details as per your requirement:

// 1. I will send a copy of my bank passbook showing account details and holder's name.
// 2. I will also provide my full address for shipping and documentation.
// 3. The product (agricultural waste) is fresh and recently collected.
// 4. The mentioned quantity is accurate and ready for pickup.
// 5. I confirm the waste is free from any chemical contamination or plastic.

// Kindly let me know the next steps.`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <Button className="mt-2 w-full bg-green-500 hover:bg-green-600">
//                           Chat on WhatsApp
//                         </Button>
//                       </a>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//         </div>

//         <Card>
//           <CardContent className="p-4">
//            <Link to={"/logistics"} className='p-4 bg-blue-600 text-white hover:bg-yellow-200 hover:text-red-700 font-bold text-xl border rounded-lg'>Need Transport --Click Here</Link>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }


// changes with order button reject orr approve down

// pages/Industry.jsx
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Button } from '../components/ui/CustomUI';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { CalendarDays, X } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Sidebar_industry from '../components/Sidebar_industry';
// import { useSelector } from 'react-redux';
// import { io } from 'socket.io-client';
// import { toast } from 'react-toastify';

// const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);

// export default function Industry() {
//   const [farmersData, setFarmersData] = useState([]);
//   const [selectedFarmer, setSelectedFarmer] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [listings, setListings] = useState([]);
//   const [orderModal, setOrderModal] = useState(null);
//   const [receivedApplicationsFromIndustry, setReceivedApplicationsFromIndustry] = useState([]);
//   const user = useSelector((state) => state?.user?.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user?._id) return;

//     const fetchListings = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product-industry/allindustry`);
//         setListings(res.data);
//       } catch (err) {
//         console.error("Error fetching listings:", err);
//       }
//     };

//     const fetchReceivedApplications = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/industry/${user._id}`);
//         setReceivedApplicationsFromIndustry(res.data);
//       } catch (err) {
//         console.error("Error fetching applications:", err);
//       }
//     };

//     fetchListings();
//     fetchReceivedApplications();
//   }, [user]);

//   useEffect(() => {
//     socket.on('updateFarmerList', (newOrder) => {
//       setFarmersData((prev) => [...prev, newOrder]);
//     });

//     socket.on('orderStatusUpdated', (updatedOrder) => {
//       setReceivedApplicationsFromIndustry((prev) =>
//         prev.map(order => order._id === updatedOrder._id ? updatedOrder : order)
//       );
//     });

//     return () => {
//       socket.off('updateFarmerList');
//       socket.off('orderStatusUpdated');
//     };
//   }, []);

//   const handleStatusUpdate = async (orderId, status) => {
//     try {
//       const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/order/order-status/${orderId}`, { status });
      
//       if (res.data) {
//         socket.emit('orderStatusUpdated', res.data);
//         toast.success(`Order ${status}`);
//       }
//     } catch (err) {
//       toast.error("Failed to update order");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#f9f9f6] dark:bg-[#121a13] text-[#1a1a1a] dark:text-white">
//       <Sidebar_industry />
//       <main className="flex-1 p-6 space-y-6">
//         <header className="flex justify-between items-center">
//           <div>
//             <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
//             <p className="text-sm font-bold text-green-900">Industry Dashboard</p>
//           </div>
//         </header>

//         <div className="grid grid-cols-4 gap-4">
//           <Card><CardContent className="p-4"><h2 className="font-medium mb-2">Sales Summary</h2><ul className="space-y-1 text-sm"><li>Wheat Straw (45%)</li><li>Rice Husk (30%)</li><li>Bagasse (25%)</li></ul></CardContent></Card>
//           <Card><CardContent className="p-4 space-y-2"><div className="flex items-center space-x-2"><CalendarDays size={20} /><h2 className="font-medium">Select Date</h2></div><DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} className="mt-2 w-full px-3 py-2 border rounded-md text-sm" dateFormat="dd MMMM yyyy" /></CardContent></Card>
//           <Card><CardContent className="p-4"><h2 className="font-medium mb-1">Details</h2><p className="text-xs text-muted-foreground">Description panel for waste items and status.</p></CardContent></Card>
//         </div>

//         <Card>
//           <CardContent className="p-4 overflow-x-auto">
//             <h2 className="text-lg font-semibold mb-4">Received Applications from Industries</h2>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left">
//                   <th>Farmer Name</th>
//                   <th>Agri Waste</th>
//                   <th>Quantity</th>
//                   <th>Price</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {receivedApplicationsFromIndustry.map((application) => (
//                   <tr key={application._id} className="border-t">
//                     <td>{application.farmerName || application.farmerId}</td>
//                     <td>{application.agriWaste}</td>
//                     <td>{application.quantity} tons</td>
//                     <td>₹{application.price}</td>
//                     <td className="capitalize">{application.status || 'pending'}</td>
//                     <td>
//                       <div className="flex gap-2">
//                         <button onClick={() => setOrderModal(application)} className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
//                         <button onClick={() => handleStatusUpdate(application._id, 'approved')} className="bg-green-500 text-white px-2 py-1 rounded">Approve</button>
//                         <button onClick={() => handleStatusUpdate(application._id, 'rejected')} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </CardContent>
//         </Card>

//         {orderModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//             <div className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
//               <button className="absolute top-2 right-2 text-gray-600" onClick={() => setOrderModal(null)}><X /></button>
//               <h2 className="text-xl font-bold mb-4">Order Details</h2>
//               <p><strong>Farmer Name:</strong> {orderModal.farmerName || orderModal.farmerId}</p>
//               <p><strong>Crop Type:</strong> {orderModal.agriWaste}</p>
//               <p><strong>Quantity:</strong> {orderModal.quantity} tons</p>
//               <p><strong>Price:</strong> ₹{orderModal.price}</p>
//               {orderModal.image && <img src={orderModal.image} alt="Uploaded" className="mt-4 max-h-64 rounded shadow" />}
//               <div className="mt-4 flex justify-end gap-2">
//                 <button onClick={() => setOrderModal(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Close</button>
//               </div>
//             </div>
//           </div>
//         )}

//         <Card>
//           <CardContent className="p-4">
//             <h2 className="font-semibold mb-4">Current Listings</h2>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left">
//                   <th>Waste Type</th>
//                   <th>Quantity</th>
//                   <th>Price/ton</th>
//                   <th>Farmer</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {listings.map((listing) => (
//                   <tr key={listing._id}>
//                     <td>{listing.agriWaste}</td>
//                     <td>{listing.quantity} tons</td>
//                     <td>₹{listing.price}</td>
//                     <td>{listing.farmerName}</td>
//                     <td className={listing.status === 'Online' ? 'text-green-600' : 'text-red-500'}>{listing.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <Link to="/logistics" className="p-4 bg-blue-600 text-white hover:bg-yellow-200 hover:text-red-700 font-bold text-xl border rounded-lg">Need Transport --Click Here</Link>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button } from '../components/ui/CustomUI';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDays, X, Truck, PackageSearch, Send, Star, BarChart3, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar_industry from '../components/Sidebar_industry';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);

export default function Industry() {
  const [farmersData, setFarmersData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [listings, setListings] = useState([]);
  const [orderModal, setOrderModal] = useState(null);
  const [receivedApplicationsFromIndustry, setReceivedApplicationsFromIndustry] = useState([]);
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return;

    const fetchListings = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product-industry/allindustry`);
        setListings(res.data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    };

    const fetchReceivedApplications = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/industry/${user._id}`);
        setReceivedApplicationsFromIndustry(res.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    fetchListings();
    fetchReceivedApplications();
  }, [user]);

  useEffect(() => {
    socket.on('updateFarmerList', (newOrder) => {
      setFarmersData((prev) => [...prev, newOrder]);
    });

    socket.on('orderStatusUpdated', (updatedOrder) => {
      setReceivedApplicationsFromIndustry((prev) =>
        prev.map(order => order._id === updatedOrder._id ? updatedOrder : order)
      );
    });

    return () => {
      socket.off('updateFarmerList');
      socket.off('orderStatusUpdated');
    };
  }, []);

  const handleStatusUpdate = async (orderId, status) => {
    try {
      const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/order/order-status/${orderId}`, { status });
      if (res.data) {
        socket.emit('orderStatusUpdated', res.data);
        toast.success(`Order ${status}`);
      }
    } catch (err) {
      toast.error("Failed to update order");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#e6fff5] via-[#f0fdf4] to-[#e2f0f1] dark:from-[#0c1b15] dark:via-[#1a2b1d] dark:to-[#193526] text-[#1a1a1a] dark:text-white animate-fadeInSlow">
      <Sidebar_industry />
      <main className="flex-1 p-8 space-y-10 animate-slideUp fade-in">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-wide text-[#0e4c3b] dark:text-[#a0f0c7]">Welcome, {user?.name}</h1>
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">Empowering Green Industry 🚀</p>
          </div>
        </header>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="shadow-xl transform transition duration-300 hover:scale-105 bg-gradient-to-tr from-green-100 to-green-300 dark:from-[#124e3b] dark:to-[#0f3e2d]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 size={22} />
                <h2 className="font-bold text-lg">Sales Insights</h2>
              </div>
              <ul className="space-y-1 text-sm">
                <li>🌾 Wheat Straw (45%)</li>
                <li>🌾 Rice Husk (30%)</li>
                <li>🌾 Bagasse (25%)</li>
              </ul>
              <img src="https://cdn-icons-png.flaticon.com/512/744/744465.png" className="h-12 mt-3 opacity-70" alt="Crop" />
            </CardContent>
          </Card>

          <Card className="shadow-xl transform transition duration-300 hover:scale-105 bg-gradient-to-tr from-yellow-100 to-yellow-300 dark:from-[#4e3e12] dark:to-[#3e2d0f]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-lg font-bold mb-3">
                <CalendarDays /> Select Date
              </div>
              <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} className="w-full px-4 py-2 border rounded-md text-sm dark:bg-[#1f2c22] dark:border-gray-600" dateFormat="dd MMMM yyyy" />
              <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" className="h-10 mt-4 opacity-60" alt="Calendar" />
            </CardContent>
          </Card>

          <Card className="shadow-xl transform transition duration-300 hover:scale-105 bg-gradient-to-tr from-blue-100 to-blue-300 dark:from-[#12344e] dark:to-[#0f2940]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock size={20} />
                <h2 className="font-bold text-lg">Overview</h2>
              </div>
              <p className="text-sm">Monitor activity & waste status</p>
              <img src="https://cdn-icons-png.flaticon.com/512/1115/1115735.png" className="h-12 mt-3 opacity-70" alt="Overview" />
            </CardContent>
          </Card>

          <Card className="shadow-xl transform transition duration-300 hover:scale-105 bg-gradient-to-tr from-pink-100 to-red-200 dark:from-[#4e1234] dark:to-[#3e0f2d]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Star size={22} />
                <h2 className="font-bold text-lg">Reputation</h2>
              </div>
              <p className="text-sm">Top-rated transactions</p>
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" className="h-10 mt-3 opacity-60" alt="Rating" />
            </CardContent>
          </Card>
        </div>

     
    

 <Card className="shadow-md animate-fadeInUp animation-delay-600 transition-transform transform hover:scale-[1.02] hover:shadow-xl duration-500">
          <CardContent className="p-4 overflow-x-auto animate-fadeInUp animation-delay-600">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><PackageSearch /> Received Applications from Industries</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th>Farmer Name</th>
                  <th>Agri Waste</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {receivedApplicationsFromIndustry.map((application, index) => (
                  <tr key={application._id} className={`border-t hover:bg-green-50 dark:hover:bg-green-900 transition-all duration-300 animate-slideInUp animation-delay-${index * 50}`}>
                    <td>{application.farmerName || application.farmerId}</td>
                    <td>{application.agriWaste}</td>
                    <td>{application.quantity} tons</td>
                    <td>₹{application.price}</td>
                    <td className="capitalize font-medium">{application.status || 'pending'}</td>
                    <td>
                      <div className="flex gap-2">
                        <button onClick={() => setOrderModal(application)} className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded transition-all duration-300 transform hover:scale-105">View</button>
                        <button onClick={() => handleStatusUpdate(application._id, 'approved')} className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded transition-all duration-300 transform hover:scale-105">Approve</button>
                        <button onClick={() => handleStatusUpdate(application._id, 'rejected')} className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded transition-all duration-300 transform hover:scale-105">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

      {orderModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center animate-fadeIn backdrop-blur-sm">
            <div className="bg-gradient-to-br from-white via-[#e1fff2] to-[#ccf5dd] dark:from-[#1e1e1e] dark:via-[#284437] dark:to-[#2e3b2c] text-black dark:text-white p-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] max-w-lg w-full relative animate-zoomIn scale-95 transition-all duration-500">
              <button className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-transform transform hover:scale-110" onClick={() => setOrderModal(null)}><X /></button>
              <h2 className="text-3xl font-extrabold text-green-800 dark:text-green-300 mb-6 tracking-wide flex items-center gap-2">📦 Order Details</h2>
              <div className="space-y-3 text-base">
                <p><span className="text-[#4a4a4a] dark:text-gray-300 font-semibold">👨‍🌾 Farmer Name:</span> {orderModal.farmerName || orderModal.farmerId}</p>
                <p><span className="text-[#4a4a4a] dark:text-gray-300 font-semibold">🌾 Crop Type:</span> {orderModal.agriWaste}</p>
                <p><span className="text-[#4a4a4a] dark:text-gray-300 font-semibold">⚖️ Quantity:</span> {orderModal.quantity} tons</p>
                <p><span className="text-[#4a4a4a] dark:text-gray-300 font-semibold">💰 Price:</span> ₹{orderModal.price}</p>
                {orderModal.image && (
                  <img
                    src={orderModal.image}
                    alt="Uploaded"
                    className="mt-5 max-h-64 w-full object-contain rounded-xl shadow-lg border border-gray-200 dark:border-gray-600"
                  />
                )}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setOrderModal(null)}
                  className="bg-gradient-to-r from-red-400 to-red-600 hover:from-pink-500 hover:to-red-700 text-white px-5 py-2 rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
                >
                   Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Current Listings */}
        <Card className="shadow-md animate-fadeInUp animation-delay-700 transition-transform transform hover:scale-[1.02] hover:shadow-xl duration-500">
          <CardContent className="p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Send /> Current Listings</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th>Waste Type</th>
                  <th>Quantity</th>
                  <th>Price/ton</th>
                  <th>Farmer</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing, index) => (
                  <tr key={listing._id} className={`border-t hover:bg-blue-50 dark:hover:bg-blue-900 transition duration-300 animate-slideInUp animation-delay-${index * 50}`}>
                    <td>{listing.agriWaste}</td>
                    <td>{listing.quantity} tons</td>
                    <td>₹{listing.price}</td>
                    <td>{listing.farmerName}</td>
                    <td className={listing.status === 'Online' ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>{listing.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* ... other sections remain unchanged */}
      </main>
    </div>
  );
}


