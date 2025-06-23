
// const jwt = require("jsonwebtoken");

// async function authToken(req, res, next) {
//   try {
//     const token = req.cookies?.token;
//     if (!token) {
//       return res.status(401).json({
//         message: "User not logged in",
//         error: true,
//         success: false,
//       });
//     }

//     jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
//       if (err) {
//         return res.status(403).json({
//           message: "Invalid or expired token",
//           error: true,
//           success: false,
//         });
//       }

//       req.userId = decoded._id;
      
// req.role = decoded.role;

//       next();
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err.message || "Something went wrong",
//       error: true,
//       success: false,
//     });
//   }
// }

// module.exports = authToken;



const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token; // Fetch token from cookies

    if (!token) {
      return res.status(401).json({
        message: "User not logged in",
        error: true,
        success: false,
      });
    }

    // Verify the token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid or expired token",
          error: true,
          success: false,
        });
      }


      req.userId = decoded._id; // Assign decoded user ID to request object
      req.role = decoded.role;   // Assign role (if available)

 

      // Continue to the next middleware
      next();
    });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({
      message: err.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
