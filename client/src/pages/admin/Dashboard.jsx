import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Users, DollarSign, Activity, TrendingUp } from "lucide-react";
import { WeeklySalesChart } from "../../components/admin/Charts";
import { PopularSessionsChart } from "../../components/admin/Charts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 1248,
    activeUsers: 342,
    activeSessions: 28,
    todaySales: 4567,
  });

  const StatCard = ({ icon: Icon, title, value, subtitle, trend }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">{value}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          {trend && (
            <div
              className={`flex items-center mt-2 text-sm ${
                trend > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{Math.abs(trend)}% from last week</span>
            </div>
          )}
        </div>
        <div className="bg-orange-100 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-orange-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Dashboard Overview
          </h2>
          <p className="text-gray-600">
            Monitor your platform's performance and user activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            subtitle={`${stats.activeUsers} active now`}
            trend={12}
          />
          <StatCard
            icon={Activity}
            title="Active Sessions"
            value={stats.activeSessions}
            subtitle="Users in live sessions"
            trend={8}
          />
          <StatCard
            icon={DollarSign}
            title="Today's Sales"
            value={`$${stats.todaySales.toLocaleString()}`}
            trend={15}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Sales Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Weekly Sales
            </h3>
            <div style={{ height: "300px" }}>
              <WeeklySalesChart
                labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                dataArr={[65, 59, 80, 81, 56, 55, 40]}
              />
            </div>
          </div>

          {/* Popular Sessions Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Popular Sessions
            </h3>
            <div style={{ height: "300px" }}>
              <PopularSessionsChart
                labels={["Yoga", "Cardio", "Strength", "HIIT", "Wellness"]}
                dataArr={[120, 90, 75, 60, 45]}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
