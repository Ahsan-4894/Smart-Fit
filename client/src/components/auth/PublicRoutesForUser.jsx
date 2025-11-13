import { Navigate, Outlet } from "react-router-dom";

const PublicRoutesForUser = ({ user }) => {
  // If user is logged in, redirect to dashboard
  if (user && user.role === "ROLE_USER") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoutesForUser;
