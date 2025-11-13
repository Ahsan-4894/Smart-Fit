import Sidebar from "../../components/Sidebar";
import { DonughtChart } from "../../components/Charts";
import QuickStats from "../../components/QuickStats";
import EnrolledPrograms from "../../components/EnrolledPrograms";
import toast from "react-hot-toast";
import { dashboard } from "../../api/user";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    enrolledCount: 0,
    totalHours: 0,
    nextSession: "",
    allEnrolledPrograms: [{}],
    totalProgramsCount: 0,
    avgDuration: 0,
    goalProgress: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboard();
        if (data?.ok) {
          setStats(data?.dashboard);
        } else {
          toast.error(data?.message);
        }
      } catch (err) {
        toast.error(
          err?.response?.data?.message || "Oops! Something went wrong"
        );
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="min-h-screen flex">
        <Sidebar />

        <main className="flex-1 p-4 md:p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-gray-600">
                Here's your fitness journey overview
              </p>
            </div>

            {/* Quick Stats */}
            <QuickStats details={stats} />

            {/* Enrolled Programs */}
            <div className="mb-8">
              <EnrolledPrograms enrolledPrograms={stats.allEnrolledPrograms} />
            </div>

            {/* Charts Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Performance Analytics
              </h2>
              <DonughtChart
                labels={["Completed", "Left"]}
                dataArr={[stats?.goalProgress[0], stats.goalProgress[1]]}
                totalWorkouts={stats?.totalHours}
                avgDuration={stats?.avgDuration}
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600">💪</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Completed Pro Session - Week 3
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                  <span className="text-xs text-green-600 font-semibold">
                    +15 XP
                  </span>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600">📈</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Weight milestone achieved - 76kg
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                  </div>
                  <span className="text-xs text-green-600 font-semibold">
                    +25 XP
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600">🎯</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      7-day streak maintained
                    </p>
                    <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                  </div>
                  <span className="text-xs text-green-600 font-semibold">
                    +10 XP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
