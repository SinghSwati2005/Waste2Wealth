

// routes/auth.js
const express = require('express');
const router = express.Router();

// Mock database
const users = new Map(); // Key: Email, Value: User object

// Signup (Both Farmer and Industry)
router.post('/api/signup', (req, res) => {
  const { name, role, email, password, confirmPassword, agriWaste, description } = req.body;

  if (!email || !password || password !== confirmPassword|| !agriWaste || !description) {
    return res.status(400).json({ success: false, message: 'Invalid signup data' });
  }

  if (users.has(email)) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  // Save the user to the "database"
  users.set(email, { name, role, email, password ,agriWaste,  // Required for both roles
    description});
  res.json({ success: true, message: 'Signup successful' });
});

// Signin (Supports Email/Password for both Farmer and Industry)
router.post('/api/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const user = users.get(email);
  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(400).json({ success: false, message: 'Incorrect password' });
  }

  return res.json({ success: true, message: 'Login successful', data: user });
  
});




module.exports = router;

