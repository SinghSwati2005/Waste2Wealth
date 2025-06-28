// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";
// import { Link } from "react-router-dom";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); // Replace with your publishable key

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const token = localStorage.getItem("authToken");

//         const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/addToCart`, {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log("Cart data response:", res.data); 
//         setCartItems(res.data);
//       } catch (err) {
//         setError("Failed to fetch cart items. Please log in again.");
//       }
//     };

//     fetchCartItems();
//   }, []);

//   const handleCheckout = async () => {
//     const stripe = await stripePromise;

//     const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/payment/create-checkout-session`, {
//       cartItems,
//     });

//     const result = await stripe.redirectToCheckout({
//       sessionId: res.data.id,
//     });

//     if (result.error) {
//       console.error(result.error.message);
//     }
//   };

//   const calculateTotalPrice = () => {
//     return cartItems.reduce((acc, item) => acc + parseFloat(item.listingId.price) * item.quantity, 0).toFixed(2);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-center">🛒 Your Shopping Cart</h2>

//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//       {cartItems.length === 0 ? (
//         <p className="text-center text-lg">Your cart is empty.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {cartItems.map((item, index) => (
            
//             <div key={index} className="bg-white p-4 rounded shadow-md flex flex-col sm:flex-row gap-4">
//               <img
//                 src={item.listingId.image}
//                 alt={item.listingId.title}
//                 className="w-32 h-32 object-cover rounded"
//               />
//               <div className="flex-grow">
//                 <h3 className="text-xl font-semibold">{item.listingId.title}</h3>
//                 <p className="text-gray-600">Price: ₹{item.listingId.price}</p>
//                 <p className="text-gray-600">Quantity: {item.quantity}</p>
//                 <p className="text-gray-800 font-bold mt-2">
//                   Subtotal: ₹{(parseFloat(item.listingId.price) * item.quantity).toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {cartItems.length > 0 && (
//         <div className="mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
//           <h3 className="text-2xl font-bold">Total: ₹{calculateTotalPrice()}</h3>
//           <button
//             className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
//             onClick={handleCheckout}
//           >
//             Pay with Stripe 💳
//           </button>
//           <Link to={"/marketplace"} className="ml-7 mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300">Go back to Marketplace</Link>
       
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/addToCart`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter out null listingId items
        const validItems = res.data.filter(item => item.listingId !== null);
        setCartItems(validItems);

      } catch (err) {
        setError("Failed to fetch cart items. Please log in again.");
      }
    };

    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/payment/create-checkout-session`, {
      cartItems,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: res.data.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems
      .filter(item => item.listingId)
      .reduce((acc, item) => acc + parseFloat(item.listingId.price) * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">🛒 Your Shopping Cart</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {cartItems.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cartItems.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md flex flex-col sm:flex-row gap-4">
              <img
                src={item.listingId.image}
                alt={item.listingId.title}
                className="w-32 h-32 object-cover rounded"
              />
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">{item.listingId.title}</h3>
                <p className="text-gray-600">Price: ₹{item.listingId.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-800 font-bold mt-2">
                  Subtotal: ₹{(parseFloat(item.listingId.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
          <h3 className="text-2xl font-bold">Total: ₹{calculateTotalPrice()}</h3>
          <button
            className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
            onClick={handleCheckout}
          >
            Pay with Stripe 💳
          </button>
          <Link to={"/marketplace"} className="ml-7 mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300">
            Go back to Marketplace
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
