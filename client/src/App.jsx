import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

// User related imports
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import LayoutLoader from "./components/LayoutLoader";
import Dashboard from "./pages/user/Dashboard";
import ProtectedRoutesForUser from "./components/auth/ProtectedRoutesForUser";
import ProtectedRoutesForAdmin from "./components/auth/ProtectedRoutesForAdmin";
import Chat from "./pages/user/Chat";
import BrowsePlans from "./pages/user/BrowsePlans";

// Admin related imports
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminManagePlans from "./pages/admin/ManagePlans";

const App = () => {
  const user = {
    role: "admin",
  }; // replace this with react redux.
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        {/* User Protected Routes*/}
        <Routes>
          <Route element={<ProtectedRoutesForUser user={user} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/plans" element={<BrowsePlans />} />
          </Route>

          {/* User Protected Routes*/}

          {/* User Public Routes */}
          <Route element={<ProtectedRoutesForUser user={user} redirect="/" />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* User Public Routes */}

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoutesForAdmin user={user} />}>
            <Route path="/admin/">
              <Route path="login" element={<AdminLogin />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="manage-plans" element={<AdminManagePlans />} />
            </Route>
          </Route>
        </Routes>
        {/* Admin Protected Routes */}
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
