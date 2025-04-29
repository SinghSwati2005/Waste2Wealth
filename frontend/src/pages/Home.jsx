import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaPhone, FaHandshake, FaFileContract, FaTruck, FaMoneyBillWave, FaWarehouse, FaClipboardCheck, FaBoxOpen, FaShippingFast, FaIndustry, FaComments, FaTasks, FaChartLine, FaCheckCircle } from "react-icons/fa";


const Home = () => {
    
    return (
        <div className="home-container relative min-h-screen bg-green-50 p-10 flex flex-col items-center">
            {/* Auto-moving text */}
            <motion.div
                className="overflow-hidden whitespace-nowrap text-center text-2xl font-bold text-white bg-green-800 p-2 rounded-lg shadow-lg mb-5 w-full"
                animate={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 1 }}
            >
               From Fields to Factories – Seamless & Secure.  </motion.div>

            {/* Hero Section */}
            <div className="relative flex justify-between items-center w-full p-10 max-w-6xl rounded-lg">
                {/* Background Image with Opacity */}
                <div
                    className="absolute inset-0 bg-cover bg-center rounded-lg"
                    style={{
                        backgroundImage: "url('/hero image.jpg')",



                    }}
                >
                    <div className="absolute inset-0 bg-green-100 opacity-60 rounded-lg"></div>
                </div>

                {/* Left Content - Farmer Image & Collage */}
                <div className="relative flex flex-col items-center">
                    <div className="relative w-96 h-96 border-8 border-green-700 rounded-full overflow-hidden shadow-lg">
                        <img
                            src="https://th.bing.com/th/id/OIP.haa0Z4gnJONEBPD_5UbtsgAAAA?w=261&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                            alt="Farmer"
                            className="w-full h-full object-cover bg-green-100 opacity-80"
                        />
                    </div>

                    {/* Enlarged Agricultural Waste Collage */}
                    <div className="absolute bottom-[-50px] left-16 w-72 h-48 border-4 border-green-700 rounded-lg overflow-hidden grid grid-cols-2 gap-1 shadow-xl bg-white">
                        <img
                            src="https://th.bing.com/th/id/OIP.J9-UkQsVEYan9anpipG6bQHaE8?w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                            alt="Farming 1"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <img
                            src="https://th.bing.com/th/id/OIP.1xzopux-5ei9FMskubY1kAHaE8?rs=1&pid=ImgDetMain"
                            alt="Farming 2"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <img
                            src="https://c8.alamy.com/comp/B41G6J/agricultural-waste-B41G6J.jpg"
                            alt="Farming 3"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <img
                            src="https://www.businesswaste.co.uk/wp-content/uploads/2019/10/farm-waste-collections.jpg"
                            alt="Farming 4"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>

                {/* Right Content - New Circular Image */}
                {/* Right Content - Floating Image */}
                {/* <div className="relative hidden md:block w-96 h-auto">
                    <img
                        src="/"
                        alt="Agriculture Work"
                        className="w-full h-auto object-cover drop-shadow-lg"
                    />
                </div> */}

            </div>

            {/* Additional Sections */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
                {/* Product Information */}
                <motion.div
                    className="p-6 bg-white rounded-lg shadow-md border-l-8 border-green-500"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-2xl font-bold text-green-800">
                        Unveiling the World of Agriculture
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Our solution integrates AI-powered crop disease detection, pricing
                        predictions, and logistics support for farmers.
                    </p>
                    <button className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200">
                        Learn More →
                    </button>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    className="bg-green-100 p-6 rounded-lg shadow-md text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-2xl font-bold text-green-800">Our Impact</h2>
                    <div className="flex justify-around text-xl font-semibold mt-4">
                        <div>
                            <p className="text-green-700 text-2xl">15000+</p>
                            <p>Farmers</p>
                        </div>
                        <div>
                            <p className="text-green-700 text-2xl">1000+</p>
                            <p>Suppliers</p>
                        </div>
                        <div>
                            <p className="text-green-700 text-2xl">1200+</p>
                            <p>Companies</p>
                        </div>
                        <div>
                            <p className="text-green-700 text-2xl">10000+</p>
                            <p>Agents</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        
    

  {/* Purpose Section */ }
    <div className="mt-16 w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg border-l-8 border-green-500">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
            Why Choose Our Platform?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Purpose 1 */}
            <div className="flex items-start space-x-4">
                <span className="text-green-700 text-4xl">🌾</span>
                <div>
                    <h3 className="text-xl font-semibold text-green-700">
                        AI-Powered Crop Analysis
                    </h3>
                    <p className="text-gray-600">
                        Our AI predicts crop diseases and suggests preventive measures to help farmers.
                    </p>
                </div>
            </div>

            {/* Purpose 2 */}
            <div className="flex items-start space-x-4">
                <span className="text-green-700 text-4xl">💰</span>
                <div>
                    <h3 className="text-xl font-semibold text-green-700">
                        Fair Pricing & Market Insights
                    </h3>
                    <p className="text-gray-600">
                        We provide real-time crop price predictions to help farmers get the best value.
                    </p>
                </div>
            </div>

            {/* Purpose 3 */}
            <div className="flex items-start space-x-4">
                <span className="text-green-700 text-4xl">🚜</span>
                <div>
                    <h3 className="text-xl font-semibold text-green-700">
                        Logistics & Transport Support
                    </h3>
                    <p className="text-gray-600">
                        Our platform connects farmers with logistics solutions for easy crop transport.
                    </p>
                </div>
            </div>
        </div>
    </div>
    
      
     <section>
     <div className="mt-16 w-full max-w-6xl p-8  text-center">
                <h2 className="text-3xl font-bold text-green-800 mb-6">Farmer Journey</h2>
                <div className="flex justify-center">
                    <img 
                        src="/farmer journey.jpeg" 
                        alt="User Journey"
                        className="w-full max-w-8xl rounded-lg shadow-lg"
                    />
                </div>
            </div>
     </section>

     <section className="flex flex-col md:flex-row items-center justify-between text-white py-16 px-10 bg-gray-900">
        <div className="md:w-3/5 space-y-6">
            <h2 className="text-3xl font-bold text-green-400">Why Sell Agricultural Waste?</h2>
            <p className="text-lg leading-relaxed text-gray-300">
                Agricultural waste isn’t just waste—it’s **potential revenue** waiting to be unlocked! 🌱 Instead of burning or dumping leftover crop residues, farmers can **sell them** to industries for biofuel, organic fertilizers, paper production, and even biodegradable packaging. This not only **reduces pollution** but also **creates an extra income source** 💰. With real-time price tracking and **seamless industry connections**, our platform ensures farmers get **the best deals instantly**, turning waste into wealth while promoting sustainable farming. 🌍
            </p>
        </div>
        <div className="md:w-2/6 flex justify-center">
            <img src="https://5.imimg.com/data5/SELLER/Default/2023/7/328287785/BQ/PS/WH/92857423/rice-husks-rice-hulls-hydroponic-growing-media-100-natural-organic-rice-husks-compost-1000x1000.jpeg" alt="Agricultural Waste Usage" className="w-full max-w-lg rounded-lg shadow-lg" />
        </div>
    </section>

     {/* //indutry journey */}
     <section>
     <div className="mt-16 w-full max-w-6xl p-8  text-center">
                <h2 className="text-3xl font-bold text-green-800 mb-6">Industry Journey</h2>
                <div className="flex justify-center">
                    <img 
                        src="/industry journey.jpeg" 
                        alt="User Journey"
                        className="w-full max-w-8xl rounded-lg shadow-lg"
                    />
                </div>
            </div>
     </section>
      {/* //indutry journey */}


     
    </div>
  );
};

export default Home;



