import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      // Display success toast
      toast.success("Your message has been sent successfully!");
    } else {
      // Display error toast
      toast.error("Please fill all fields.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-50 via-green-100 to-green-200 py-16 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">We’re here to help. Send us a message and we’ll get back to you as soon as possible.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-800">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 p-4 w-full border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 p-4 w-full border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                  placeholder="Your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-800">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-2 p-4 w-full border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                  rows="6"
                  placeholder="Write your message here"
                />
              </div>

              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-green-700 mb-6">Our Contact Information</h3>
            <ul className="space-y-4 text-gray-700">
              <li><strong>Address:</strong> 123 Green Street, Eco City, Earth.</li>
              <li><strong>Phone:</strong> +1 234 567 890</li>
              <li><strong>Email:</strong> contact@waste2wealth.com</li>
              <li><strong>Follow Us:</strong>
                <div className="flex gap-4">
                  <a href="#" className="text-green-600 hover:text-green-500">Facebook</a>
                  <a href="#" className="text-green-600 hover:text-green-500">Instagram</a>
                  <a href="#" className="text-green-600 hover:text-green-500">LinkedIn</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeButton={true} />
    </div>
  );
};

export default ContactPage;
