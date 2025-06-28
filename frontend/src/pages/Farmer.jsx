// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Button } from '../components/ui/CustomUI';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { CalendarDays } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar';
// import { useSelector } from 'react-redux';
// import YouTubeSlider from '../components/Youtube';

// export default function Farmer() {
//   const navigate = useNavigate();
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [listings, setListings] = useState([]);
//   const [userName, setUserName] = useState('');
//   const user = useSelector((state) => state?.user?.user);
//   const [sentApplications, setSentApplications] = useState([]);
// const [receivedApplicationsFromIndustry, setReceivedApplicationsFromIndustry] = useState([]);


  
//   // Fetch listings and user info
// //   useEffect(() => {
// //     const fetchListings = async () => {
// //       try {
// //         const  response  = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/all`);
// //         if (response.data) setListings(response.data);
// //       } catch (error) {
// //         console.error('Error fetching listings:', error);
// //       }
// //     };
// //   const fetchSentApplications = async () => {
// //     try {
// //       if (user?._id) {
// //         const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/application/farmer/${user._id}`);
// //         if (response.data) setSentApplications(response.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching sent applications:', error);
// //     }
// //   };
  

// //   fetchListings();
// //   fetchSentApplications(); // Fetch sent applications
// //   if (user) {
// //     setUserName(user.name);
// //   }
// // }, [user]);



// useEffect(() => {
//   if (!user?._id) return;

//   const fetchOwnListings = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BACKEND_URL}/api/product/all`
//       );
//       if (response.data) setListings(response.data);
//     } catch (error) {
//       console.error("Error fetching own listings:", error);
//     }
//   };

//   const fetchReceivedApplicationsFromIndustry = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BACKEND_URL}/api/product-industry/farmer/${user._id}`
//       );
//       if (response.data) setReceivedApplicationsFromIndustry(response.data);
//     } catch (error) {
//       console.error("Error fetching received applications from industry:", error);
//     }
//   };

//   fetchOwnListings(); // ✅ Farmer's own listings
//   fetchReceivedApplicationsFromIndustry(); // ✅ Industry's interest

//   setUserName(user.name);
// }, [user]);



//   return (
//     <div className="flex min-h-screen bg-[#f9f9f6] dark:bg-[#121a13] text-[#1a1a1a] dark:text-white">
//       <Sidebar />

//       <main className="flex-1 p-6 space-y-6">
//         {/* Header */}
//         <header className="flex justify-between items-center flex-wrap sm:flex-nowrap">
//           <div>
//             <h1 className="text-xl font-semibold">Welcome,{userName||"loading.."}</h1>
//             <p className="text-sm text-green-500">Organic Supplier</p>
//           </div>

//           <input
//             type="text"
//             placeholder="Search..."
//             className="px-4 py-2 mt-4 sm:mt-0 rounded-md border dark:border-gray-700 bg-white dark:bg-[#1c2d22]"
//           />
//         </header>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <SummaryCard title="Sales Summary" items={['Wheat Straw (45%)', 'Rice Husk (30%)', 'Bagasse (25%)']} />
//           <PriceSuggestionCard price="₹2,500/ton" />
//           <DateSelectionCard selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
//           <DetailsCard />
//         </div>

//         {/* Current Listings */}
//         <Card>
//           <CardContent className="p-4 overflow-x-auto">
//             <h2 className="text-lg font-semibold mb-4">Current Listings</h2>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left">
//                   <th>Waste Type</th>
//                   <th>Quantity</th>
//                   <th>Price/ton</th>
//                   <th>Interested Buyers</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {listings.map((listing) => (
//                   <tr key={listing.id} className="border-t">
//                     <td>{listing.agriWaste}</td>
//                     <td>{listing.quantity} tons</td>
//                     <td>₹{listing.price}</td>
//                     <td>{listing.industryName}</td>
//                     <td className={listing.status === 'Online' ? 'text-green-600' : 'text-red-500'}>
//                       {listing.status}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </CardContent>
//         </Card>


// <Card>
//   <CardContent className="p-4 overflow-x-auto">
//     <h2 className="text-lg font-semibold mb-4">Received Applications from Industries</h2>
//     <table className="w-full text-sm">
//       <thead>
//         <tr className="text-left">
//           <th>Industry Name</th>
//           <th>Agri Waste</th>
//           <th>Quantity</th>
//           <th>Price</th>
//           <th>Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {receivedApplicationsFromIndustry.map((application) => (
//           <tr key={application._id} className="border-t">
//             <td>{application.industryId}</td>
//             <td>{application.agriWaste}</td>
//             <td>{application.quantity} tons</td>
//             <td>₹{application.price}</td>
//             <td className="capitalize">{application.status || 'pending'}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </CardContent>
// </Card>

        
//         {/* Bottom Summary Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           <RecentTransactionsCard />
//           <MarketInsightsCard />
//           <ActiveBuyerRequestsCard />
//         </div>

//         {/* Map Section */}
//         <Card>
//           <CardContent className="p-4">
//            <Link to={"/logistics"} className='p-4 bg-blue-600 text-white hover:bg-yellow-200 hover:text-red-700 font-bold text-xl border rounded-lg'>Need Transport --Click Here</Link>
//           </CardContent>
//         </Card>

//         {/* YouTube Slider */}
//         <Card>
//           <CardContent className="p-4">
//             <YouTubeSlider />
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }

// // -- Small Components Below -- //

// const SummaryCard = ({ title, items }) => (
//   <Card>
//     <CardContent className="p-4">
//       <h2 className="font-medium mb-2">{title}</h2>
//       <ul className="space-y-1 text-sm">
//         {items.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </CardContent>
//   </Card>
// );

// const PriceSuggestionCard = ({ price }) => (
//   <Card>
//     <CardContent className="p-4">
//       <h2 className="font-medium mb-2">AI Price Suggestion</h2>
//       <p className="text-2xl font-bold text-green-600">{price}</p>
//       <p className="text-xs text-muted-foreground">Based on current market trends</p>
//     </CardContent>
//   </Card>
// );

// const DateSelectionCard = ({ selectedDate, setSelectedDate }) => (
//   <Card>
//     <CardContent className="p-4 space-y-2">
//       <div className="flex items-center space-x-2">
//         <CalendarDays size={20} />
//         <h2 className="font-medium">Select Date</h2>
//       </div>
//       <DatePicker
//         selected={selectedDate}
//         onChange={(date) => setSelectedDate(date)}
//         className="mt-2 w-full px-3 py-2 border rounded-md text-sm"
//         dateFormat="dd MMMM yyyy"
//       />
//     </CardContent>
//   </Card>
// );

// const DetailsCard = () => (
//   <Card>
//     <CardContent className="p-4">
//       <h2 className="font-medium mb-1">Details</h2>
//       <p className="text-xs text-muted-foreground">
//         Description panel for waste items and status.
//       </p>
//     </CardContent>
//   </Card>
// );

// const RecentTransactionsCard = () => (
//   <Card>
//     <CardContent className="p-4">
//       <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
//       <ul className="text-sm space-y-2">
//         <li>Wheat Straw - ₹120,000 (100 tons) <span className="text-green-500">Paid</span></li>
//         <li>Rice Husk - ₹47,500 (50 tons) <span className="text-red-400">Pending</span></li>
//       </ul>
//     </CardContent>
//   </Card>
// );

// const MarketInsightsCard = () => (
//   <Card>
//     <CardContent className="p-4">
//       <h2 className="text-lg font-semibold mb-2">Market Insights</h2>
//       <p>📈 Weekly Growth: 12%</p>
//       <p>🔥 Most Demanded: Wheat Straw</p>
//     </CardContent>
//   </Card>
// );

// const ActiveBuyerRequestsCard = () => (
//   <Card>
//     <CardContent className="p-4 space-y-4">
//       <h2 className="text-lg font-semibold">Active Buyer Requests</h2>
//       <div className="text-sm space-y-4">
//         {[
//           {
//             company: 'Green Energy Co.',
//             quantity: 200,
//             price: 1150,
//             phone: '919038593493',
//           },
//           {
//             company: 'Bio Solutions Ltd.',
//             quantity: 150,
//             price: 900,
//             phone: '917439132206',
//           },
//           {
//             company: 'Eco Fuels Inc.',
//             quantity: 100,
//             price: 850,
//             phone: '919749611551',
//           },
//         ].map((buyer, index) => (
//           <div key={index}>
//             <p>{buyer.company} wants {buyer.quantity} tons @ ₹{buyer.price}/ton</p>
//             <a
//               href={`https://wa.me/${buyer.phone}?text=Hello%2C%20I'm%20interested%20in%20your%20request%20for%20${buyer.quantity}%20tons%20at%20₹${buyer.price}%2Fton Before we proceed, here are my details as per your requirement:

// 1. I will send a copy of my bank passbook showing account details and holder's name.
// 2. I will also provide my full address for shipping and documentation.
// 3. The product (agricultural waste) is fresh and recently collected.
// 4. The mentioned quantity is accurate and ready for pickup.
// 5. I confirm the waste is free from any chemical contamination or plastic.

// Kindly let me know the next steps.`}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Button className="mt-2 w-full bg-green-500 hover:bg-green-600">
//                 Chat on WhatsApp
//               </Button>
//             </a>
//           </div>
//         ))}
//       </div>
//     </CardContent>
//   </Card>
// );


// Enhanced Farmer Dashboard with full animations, icons, gradients, section reveal effects, and visual improvements

// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Button } from '../components/ui/CustomUI';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { CalendarDays, Tractor, Factory, Leaf, TrendingUp, PhoneCall, Send, PackageSearch } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar';
// import { useSelector } from 'react-redux';
// import YouTubeSlider from '../components/Youtube';

// export default function Farmer() {
//   const navigate = useNavigate();
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [listings, setListings] = useState([]);
//   const [userName, setUserName] = useState('');
//   const user = useSelector((state) => state?.user?.user);
//   const [receivedApplicationsFromIndustry, setReceivedApplicationsFromIndustry] = useState([]);

//   useEffect(() => {
//     if (!user?._id) return;

//     const fetchOwnListings = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/all`);
//         if (response.data) setListings(response.data);
//       } catch (error) {
//         console.error("Error fetching own listings:", error);
//       }
//     };

//     const fetchReceivedApplicationsFromIndustry = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product-industry/farmer/${user._id}`);
//         if (response.data) setReceivedApplicationsFromIndustry(response.data);
//       } catch (error) {
//         console.error("Error fetching received applications from industry:", error);
//       }
//     };

//     fetchOwnListings();
//     fetchReceivedApplicationsFromIndustry();
//     setUserName(user.name);
//   }, [user]);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-[#e6fff5] via-[#f0fdf4] to-[#e2f0f1] dark:from-[#0c1b15] dark:via-[#1a2b1d] dark:to-[#193526] text-[#1a1a1a] dark:text-white animate-fadeInSlow">
//       <Sidebar />
//       <main className="flex-1 p-8 space-y-10 animate-slideUp fade-in">
//         <header className="flex justify-between items-center flex-wrap">
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight">Welcome, {userName || "loading.."}</h1>
//             <p className="text-sm text-green-700 font-medium">🌱 Organic Supplier Dashboard</p>
//           </div>

//           <input type="text" placeholder="Search..." className="px-4 py-2 mt-4 sm:mt-0 rounded-md border dark:border-gray-700 bg-white dark:bg-[#1c2d22] shadow-md" />
//         </header>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <SummaryCard title="Sales Summary" items={['🌾 Wheat Straw (45%)', '🌿 Rice Husk (30%)', '🍃 Bagasse (25%)']} />
//           <PriceSuggestionCard price="₹2,500/ton" />
//           <DateSelectionCard selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
//           <DetailsCard />
//         </div>

//         <Card className="shadow-md animate-fadeInUp animation-delay-500 transition-transform transform hover:scale-[1.02] duration-300">
//           <CardContent className="p-4 overflow-x-auto">
//             <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Send /> Current Listings</h2>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left border-b">
//                   <th>Waste Type</th>
//                   <th>Quantity</th>
//                   <th>Price/ton</th>
//                   <th>Interested Buyers</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {listings.map((listing, index) => (
//                   <tr key={listing.id} className={`border-t hover:bg-blue-50 dark:hover:bg-blue-900 transition duration-300 animate-slideInUp animation-delay-${index * 50}`}>
//                     <td>{listing.agriWaste}</td>
//                     <td>{listing.quantity} tons</td>
//                     <td>₹{listing.price}</td>
//                     <td>{listing.industryName}</td>
//                     <td className={listing.status === 'Online' ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>{listing.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </CardContent>
//         </Card>

//         <Card className="shadow-md animate-fadeInUp animation-delay-600 transition-transform transform hover:scale-[1.02] duration-300">
//           <CardContent className="p-4 overflow-x-auto">
//             <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><PackageSearch /> Received Applications from Industries</h2>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left border-b">
//                   <th>Industry Name</th>
//                   <th>Agri Waste</th>
//                   <th>Quantity</th>
//                   <th>Price</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {receivedApplicationsFromIndustry.map((application, index) => (
//                   <tr key={application._id} className={`border-t hover:bg-green-50 dark:hover:bg-green-900 transition-all duration-300 animate-slideInUp animation-delay-${index * 50}`}>
//                     <td>{application.industryId}</td>
//                     <td>{application.agriWaste}</td>
//                     <td>{application.quantity} tons</td>
//                     <td>₹{application.price}</td>
//                     <td className="capitalize font-medium">{application.status || 'pending'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           <RecentTransactionsCard />
//           <MarketInsightsCard />
//           <ActiveBuyerRequestsCard />
//         </div>

//         <Card className="animate-fadeInUp animation-delay-700">
//           <CardContent className="p-4">
//             <Link to="/logistics" className="p-4 bg-blue-600 text-white hover:bg-yellow-200 hover:text-red-700 font-bold text-xl border rounded-lg">🚚 Need Transport -- Click Here</Link>
//           </CardContent>
//         </Card>

//         <Card className="animate-fadeInUp animation-delay-800">
//           <CardContent className="p-4">
//             <YouTubeSlider />
//           </CardContent>
//         </Card>


        
//       </main>
//     </div>
//   );
// }

// const SummaryCard = ({ title, items }) => (
//   <Card>
//     <CardContent className="p-4">
//       <h2 className="font-medium mb-2">{title}</h2>
//       <ul className="space-y-1 text-sm">
//         {items.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </CardContent>
//   </Card>
// );

// const PriceSuggestionCard = ({ price }) => (
//   <Card>
//     <CardContent className="p-4">
//       <h2 className="font-medium mb-2">AI Price Suggestion</h2>
//       <p className="text-2xl font-bold text-green-600">{price}</p>
//       <p className="text-xs text-muted-foreground">Based on current market trends</p>
//     </CardContent>
//   </Card>
// );

// const DateSelectionCard = ({ selectedDate, setSelectedDate }) => (
//   <Card>
//     <CardContent className="p-4 space-y-2">
//       <div className="flex items-center space-x-2">
//         <CalendarDays size={20} />
//         <h2 className="font-medium">Select Date</h2>
//       </div>
//       <DatePicker
//         selected={selectedDate}
//         onChange={(date) => setSelectedDate(date)}
//         className="mt-2 w-full px-3 py-2 border rounded-md text-sm"
//         dateFormat="dd MMMM yyyy"
//       />
//     </CardContent>
//   </Card>
// );

// const DetailsCard = () => (
//   <Card>
//     <CardContent className="p-4">
//       <h2 className="font-medium mb-1">Details</h2>
//       <p className="text-xs text-muted-foreground">
//         Description panel for waste items and status.
//       </p>
//     </CardContent>
//   </Card>
// );

// const RecentTransactionsCard = () => (
//   <Card>
//     <CardContent className="p-4">
//       <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
//       <ul className="text-sm space-y-2">
//         <li>Wheat Straw - ₹120,000 (100 tons) <span className="text-green-500">Paid</span></li>
//         <li>Rice Husk - ₹47,500 (50 tons) <span className="text-red-400">Pending</span></li>
//       </ul>
//     </CardContent>
//   </Card>
// );

// const MarketInsightsCard = () => (
//   <Card>
//     <CardContent className="p-4">
//       <h2 className="text-lg font-semibold mb-2">Market Insights</h2>
//       <p>📈 Weekly Growth: 12%</p>
//       <p>🔥 Most Demanded: Wheat Straw</p>
//     </CardContent>
//   </Card>
// );

// const ActiveBuyerRequestsCard = () => (
//   <Card>
//     <CardContent className="p-4 space-y-4">
//       <h2 className="text-lg font-semibold">Active Buyer Requests</h2>
//       <div className="text-sm space-y-4">
//         {[
//           {
//             company: 'Green Energy Co.',
//             quantity: 200,
//             price: 1150,
//             phone: '919038593493',
//           },
//           {
//             company: 'Bio Solutions Ltd.',
//             quantity: 150,
//             price: 900,
//             phone: '917439132206',
//           },
//           {
//             company: 'Eco Fuels Inc.',
//             quantity: 100,
//             price: 850,
//             phone: '919749611551',
//           },
//         ].map((buyer, index) => (
//           <div key={index}>
//             <p>{buyer.company} wants {buyer.quantity} tons @ ₹{buyer.price}/ton</p>
//             <a
//               href={`https://wa.me/${buyer.phone}?text=Hello%2C%20I'm%20interested%20in%20your%20request%20for%20${buyer.quantity}%20tons%20at%20₹${buyer.price}%2Fton Before we proceed, here are my details as per your requirement:

// 1. I will send a copy of my bank passbook showing account details and holder's name.
// 2. I will also provide my full address for shipping and documentation.
// 3. The product (agricultural waste) is fresh and recently collected.
// 4. The mentioned quantity is accurate and ready for pickup.
// 5. I confirm the waste is free from any chemical contamination or plastic.

// Kindly let me know the next steps.`}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Button className="mt-2 w-full bg-green-500 hover:bg-green-600">
//                 Chat on WhatsApp
//               </Button>
//             </a>
//           </div>
//         ))}
//       </div>
//     </CardContent>
//   </Card>
// );

// Enhanced Farmer Dashboard fully styled like Industry.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button } from '../components/ui/CustomUI';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDays, PackageSearch, Send, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import YouTubeSlider from '../components/Youtube';

export default function Farmer() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [listings, setListings] = useState([]);
  const [userName, setUserName] = useState('');
  const user = useSelector((state) => state?.user?.user);
  const [receivedApplicationsFromIndustry, setReceivedApplicationsFromIndustry] = useState([]);
  const [orderModal, setOrderModal] = useState(null);

  useEffect(() => {
    if (!user?._id) return;
    const fetchData = async () => {
      try {
        const listingsRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/all`);
        const appsRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product-industry/farmer/${user._id}`);
        if (listingsRes.data) setListings(listingsRes.data);
        if (appsRes.data) setReceivedApplicationsFromIndustry(appsRes.data);
        setUserName(user.name);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#e6fff5] via-[#f0fdf4] to-[#e2f0f1] dark:from-[#0c1b15] dark:via-[#1a2b1d] dark:to-[#193526] text-[#1a1a1a] dark:text-white animate-fadeInSlow">
      <Sidebar />
      <main className="flex-1 p-8 space-y-10 animate-slideUp fade-in">
        <header className="flex justify-between items-center flex-wrap">
          <div>
            <h1 className="text-3xl font-extrabold tracking-wide text-[#0e4c3b] dark:text-[#a0f0c7]">Welcome, {userName || "loading.."}</h1>
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">🌾 Organic Supplier Panel</p>
          </div>
          <input type="text" placeholder="Search..." className="px-4 py-2 mt-4 sm:mt-0 rounded-md border dark:border-gray-700 bg-white dark:bg-[#1c2d22] shadow-md" />
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <SummaryCard />
          <DateCard selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <DetailsCard />
        </div>

        {/* Listings Table */}
        <Card className="shadow-md animate-fadeInUp transition-transform transform hover:scale-[1.02] duration-300">
          <CardContent className="p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Send /> Current Listings</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th>Waste Type</th>
                  <th>Quantity</th>
                  <th>Price/ton</th>
                  <th>Interested Buyers</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing, index) => (
                  <tr key={listing._id} className={`border-t hover:bg-blue-50 dark:hover:bg-blue-900 transition duration-300 animate-slideInUp animation-delay-${index * 50}`}>
                    <td>{listing.agriWaste}</td>
                    <td>{listing.quantity} tons</td>
                    <td>₹{listing.price}</td>
                    <td>{listing.industryName}</td>
                    <td className={listing.status === 'Online' ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>{listing.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Received Applications */}
        <Card className="shadow-md animate-fadeInUp animation-delay-600 transition-transform transform hover:scale-[1.02] duration-300">
          <CardContent className="p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><PackageSearch /> Received Applications from Industries</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th>Industry Name</th>
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
                    <td>{application.industryId}</td>
                    <td>{application.agriWaste}</td>
                    <td>{application.quantity} tons</td>
                    <td>₹{application.price}</td>
                    <td className="capitalize font-medium">{application.status || 'pending'}</td>
                    <td>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded" onClick={() => setOrderModal(application)}>View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Order Modal */}
        {orderModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center animate-fadeIn backdrop-blur-sm">
            <div className="bg-gradient-to-br from-white via-[#e1fff2] to-[#ccf5dd] dark:from-[#1e1e1e] dark:via-[#284437] dark:to-[#2e3b2c] text-black dark:text-white p-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] max-w-lg w-full relative animate-zoomIn">
              <button className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-transform transform hover:scale-110" onClick={() => setOrderModal(null)}><X /></button>
              <h2 className="text-2xl font-extrabold text-green-800 dark:text-green-300 mb-6 tracking-wide flex items-center gap-2">📦 Order Details</h2>
              <div className="space-y-3 text-base">
                <p><strong>Industry:</strong> {orderModal.industryId}</p>
                <p><strong>Crop:</strong> {orderModal.agriWaste}</p>
                <p><strong>Quantity:</strong> {orderModal.quantity} tons</p>
                <p><strong>Price:</strong> ₹{orderModal.price}</p>
                {orderModal.image && <img src={orderModal.image} alt="Uploaded" className="mt-4 max-h-64 rounded shadow-lg" />}
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setOrderModal(null)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-xl">Close</Button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard title="Recent Transactions" content="✅ Paid: ₹1,20,000 (100 tons) | ⏳ Pending: ₹47,500 (50 tons)" />
          <InfoCard title="Market Insights" content="🌾 Top Crop: Wheat Straw | 📈 Growth: 12%" />
          <InfoCard title="Active Buyer Requests" content="📬 3 new industry requests via WhatsApp" />
        </div>

        {/* Logistics & YouTube */}
        <Card className="animate-fadeInUp animation-delay-700">
          <CardContent className="p-4">
            <Link to="/logistics" className="p-4 bg-blue-600 text-white hover:bg-yellow-200 hover:text-red-700 font-bold text-xl border rounded-lg block text-center">🚚 Need Transport — Click Here</Link>
          </CardContent>
        </Card>
        <Card className="animate-fadeInUp animation-delay-800">
          <CardContent className="p-4"><YouTubeSlider /></CardContent>
        </Card>
      </main>
    </div>
  );
}

// Mini Card Components
const SummaryCard = () => (
  <Card className="shadow-xl transform transition duration-300 hover:scale-105 bg-gradient-to-tr from-green-100 to-green-300 dark:from-[#124e3b] dark:to-[#0f3e2d]">
    <CardContent className="p-6">
      <h2 className="font-bold text-lg mb-2">Sales Insights</h2>
      <ul className="text-sm space-y-1">
        <li>🌾 Wheat Straw (45%)</li>
        <li>🌿 Rice Husk (30%)</li>
        <li>🍃 Bagasse (25%)</li>
      </ul>
    </CardContent>
  </Card>
);

const DateCard = ({ selectedDate, setSelectedDate }) => (
  <Card className="shadow-xl transform transition duration-300 hover:scale-105 bg-gradient-to-tr from-yellow-100 to-yellow-300 dark:from-[#4e3e12] dark:to-[#3e2d0f]">
    <CardContent className="p-6">
      <div className="flex items-center gap-3 text-lg font-bold mb-3"><CalendarDays /> Select Date</div>
      <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} className="w-full px-4 py-2 border rounded-md text-sm dark:bg-[#1f2c22]" dateFormat="dd MMMM yyyy" />
    </CardContent>
  </Card>
);

const DetailsCard = () => (
  <Card className="shadow-xl transform transition duration-300 hover:scale-105 bg-gradient-to-tr from-blue-100 to-blue-300 dark:from-[#12344e] dark:to-[#0f2940]">
    <CardContent className="p-6">
      <h2 className="font-bold text-lg mb-2">Overview</h2>
      <p className="text-sm">Track listing activity and performance.</p>
    </CardContent>
  </Card>
);

const InfoCard = ({ title, content }) => (
  <Card className="shadow-md animate-fadeInUp transition-transform transform hover:scale-105 duration-300">
    <CardContent className="p-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm">{content}</p>
    </CardContent>
  </Card>
);

// ... (Component definitions remain unchanged, or animations/icons can be added similarly)
