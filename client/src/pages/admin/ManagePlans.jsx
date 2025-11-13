import { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Plus, Search, Edit, Filter, Trash } from "lucide-react";
import { getAllPlans } from "../../api/plan";
import toast from "react-hot-toast";
import AddPlanDialog from "../../dialogs/AddPlanDialog";
import EditPlanDialog from "../../dialogs/EditPlanDialog";

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [addPlanDialog, setAddPlanDialog] = useState(false);
  const [editPlanDialog, setEditPlanDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const fetchPlans = async () => {
    try {
      const data = await getAllPlans();
      if (data?.ok) {
        setPlans(data?.plans);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Oops! Something went wrong"
      );
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "All" || plan.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const handleAddPlan = () => {
    setAddPlanDialog(true);
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setEditPlanDialog(true);
  };

  const handleDialogSuccess = () => {
    fetchPlans();
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Manage Plans
          </h2>
          <p className="text-gray-600">
            Create, edit, and manage fitness programs
          </p>
        </div>

        {/* Search / Filter / Add */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search plans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-3">
              <Filter className="text-gray-500 w-5 h-5" />
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Add Plan */}
            <button
              onClick={handleAddPlan}
              className="flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Plan
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              {plan.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={plan.imageUrl}
                    alt={plan.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {plan.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      plan.difficulty
                    )}`}
                  >
                    {plan.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {plan.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-medium text-gray-800">
                      {plan.type}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium text-gray-800">
                      {plan.duration}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-medium text-orange-600">
                      ${plan.price}
                    </span>
                  </div>
                </div>

                {/* Features */}
                {plan.features && plan.features.length > 0 && (
                  <div className="mb-4 pb-4 border-t border-gray-200 pt-4">
                    <div className="text-xs text-gray-500 mb-2">Features:</div>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(plan.features) ? plan.features : [])
                        .slice(0, 3)
                        .map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditPlan(plan)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No plans found matching your criteria
            </p>
          </div>
        )}
      </main>

      {/* Dialogs */}
      {addPlanDialog && (
        <AddPlanDialog
          onClose={() => setAddPlanDialog(false)}
          onSuccess={handleDialogSuccess}
        />
      )}

      {editPlanDialog && selectedPlan && (
        <EditPlanDialog
          plan={selectedPlan}
          onClose={() => {
            setEditPlanDialog(false);
            setSelectedPlan(null);
          }}
          onSuccess={handleDialogSuccess}
        />
      )}
    </div>
  );
};

export default ManagePlans;
