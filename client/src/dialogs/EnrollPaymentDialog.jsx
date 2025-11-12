import React, { useState } from "react";

const EnrollPaymentDialog = ({ plan, onClose, onSuccess }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Invalid email format";
    }
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^\+?[\d\s-()]+$/.test(form.phone)) {
      e.phone = "Invalid phone format";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePayment = () => {
    if (!validate()) return;

    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      onSuccess && onSuccess();
    }, 1500);
  };

  // Calculate tax and total (example)
  const priceValue = plan?.price || 0;
  const taxRate = 0.1; // 10% tax
  const tax = priceValue * taxRate;
  const total = priceValue + tax;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Enroll in {plan?.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-light"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Complete your details to proceed with payment
          </p>
        </div>

        <div className="px-6 py-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - User Details Form */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Your Details</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" required />
                  <span className="text-xs text-gray-600">
                    I agree to the terms and conditions and privacy policy
                  </span>
                </label>
              </div>
            </div>

            {/* Right Column - Order Summary Receipt */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                {/* Plan Info */}
                <div className="border-b border-gray-300 pb-4 mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {plan?.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        One-time session
                      </p>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      ${plan?.price}
                    </span>
                  </div>

                  {/* Features preview */}
                  <div className="mt-3 space-y-1">
                    {plan?.features.slice(0, 3).map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-gray-600"
                      >
                        <span className="text-orange-600">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ${priceValue.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-medium text-gray-900">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-medium text-gray-900">$0.00</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-orange-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Payment Method Badge */}
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <span>Secured by</span>
                    <span className="font-semibold text-indigo-600">
                      Stripe
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span>🔒</span>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>↩️</span>
                  <span>Money Back</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Payment Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Pay ${total.toFixed(2)} with Stripe</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollPaymentDialog;
