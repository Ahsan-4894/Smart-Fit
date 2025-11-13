import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { updatePlan } from "../api/plan";
import toast from "react-hot-toast";

const EditPlanDialog = ({ plan, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    difficulty: "Beginner",
    duration: "",
    price: "",
    description: "",
    features: "",
    availability: "",
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        title: plan.title || "",
        type: plan.type || "",
        difficulty: plan.difficulty || "",
        duration: plan.duration || "",
        price: plan.price || "",
        description: plan.description || "",
        features: Array.isArray(plan.features)
          ? plan.features.join(", ")
          : plan.features || "",
        availability: plan.availability || "",
      });
    }
  }, [plan]);

  const handleEdit = async () => {
    if (
      !formData.title ||
      !formData.type ||
      !formData.duration ||
      !formData.price ||
      !formData.description ||
      !formData.features ||
      !formData.availability
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    formData["id"] = plan.id;
    try {
      const response = await updatePlan(formData);
      if (response?.ok) {
        toast.success("Plan updated successfully!");
        onSuccess && onSuccess();
        onClose();
      } else {
        toast.error(response?.message || "Failed to update plan");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update plan");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h3 className="text-2xl font-bold text-gray-800">Edit Plan</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Plan Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan Name *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="e.g., Morning Yoga Flow"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type *
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            >
              <option value="">Select Type</option>
              <option value="Yoga">Yoga</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength Training">Strength Training</option>
              <option value="HIIT">HIIT</option>
              <option value="Pilates">Pilates</option>
              <option value="CrossFit">CrossFit</option>
              <option value="Martial Arts">Martial Arts</option>
              <option value="Dance">Dance</option>
            </select>
          </div>

          {/* Difficulty & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty *
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="e.g., 30 minutes"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price ($) *
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="e.g., 25"
              min="0"
              step="0.01"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              rows="3"
              placeholder="Describe the plan..."
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features (comma-separated)
            </label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="e.g., Flexibility training, Breathing exercises, Meditation"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) =>
                setFormData({ ...formData, availability: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="e.g., Monday, Wednesday, Friday - 7:00 AM"
            />
          </div>

          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Update Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlanDialog;
