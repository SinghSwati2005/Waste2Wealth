const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields required", error: true });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found", error: true });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return res.status(401).json({ message: "Incorrect password", error: true });

    // ✅ Match role with signup data
    if (user.role.toLowerCase() !== role.toLowerCase()) {
      return res.status(403).json({ message: "Role mismatch", error: true });
    }

    // const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "1d" });

    const token = jwt.sign(
      { _id: user._id, role: user.role, email: user.email, name: user.name },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "4d" }
    );
    

    // // Set token and role in cookies
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // true in production
    //   sameSite: "strict",
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    // });

    // res.cookie("role", user.role, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // true in production
    //   sameSite: "strict",
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    // });

// Set token and role in cookies
res.cookie("token", token, {
  httpOnly: true,
  secure: true,              // ✅ Always true in production (must be on HTTPS)
  sameSite: "None",          // ✅ To allow frontend (e.g. Netlify) to receive the cookie from a different domain
  maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days (matches your JWT expiry)
});

res.cookie("role", user.role, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 4 * 24 * 60 * 60 * 1000,
});



    // Send the response
    res.status(200).json({
      message: "Login successful",
      success: true,
      error: false,
      data: {
        token,
        name: user.name,
        email: user.email,
        role: user.role.toLowerCase(),
        agriWaste: user.agriWaste,
        description: user.description
        // Pass role back for frontend redirect
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
}

module.exports = userSignInController;
