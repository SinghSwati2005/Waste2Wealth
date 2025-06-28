// FarmerOrderTracking.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Card, CardContent, Button } from '../components/ui/CustomUI';

const FarmerOrderTracking = () => {
  const user = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders/farmer/${user._id}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching farmer orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchOrders();
  }, [user]);

  return (
    <div className="p-6 bg-[#f9f9f6] dark:bg-[#121a13] min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Your Order Tracking</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center">You have not received any orders yet.</p>
          ) : (
            orders.map((order) => (
              <Card key={order._id}>
                <CardContent className="space-y-2">
                  <p><strong>Industry:</strong> {order.industryName || 'N/A'}</p>
                  <p><strong>Agri Waste:</strong> {order.agriWaste}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Price:</strong> ₹{order.price}</p>
                  <p><strong>Status:</strong> <span className={
                    order.status === 'approved' ? 'text-green-600' : order.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}>
                    {order.status}
                  </span></p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FarmerOrderTracking;
