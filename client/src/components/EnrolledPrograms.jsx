import { useState } from "react";
import PlanDetailsDialog from "../dialogs/PlanDetailsDialog";
const EnrolledPrograms = ({ enrolledPrograms = [] }) => {
  const [showPlanDetailsDialog, setShowPlanDetailsDialog] = useState(false);

  const handlePlanDetailsDialog = () => setShowPlanDetailsDialog(true);

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
        {enrolledPrograms.map((program, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
          >
            {/* Image Header */}
            <div className="relative h-40">
              <img
                src={program.imageUrl}
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
              <p className="text-sm text-gray-500 mb-4">Type: {program.type}</p>

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

              {/* Next Session */}
              <div className="bg-orange-50 rounded-lg p-3 mb-4">
                <div className="text-xs text-gray-500 mb-1">Availability</div>
                <div className="text-sm font-semibold text-gray-900">
                  {program.availability}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handlePlanDetailsDialog}
                  className="px-4 py-2 border border-gray-200 hover:border-orange-600 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                >
                  Details
                </button>
              </div>
            </div>

            {showPlanDetailsDialog && (
              <PlanDetailsDialog
                plan={program}
                onClose={() => setShowPlanDetailsDialog(false)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledPrograms;
