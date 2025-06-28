// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { setUserDetails } from "../store/userSlice"; // Assuming this is the action from your Redux slice

// const Login = () => {
//   const [data, setData] = useState({ email: "", password: "", role: "" });
//   const navigate = useNavigate();
//   const dispatch = useDispatch(); // Dispatch to Redux

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/signin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//         credentials: "include", // Needed to include the cookie
//       });
      

//       const result = await res.json();
  
//       if (result.success) {
//         toast.success(result.message);
  
//         // ✅ Set user in Redux (no localStorage)
//         dispatch(setUserDetails({ email: result.data.email, role: result.data.role }));
       
//         // ✅ Role-based navigation
//         const role = result.data.role;
//         if (role === "farmer") {
//           navigate("/farmer-dashboard");
//         } else if (role === "industry") {
//           navigate("/industry-dashboard");
//         } else {
//           toast.error("Invalid role received");
//         }
//          window.location.reload(); 
//       } else {
//         toast.error(result.message);
//       }
//     } catch (err) {
//       toast.error("Login failed");
//     }
//   };
  
  

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-96">
//         <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

//         <select name="role" value={data.role} onChange={handleChange} required className="w-full mb-3 p-2 border rounded">
//           <option value="">Select Role</option>
//           <option value="farmer">Farmer</option>
//           <option value="industry">Industry</option>
//         </select>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={data.email}
//           onChange={handleChange}
//           required
//           className="w-full mb-3 p-2 border rounded"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={data.password}
//           onChange={handleChange}
//           required
//           className="w-full mb-4 p-2 border rounded"
//         />

//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
//           Login
//         </button>
//         <p className="text-center mt-3">Don't have an account? <Link to="/sign-up" className="text-green-500">Sign Up</Link></p>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "", role: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const farmerImg = "https://img.freepik.com/premium-photo/smiling-farmer-sitting-hay-bale-his-field_53419-6306.jpg";
  const industryImg = "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iuxiybsX2sCg/v0/-1x-1.jpg";
  const selectedImage = data.role === "industry" ? industryImg : farmerImg;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        dispatch(setUserDetails({ email: result.data.email, role: result.data.role }));

        const role = result.data.role;
        if (role === "farmer") navigate("/farmer-dashboard");
        else if (role === "industry") navigate("/industry-dashboard");
        else toast.error("Invalid role received");

        window.location.reload();
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Image Side (conditionally shown) */}
      {data.role && (
        <div className="hidden md:flex w-1/2 items-center justify-center bg-white shadow-md">
          <img
            src={selectedImage}
            alt={data.role}
            className="w-[80%] h-[80%] object-cover rounded-lg transition-all duration-500 shadow-xl"
          />
        </div>
      )}

      {/* Right Login Form */}
      <div className={`flex-1 flex items-center justify-center p-6 ${data.role ? "md:w-1/2" : "w-full"}`}>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md animate-fade-in"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Login</h2>

          <select
            name="role"
            value={data.role}
            onChange={handleChange}
            required
            className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="industry">Industry</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
            className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
            className="w-full mb-6 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-lime-500 text-white p-3 rounded-md hover:opacity-90 transition-all duration-300"
          >
            Login
          </button>

          <p className="text-center mt-4 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="text-green-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
