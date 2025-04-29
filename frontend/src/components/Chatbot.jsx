import React from 'react';

const Chatbot = () => {
  return (
    <div className="fixed bottom-0 right-0 w-full h-full bg-white z-50 p-5 border-t-4 border-blue-500">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Chatbot</h2>
        <button 
          onClick={() => window.location.reload()} // Close the chatbot when clicking 'X'
          className="text-xl font-bold"
        >
          X
        </button>
      </div>
      <div className="mt-4">
        {/* You can embed your chatbot here */}
        <iframe 
          src="your-chatbot-url" 
          width="100%" 
          height="500" 
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};

export default Chatbot;
