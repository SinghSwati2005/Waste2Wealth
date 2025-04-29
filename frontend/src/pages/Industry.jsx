// pages/Industry.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button } from '../components/ui/CustomUI';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDays } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar_industry from '../components/Sidebar_industry';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);

export default function Industry({ industryId }) {
  const [farmersData, setFarmersData] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [listings, setListings] = useState([]);
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);


  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product-industry/allindustry`);
        if (response.data) setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  // useEffect(() => {
  //   const fetchApplications = async () => {
  //     try {
  //       const industryId = useParams.industryId;
  //       console.log(industryId)
  //       const response = await axios.get(`http://localhost:8080/api/product-industry/${industryId}`);
  //       setApplications(response.data);
  //     } catch (err) {
  //       console.error("Error fetching applications:", err);
  //     }
  //   };

  //   fetchApplications();
  // }, [industryId]);

  useEffect(() => {
    socket.on('updateFarmerList', (newOrder) => {
      setFarmersData((prev) => [...prev, newOrder]);
    });

    return () => {
      socket.off('updateFarmerList');
    };
  }, []);

  const handleOrderSubmit = async (orderData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/industry-orders/${user?._id}`, orderData);
      if (response.status === 201) {
        socket.emit('newOrderSubmission', response.data);
        toast.success("Order submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting order", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f9f9f6] dark:bg-[#121a13] text-[#1a1a1a] dark:text-white">
      <Sidebar_industry />
      <main className="flex-1 p-6 space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
            <p className="text-sm font-bold text-green-900">Industry Dashboard</p>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-md border dark:border-gray-700 bg-white dark:bg-[#1c2d22]"
          />
        </header>

        <div className="grid grid-cols-4 gap-4">
          <Card><CardContent className="p-4"><h2 className="font-medium mb-2">Sales Summary</h2><ul className="space-y-1 text-sm"><li>Wheat Straw (45%)</li><li>Rice Husk (30%)</li><li>Bagasse (25%)</li></ul></CardContent></Card>

          <Card><CardContent className="p-4"><h2 className="font-medium mb-2">AI Price Suggestion</h2><p className="text-2xl font-bold text-green-600">₹2,500/ton</p><p className="text-xs text-muted-foreground">Based on current market trends</p></CardContent></Card>

          <Card><CardContent className="p-4 space-y-2"><div className="flex items-center space-x-2"><CalendarDays size={20} /><h2 className="font-medium">Select Date</h2></div><DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} className="mt-2 w-full px-3 py-2 border rounded-md text-sm" dateFormat="dd MMMM yyyy" /></CardContent></Card>

          <Card><CardContent className="p-4"><h2 className="font-medium mb-1">Details</h2><p className="text-xs text-muted-foreground">Description panel for waste items and status.</p></CardContent></Card>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Industry Orders</h2>
          <div className="space-y-2">
            {farmersData.map((farmer, index) => (
              <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                <p>{farmer.name} - {farmer.crop}</p>
                <Button onClick={() => setSelectedFarmer(farmer)}>Order</Button>
              </div>
            ))}
          </div>

          {selectedFarmer && (
            <div className="mt-4 p-4 border rounded-md bg-white dark:bg-[#1c2d22]">
              <h3 className="font-semibold mb-2">Place Order with {selectedFarmer.name}</h3>
              <Button onClick={() => handleOrderSubmit({ farmerId: selectedFarmer.id })}>Submit Order</Button>
            </div>
          )}
        </div>

        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-4">Current Listings</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th>Waste Type</th>
                  <th>Quantity</th>
                  <th>Price/ton</th>
                  <th>Farmer</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing.id}>
                    <td>{listing.agriWaste}</td>
                    <td>{listing.quantity} tons</td>
                    <td>₹{listing.price}</td>
                    <td>{listing.farmerName}</td>
                    <td className={listing.status === 'Online' ? 'text-green-600' : 'text-red-500'}>{listing.status}</td>
                  </tr>
                ))}
              </tbody>
              {/* <tbody>
          {applications.length > 0 ? (
            applications.map((app) => (
              <tr key={app._id}>
                <td>{app.farmerName}</td>
                <td>{app.agriWaste.join(', ')}</td>
                <td>{app.quantity}</td>
                <td>{app.price}</td>
                <td>{app.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No applications found</td>
            </tr>
          )}
        </tbody> */}
            </table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2">Recent Transactions</h2>
              <ul className="text-sm space-y-2">
                <li>Wheat Straw - ₹120,000 (100 tons) <span className="text-green-500">Paid</span></li>
                <li>Rice Husk - ₹47,500 (50 tons) <span className="text-red-400">Pending</span></li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2">Market Insights</h2>
              <p>📈 Weekly Growth: 12%</p>
              <p>🔥 Most Demanded: Wheat Straw</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-2">
              <h2 className="font-semibold">Active Buyer Requests</h2>
              <div className="text-sm">
                Green Energy Co. wants 200 tons @ ₹1,150/ton
                <Button className="mt-2 w-full">Respond</Button>
              </div>
              <div className="text-sm">
                Bio Solutions Ltd. wants 150 tons @ ₹900/ton
                <Button className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600">Continue Chat</Button>
              </div>
              <div className="text-sm">
                Eco Fuels Inc. wants 100 tons @ ₹850/ton
                <Button className="mt-2 w-full">Respond</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">Logistics Map</h2>
            <img src="/map-placeholder.jpg" alt="Logistics Map" className="rounded-lg border border-gray-300" />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
