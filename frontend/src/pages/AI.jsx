import React, { useState } from 'react';

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Prediction failed. Please check the input values.');
      }

      const result = await response.json();
      setPredictionResult(result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Insights - Waste Prediction</h1>

      <div className="mb-4">
        <label className="block mb-1">Waste Type</label>
        <input
          type="text"
          value={wasteType}
          onChange={(e) => setWasteType(e.target.value)}
          className="border p-2 w-full"
          placeholder="e.g., Coconut shells"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Demand</label>
        <select
          value={demand}
          onChange={(e) => setDemand(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Weight (in kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border p-2 w-full"
          placeholder="e.g., 1"
        />
      </div>

      <button
        onClick={handlePredict}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Predict
      </button>

      {predictionResult && (
        <div className="mt-6 p-4 bg-green-100 rounded">
          <h2 className="text-xl font-semibold">Prediction Result:</h2>
          <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 rounded text-red-800">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default AIInsightsPage;
