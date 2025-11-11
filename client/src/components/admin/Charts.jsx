import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const WeeklySalesChart = ({ labels, dataArr }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Sales ($)",
        data: dataArr,
        borderColor: "#ea580c",
        backgroundColor: "rgba(234, 88, 12, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
  };

  return <Line data={data} options={options} />;
};
export const PopularSessionsChart = ({ labels, dataArr }) => {
  const data = {
    labels: labels, //["Yoga", "Cardio", "Strength", "HIIT", "Wellness"],
    datasets: [
      {
        label: "Sessions",
        data: dataArr, //[120, 90, 75, 60, 45],
        backgroundColor: "#ea580c",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
  };

  return <Bar data={data} options={options} />;
};
