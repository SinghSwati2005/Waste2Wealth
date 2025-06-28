// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';

// import SummaryApi from '../common';
// import { useNavigate } from 'react-router-dom';
// import Sidebar_industry from '../components/Sidebar_industry';
// import { toast } from 'react-toastify';

// const farmersData = [
//   {
//     id: 1,
//     name: "Ramesh Kumar",
//     crop: "Sugarcane Waste",
//     description: "Fresh sugarcane waste available from Bihar farms.",
//     image: "https://as2.ftcdn.net/v2/jpg/03/87/34/03/1000_F_387340320_vt8G2MNostrG4TWOMQgyBpE7CAMvOT19.jpg"
//   },
//   {
//     id: 2,
//     name: "Priya Sharma",
//     crop: "Banana Stem",
//     description: "Eco-friendly banana fiber waste ready for sale.",
//     image: "https://th.bing.com/th/id/OIP.5iSiD2zkDspqQuP1PmS3lAHaFu?w=213&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
//   },
//   {
//     id: 3,
//     name: "Mahesh Patel",
//     crop: "Corn Husk",
//     description: "Dried corn husks perfect for industrial use.",
//     image: "https://thumbs.dreamstime.com/b/corn-waste-usually-used-fuel-fodder-heaps-corn-waste-usually-used-fuel-fodder-mushroom-growing-medium-284074270.jpg"
//   }
// ];

// const IndustryOrder = () => {
//     const navigate = useNavigate();
//   const [selectedFarmer, setSelectedFarmer] = useState(null);
//   const [quantity, setQuantity] = useState('');
//   const [price, setPrice] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [preview, setPreview] = useState(null);

//   const handleOrderClick = (farmer) => {
//     setSelectedFarmer(farmer);
//   };

//   const closeModal = () => {
//     setSelectedFarmer(null);
//     setQuantity('');
//     setPrice('');
//     setPreview(null);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setPreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmitOrder = async () => {
//     if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
//       return toast.error("Please enter a valid quantity!");
//     }

//     const formData = {
//       farmerName: selectedFarmer.name,
//       crop: selectedFarmer.crop,
//       quantity,
//       price,
//       image: preview,
//     };

//     try {
//       const response = await axios({
//         url: SummaryApi.buyProduct.url,
//         method: SummaryApi.buyProduct.method,
//         data: formData,
//         headers: { "Content-Type": "application/json" }
//       });
      

//       if (response.status === 201) {
//         toast.success("Order submitted successfully!");
//         closeModal();
//         navigate('/lists-industry');
//       } else {
//         toast.error("Unexpected response from server.");
//       }
//     } catch (err) {
//       console.error("Error submitting order:", err);
//       toast.error("Failed to submit order!");
//     }
//   };
  

//   const filteredFarmers = farmersData.filter(farmer =>
//     farmer.crop.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex min-h-screen bg-[#f9f9f6] dark:bg-[#121a13] text-[#1a1a1a] dark:text-white">
//       <Sidebar_industry />

//       <div className="p-6 w-full">
//         <h2 className="text-3xl font-bold mb-6 text-center">Available Farmers & Their Produce</h2>

//         <div className="flex justify-center mb-6">
//           <input
//             type="text"
//             placeholder="Search by crop..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border rounded px-4 py-2 w-full max-w-xl"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {filteredFarmers.length > 0 ? (
//             filteredFarmers.map((farmer) => (
//               <div key={farmer.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
//                 <img src={farmer.image} alt={farmer.crop} className="w-full h-40 object-cover rounded mb-3" />
//                 <h3 className="text-xl font-semibold text-green-700">{farmer.name}</h3>
//                 <p><strong>Crop:</strong> {farmer.crop}</p>
//                 <p className="text-sm text-gray-600">{farmer.description}</p>
//                 <button
//                   className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   onClick={() => handleOrderClick(farmer)}
//                 >
//                   Order from Farmer
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-center col-span-2 text-gray-500">No farmers found for this crop.</p>
//           )}
//         </div>

//         {/* Modal */}
//         <AnimatePresence>
//           {selectedFarmer && (
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
//                   Order from {selectedFarmer.name}
//                 </h3>

//                 <form className="space-y-4">
//                   <div>
//                     <label className="block font-medium mb-1">Crop Type</label>
//                     <input
//                       type="text"
//                       value={selectedFarmer.crop}
//                       readOnly
//                       className="w-full border px-4 py-2 rounded bg-gray-100"
//                     />
//                   </div>

//                   <div>
//                     <label className="block font-medium mb-1">Quantity Required (kg or tons)</label>
//                     <input
//                       type="number"
//                       value={quantity}
//                       onChange={(e) => setQuantity(e.target.value)}
//                       placeholder="Enter quantity"
//                       className="w-full border px-4 py-2 rounded"
//                     />
//                   </div>

//                   <div>
//                     <label className="block font-medium mb-1">Offered Price</label>
//                     <input
//                       type="number"
//                       value={price}
//                       onChange={(e) => setPrice(e.target.value)}
//                       placeholder="Enter price"
//                       className="w-full border px-4 py-2 rounded"
//                     />
//                   </div>

//                   <div>
//                     <label className="block font-medium mb-1">Upload Image/Doc (optional)</label>
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
//                       onClick={handleSubmitOrder}
//                       className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
//                     >
//                       Submit Order
//                     </button>
//                     <button
//                       type="button"
//                       onClick={closeModal}
//                       className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded"
//                     >
//                       Cancel
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

// export default IndustryOrder;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import SummaryApi from '../common';
import { useNavigate } from 'react-router-dom';
import Sidebar_industry from '../components/Sidebar_industry';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const IndustryOrder = () => {
  const navigate = useNavigate();
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [preview, setPreview] = useState(null);
  const [farmers, setFarmers] = useState([]);
  const [error, setError] = useState('');
const user = useSelector((state) => state?.user?.user); 

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/farmers`);
        if (response.data) {
          console.log(response.data);
          setFarmers(response.data);
        }
      } catch (err) {
        console.error("Error fetching farmers:", err);
        setError("Failed to fetch farmers");
      }
    };

    fetchFarmers();
  }, []);

  const handleOrderClick = (farmer) => {
    setSelectedFarmer(farmer);
  };

  const closeModal = () => {
    setSelectedFarmer(null);
    setQuantity('');
    setPrice('');
    setPreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitOrder = async () => {
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
      return toast.error("Please enter a valid quantity!");
    }

    // const formData = {
    //   farmerName: selectedFarmer.name,
    //   agriWaste: selectedFarmer.agriWaste,
    //   quantity,
    //   price,
    //   image: preview,
    // };
const formData = {
  industryId: user._id,
  farmerId: selectedFarmer._id, // or selectedFarmer.id
  farmerName: selectedFarmer.name,
  agriWaste: selectedFarmer.agriWaste,
  quantity,
  price,
  image: preview,
};

    try {
      const response = await axios({
        url: SummaryApi.buyProduct.url,
        method: SummaryApi.buyProduct.method,
        data: formData,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        toast.success("Order submitted successfully!");
        closeModal();
        navigate('/lists-industry');
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Error submitting order:", err);
      toast.error("Failed to submit order!");
    }
  };

  const filteredFarmers = farmers.filter((farmer) =>
    (farmer?.crop || "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className="flex min-h-screen bg-[#f9f9f6] dark:bg-[#121a13] text-[#1a1a1a] dark:text-white">
      <Sidebar_industry />

      <div className="p-6 w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Available Farmers & Their Produce</h2>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by crop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 w-full max-w-xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFarmers.length > 0 ? (
            filteredFarmers.map((farmer) => (
              <div key={farmer._id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              
                <h3 className="text-xl font-semibold text-green-700">{farmer.name}</h3>
                <p><strong>Crop:</strong> {farmer.agriWaste}</p>
                <p className="text-sm text-gray-600">{farmer.description}</p>
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleOrderClick(farmer)}
                >
                  Order from Farmer
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-2 text-gray-500">
              {error ? error : "No farmers found for this crop."}
            </p>
          )}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedFarmer && (
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
                  Order from {selectedFarmer.name}
                </h3>

                <form className="space-y-4">
                  <div>
                    <label className="block font-medium mb-1">Crop Type</label>
                    <input
                      type="text"
                      value={selectedFarmer.agriWaste}
                      readOnly
                      className="w-full border px-4 py-2 rounded bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Quantity Required (kg or tons)</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter quantity"
                      className="w-full border px-4 py-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Offered Price</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter price"
                      className="w-full border px-4 py-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Upload Image/Doc (optional)</label>
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
                      onClick={handleSubmitOrder}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
                    >
                      Submit Order
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded"
                    >
                      Cancel
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

export default IndustryOrder;
