import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export const DonughtChart = ({
  labels,
  dataArr,
  totalWorkouts,
  avgDuration,
}) => {
  const doughnutData = {
    labels: labels, // ["Completed", "Left"],
    datasets: [
      {
        data: dataArr, //[65, 35],
        backgroundColor: ["#FB923C", "#F3F4F6"],
        hoverOffset: 6,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
    cutout: "70%",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Performance Summary
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Recent trends and summary of your activity.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-xs text-gray-500">Total Workouts</div>
              <div className="text-xl font-semibold text-orange-600">
                {totalWorkouts}
              </div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-xs text-gray-500">Avg Duration</div>
              <div className="text-xl font-semibold text-orange-600">
                {avgDuration}
              </div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-xs text-gray-500">Calories/week</div>
              <div className="text-xl font-semibold text-orange-600">0k</div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Goal Progress
          </h3>
          <div className="w-48 h-48">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
