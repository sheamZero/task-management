import { Link, NavLink, useNavigate } from "react-router";
import { IoClose } from "react-icons/io5";
import {
  FaHome,
  FaRegUser,
  FaTasks,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";

const AdminSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout()
      .then(() => {
        onClose();
        navigate("/login");
        toast.success("Logout Successful");
      })
      .catch(() => toast.error("Logout Failed"));
  };

  const linkClass =
    "py-3 px-4 w-full flex items-center gap-3 justify-start rounded-xl font-semibold hover:bg-secondary hover:text-secondary-content transition";

  return (
    <aside
      className={`
        fixed lg:static top-0 left-0 h-screen w-64
        bg-primary text-primary-content z-40
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      {/* Close button (mobile) */}
      <div className="lg:hidden flex justify-end p-4">
        <button onClick={onClose} type="button">
          <IoClose size={28} />
        </button>
      </div>

      {/* Sidebar Content */}
      <nav className="flex flex-col h-full justify-between p-4 overflow-hidden">
        <div className="space-y-2">
          <div className="hidden lg:block text-center text-2xl font-bold mb-6">
            <Link to="/">ZenTask</Link>
          </div>

          <NavLink onClick={onClose} to="/dashboard" className={linkClass}>
            <FaHome /> Home
          </NavLink>

          <NavLink
            onClick={onClose}
            to="/dashboard/manage-users"
            className={linkClass}
          >
            <FaRegUser /> Manage Users
          </NavLink>

          <NavLink
            onClick={onClose}
            to="/dashboard/manage-tasks"
            className={linkClass}
          >
            <FaTasks /> Manage Tasks
          </NavLink>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2">
          <NavLink
            onClick={onClose}
            to="/dashboard/profile"
            className={linkClass}
          >
            <FaUserCircle /> Profile
          </NavLink>

          <button
            onClick={handleLogout}
            type="button"
            className="py-3 w-full flex gap-2 items-center justify-center bg-red-500 hover:bg-red-600 rounded-xl font-semibold transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
