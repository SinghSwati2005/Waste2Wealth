const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
    try {
        const { email, password, name, role,agriWaste, description  } = req.body;

        if (!role || !["farmer", "industry"].includes(role.toLowerCase())) {
            return res.status(400).json({ message: "Invalid user role. Choose FARMER or INDUSTRY", error: true });
        }
         // Normalize role to lowercase
         const normalizedRole = role.toLowerCase();

         // Check if user already exists based on role
         const existingUser = await User.findOne({ email });
         if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists!", error: true });
        }

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        // Create a new user object
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role: normalizedRole,
            agriWaste,  
            description  
        });

        // Save the new user
        await newUser.save();

        res.status(201).json({ success: true, message: "User created successfully!", error: false });

    } catch (err) {
        res.status(500).json({ message: err.message, error: true });
    }
}

module.exports = userSignUpController;
