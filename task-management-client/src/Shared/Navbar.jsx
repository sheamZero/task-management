import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Link, NavLink } from "react-router";
import useAuth from "../Hook/useAuth";
import axios from "axios";
import { ImCoinDollar } from "react-icons/im";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dbUser, setDbUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!user?.accessToken) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
        headers: { authorization: `Bearer ${user?.accessToken}` },
      })
      .then((res) => setDbUser(res.data))
      .catch((err) => console.error(err));
  }, [user?.email, user?.accessToken]);

  const handleLogout = () => {
    logout()
      .then(() => toast.success("Logout Successful"))
      .catch(() => toast.error("Logout Failed"));
  };

  const routes = [
    { path: "/", name: "Home" },
    { path: "/tasks", name: "Tasks" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-[#5a716b] to-[#3f504c] shadow-xl backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center p-4 sm:p-5 relative">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-bold text-white hover:text-secondary transition-colors truncate"
        >
          ZenTask
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-8 font-semibold text-lg text-white">
          {routes.map((r, i) => (
            <NavLink
              key={i}
              to={r.path}
              className={({ isActive }) =>
                `relative transition-colors truncate ${isActive
                  ? "text-secondary after:w-full after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-secondary after:rounded-full"
                  : "hover:text-secondary"
                }`
              }
            >
              {r.name}
            </NavLink>
          ))}
        </div>

        {/* User Section */}
        <div className="flex items-center gap-3 relative">
          {user ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 sm:gap-3 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  referrerPolicy="no-referrer"
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/MBtjqXQ/default-avatar.png"
                  }
                  alt="profile"
                  className="w-9 sm:w-10 h-9 sm:h-10 rounded-full border-2 border-white object-cover"
                />
                <div className="flex items-center gap-1 bg-yellow-400 text-black px-2 sm:px-3 py-1 rounded-full font-bold shadow animate-pulse text-xs sm:text-sm">
                  <ImCoinDollar /> {dbUser?.coin || 0}
                </div>
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-xl shadow-lg z-50 text-center border border-gray-200 overflow-hidden">
                  <NavLink
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-secondary/20 font-semibold"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-red-600 hover:bg-red-100 font-semibold"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-4 font-semibold text-white">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `py-1 px-3 rounded hover:bg-white/20 transition-colors ${
                    isActive ? "bg-white/20" : ""
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `py-1 px-3 rounded hover:bg-white/20 transition-colors ${
                    isActive ? "bg-white/20" : ""
                  }`
                }
              >
                Register
              </NavLink>
            </div>
          )}

          {/* Mobile Menu Icon */}
          <div className="lg:hidden ml-2">
            <FaBars
              size={24}
              className="text-white cursor-pointer hover:text-secondary transition-colors"
              onClick={() => setIsOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-screen w-4/5 sm:w-3/4 bg-[#5a716b]/95 backdrop-blur-md z-40 transition-all duration-300 flex flex-col items-center pt-24 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-5 right-5">
          <RxCross1
            size={28}
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-white hover:text-secondary"
          />
        </div>

        <div className="flex flex-col gap-6 text-lg sm:text-xl font-semibold text-white">
          {routes.map((r, i) => (
            <NavLink
              key={i}
              to={r.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `transition-colors ${isActive ? "text-secondary" : "hover:text-secondary"}`
              }
            >
              {r.name}
            </NavLink>
          ))}

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className="py-2 hover:text-secondary"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="py-2 text-red-600 hover:text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="py-2 hover:text-secondary"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="py-2 hover:text-secondary"
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
