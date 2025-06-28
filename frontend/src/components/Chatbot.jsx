import React from 'react';

const Chatbot = () => {
  return (
    <div className="chatbot-container" style={{ height: "100vh", padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#2f855a", fontSize: "24px", marginBottom: "20px" }}>
        AI Chatbot Assistant
      </h2>
      <div style={{
        width: "100%",
        height: "90%",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <iframe
          src="https://7795-45-64-237-226.ngrok-free.app/"
          title="Chatbot"
          width="100%"
          height="100%"
          allow="microphone; camera"
          style={{ border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
};

export default Chatbot;
