import { Navigate, Outlet } from "react-router-dom";

const PublicRoutesForAdmin = ({ user }) => {
  // If user is logged in, redirect to dashboard
  if (user && user.role === "ROLE_ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoutesForAdmin;
