import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import PlanDetailsDialog from "../../dialogs/PlanDetailsDialog";
import EnrollPaymentDialog from "../../dialogs/EnrollPaymentDialog";

const BrowsePlans = () => {
  const plansData = [
    {
      id: "starter",
      title: "Starter Session",
      price: "$9",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
      features: ["1-on-1 Coaching", "15 min session", "Basic plan"],
      duration: "15 min",
      difficulty: "Beginner",
    },
    {
      id: "pro",
      title: "Pro Session",
      price: "$29",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      features: ["1-on-1 Coaching", "45 min session", "Personalized plan"],
      duration: "45 min",
      difficulty: "Intermediate",
    },
    {
      id: "elite",
      title: "Elite Session",
      price: "$59",
      image:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
      features: ["1-on-1 Coaching", "90 min deep dive", "Nutrition guide"],
      duration: "90 min",
      difficulty: "Advanced",
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Plans");

  // Filter plans based on active filter
  const filteredPlans =
    activeFilter === "All Plans"
      ? plansData
      : plansData.filter((plan) => plan.difficulty === activeFilter);

  const openDetails = (plan) => {
    setSelectedPlan(plan);
    setShowDetailsModal(true);
  };

  const openEnroll = (plan) => {
    setSelectedPlan(plan);
    setShowEnrollModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="min-h-screen flex">
        <Sidebar />

        <main className="flex-1 p-4 md:p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Browse Fitness Plans
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Choose the perfect plan to achieve your fitness goals
              </p>
            </div>

            {/* Filter/Sort Section (Optional) */}
            <div className="mb-6 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveFilter("All Plans")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "All Plans"
                    ? "bg-orange-600 text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-orange-600"
                }`}
              >
                All Plans
              </button>
              <button
                onClick={() => setActiveFilter("Beginner")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "Beginner"
                    ? "bg-orange-600 text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-orange-600"
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => setActiveFilter("Intermediate")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "Intermediate"
                    ? "bg-orange-600 text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-orange-600"
                }`}
              >
                Intermediate
              </button>
              <button
                onClick={() => setActiveFilter("Advanced")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "Advanced"
                    ? "bg-orange-600 text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-orange-600"
                }`}
              >
                Advanced
              </button>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan) => (
                  <article
                    key={plan.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100"
                  >
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={plan.image}
                        alt={plan.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-orange-600 font-bold text-lg">
                          {plan.price}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {plan.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {plan.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>⏱️ {plan.duration}</span>
                          <span>•</span>
                          <span>👤 1-on-1</span>
                        </div>
                      </div>

                      <ul className="text-sm text-gray-600 mb-6 space-y-2 flex-1">
                        {plan.features.map((f, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-orange-600 mt-0.5">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => openEnroll(plan)}
                          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95"
                        >
                          Enroll Now
                        </button>
                        <button
                          onClick={() => openDetails(plan)}
                          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-orange-600 hover:text-orange-600 transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No plans found for this difficulty level
                  </p>
                </div>
              )}
            </div>

            {/* Additional Info Section */}
            <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose SmartFit?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">🎯</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Personalized Plans
                    </h3>
                    <p className="text-sm text-gray-600">
                      Tailored to your fitness level and goals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-3xl">💪</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Expert Coaches
                    </h3>
                    <p className="text-sm text-gray-600">
                      Certified professionals with years of experience
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-3xl">📊</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Track Progress
                    </h3>
                    <p className="text-sm text-gray-600">
                      Monitor your journey with detailed analytics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modals */}
        {showDetailsModal && selectedPlan && (
          <PlanDetailsDialog
            plan={selectedPlan}
            onClose={() => {
              setShowDetailsModal(false);
              setSelectedPlan(null);
            }}
          />
        )}

        {showEnrollModal && selectedPlan && (
          <EnrollPaymentDialog
            plan={selectedPlan}
            onClose={() => {
              setShowEnrollModal(false);
              setSelectedPlan(null);
            }}
            onSuccess={() => {
              setShowEnrollModal(false);
              setSelectedPlan(null);
              alert("Payment successful! 🎉 Enrollment complete.");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BrowsePlans;
