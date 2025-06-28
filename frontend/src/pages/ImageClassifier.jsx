import React, { useState } from 'react';
import axios from 'axios';

export default function ImageClassifier() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await axios.post("https://web-production-3b84.up.railway.app/predict/", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setResult(res.data);
    } catch (err) {
      alert("Failed to fetch prediction.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center space-y-4">
      <h2 className="text-2xl font-bold text-green-800">AgriWaste Classifier</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-64 h-64 object-cover rounded-md mx-auto border"
        />
      )}

      <button
        onClick={handleUpload}
        disabled={!image || loading}
        className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Predicting..." : "Upload & Predict"}
      </button>

      {result && (
        <div className="mt-4 text-left bg-gray-100 p-4 rounded">
          <p><strong>Predicted Class:</strong> {result.class}</p>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}
