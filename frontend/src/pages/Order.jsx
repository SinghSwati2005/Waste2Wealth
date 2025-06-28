import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import SummaryApi from '../common'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';



const languageOptions = [
  { code: 'en-IN', label: 'English' },
  { code: 'hi-IN', label: 'Hindi' },
  { code: 'bn-IN', label: 'Bengali' },
  { code: 'ta-IN', label: 'Tamil' },
  { code: 'te-IN', label: 'Telugu' },
  { code: 'mr-IN', label: 'Marathi' },
  { code: 'gu-IN', label: 'Gujarati' }
];

const Order = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [voiceActive, setVoiceActive] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en-IN');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
    const user = useSelector((state) => state?.user?.user); 
    const [industry, setIndustry] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
      const fetchIndustries = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/industries`);
          if (response.data) {
            console.log(response.data);
            setIndustry(response.data);
          }
        } catch (err) {
          console.error("Error fetching Industries:", err);
          setError("Failed to fetch Industries");
        }
      };
  
      fetchIndustries();
    }, []);
  
  // Handle industry selection
  const handleSell = (industry) => {
    setSelectedIndustry(industry);
  };

  // Close the modal and reset form
  const closeModal = () => {
    setSelectedIndustry(null);
    setQuantity('');
    setPrice('');
    setImage(null);
    setPreview(null);
  };

  // Handle voice search functionality
  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = selectedLang;
    recognition.interimResults = false;

    recognition.onstart = () => setVoiceActive(true);
    recognition.onend = () => setVoiceActive(false);

    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript;
      transcript = transcript.replace(/[.,!?।]/g, '').trim();
      setSearchTerm(transcript);
    };

    recognition.start();
  };

  // Handle image file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Submit product details to the server
 // In Order.jsx, updating the axios call to the correct endpoint
const submitProductDetails = async () => {
  if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
    return toast.error("Please enter a valid quantity!");
  }

  if (!preview) {
    return toast.error("Please upload an image!");
  }

  // const formData = {
  //     farmerId: user._id, 
  //   industryName: selectedIndustry.name,
  //   agriWaste: selectedIndustry.agriWaste,
  //   quantity,
  //   price,
  //   image: preview, // base64 image
  // };
  const formData = {
  farmerId: user._id,
  industryId: selectedIndustry._id, // <-- must be added
  industryName: selectedIndustry.name, // optional, but good for display
  agriWaste: selectedIndustry.agriWaste,
  quantity,
  price,
  image: preview,
};


  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/product/submit-product`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      toast.success("Product details submitted successfully!");
      closeModal();
      navigate('/lists-farmer');
    } else {
      alert("Unexpected response from server.");
    }
  } catch (err) {
    console.error("Error submitting product details:", err);
    toast.error("Failed to submit product details!");
  }
};

  
  // Filter industries based on search term
  const filteredIndustries = industry.filter((industry) =>
    (industry?.crop || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f9f9f6] dark:bg-[#121a13] text-[#1a1a1a] dark:text-white">
    {/* Sidebar Component */}
    <Sidebar />  {/* Import and render the Sidebar here */}

    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Industries Interested in Crops & Agri-Waste</h2>

      <div className="flex flex-col md:flex-row gap-3 items-center justify-center mb-6">
        <input
          type="text"
          placeholder="Search by crop or agri-waste..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-96"
        />

        <button
          onClick={handleVoiceSearch}
          className={`px-4 py-2 rounded text-white ${voiceActive ? 'bg-green-600' : 'bg-blue-600'}`}
        >
          🎙️ Speak
        </button>

        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="border rounded px-2 py-2"
        >
          {languageOptions.map((lang) => (
            <option key={lang.code} value={lang.code}>{lang.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIndustries.length > 0 ? (
          filteredIndustries.map((industry) => (
            <div key={industry.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-700">{industry.name}</h3>
              <p className="text-gray-700 mt-2"><strong>Needs:</strong> {industry.agriWaste}</p>
              <p className="text-sm mt-1 text-gray-600">{industry.description}</p>
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleSell(industry)}
              >
                Sell to Industry
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-2 text-gray-500">No industries found for this crop.</p>
        )}
      </div>

      {/* Modal with animation */}
      <AnimatePresence>
        {selectedIndustry && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg w-[90%] md:w-[500px] max-h-[90vh] overflow-y-auto"
              initial={{ y: "-100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100vh", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 text-center text-green-700">
                Sell to {selectedIndustry.name}
              </h3>

              <form className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Crop / Waste Type</label>
                  <input
                    type="text"
                    value={selectedIndustry.agriWaste}
                    readOnly
                    className="w-full border px-4 py-2 rounded bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Quantity (in kg or tons)</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    className="w-full border px-4 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Expected Price (optional)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    className="w-full border px-4 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Upload Crop/Waste Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                  {preview && (
                    <img src={preview} alt="Preview" className="mt-2 max-h-48 rounded shadow" />
                  )}
                </div>

                <div className="flex justify-between gap-4 pt-4">
                  <button
                    type="button"
                    onClick={submitProductDetails}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
};

export default Order;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import { toast } from 'react-toastify';

// const languageOptions = [
//   { code: 'en-IN', label: 'English' },
//   { code: 'hi-IN', label: 'Hindi' },
//   { code: 'bn-IN', label: 'Bengali' },
//   { code: 'ta-IN', label: 'Tamil' },
//   { code: 'te-IN', label: 'Telugu' },
//   { code: 'mr-IN', label: 'Marathi' },
//   { code: 'gu-IN', label: 'Gujarati' }
// ];

// const Order = () => {
//   const navigate = useNavigate();
//   const [industries, setIndustries] = useState([]);
//   const [preview, setPreview] = useState(null);
//   const [selectedIndustry, setSelectedIndustry] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [voiceActive, setVoiceActive] = useState(false);
//   const [selectedLang, setSelectedLang] = useState('en-IN');
//   const [quantity, setQuantity] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState(null);

//   // Fetch industries from backend
//   useEffect(() => {
//     const fetchIndustries = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/industries/list'); // <-- Update your backend API here
//         setIndustries(response.data);
//       } catch (err) {
//         console.error('Error fetching industries:', err);
//         toast.error('Failed to fetch industries!');
//       }
//     };

//     fetchIndustries();
//   }, []);

//   // Handle voice search
//   const handleVoiceSearch = () => {
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.continuous = false;
//     recognition.lang = selectedLang;
//     recognition.interimResults = false;

//     recognition.onstart = () => setVoiceActive(true);
//     recognition.onend = () => setVoiceActive(false);

//     recognition.onresult = (event) => {
//       let transcript = event.results[0][0].transcript;
//       transcript = transcript.replace(/[.,!?।]/g, '').trim();
//       setSearchTerm(transcript);
//     };

//     recognition.start();
//   };

//   // Handle image file input
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setPreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   // Submit product details
//   const submitProductDetails = async () => {
//     if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
//       return toast.error('Please enter a valid quantity!');
//     }

//     if (!preview) {
//       return toast.error('Please upload an image!');
//     }

//     const formData = {
//       industryName: selectedIndustry.name,
//       cropType: selectedIndustry.requiredCrop,
//       quantity,
//       price,
//       image: preview, // base64 image
//     };

//     try {
//       const response = await axios.post('http://localhost:8080/api/product/submit-product', formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 201) {
//         toast.success('Product details submitted successfully!');
//         closeModal();
//         navigate('/lists-farmer');
//       } else {
//         toast.error('Unexpected server response.');
//       }
//     } catch (err) {
//       console.error('Error submitting product details:', err);
//       toast.error('Failed to submit product details!');
//     }
//   };

//   // Reset modal and form
//   const closeModal = () => {
//     setSelectedIndustry(null);
//     setQuantity('');
//     setPrice('');
//     setImage(null);
//     setPreview(null);
//   };

//   // Filter industries based on search
//   const filteredIndustries = industries.filter((industry) =>
//     industry.requiredCrop?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex min-h-screen bg-[#f9f9f6] dark:bg-[#121a13] text-[#1a1a1a] dark:text-white">
//       <Sidebar />

//       <div className="p-6 flex-1">
//         <h2 className="text-3xl font-bold mb-6 text-center">Industries Interested in Crops & Agri-Waste</h2>

//         <div className="flex flex-col md:flex-row gap-3 items-center justify-center mb-6">
//           <input
//             type="text"
//             placeholder="Search by crop or agri-waste..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border rounded px-4 py-2 w-full md:w-96"
//           />

//           <button
//             onClick={handleVoiceSearch}
//             className={`px-4 py-2 rounded text-white ${voiceActive ? 'bg-green-600' : 'bg-blue-600'}`}
//           >
//             🎙️ Speak
//           </button>

//           <select
//             value={selectedLang}
//             onChange={(e) => setSelectedLang(e.target.value)}
//             className="border rounded px-2 py-2"
//           >
//             {languageOptions.map((lang) => (
//               <option key={lang.code} value={lang.code}>{lang.label}</option>
//             ))}
//           </select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {filteredIndustries.length > 0 ? (
//             filteredIndustries.map((industry) => (
//               <div key={industry._id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
//                 <h3 className="text-xl font-semibold text-green-700">{industry.name}</h3>
//                 <p className="text-gray-700 mt-2"><strong>Needs:</strong> {industry.requiredCrop}</p>
//                 <p className="text-sm mt-1 text-gray-600">{industry.description}</p>
//                 <button
//                   className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   onClick={() => setSelectedIndustry(industry)}
//                 >
//                   Sell to Industry
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-center col-span-2 text-gray-500">No industries found for this crop.</p>
//           )}
//         </div>

//         {/* Modal for selling product */}
//         <AnimatePresence>
//           {selectedIndustry && (
//             <motion.div
//               className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={closeModal}
//             >
//               <motion.div
//                 className="bg-white p-6 rounded-xl shadow-lg w-[90%] md:w-[500px] max-h-[90vh] overflow-y-auto"
//                 initial={{ y: "-100vh", opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: "-100vh", opacity: 0 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <h3 className="text-xl font-bold mb-4 text-center text-green-700">
//                   Sell to {selectedIndustry.name}
//                 </h3>

//                 <form className="space-y-4">
//                   <div>
//                     <label className="block font-medium mb-1">Crop / Waste Type</label>
//                     <input
//                       type="text"
//                       value={selectedIndustry.requiredCrop}
//                       readOnly
//                       className="w-full border px-4 py-2 rounded bg-gray-100"
//                     />
//                   </div>

//                   <div>
//                     <label className="block font-medium mb-1">Quantity (in kg or tons)</label>
//                     <input
//                       type="number"
//                       value={quantity}
//                       onChange={(e) => setQuantity(e.target.value)}
//                       placeholder="Enter quantity"
//                       className="w-full border px-4 py-2 rounded"
//                     />
//                   </div>

//                   <div>
//                     <label className="block font-medium mb-1">Expected Price (optional)</label>
//                     <input
//                       type="number"
//                       value={price}
//                       onChange={(e) => setPrice(e.target.value)}
//                       placeholder="Enter price"
//                       className="w-full border px-4 py-2 rounded"
//                     />
//                   </div>

//                   <div>
//                     <label className="block font-medium mb-1">Upload Crop/Waste Image</label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="w-full"
//                     />
//                     {preview && (
//                       <img src={preview} alt="Preview" className="mt-2 max-h-48 rounded shadow" />
//                     )}
//                   </div>

//                   <div className="flex justify-between gap-4 pt-4">
//                     <button
//                       type="button"
//                       onClick={submitProductDetails}
//                       className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
//                     >
//                       Submit
//                     </button>
//                     <button
//                       type="button"
//                       onClick={closeModal}
//                       className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </form>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default Order;
