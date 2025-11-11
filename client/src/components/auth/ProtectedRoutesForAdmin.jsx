import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesForAdmin = ({
  children,
  user,
  redirect = "/admin/login",
}) => {
  if (user.role != "admin") return <Navigate to={redirect} />;

  return children ? children : <Outlet />;
};

export default ProtectedRoutesForAdmin;
