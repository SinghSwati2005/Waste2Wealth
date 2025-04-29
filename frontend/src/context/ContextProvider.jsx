import React, { useState, useEffect } from "react";
import Context from "./Context";
import axios from "axios";

export default function ContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // Fetch user info on mount (optional: based on cookie token)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/me"); // Create this route to verify token & fetch user info
        setUser(res.data);
      } catch (err) {
        console.log("Not logged in or error:", err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    </Context.Provider>
  );
}
