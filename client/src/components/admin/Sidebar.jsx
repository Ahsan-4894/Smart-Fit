import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Dumbbell, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../api/admin";
import toast from "react-hot-toast";
import { userNotExists } from "../../redux/reducers/auth";

const Sidebar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Manage Plans", path: "/admin/manage-plans", icon: "📋" },
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    console.log("Under admin/Sidebar.jsx, under handleLogout page");
    try {
      const data = await logout();
      if (data?.ok) {
        dispatch(userNotExists());
        toast.success(data?.message);
        navigate("/admin/login");
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Oops! Something went wrong");
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-3 bg-gradient-to-r from-orange-700 to-orange-600 text-white shadow-md">
        <div className="flex items-center gap-2">
          <Dumbbell size={24} className="font-bold" />
          <h1 className="text-lg font-bold">SmartFit</h1>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1 hover:bg-orange-800 rounded-md transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0 md:flex-shrink-0 w-64 bg-white shadow-2xl border-r border-gray-200 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full md:h-screen">
          {/* Logo / Title - Compact */}
          <div className="px-6 py-4 bg-gradient-to-r from-orange-700 to-orange-600 text-white font-bold text-xl flex items-center gap-2 shadow-lg">
            <Dumbbell size={28} />
            <span>SmartFit</span>
          </div>

          {/* Nav Links - Compact Spacing with Animations */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navItems.map((item) =>
              item.path ? (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 relative group text-gray-700"
                >
                  <span className="text-base transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="transition-all duration-300">
                    {item.name}
                  </span>
                </Link>
              ) : (
                <div
                  key={item.name}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 transition-all duration-300 relative group cursor-default"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-base transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="transition-all duration-300">
                    {item.name}
                  </span>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-700 rounded-l-full" />
                </div>
              )
            )}
          </nav>

          {/* Logout Button */}
          <div className="logout-btn mt-auto p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg transition-all duration-300 hover:from-red-700 hover:to-red-600"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Footer - visible on mobile, hidden on desktop */}
          <div className="md:hidden p-4 border-t border-gray-200 text-center text-gray-500 text-xs">
            © 2025 SmartFit
          </div>
          {/* Desktop footer (below logout) */}
          <div className="hidden md:block p-4 text-center text-gray-500 text-xs">
            © 2025 SmartFit
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};
export default Sidebar;
