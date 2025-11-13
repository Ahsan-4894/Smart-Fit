import { useEffect, useState } from "react";

// Mock functions for demo (replace with your actual imports)
const useSearchParams = () => {
  const [params] = useState(new URLSearchParams(window.location.search));
  return [params];
};

const useNavigate = () => {
  return (path) => {
    window.location.href = path;
  };
};

const verifyPayment = async (sessionId) => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        booking: {
          plan: {
            title: "Pro Session",
            type: "HIIT Training",
            duration: "45 minutes",
          },
          amount: 29,
          bookingDate: new Date().toISOString(),
        },
        session: {
          payment_status: "paid",
        },
      });
    }, 1500);
  });
};

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id") || "demo_session";

    if (!sessionId) {
      setStatus("error");
      return;
    }

    verifyPayment(sessionId)
      .then((data) => {
        setPaymentData(data);
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
      });
  }, [searchParams]);

  // Verifying State
  if (status === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl">💳</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Verifying Your Payment
          </h2>
          <p className="text-gray-600">
            Please wait while we confirm your transaction...
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
              <span className="text-4xl">❌</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Verification Failed
            </h1>
            <p className="text-gray-600">
              We couldn't verify your payment. This could be due to a network
              issue or the payment was cancelled.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-red-600 text-xl">⚠️</span>
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-1">
                  What to do next?
                </h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Check your email for payment confirmation</li>
                  <li>• Contact support if payment was deducted</li>
                  <li>• Try enrolling again</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/browse-plans")}
              className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
            >
              Back to Plans
            </button>
            <button
              onClick={() => navigate("/support")}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success State
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-green-50 p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4 shadow-lg animate-bounce">
            <span className="text-5xl text-white">✓</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            Welcome to your fitness journey!
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Content */}
          <div className="p-8">
            {/* Payment Method */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">💳</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-semibold text-gray-900">
                      Stripe Checkout
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Paid
                </span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <span>📋</span>
                What's Next?
              </h3>
              <ul className="text-sm text-blue-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Check your email for enrollment confirmation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>View your progress in the dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>
                    Start your first session and track your fitness journey
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate("/browse-plans")}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Browse More Plans
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team at{" "}
            <a
              href="mailto:support@smartfit.com"
              className="text-orange-600 hover:underline font-medium"
            >
              support@smartfit.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
