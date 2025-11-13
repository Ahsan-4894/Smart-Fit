import { useEffect, useState } from "react";

const QuickStats = ({ details = {} }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    setStats([
      {
        label: "Current Streak",
        value: "7 days",
        icon: "🔥",
        change: "+2 from last week",
        changeType: "positive",
      },
      {
        label: "Total Programs",
        value: details.enrolledCount || 0,
        icon: "📊",
        change: "1 new this month",
        changeType: "neutral",
      },
      {
        label: "Total Hours",
        value: `${details.totalHours || 0}h`,
        icon: "⏱️",
        change: "+5.2h from last month",
        changeType: "positive",
      },
      {
        label: "Next Session",
        value: "Tomorrow",
        icon: "📅",
        change: details.nextSession || "Pro Session at 10:00 AM",
        changeType: "neutral",
      },
    ]);
  }, [details]); // Re-run when details prop changes

  // Show loading state if stats not ready
  if (stats.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse"
          >
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl">{stat.icon}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stat.value}
          </div>
          <div className="text-sm font-medium text-gray-700 mb-2">
            {stat.label}
          </div>
          <div
            className={`text-xs ${
              stat.changeType === "positive"
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
