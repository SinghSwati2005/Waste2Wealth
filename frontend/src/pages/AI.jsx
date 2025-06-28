// import React, { useState } from 'react';

// const AIInsightsPage = () => {
//   const [wasteType, setWasteType] = useState('');
//   const [demand, setDemand] = useState('Low');
//   const [weight, setWeight] = useState('');
//   const [predictionResult, setPredictionResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handlePredict = async () => {
//     setError(null);
//     setPredictionResult(null);

//     const requestData = {
//       waste_type: wasteType,
//       demand: demand,
//       weight: parseFloat(weight),
//     };

//     try {
//       const response = await fetch('https://agriwaste-api-1.onrender.com/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });

//       if (!response.ok) {
//         throw new Error('Prediction failed. Please check the input values.');
//       }

//       const result = await response.json();
//       setPredictionResult(result);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">AI Insights - Waste Prediction</h1>

//       <div className="mb-4">
//         <label className="block mb-1">Waste Type</label>
//         <input
//           type="text"
//           value={wasteType}
//           onChange={(e) => setWasteType(e.target.value)}
//           className="border p-2 w-full"
//           placeholder="e.g., Coconut shells"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1">Demand</label>
//         <select
//           value={demand}
//           onChange={(e) => setDemand(e.target.value)}
//           className="border p-2 w-full"
//         >
//           <option value="Low">Low</option>
//           <option value="Medium">Medium</option>
//           <option value="High">High</option>
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1">Weight (in kg)</label>
//         <input
//           type="number"
//           value={weight}
//           onChange={(e) => setWeight(e.target.value)}
//           className="border p-2 w-full"
//           placeholder="e.g., 1"
//         />
//       </div>

//       <button
//         onClick={handlePredict}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Predict
//       </button>

//       {predictionResult && (
//         <div className="mt-6 p-4 bg-green-100 rounded">
//           <h2 className="text-xl font-semibold">Prediction Result:</h2>
//           <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
//         </div>
//       )}

//       {error && (
//         <div className="mt-6 p-4 bg-red-100 rounded text-red-800">
//           Error: {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AIInsightsPage;


import React, { useState } from 'react';
import { Lightbulb, Weight, Leaf, TrendingUp } from 'lucide-react';

const AIInsightsPage = () => {
  const [wasteType, setWasteType] = useState('');
  const [demand, setDemand] = useState('Low');
  const [weight, setWeight] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setError(null);
    setPredictionResult(null);

    const requestData = {
      waste_type: wasteType,
      demand: demand,
      weight: parseFloat(weight),
    };

    try {
      const response = await fetch('https://agriwaste-api-1.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error('Prediction failed. Please check the input values.');

      const result = await response.json();
      setPredictionResult(result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#e8f5e9] dark:from-[#072c24] dark:via-[#143d2f] dark:to-[#1e4032] text-gray-900 dark:text-white animate-fadeIn">
      <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/70 dark:bg-black/30 rounded-3xl shadow-2xl p-8 border border-green-200 dark:border-green-700 transition-all duration-500">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-300 tracking-tight flex items-center justify-center gap-2">
            <Lightbulb className="text-yellow-500 animate-pulse" /> AI Waste Value Prediction
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Predict your agri-waste's market potential 🔮</p>
        </div>

        <div className="flex justify-center mb-6">
          <img
            src="https://images.squarespace-cdn.com/content/v1/55ed989ee4b0c7f115ddc924/1484212011925-42IUAV4J57NLU81PB9CJ/image-asset.gif"
            alt="AI Prediction"
            className="rounded-xl max-h-64 shadow-lg"
          />
        </div>

        <div className="space-y-5">
          <div>
            <label className="block font-medium text-lg mb-1 flex items-center gap-2">
              <Leaf className="text-green-600" /> Waste Type
            </label>
            <input
              type="text"
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value)}
              placeholder="e.g., Coconut shells"
              className="w-full px-4 py-2 rounded-lg border border-green-300 dark:border-green-500 bg-white dark:bg-[#1b2d24] shadow-md focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block font-medium text-lg mb-1 flex items-center gap-2">
              <TrendingUp className="text-purple-500" /> Demand Level
            </label>
            <select
              value={demand}
              onChange={(e) => setDemand(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-purple-300 dark:border-purple-500 bg-white dark:bg-[#291f3d] shadow-md focus:ring-2 focus:ring-purple-400"
            >
              <option value="Low">📉 Low</option>
              <option value="Medium">⚖️ Medium</option>
              <option value="High">📈 High</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-lg mb-1 flex items-center gap-2">
              <Weight className="text-blue-600" /> Weight (in kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 1"
              className="w-full px-4 py-2 rounded-lg border border-blue-300 dark:border-blue-500 bg-white dark:bg-[#1f2d44] shadow-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handlePredict}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white text-lg font-semibold px-6 py-2 rounded-full shadow-lg transition-all transform hover:scale-105"
            >
              🔍 Predict
            </button>
          </div>

          {predictionResult && (
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 text-sm shadow-xl animate-slideInUp">
              <h2 className="text-2xl font-bold mb-2 text-green-700 dark:text-green-300">✨ Prediction Result:</h2>
              <pre className="whitespace-pre-wrap">{JSON.stringify(predictionResult, null, 2)}</pre>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 shadow-md animate-shake">
              ❌ Error: {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPage;
