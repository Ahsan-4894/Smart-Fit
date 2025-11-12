import { Navigate, Outlet } from "react-router-dom";

const PublicRoutesForUser = ({ user }) => {
  if (user && user.role === "user") {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default PublicRoutesForUser;
