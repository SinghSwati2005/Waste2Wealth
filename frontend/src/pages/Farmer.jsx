import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button } from '../components/ui/CustomUI';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDays } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import YouTubeSlider from '../components/Youtube';

export default function Farmer() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [listings, setListings] = useState([]);
  const [userName, setUserName] = useState('');
  const user = useSelector((state) => state?.user?.user);
  const [sentApplications, setSentApplications] = useState([]);


  
  // Fetch listings and user info
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const  response  = await axios.get('http://localhost:8080/api/product/all');
        if (response.data) setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
  const fetchSentApplications = async () => {
    try {
      if (user?._id) {
        const response = await axios.get(`http://localhost:8080/api/application/farmer/${user._id}`);
        if (response.data) setSentApplications(response.data);
      }
    } catch (error) {
      console.error('Error fetching sent applications:', error);
    }
  };

  fetchListings();
  fetchSentApplications(); // Fetch sent applications
  if (user) {
    setUserName(user.name);
  }
}, [user]);

  return (
    <div className="flex min-h-screen bg-[#f9f9f6] dark:bg-[#121a13] text-[#1a1a1a] dark:text-white">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <header className="flex justify-between items-center flex-wrap sm:flex-nowrap">
          <div>
            <h1 className="text-xl font-semibold">Welcome,{userName||"loading.."}</h1>
            <p className="text-sm text-green-500">Organic Supplier</p>
          </div>

          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 mt-4 sm:mt-0 rounded-md border dark:border-gray-700 bg-white dark:bg-[#1c2d22]"
          />
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard title="Sales Summary" items={['Wheat Straw (45%)', 'Rice Husk (30%)', 'Bagasse (25%)']} />
          <PriceSuggestionCard price="₹2,500/ton" />
          <DateSelectionCard selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <DetailsCard />
        </div>

        {/* Current Listings */}
        <Card>
          <CardContent className="p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Current Listings</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th>Waste Type</th>
                  <th>Quantity</th>
                  <th>Price/ton</th>
                  <th>Interested Buyers</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing.id} className="border-t">
                    <td>{listing.agriWaste}</td>
                    <td>{listing.quantity} tons</td>
                    <td>₹{listing.price}</td>
                    <td>{listing.industryName}</td>
                    <td className={listing.status === 'Online' ? 'text-green-600' : 'text-red-500'}>
                      {listing.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Sent Applications</h2>
            {sentApplications.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th>Industry Name</th>
                    <th>Waste Type</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Date Sent</th>
                  </tr>
                </thead>
                <tbody>
                  {sentApplications.map((app) => (
                    <tr key={app._id} className="border-t">
                      <td>{app.industryName}</td>
                      <td>{app.cropType}</td>
                      <td>{app.quantity} tons</td>
                      <td className={app.status === 'Sent' ? 'text-blue-600' : 'text-green-600'}>
                        {app.status}
                      </td>
                      <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-muted-foreground">No sent applications yet.</p>
            )}
          </CardContent>
        </Card>
        {/* Bottom Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <RecentTransactionsCard />
          <MarketInsightsCard />
          <ActiveBuyerRequestsCard />
        </div>

        {/* Map Section */}
        <Card>
          <CardContent className="p-4">
           <Link to={"/logistics"} className='p-4 bg-blue-600 text-white hover:bg-yellow-200 hover:text-red-700 font-bold text-xl border rounded-lg'>Need Transport --Click Here</Link>
          </CardContent>
        </Card>

        {/* YouTube Slider */}
        <Card>
          <CardContent className="p-4">
            <YouTubeSlider />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

// -- Small Components Below -- //

const SummaryCard = ({ title, items }) => (
  <Card>
    <CardContent className="p-4">
      <h2 className="font-medium mb-2">{title}</h2>
      <ul className="space-y-1 text-sm">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const PriceSuggestionCard = ({ price }) => (
  <Card>
    <CardContent className="p-4">
      <h2 className="font-medium mb-2">AI Price Suggestion</h2>
      <p className="text-2xl font-bold text-green-600">{price}</p>
      <p className="text-xs text-muted-foreground">Based on current market trends</p>
    </CardContent>
  </Card>
);

const DateSelectionCard = ({ selectedDate, setSelectedDate }) => (
  <Card>
    <CardContent className="p-4 space-y-2">
      <div className="flex items-center space-x-2">
        <CalendarDays size={20} />
        <h2 className="font-medium">Select Date</h2>
      </div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="mt-2 w-full px-3 py-2 border rounded-md text-sm"
        dateFormat="dd MMMM yyyy"
      />
    </CardContent>
  </Card>
);

const DetailsCard = () => (
  <Card>
    <CardContent className="p-4">
      <h2 className="font-medium mb-1">Details</h2>
      <p className="text-xs text-muted-foreground">
        Description panel for waste items and status.
      </p>
    </CardContent>
  </Card>
);

const RecentTransactionsCard = () => (
  <Card>
    <CardContent className="p-4">
      <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
      <ul className="text-sm space-y-2">
        <li>Wheat Straw - ₹120,000 (100 tons) <span className="text-green-500">Paid</span></li>
        <li>Rice Husk - ₹47,500 (50 tons) <span className="text-red-400">Pending</span></li>
      </ul>
    </CardContent>
  </Card>
);

const MarketInsightsCard = () => (
  <Card>
    <CardContent className="p-4">
      <h2 className="text-lg font-semibold mb-2">Market Insights</h2>
      <p>📈 Weekly Growth: 12%</p>
      <p>🔥 Most Demanded: Wheat Straw</p>
    </CardContent>
  </Card>
);

const ActiveBuyerRequestsCard = () => (
  <Card>
    <CardContent className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Active Buyer Requests</h2>
      <div className="text-sm space-y-4">
        {[
          {
            company: 'Green Energy Co.',
            quantity: 200,
            price: 1150,
            phone: '919038593493',
          },
          {
            company: 'Bio Solutions Ltd.',
            quantity: 150,
            price: 900,
            phone: '917439132206',
          },
          {
            company: 'Eco Fuels Inc.',
            quantity: 100,
            price: 850,
            phone: '919749611551',
          },
        ].map((buyer, index) => (
          <div key={index}>
            <p>{buyer.company} wants {buyer.quantity} tons @ ₹{buyer.price}/ton</p>
            <a
              href={`https://wa.me/${buyer.phone}?text=Hello%2C%20I'm%20interested%20in%20your%20request%20for%20${buyer.quantity}%20tons%20at%20₹${buyer.price}%2Fton`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="mt-2 w-full bg-green-500 hover:bg-green-600">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
