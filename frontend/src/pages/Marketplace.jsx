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

export default function Marketplace() {
  const dispatch = useDispatch();
  const { cartItems, addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "", description: "", image: "", price: "", quantity: "",
    seller: "", location: "", tag: "",
  });
  const [filters, setFilters] = useState({
    type: "", location: "", priceRange: "",
  });

  useEffect(() => {
    fetchListings();
  }, []);


  const user = useSelector((state) => state.user.user); // ✅ gets the actual user object
  // ⬅️ Get user details from Redux
  const isLoggedIn = user?.email ? true : false;
  const role = user?.role;

  const fetchListings = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/listings");
      const data = await res.json();
      setListings(data);
      setFilteredListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({
          title: "", description: "", image: "", price: "", quantity: "",
          seller: "", location: "", tag: "",
        });
        setShowForm(false);
        fetchListings();
      }
    } catch (error) {
      console.error("Error submitting listing:", error);
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

    const response = await fetch("http://localhost:8080/api/addToCart", {
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
          </div>

          {/* {role === "farmer" &&showForm && (
            <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded shadow my-6 space-y-2">
              {["title", "description", "image", "price", "quantity", "seller", "location", "tag"].map((field) => (
                <input key={field} type="text" required
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full border p-2 rounded"
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
              ))}
              <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">Submit Listing</button>
            </form>
          )} */}
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

              {["title", "description", "image", "price", "quantity", "seller", "location", "tag"].map((field) => (
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
                  <p className="text-sm text-gray-600"><FaLocationDot className="inline mr-1" /> {listing.location}</p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      className="bg-green-700 text-white"
                      onClick={() => handleAddToCart(listing)}
                    >
                      Add to Cart
                    </Button>
                    {/* <Button variant="outline" className="text-green-700 border-green-700">
                      <FiMessageCircle className="mr-1" /> Chat
                    </Button> */}
                  </div>
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
