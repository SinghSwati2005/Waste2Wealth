import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { Card, CardContent, Button } from '../components/ui/CustomUI';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend);

const GovSchemes = () => {
  const [aadhaarImage, setAadhaarImage] = useState(null);
  const [panImage, setPanImage] = useState(null);
  const [formData, setFormData] = useState({ name: '', dob: '', gender: '', pan: '', aadhaar: '' });
  const [submitted, setSubmitted] = useState(false);
  const [appliedSchemes, setAppliedSchemes] = useState({ education: 0, healthcare: 0, agriculture: 0 });

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (type === "aadhaar") setAadhaarImage(file);
    else if (type === "pan") setPanImage(file);
  };

  const extractText = async () => {
    if (!aadhaarImage || !panImage) return toast.error("Please upload both Aadhaar and PAN images");

    const aadhaarResult = await Tesseract.recognize(aadhaarImage, 'eng');
    const panResult = await Tesseract.recognize(panImage, 'eng');

    const aadhaarText = aadhaarResult.data.text;
    const panText = panResult.data.text;

    const nameMatch = aadhaarText.match(/(?<=Name\s*:?\s*)[A-Za-z\s]+/);
    const dobMatch = aadhaarText.match(/\d{2}\/\d{2}\/\d{4}/);
    const genderMatch = aadhaarText.match(/Male|Female|Other/i);
    const panMatch = panText.match(/[A-Z]{5}\d{4}[A-Z]/);
    const aadhaarMatch = aadhaarText.match(/\d{4}\s\d{4}\s\d{4}/);

    setFormData({
      name: nameMatch ? nameMatch[1].trim() : 'Swati Singh',
      dob: dobMatch ? dobMatch[0] : '',
      gender: genderMatch ? genderMatch[0] : '',
      pan: panMatch ? panMatch[0] : '',
      aadhaar: aadhaarMatch ? aadhaarMatch[0] : ''
    });
  };

  const handleAutoSubmit = (category) => {
    setSubmitted(true);
    const updated = { ...appliedSchemes };
    updated[category] += 1;
    setAppliedSchemes(updated);
    alert(`Applied successfully for ${category.charAt(0).toUpperCase() + category.slice(1)} scheme!`);
  };

  const pieChartData = {
    labels: ["Education", "Healthcare", "Agriculture"],
    datasets: [
      {
        label: "Schemes Applied",
        data: [appliedSchemes.education, appliedSchemes.healthcare, appliedSchemes.agriculture],
        backgroundColor: ["#60a5fa", "#34d399", "#facc15"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-[#FAFAF9] px-10 py-12 text-[#2F2F2F]">
      <h2 className="text-2xl font-semibold mb-6">Upload Aadhaar and PAN Card</h2>

      {/* Upload Section */}
      <div className="flex flex-col md:flex-row gap-5 mb-4">
        <div>
          <label className="block mb-1 font-medium">Upload Aadhaar Card</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'aadhaar')} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Upload PAN Card</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'pan')} />
        </div>
      </div>
      <Button onClick={extractText} className="bg-blue-600 text-white hover:bg-blue-700 mb-4">Extract and Auto-Fill Form</Button>

      {/* Auto-filled Form */}
      <div className="bg-white rounded-md p-5 shadow mb-10">
        <h3 className="text-lg font-medium mb-3">Auto-filled Form</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Full Name" className="border p-2 rounded" />
          <input value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} placeholder="Date of Birth" className="border p-2 rounded" />
          <input value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} placeholder="Gender" className="border p-2 rounded" />
          <input value={formData.pan} onChange={e => setFormData({ ...formData, pan: e.target.value })} placeholder="PAN Number" className="border p-2 rounded" />
          <input value={formData.aadhaar} onChange={e => setFormData({ ...formData, aadhaar: e.target.value })} placeholder="Aadhaar Number" className="border p-2 rounded" />
        </div>
        {submitted && <p className="mt-3 text-green-600 font-semibold">Form submitted successfully!</p>}
      </div>

      {/* Sample Schemes Section */}
      <h3 className="text-xl font-semibold mb-4">Available Schemes</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[ 
          { name: "Education Support Yojana", category: "education" },
          { name: "Ayushman Bharat", category: "healthcare" },
          { name: "PM-Kisan Samman", category: "agriculture" },
        ].map((scheme, index) => (
          <Card key={index} className="bg-white shadow border p-4">
            <CardContent>
              <h4 className="text-lg font-bold mb-2">{scheme.name}</h4>
              <p className="text-gray-600 mb-3">Click below to apply using auto-filled form data.</p>
              <Button onClick={() => handleAutoSubmit(scheme.category)} className="bg-green-600 text-white hover:bg-green-700">
                Apply
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pie Chart Section */}
      <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-center">Schemes You've Applied</h3>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default GovSchemes;
