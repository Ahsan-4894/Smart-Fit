import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useEffect, useState, lazy } from "react";
import { Toaster } from "react-hot-toast";

// User related pages
const Home = lazy(() => import("./pages/user/Home"));
const Login = lazy(() => import("./pages/user/Login"));
const Signup = lazy(() => import("./pages/user/Signup"));
const Dashboard = lazy(() => import("./pages/user/Dashboard"));
const Chat = lazy(() => import("./pages/user/Chat"));
const BrowsePlans = lazy(() => import("./pages/user/BrowsePlans"));
const PaymentSuccess = lazy(() => import("./pages/user/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./pages/user/PaymentCancel"));

// Auth route wrappers
const ProtectedRoutesForUser = lazy(() =>
  import("./components/auth/ProtectedRoutesForUser")
);
const PublicRoutesForUser = lazy(() =>
  import("./components/auth/PublicRoutesForUser")
);
const ProtectedRoutesForAdmin = lazy(() =>
  import("./components/auth/ProtectedRoutesForAdmin")
);
const PublicRoutesForAdmin = lazy(() =>
  import("./components/auth/PublicRoutesForAdmin")
);

// Admin related pages
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminManagePlans = lazy(() => import("./pages/admin/ManagePlans"));

// Common Components
const LayoutLoader = lazy(() => import("./components/LayoutLoader"));

import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { currentGetLoggedInUser } from "./api/auth";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const data = await currentGetLoggedInUser();
        if (data?.ok) {
          dispatch(userExists(data?.user));
        } else {
          dispatch(userNotExists());
        }
      } catch (err) {
        dispatch(userNotExists());
      } finally {
        setLoading(false);
      }
    };
    fetchLoggedInUser();
  }, []);

  if (loading) {
    return <LayoutLoader />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          {/* Public routes - redirect to dashboard if already logged in */}
          <Route element={<PublicRoutesForUser user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Protected routes - require authentication */}
          <Route
            element={<ProtectedRoutesForUser user={user} redirect="/login" />}
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/plans" element={<BrowsePlans />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />
          </Route>

          <Route element={<PublicRoutesForAdmin user={user} />}>
            <Route path="/admin/login" element={<AdminLogin />} />
          </Route>
          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoutesForAdmin user={user} />}>
            <Route path="/admin/">
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="manage-plans" element={<AdminManagePlans />} />
            </Route>
          </Route>
          {/* Admin Protected Routes */}
        </Routes>
      </Suspense>
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;
