



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agriWaste :'',  // Required for both roles
    description : ''
    
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password matching check for Industry role
    if (data.role === 'industry' && data.password !== data.confirmPassword) {
      return toast.error('Passwords do not match!');
    }

    const requestData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role.toUpperCase(),
      agriWaste : data.agriWaste,  // Required for both roles
      description :data.description // Ensure role is either 'FARMER' or 'INDUSTRY'
    };

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });

    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
      navigate('/login');
    } else {
      toast.error(result.message || 'Sign-up failed');
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold text-gray-700 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={data.name}
            onChange={handleOnChange}
            required
            className="p-2 border rounded"
          />
          
          <select
            name="role"
            value={data.role}
            onChange={handleOnChange}
            required
            className="p-2 border rounded"
          >
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="industry">Industry Person</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleOnChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="agriWaste"
            name="agriWaste"
            placeholder="agriWaste"
            value={data.agriWaste}
            onChange={handleOnChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="description"
            name="description"
            placeholder="description"
            value={data.description}
            onChange={handleOnChange}
            required
            className="p-2 border rounded"
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleOnChange}
            required
            className="p-2 border rounded"
          />
          
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={data.confirmPassword}
            onChange={handleOnChange}
            required={data.role === 'industry'}  // Only required for Industry role
            className="p-2 border rounded"
          />

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;

