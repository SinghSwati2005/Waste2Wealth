import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/userSlice";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Get user details from Redux
  const isLoggedIn = user?.email ? true : false;
  const role = user?.role;

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/userLogout`, {
        method: "GET",
        credentials: "include", // Important for cookie handling
      });

      dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Default menu items for all roles
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Contact", path: "/contact" },
  ];

  // Additional items for farmer role
  const farmerMenuItems = [
    { name: "Farmer Dashboard", path: "/farmer-dashboard" },
    { name: "AI Insights", path: "/ai-insights" },
    { name: "AI Image", path: "/ai-image" },
    { name: "Government Schemes", path: "/schemes" },
  ];

  // Additional items for industry role
  const industryMenuItems = [
    { name: "Industry Dashboard", path: "/industry-dashboard" },
  ];

  // Combine the base menu with role-specific items
  const roleBasedMenuItems =
    role === "farmer"
      ? [...menuItems, ...farmerMenuItems]
      : role === "industry"
      ? [...menuItems, ...industryMenuItems]
      : menuItems;

  // Mobile menu rendering
  const mobileMenuItems =
    role === "farmer"
      ? [...menuItems, ...farmerMenuItems]
      : role === "industry"
      ? [...menuItems, ...industryMenuItems]
      : menuItems;

  return (
    <nav className="bg-black text-white fixed top-0 w-full shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-400">
         KrishiSetu 🌿
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {roleBasedMenuItems.map((item) => (
            <li key={item.name}>
              <Link to={item.path} className="hover:text-green-400">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="hidden md:flex space-x-4">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="bg-transparent border border-green-400 px-4 py-2 rounded-md hover:bg-green-400 hover:text-black"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className="bg-green-400 px-4 py-2 rounded-md text-black font-semibold hover:bg-green-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white flex flex-col space-y-4 py-4 px-6">
          {mobileMenuItems.map((item) => (
            <Link key={item.name} to={item.path} className="hover:text-green-400">
              {item.name}
            </Link>
          ))}
          <hr className="border-green-400" />
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="bg-transparent border border-green-400 px-4 py-2 rounded-md hover:bg-green-400 hover:text-black"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className="bg-green-400 px-4 py-2 rounded-md text-black font-semibold hover:bg-green-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
