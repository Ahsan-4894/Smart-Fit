import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesForAdmin = ({ user, redirect = "/admin/login" }) => {
  if (!user || user.role !== "ROLE_ADMIN")
    return <Navigate to={redirect} replace />;

  return <Outlet />;
};

export default ProtectedRoutesForAdmin;
