import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import PlanDetailsDialog from "../../dialogs/PlanDetailsDialog";
import EnrollPaymentDialog from "../../dialogs/EnrollPaymentDialog";
import { getAllPlans } from "../../api/plan";
import toast from "react-hot-toast";
const BrowsePlans = () => {
  const [plansData, setPlansData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Plans");

  // Fetch plans from backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getAllPlans();
        if (data?.ok) {
          const plans = data?.plans;
          setPlansData(plans);
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast.error(
          error?.response?.data?.message || "Oops! Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Filter plans based on difficulty
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading plans...</p>
      </div>
    );
  }

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

            {/* Filter Buttons */}
            <div className="mb-6 flex flex-wrap gap-3">
              {["All Plans", "Beginner", "Intermediate", "Advanced"].map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === filter
                        ? "bg-orange-600 text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-orange-600"
                    }`}
                  >
                    {filter}
                  </button>
                )
              )}
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan) => (
                  <article
                    key={plan.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={plan.imageUrl}
                        alt={plan.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-orange-600 font-bold text-lg">
                          ${plan.price}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {plan.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {plan.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Duration: {plan.duration}
                      </p>
                      <ul className="text-sm text-gray-600 mb-6 space-y-2 flex-1">
                        {plan.features.map((f, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-orange-600 mt-0.5">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

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
