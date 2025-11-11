const EnrolledPrograms = () => {
  const enrolledPrograms = [
    {
      id: 1,
      title: "Pro Session",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      instructor: "John Smith",
      progress: 45,
      totalSessions: 12,
      completedSessions: 5,
      nextSession: "Tomorrow, 10:00 AM",
      difficulty: "Intermediate",
    },
    {
      id: 2,
      title: "Elite Session",
      image:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
      instructor: "Sarah Johnson",
      progress: 20,
      totalSessions: 16,
      completedSessions: 3,
      nextSession: "Friday, 3:00 PM",
      difficulty: "Advanced",
    },
    {
      id: 3,
      title: "Starter Session",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
      instructor: "Mike Davis",
      progress: 0,
      totalSessions: 8,
      completedSessions: 0,
      nextSession: "Monday, 9:00 AM",
      difficulty: "Beginner",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-gray-800">
          My Enrolled Programs
        </h2>
        <span className="text-sm text-gray-500">
          {enrolledPrograms.length} Active
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {enrolledPrograms.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
          >
            {/* Image Header */}
            <div className="relative h-40">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-xs font-semibold text-orange-600">
                  {program.difficulty}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {program.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Coach: {program.instructor}
              </p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>Progress</span>
                  <span className="font-semibold text-orange-600">
                    {program.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-600 to-orange-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${program.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Sessions Info */}
              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <span>📚</span>
                  <span>
                    {program.completedSessions}/{program.totalSessions} Sessions
                  </span>
                </div>
              </div>

              {/* Next Session */}
              <div className="bg-orange-50 rounded-lg p-3 mb-4">
                <div className="text-xs text-gray-500 mb-1">Next Session</div>
                <div className="text-sm font-semibold text-gray-900">
                  {program.nextSession}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition-colors">
                  Continue
                </button>
                <button className="px-4 py-2 border border-gray-200 hover:border-orange-600 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default EnrolledPrograms;
