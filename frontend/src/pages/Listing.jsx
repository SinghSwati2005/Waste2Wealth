import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';

const Listing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the local backend
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/all`) // Ensure this is your correct endpoint
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        toast.error("Failed to load products");
        console.error(err);
      });
  }, []);

  if (products.length === 0) {
    return <div className="p-6 text-center">No products submitted yet.</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#f9f9f6] dark:bg-[#121a13] text-[#1a1a1a] dark:text-white">
    {/* Sidebar Component */}
    <Sidebar />  {/* Import and render the Sidebar here */}

    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">All Submitted Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={index} className="border rounded shadow-md p-4">
            <p><strong>Industry Name:</strong> {product.industryName}</p>
            <p><strong>Crop Type:</strong> {product.cropType}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <img src={product.image} alt="Uploaded" className="mt-3 h-48 w-full object-cover rounded" />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Listing;
