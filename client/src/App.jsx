import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
// User related imports
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import LayoutLoader from "./components/LayoutLoader";
import Dashboard from "./pages/user/Dashboard";
import ProtectedRoutesForUser from "./components/auth/ProtectedRoutesForUser";
import PublicRoutesForUser from "./components/auth/PublicRoutesForUser";

import ProtectedRoutesForAdmin from "./components/auth/ProtectedRoutesForAdmin";

import Chat from "./pages/user/Chat";
import BrowsePlans from "./pages/user/BrowsePlans";

// Admin related imports
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminManagePlans from "./pages/admin/ManagePlans";

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
          {/* <Route element={<PublicRoutesForUser user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route> */}

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* <Route
            element={
              <ProtectedRoutesForUser user={user} redirect="/dashboard" />
            }
          > */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/plans" element={<BrowsePlans />} />
          {/* </Route> */}

          {/* Admin Protected Routes */}
          {/* <Route element={<ProtectedRoutesForAdmin user={user} />}> */}
          <Route path="/admin/">
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route   path="manage-plans" element={<AdminManagePlans />} />
          </Route>
          {/* </Route> */}
        </Routes>
        {/* Admin Protected Routes */}
      </Suspense>
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;
