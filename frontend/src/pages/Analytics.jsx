import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { Card, CardContent, Button } from '../components/ui/CustomUI';// Adjust if you're not using shadcn/ui or similar

ChartJS.register(LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Analytics() {
  const dummyLineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales (₹)",
        data: [30000, 50000, 40000, 60000, 70000, 80000],
        fill: false,
        borderColor: "#22c55e",
        tension: 0.4,
      },
    ],
  };

  const dummyDoughnutData = {
    labels: ["Wheat Straw", "Rice Husk", "Sugarcane Bagasse"],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ["#16a34a", "#3b82f6", "#f59e0b"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-[#111827] min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">📊 Analytics Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Monthly Sales Trends</h2>
            <Line data={dummyLineData} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Agri Waste Distribution</h2>
            <Doughnut data={dummyDoughnutData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-md font-medium mb-2">Total Listings</h2>
            <p className="text-3xl font-bold text-green-600">89</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-md font-medium mb-2">Active Buyers</h2>
            <p className="text-3xl font-bold text-blue-500">42</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-md font-medium mb-2">Revenue Generated</h2>
            <p className="text-3xl font-bold text-yellow-500">₹3.2L</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
