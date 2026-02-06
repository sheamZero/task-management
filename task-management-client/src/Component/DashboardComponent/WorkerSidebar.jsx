import { Link, NavLink, useNavigate } from "react-router";
import { IoClose } from "react-icons/io5";
import {
  FaHome,
  FaPlusCircle,
  FaTasks,
  FaCoins,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";

const WorkerSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
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
    "py-3 w-full gap-2 flex items-center justify-center rounded-2xl font-bold hover:bg-secondary hover:text-secondary-content";

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-64 bg-primary text-primary-content z-40
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}
    >
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end p-4">
        <button onClick={onClose}>
          <IoClose size={28} />
        </button>
      </div>

      {/* Sidebar content (fixed, no scroll) */}
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

          <NavLink onClick={onClose} to="/dashboard/task-list" className={linkClass}>
            <FaPlusCircle /> Task List
          </NavLink>

          <NavLink onClick={onClose} to="/dashboard/my-submission" className={linkClass}>
            <FaTasks /> My Submission
          </NavLink>

          <NavLink onClick={onClose} to="/dashboard/withdraw" className={linkClass}>
            <FaCoins /> Withdraw
          </NavLink>
        </div>

        {/* Profile & Logout */}
        <div className="space-y-2">
          <NavLink onClick={onClose} to="/dashboard/profile" className={linkClass}>
            <FaUserCircle /> Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className="py-3 w-full flex gap-2 items-center justify-center bg-red-400 hover:bg-red-500 rounded-2xl font-bold"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default WorkerSidebar;
