import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div>
          <h2 className="text-green-400 text-2xl font-bold">Waste2Wealth</h2>
          <p className="text-gray-400 mt-3 text-sm">
            Empowering farmers with AI-driven insights, marketplace solutions, and government resources to enhance productivity and profitability.
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="text-green-400" size={18} />
              <p className="text-gray-300">support@waste2wealth.com</p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="text-green-400" size={18} />
              <p className="text-gray-300">+91 98765 43210</p>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-green-400" size={18} />
              <p className="text-gray-300">Bangalore, India</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-green-400 text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li className="hover:text-green-400 cursor-pointer">Home</li>
            <li className="hover:text-green-400 cursor-pointer">Marketplace</li>
            <li className="hover:text-green-400 cursor-pointer">AI Insights</li>
            <li className="hover:text-green-400 cursor-pointer">Government Schemes</li>
            <li className="hover:text-green-400 cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Subscription */}
        <div>
          <h3 className="text-green-400 text-lg font-semibold mb-3">Subscribe to Our Newsletter</h3>
          <p className="text-gray-400 text-sm">Get the latest updates on AI insights, crop price predictions, and farming solutions.</p>
          <div className="mt-4 flex items-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-3 py-2 text-black w-full rounded-l-md focus:outline-none"
            />
            <button className="bg-green-400 px-4 py-2 rounded-r-md hover:bg-green-500">Subscribe</button>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-green-400 text-lg font-semibold mb-3">Follow Us</h3>
          <p className="text-gray-400 text-sm">Stay connected with our latest updates and innovations.</p>
          <div className="flex space-x-4 mt-4">
            <Facebook className="text-gray-400 hover:text-green-400 cursor-pointer" size={24} />
            <Twitter className="text-gray-400 hover:text-green-400 cursor-pointer" size={24} />
            <Instagram className="text-gray-400 hover:text-green-400 cursor-pointer" size={24} />
            <Linkedin className="text-gray-400 hover:text-green-400 cursor-pointer" size={24} />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm border-t border-gray-700 mt-6 pt-4">
        © 2025 Waste2Wealth. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
