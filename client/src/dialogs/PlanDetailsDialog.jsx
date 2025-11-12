const PlanDetailsDialog = ({ plan, onClose }) => {
  // Extended plan details (you can fetch these from backend or add to plansData)
  const planDetails = {
    Intermediate: {
      description:
        "Perfect for those just starting their fitness journey. Get personalized guidance and build a foundation for success.",
      includes: [
        "One-on-one coaching session",
        "Basic fitness assessment",
        "Goal setting consultation",
        "Exercise recommendations",
        "Follow-up email summary",
      ],
      idealFor: [
        "Fitness beginners",
        "Busy professionals",
        "Quick consultations",
      ],
    },
    Beginner: {
      description:
        "Take your fitness to the next level with an in-depth coaching session tailored to your specific goals and needs.",
      includes: [
        "Extended one-on-one coaching",
        "Comprehensive fitness assessment",
        "Personalized workout plan (2 weeks)",
        "Form correction and technique tips",
        "Progress tracking setup",
        "Nutrition basics overview",
      ],
      idealFor: [
        "Regular gym-goers",
        "Athletes in training",
        "Weight loss goals",
      ],
    },
    Advance: {
      description:
        "Our premium offering for serious athletes and fitness enthusiasts. Get comprehensive coaching with nutrition guidance included.",
      includes: [
        "Extended deep-dive coaching session",
        "Advanced fitness and body composition analysis",
        "Personalized workout plan (4 weeks)",
        "Detailed nutrition guide and meal planning",
        "Supplement recommendations",
        "Video form analysis",
        "Monthly progress check-ins (2 included)",
      ],
      idealFor: [
        "Competitive athletes",
        "Body transformation goals",
        "Advanced fitness enthusiasts",
      ],
    },
  };
  const details = planDetails[plan?.difficulty];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{plan?.title}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-2xl font-bold text-orange-600">
                ${plan?.price}
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                {plan.difficulty}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Overview
            </h3>
            <p className="text-gray-600 leading-relaxed">{plan.description}</p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Duration</div>
              <div className="font-semibold text-gray-900">{plan.duration}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Difficulty Level</div>
              <div className="font-semibold text-gray-900">
                {plan.difficulty}
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              What's Included
            </h3>
            <ul className="space-y-2">
              {details.includes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-orange-600 mt-1">✓</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal For */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Ideal For
            </h3>
            <div className="flex flex-wrap gap-2">
              {details.idealFor.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Availability</span>
              <span className="font-medium text-gray-900">
                {plan.availability}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsDialog;
