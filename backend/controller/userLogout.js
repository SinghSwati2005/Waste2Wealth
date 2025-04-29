
const userLogout = async (req, res) => {
  try {
    // Clear both 'token' and 'role' cookies
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.clearCookie("role", {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    

    return res.status(200).json({
      message: "Logged Out Successfully!",
      error: false,
      success: true,
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server Error",
      error: true,
      success: false,
    });
  }
};

module.exports = userLogout;
