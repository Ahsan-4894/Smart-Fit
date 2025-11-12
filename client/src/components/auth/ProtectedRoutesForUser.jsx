import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesForUser = ({ children, user, redirect = "/login" }) => {
  if (!user || user.role !== "user") {
    return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoutesForUser;
