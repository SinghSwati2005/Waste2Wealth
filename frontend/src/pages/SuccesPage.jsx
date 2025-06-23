import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [transaction, setTransaction] = useState(null);

  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    if (sessionId) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/payment/transaction/${sessionId}`)
        .then(res => {
          setTransaction(res.data);
  
          if (!toastShown) {
            toast.success('📧 Email sent successfully!');
            setToastShown(true);
          }
        })
        .catch(err => console.error(err));
    }
  }, [sessionId, toastShown]);
  



  useEffect(() => {
    if (sessionId) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/payment/transaction/${sessionId}`)
        .then(res => setTransaction(res.data))
        .catch(err => console.error(err));
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 p-6 font-sans">
     <Toaster position="top-center" />
 

     

      <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-16">
        <motion.div
          className="text-center md:text-left max-w-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Payment Success</h1>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Link to={"/cart"} className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Go back to Cart</Link>
        </motion.div>

        <motion.img
          src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-payment-methods-design-concept-vector-illustration-png-image_4157696.jpg" // Replace with your hosted image path
          alt="Payment Illustration"
          className="w-80 h-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>

      {transaction && (
        <motion.div
          className="mt-12 mx-auto max-w-2xl bg-white shadow-lg rounded-xl p-6 border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Transaction Details</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Transaction ID:</strong> {transaction.id}</p>
            <p><strong>Amount:</strong> ${(transaction.amount_total / 100).toFixed(2)} {transaction.currency.toUpperCase()}</p>
            <p><strong>Email:</strong> {transaction.customer_email}</p>
            <p><strong>Status:</strong> {transaction.payment_status}</p>
            <p><strong>Date:</strong> {new Date(transaction.created * 1000).toLocaleString()}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
