import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesForUser = ({ user, redirect = "/login" }) => {
  // Check if user exists and has the correct role
  if (!user || user.role !== "ROLE_USER") {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutesForUser;
