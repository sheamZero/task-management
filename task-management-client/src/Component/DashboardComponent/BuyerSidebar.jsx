import { Link, NavLink, useNavigate } from "react-router";
import { IoClose } from "react-icons/io5";
import {
  FaHome,
  FaPlusCircle,
  FaTasks,
  FaCoins,
  FaHistory,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";

const BuyerSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
    "py-3 px-4 flex items-center gap-3 rounded-2xl font-semibold hover:bg-secondary hover:text-secondary-content transition-colors duration-200";

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-64 z-40 bg-primary text-primary-content
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}
    >
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-2 hover:bg-secondary hover:text-secondary-content rounded-lg"
        >
          <IoClose size={28} />
        </button>
      </div>

      {/* Sidebar content (never scrolls) */}
      <nav className="flex flex-col h-full justify-between p-4">
        <div className="space-y-1">
          {/* Logo */}
          <div className="hidden lg:block text-center text-2xl font-bold mb-6">
            <Link to="/" onClick={onClose}>
              ZenTask
            </Link>
          </div>

          {/* Links */}
          <NavLink onClick={onClose} to="/dashboard" className={linkClass}>
            <FaHome /> Home
          </NavLink>

          <NavLink onClick={onClose} to="/dashboard/add-task" className={linkClass}>
            <FaPlusCircle /> Add Task
          </NavLink>

          <NavLink onClick={onClose} to="/dashboard/my-tasks" className={linkClass}>
            <FaTasks /> My Tasks
          </NavLink>

          <NavLink onClick={onClose} to="/dashboard/purchase-coin" className={linkClass}>
            <FaCoins /> Purchase Coin
          </NavLink>

          <NavLink
            onClick={onClose}
            to={`/dashboard/payment-history/${user.email}`}
            className={linkClass}
          >
            <FaHistory /> Payment History
          </NavLink>
        </div>

        {/* Profile & Logout */}
        <div className="flex flex-col gap-3 pt-6">
          <NavLink onClick={onClose} to="/dashboard/profile" className={linkClass}>
            <FaUserCircle /> Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className="py-3 w-full flex gap-2 items-center justify-center bg-red-500 hover:bg-red-600 rounded-2xl font-semibold transition-colors duration-200"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default BuyerSidebar;
