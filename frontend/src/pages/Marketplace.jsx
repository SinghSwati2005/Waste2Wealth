
// // Updated Marketplace.jsx
// import React, { useEffect, useState } from "react";
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
// } from "recharts";
// import { Card, CardContent, Button } from '../components/ui/CustomUI';
// import { FaLocationDot, FaFilter } from "react-icons/fa6";
// import { toast } from "react-toastify";
// import { MdOutlineAddBox } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import Sidebar from "../components/Sidebar";
// import Sidebar_industry from "../components/Sidebar_industry";
// import { Link } from "react-router-dom";
// import { ShoppingCart } from "lucide-react";
// import { useCart } from "../context/CartContext";

// export default function Marketplace() {
//   const dispatch = useDispatch();
//   const { cartItems, addToCart } = useCart();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [listings, setListings] = useState([]);
//   const [filteredListings, setFilteredListings] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "", description: "", image: "", price: "", quantity: "",
//     seller: "", location: "", tag: "",
//   });
//   const [filters, setFilters] = useState({
//     type: "", location: "", priceRange: "",
//   });

//   useEffect(() => {
//     fetchListings();
//   }, []);


//   const user = useSelector((state) => state.user.user); // ✅ gets the actual user object
//   // ⬅️ Get user details from Redux
//   const isLoggedIn = user?.email ? true : false;
//   const role = user?.role;

//   const fetchListings = async () => {
//     try {
//       const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listings`);
//       const data = await res.json();
//       setListings(data);
//       setFilteredListings(data);
//     } catch (error) {
//       console.error("Error fetching listings:", error);
//     }
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listings`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         setFormData({
//           title: "", description: "", image: "", price: "", quantity: "",
//           seller: "", location: "", tag: "",
//         });
//         setShowForm(false);
//         fetchListings();
//       }
//     } catch (error) {
//       console.error("Error submitting listing:", error);
//     }
//   };


//   const applyFilters = () => {
//     let filtered = listings;
//     if (filters.type) filtered = filtered.filter(item => item.tag === filters.type);
//     if (filters.location) filtered = filtered.filter(item => item.location === filters.location);
//     if (filters.priceRange) {
//       const [min, max] = filters.priceRange.split("-").map(Number);
//       filtered = filtered.filter(item => item.price >= min && item.price <= max);
//     }
//     setFilteredListings(filtered);
//   };

//   const priceChartData = filteredListings.map((listing, i) => ({
//     name: listing.title,
//     price: parseFloat(listing.price),
//   }));

//   const uniqueTags = [...new Set(listings.map(listing => listing.tag).filter(Boolean))];
//   const uniqueLocations = [...new Set(listings.map(listing => listing.location).filter(Boolean))];


//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);

//     const filtered = listings.filter((listing) =>
//     (listing.title?.toLowerCase().includes(term) ||
//       listing.seller?.toLowerCase().includes(term) ||
//       listing.tag?.toLowerCase().includes(term))
//     );

//     setFilteredListings(filtered);
//   };
//   const handleAddToCart = async (listing) => {
//     const token = localStorage.getItem("token");
//     console.log("Token being sent:", token);

//     const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/addToCart`, {
//       method: "POST",
//       credentials: "include", // 🔥 Important!
//       headers: {
//         "Content-Type": "application/json",
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         listingId: listing._id, // <-- FIXED: Changed from productId to listingId
//         quantity: 1,
//         userId: user?._id,

//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       toast.success('Item added to cart');
//     } else {
//       const errorData = await response.json();
//       console.error("Failed to add item to cart:", errorData);
//       toast.error(`Error: ${errorData.message || 'Failed to add item to cart'}`);
//     }
//   };

//   const [selectedLanguage, setSelectedLanguage] = useState("en-US");

//   const startVoiceInput = (fieldName) => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Speech Recognition not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = selectedLanguage;
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.start();

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;

//       // Clean any "| ." or weird symbols
//       const cleanText = transcript.replace(/[|.]/g, "").trim();

//       setFormData((prev) => ({
//         ...prev,
//         [fieldName]: cleanText,
//       }));
//     };

//     recognition.onerror = (event) => {
//       toast.error("Voice input error: " + event.error);
//     };
//   };



//   return (
//     <div className="bg-[#f5f7f6] min-h-screen text-[#1f2d1f]">
//       <div className="flex">

//         {role === "farmer" && (
//           <Sidebar />
//         )}
//         {role === "industry" && (
//           <Sidebar_industry />
//         )}

//         {/* Main */}
//         <main className="flex-1 px-8 py-6">
//           <div className="flex justify-between items-center mb-4">
//             <input
//               value={searchTerm}
//               onChange={handleSearch}
//               className="w-[70%] p-2 rounded-md border"
//               placeholder="Search waste types or sellers..."
//             />
//             <Link to={"/cart"} className="  text-center font-bold rounded-sm text-red-900 flex items-center gap-2">
//               <ShoppingCart size={40} />
//               {cartItems.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
//                   {cartItems.length}
//                 </span>
//               )}
//             </Link>
//           </div>

//           <div className="flex justify-between items-start">
//             <div className="w-full">
//               <h2 className="text-xl font-bold">Marketplace – Buy & Sell Agricultural Waste</h2>
//               <p className="text-green-700">Directly connect with buyers and sellers. Discover pricing trends and verified suppliers.</p>

//               {/* Bar Chart */}
//               <div className="w-full h-72 mt-6 bg-white p-4 rounded-xl shadow">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={priceChartData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="price" fill="#7ecb82" radius={[6, 6, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             <div className="w-64 bg-white p-4 rounded-xl shadow ml-6">
//               <button
//                 className="bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 mb-4"
//                 onClick={() => setShowForm(!showForm)}
//               >
//                 <MdOutlineAddBox /> Add New Listing
//               </button>
//               <ul className="text-sm text-gray-700 space-y-2">
//                 <li>✅ Current Market Trend: Bagasse</li>
//                 <li>🚚 Active Pickups: 12</li>
//                 <li>🎯 Eligible for 3 Govt. Schemes</li>
//               </ul>
//             </div>
//           </div>

//           {/* {role === "farmer" &&showForm && (
//             <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded shadow my-6 space-y-2">
//               {["title", "description", "image", "price", "quantity", "seller", "location", "tag"].map((field) => (
//                 <input key={field} type="text" required
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   className="w-full border p-2 rounded"
//                   value={formData[field]}
//                   onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
//                 />
//               ))}
//               <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">Submit Listing</button>
//             </form>
//           )} */}
//           {role === "farmer" && showForm && (
//             <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded shadow my-6 space-y-2">
//               {/* Language Selector */}
//               <label className="block font-medium mb-1">Select Language for Voice Input:</label>
//               <select
//                 value={selectedLanguage}
//                 onChange={(e) => setSelectedLanguage(e.target.value)}
//                 className="border p-2 rounded mb-4"
//               >
//                 <option value="en-US">English</option>
//                 <option value="hi-IN">Hindi</option>
//                 <option value="bn-IN">Bengali</option>
//                 <option value="ta-IN">Tamil</option>
//                 <option value="te-IN">Telugu</option>
//               </select>

//               {["title", "description", "image", "price", "quantity", "seller", "location", "tag"].map((field) => (
//                 <div key={field} className="relative">
//                   <input
//                     type="text"
//                     required
//                     placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                     className="w-full border p-2 rounded pr-16"
//                     value={formData[field]}
//                     onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => startVoiceInput(field)}
//                     className="absolute right-2 top-2 bg-green-600 text-white px-2 py-1 rounded"
//                   >
//                     🎤
//                   </button>
//                 </div>
//               ))}

//               <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded mt-2">
//                 Submit Listing
//               </button>
//             </form>
//           )}

//           {/* Filters */}
//           <div className="flex gap-4 mt-6">
//             <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}
//               className="p-2 rounded-md border">
//               <option value="">Waste Type</option>
//               {uniqueTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
//             </select>

//             <select onChange={(e) => setFilters({ ...filters, location: e.target.value })}
//               className="p-2 rounded-md border">
//               <option value="">Location</option>
//               {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
//             </select>

//             <select onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
//               className="p-2 rounded-md border">
//               <option value="">Price Range</option>
//               <option value="0-500">₹0 - ₹500</option>
//               <option value="501-1000">₹501 - ₹1000</option>
//               <option value="1001-2000">₹1001 - ₹2000</option>
//             </select>

//             <Button variant="outline" className="text-green-700 border-green-700" onClick={applyFilters}>
//               <FaFilter className="mr-2" /> Apply Filters
//             </Button>
//           </div>

//           {/* Listing Cards */}
//           <div className="grid grid-cols-3 gap-6 mt-8">
//             {filteredListings.map((listing, i) => (
//               <Card key={i} className="rounded-xl shadow-lg">
//                 <img src={listing.image} alt={listing.title} className="rounded-t-xl h-40 w-full object-cover" />
//                 <CardContent className="p-4 space-y-2">
//                   <div className="flex justify-between items-center">
//                     <h3 className="font-bold text-lg">{listing.title}</h3>
//                     {listing.tag && <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">{listing.tag}</span>}
//                   </div>
//                   <p className="text-green-800 font-semibold">₹{listing.price}/ton</p>
//                   <p className="text-sm text-gray-600">Available: {listing.quantity}</p>
//                   <p className="text-sm text-gray-600">👤 {listing.seller}</p>
//                   <p className="text-sm text-gray-600"><FaLocationDot className="inline mr-1" /> {listing.location}</p>
//                   <div className="flex gap-2 mt-2">
//                     <Button
//                       className="bg-green-700 text-white"
//                       onClick={() => handleAddToCart(listing)}
//                     >
//                       Add to Cart
//                     </Button>
//                     {/* <Button variant="outline" className="text-green-700 border-green-700">
//                       <FiMessageCircle className="mr-1" /> Chat
//                     </Button> */}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Pagination Placeholder */}
//           <div className="flex justify-center items-center mt-8 gap-2">
//             <button className="px-4 py-2 rounded bg-green-700 text-white">1</button>
//             <button className="px-4 py-2 rounded bg-gray-200">2</button>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


// Updated Marketplace.jsx

import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Button } from '../components/ui/CustomUI';
import { FaLocationDot, FaFilter } from "react-icons/fa6";
import { toast } from "react-toastify";
import { MdOutlineAddBox } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Sidebar_industry from "../components/Sidebar_industry";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import axios from 'axios';

export default function Marketplace() {
  const dispatch = useDispatch();
  const { cartItems, addToCart } = useCart();
  const [canAddToCart, setCanAddToCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showBidPopup, setShowBidPopup] = useState(false);
const [currentBidListing, setCurrentBidListing] = useState(null);
const [bidValue, setBidValue] = useState("");
const [bidHistory, setBidHistory] = useState([]);
const [wonAuctions, setWonAuctions] = useState([]);


//ftching in farmrs
const [bidsData, setBidsData] = useState({});
const [showBidsFor, setShowBidsFor] = useState(null);
const [timeTick, setTimeTick] = useState(Date.now());

  const [formData, setFormData] = useState({
    title: "", description: "", image: "", price: "", quantity: "",
    seller: "", location: "", tag: "",baseBidValue: ""
  });
  const [filters, setFilters] = useState({
    type: "", location: "", priceRange: "",
  });

  useEffect(() => {
    fetchListings();
  }, []);

  //add new
  const formatRemainingTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
  
      const updatedListings = listings.map((listing) => {
        const endTime = new Date(listing.biddingEndTime);
        const remaining = endTime - now;
  
        const isEnded = remaining <= 0;
  
        return {
          ...listing,
          remainingTime: isEnded ? "Auction ended" : formatRemainingTime(remaining),
          isAuctionEnded: isEnded,
        };
      });
  
      setListings(updatedListings);
    }, 1000); // ✅ Tick every second
  
    return () => clearInterval(interval);
  }, [listings]);
  
  
  
//  

  const user = useSelector((state) => state.user.user); // ✅ gets the actual user object
  // ⬅️ Get user details from Redux
  const isLoggedIn = user?.email ? true : false;
  const role = user?.role;

  const fetchListings = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listings`);
      const data = await res.json();
      console.log(data);
      setListings(data);
      setFilteredListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listings`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     if (res.ok) {
  //       setFormData({
  //         title: "", description: "", image: "", price: "", quantity: "",
  //         seller: "", location: "", tag: "",baseBidValue:"",
  //       });
  //       setShowForm(false);
  //       fetchListings();
  //     }
  //   } catch (error) {
  //     console.error("Error submitting listing:", error);
  //   }
  // };


  const handleFormSubmit = async (e) => {
  e.preventDefault();

  const cleanedFormData = {
    ...formData,
    price: parseFloat(formData.price),
    quantity: parseInt(formData.quantity),
    baseBidValue: parseFloat(formData.baseBidValue),
    seller: user?._id,  // Inject logged-in user ID
  };

  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanedFormData),
    });

    if (res.ok) {
      toast.success("Listing created successfully");
      setFormData({
        title: "", description: "", image: "", price: "", quantity: "",
        seller: "", location: "", tag: "", baseBidValue: "",
      });
      setShowForm(false);
      fetchListings();
    } else {
      const err = await res.json();
      toast.error(err.error || "Failed to create listing.");
    }
  } catch (error) {
    console.error("Error submitting listing:", error);
    toast.error("Something went wrong!");
  }
};


  const applyFilters = () => {
    let filtered = listings;
    if (filters.type) filtered = filtered.filter(item => item.tag === filters.type);
    if (filters.location) filtered = filtered.filter(item => item.location === filters.location);
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter(item => item.price >= min && item.price <= max);
    }
    setFilteredListings(filtered);
  };


  const priceChartData = filteredListings.map((listing, i) => ({
    name: listing.title,
    price: parseFloat(listing.price),
  }));
// add here 

const getRemainingTime = (endTime) => {
  if (!endTime) return "No end time provided";

  const now = new Date();
  const end = new Date(endTime);

  if (isNaN(end.getTime())) return "Invalid end time";

  const diff = end - now;

  if (diff <= 0) return "Auction Ended";

  const mins = Math.floor(diff / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return `${mins}m ${secs}s left`;
};

//
  const uniqueTags = [...new Set(listings.map(listing => listing.tag).filter(Boolean))];
  const uniqueLocations = [...new Set(listings.map(listing => listing.location).filter(Boolean))];


  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = listings.filter((listing) =>
    (listing.title?.toLowerCase().includes(term) ||
      listing.seller?.toLowerCase().includes(term) ||
      listing.tag?.toLowerCase().includes(term))
    );

    setFilteredListings(filtered);
  };
  const handleAddToCart = async (listing) => {
    const token = localStorage.getItem("token");
    console.log("Token being sent:", token);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/addToCart`, {
      method: "POST",
      credentials: "include", // 🔥 Important!
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        listingId: listing._id, // <-- FIXED: Changed from productId to listingId
        quantity: 1,
        userId: user?._id,

      }),
    });

    if (response.ok) {
      const data = await response.json();
      toast.success('Item added to cart');
    } else {
      const errorData = await response.json();
      console.error("Failed to add item to cart:", errorData);
      toast.error(`Error: ${errorData.message || 'Failed to add item to cart'}`);
    }
  };

  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  const startVoiceInput = (fieldName) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLanguage;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      // Clean any "| ." or weird symbols
      const cleanText = transcript.replace(/[|.]/g, "").trim();

      setFormData((prev) => ({
        ...prev,
        [fieldName]: cleanText,
      }));
    };

    recognition.onerror = (event) => {
      toast.error("Voice input error: " + event.error);
    };
  };
 

 const handleBidClick = async (listing) => {
  setCurrentBidListing(listing);
  localStorage.setItem("currentBidListingId", listing._id);  // Save to localStorage
  setShowBidPopup(true);
  setBidHistory([]);  // Clear previous bid history
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getBids/${listing._id}`);
    const data = await res.json();

    // Updated this line to reflect backend structure
    setBidHistory(data.map(bid => ({
      ...bid,
      userName: bid.bidder?.name || 'Unknown User', // <== FIX HERE
    })));
  } catch (error) {
    console.error("Failed to fetch bids", error);
  }
};

  const handleSubmitBid = async () => {
    const base = parseFloat(currentBidListing.baseBidValue);
    const highest = Math.max(base, ...bidHistory.map(b => b.bid));
  
    if (parseFloat(bidValue) <= highest) {
      toast.error("Bid must be higher than base and current highest bid.");
      return;
    }
  
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/placeBid`, {
        method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listingId: currentBidListing._id,
        bidder:  user?._id,  // Must match your backend's `bidder` field type
        bid: parseFloat(bidValue),
      }),
   

      });
  
      if (res.ok) {
        const updated = await res.json();
        setBidHistory(updated);
        toast.success("Bid placed successfully!");
        setBidValue("");
      } else {
        const error = await res.json();
        console.error("Bid error:", error);
        toast.error(error.message || "Failed to place bid, Enter value greater than base value and highest bid.");
      }
    } catch (error) {
      console.error("Bid submission error", error);
    }
  };
    
  //fetch for nfarmers 

  const fetchBidsForListing = async (listingId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getBids/${listingId}`);
      setBidsData((prev) => ({
        ...prev,
        [listingId]: response.data,
      }));
      setShowBidsFor(listingId);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };
   //commented today
  useEffect(() => {
    const checkWinner = async () => {
      if (!user?._id) return;
  
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listings/checkAuctionWinner/${user._id}`);
        const data = await res.json();
  
        if (data.won) {
          toast.success("🎉 You won the auction!");
          
        }
      } catch (error) {
        console.error("Error checking auction winner:", error);
      }
    };
  
    const interval = setInterval(checkWinner, 5000); // every 10 seconds
    return () => clearInterval(interval);
  }, [user]);
  
  //
  // useEffect(() => {
  //   const checkIfUserIsWinner = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:8080/api/listings/checkAuctionWinner/${user._id}`);
  //       if (res.data.won) {
  //         // Allow the user to add the product to the cart
  //         setCanAddToCart(true);
  //       } else {
  //         setCanAddToCart(false);
  //       }
  //     } catch (error) {
  //       console.error("Error checking auction winner:", error);
  //       setCanAddToCart(false);
  //     }
  //   };

  //   if 
  //    (user) {
  //     checkIfUserIsWinner();
  //   }
  // }, [user]); // Dependency on user._id
  //
  return (
    <div className="bg-[#f5f7f6] min-h-screen text-[#1f2d1f]">
      <div className="flex">

        {role === "farmer" && (
          <Sidebar />
        )}
        {role === "industry" && (
          <Sidebar_industry />
        )}

        {/* Main */}
        <main className="flex-1 px-8 py-6">
          <div className="flex justify-between items-center mb-4">
            <input
              value={searchTerm}
              onChange={handleSearch}
              className="w-[70%] p-2 rounded-md border"
              placeholder="Search waste types or sellers..."
            />
            <Link to={"/cart"} className="  text-center font-bold rounded-sm text-red-900 flex items-center gap-2">
              <ShoppingCart size={40} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          <div className="flex justify-between items-start">
            <div className="w-full">
              <h2 className="text-xl font-bold">Marketplace – Buy & Sell Agricultural Waste</h2>
              <p className="text-green-700">Directly connect with buyers and sellers. Discover pricing trends and verified suppliers.</p>

              {/* Bar Chart */}
              <div className="w-full h-72 mt-6 bg-white p-4 rounded-xl shadow">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priceChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="price" fill="#7ecb82" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {role === "farmer" && (
            <div className="w-64 bg-white p-4 rounded-xl shadow ml-6">
              <button
                className="bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 mb-4"
                onClick={() => setShowForm(!showForm)}
              >
                <MdOutlineAddBox /> Add New Listing
              </button>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✅ Current Market Trend: Bagasse</li>
                <li>🚚 Active Pickups: 12</li>
                <li>🎯 Eligible for 3 Govt. Schemes</li>
              </ul>
            </div>
        )}

          </div>
       
          {role === "farmer" && showForm && (
            <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded shadow my-6 space-y-2">
              {/* Language Selector */}
              <label className="block font-medium mb-1">Select Language for Voice Input:</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border p-2 rounded mb-4"
              >
                <option value="en-US">English</option>
                <option value="hi-IN">Hindi</option>
                <option value="bn-IN">Bengali</option>
                <option value="ta-IN">Tamil</option>
                <option value="te-IN">Telugu</option>
              </select>

              {["title", "description", "image", "price", "quantity", "seller", "location", "tag", "baseBidValue"].map((field) => (
                <div key={field} className="relative">
                  <input
                    type="text"
                    required
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full border p-2 rounded pr-16"
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => startVoiceInput(field)}
                    className="absolute right-2 top-2 bg-green-600 text-white px-2 py-1 rounded"
                  >
                    🎤
                  </button>
                </div>
              ))}

              <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded mt-2">
                Submit Listing
              </button>
            </form>
          )}

{showBidPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl">
      <h2 className="text-xl font-bold mb-2">Bidding on: {currentBidListing?.title}</h2>
      
      <input
        type="number"
        placeholder="Enter your bid"
        className="border p-2 w-full mb-4"
        value={bidValue}
        onChange={(e) => setBidValue(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
        onClick={handleSubmitBid}
      >
        Submit Bid
      </button>

      <h3 className="mt-4 font-semibold">Top Bids</h3>
      <ul className="space-y-1 max-h-40 overflow-y-auto">
        {bidHistory
          .sort((a, b) => b.bid - a.bid)
          .map((b, i) => (
            <li key={i} className="flex justify-between border-b py-1">
              <span>{i + 1}.  {b.bidder?.name}</span>
              <span>₹{b.bid}</span><br /><small>{new Date(b.timestamp).toLocaleString()}</small>
            </li>
          ))}
      </ul>

      <button
        onClick={() => setShowBidPopup(false)}
        className="mt-4 text-red-600 underline"
      >
        Close
      </button>
    </div>
  </div>
)}



          {/* Filters */}
          <div className="flex gap-4 mt-6">
            <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="p-2 rounded-md border">
              <option value="">Waste Type</option>
              {uniqueTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>

            <select onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="p-2 rounded-md border">
              <option value="">Location</option>
              {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>

            <select onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              className="p-2 rounded-md border">
              <option value="">Price Range</option>
              <option value="0-500">₹0 - ₹500</option>
              <option value="501-1000">₹501 - ₹1000</option>
              <option value="1001-2000">₹1001 - ₹2000</option>
            </select>

            <Button variant="outline" className="text-green-700 border-green-700" onClick={applyFilters}>
              <FaFilter className="mr-2" /> Apply Filters
            </Button>
          </div>

          {/* Listing Cards */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            {filteredListings.map((listing, i) => (
              <Card key={i} className="rounded-xl shadow-lg">
                <img src={listing.image} alt={listing.title} className="rounded-t-xl h-40 w-full object-cover" />
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{listing.title}</h3>
                    {listing.tag && <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">{listing.tag}</span>}
                  </div>
                  <p className="text-green-800 font-semibold">₹{listing.price}/ton</p>
                  <p className="text-sm text-gray-600">Available: {listing.quantity}</p>
                  <p className="text-sm text-gray-600">👤 {listing.seller}</p>
                  <p className="text-sm text-gray-600">₹{listing.baseBidValue}</p>
                  <p className="text-sm text-gray-600"><FaLocationDot className="inline mr-1" /> {listing.location}</p>
                  <p>{getRemainingTime(listing.biddingEndTime)}</p>

{listing.isAuctionClosed && listing.winner && (
  <p className="text-green-600 font-semibold">
    🏆 Winner: {listing.winner.name || 'User'} (Auction Ended)
  </p>
)}



                  {/* {isLoggedIn && role === "industry" && (
  <div className="flex gap-2 mt-2">
    <Button className="bg-red-700 text-white" onClick={() => handleAddToCart(listing)}>Add to Cart</Button>
    <Button  onClick={() => handleBidClick(listing)} className="bg-blue-600 hover:bg-blue-200 hover:text-black text-white border rounded">Bid</Button>
  </div>
)} */}


{isLoggedIn && (
  <>
    {role === "industry" && (
      <div className="flex gap-2 mt-2">
        <Button className="bg-red-700 text-white" onClick={() => handleAddToCart(listing)}>Add to Cart</Button>
       
        {/* {canAddToCart ? (
                      <Button className="bg-red-700 text-white" onClick={() => handleAddToCart(listing)}>Add to Cart</Button>
                    ) : (
                      <p>You are not the auction winner and cannot add this item to your cart.</p>
                    )} */}
        <Button onClick={() => handleBidClick(listing)} className="bg-blue-600 hover:bg-blue-200 hover:text-black text-white border rounded">Bid</Button>
        
</div>
    )}

{role === "farmer" &&  (
      <>
        <button
          onClick={() => fetchBidsForListing(listing._id)}
          className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
        >
          View Bids
        </button>
        


        {showBidsFor === listing._id && bidsData[listing._id] && (
          <div className="mt-2 border p-2 bg-gray-100 rounded">
            <h4 className="font-bold mb-2">Bidding Status:</h4>
            {bidsData[listing._id].length > 0 ? (
              <ul>
                {bidsData[listing._id].map((bid, index) => (
                  <li key={index} className="text-sm mb-1">
                    ₹{bid.bid} by {bid.bidder.name} ({bid.bidder.email})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bids yet.</p>
            )}
          </div>
        )}
      </>
    )}
  </>
)}

                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="flex justify-center items-center mt-8 gap-2">
            <button className="px-4 py-2 rounded bg-green-700 text-white">1</button>
            <button className="px-4 py-2 rounded bg-gray-200">2</button>
          </div>
        </main>
      </div>
    </div>
  );
}






