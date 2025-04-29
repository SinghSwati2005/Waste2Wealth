const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    
    role: { 
      type: String, 
      enum: ["farmer", "industry"],  // Ensure lowercase enum values are consistent
      required: true 
    },

    // Common fields for both FARMER and INDUSTRY
    email: { 
      type: String, 
      unique: true, 
      required: true,  // Email is required for both roles
    },
    password: { 
      type: String, 
      required: true,  // Password is required for both roles
    },

    //extra fewatures adding can be removed
    agriWaste: { 
      type: [String],  // Array to store the list of agricultural waste
      required: true,
    },

    description: { 
      type: String, 
      required: true,
    }
  
  },
  { timestamps: true }
  
);

const User = mongoose.model("User", userSchema);

module.exports = User;
