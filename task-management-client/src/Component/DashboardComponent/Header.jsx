import { useEffect, useRef, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import useAuth from "../../Hook/useAuth";
import axios from "axios";
import { motion } from "framer-motion";
import Notification from "./Notification";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router";

const Header = () => {
    const [notification, setNotification] = useState([]);
    const { user, logout } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef();
    const navigate = useNavigate()

    const email = user?.email;

    // Fetch user details
    useEffect(() => {
        if (!user?.accessToken) return;
        if (email) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/users/${encodeURIComponent(email)}`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                })
                .then(res => setUserDetails(res.data))
                .catch(error => {
                    const status = error.response?.status;

                    if (status === 401 || status === 400) {
                        // No token or invalid token
                        logout();
                        navigate('/login');
                    } else if (status === 403) {
                        navigate('/forbidden');
                    } else {
                        console.error("Unexpected error", error);
                    }
                });
        }
    }, [email, logout, navigate, user?.accessToken]);

    // Fetch notifications
    useEffect(() => {
        if (!user?.accessToken) return;
        if (email) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/notification/${email}`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                })
                .then((res) => {
                    setNotification(res.data);
                })
                .catch(error => {
                    const status = error.response?.status;

                    if (status === 401 || status === 400) {
                        // No token or invalid token
                        logout();
                        navigate('/login');
                    } else if (status === 403) {
                        navigate('/forbidden');
                    } else {
                        console.error("Unexpected error", error);
                    }
                });
        }
    }, [email, user?.accessToken, logout, navigate]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const role = userDetails?.role?.charAt(0).toUpperCase() + userDetails?.role?.slice(1).toLowerCase();

    return (
        <header className="flex flex-wrap items-center justify-between gap-4 px-4 border-b md:px-20 py-4 border-secondary">
            <div className="font-bold text-primary text-2xl hidden lg:block">{role} Dashboard</div>

            <div className="flex items-center gap-4 ml-auto">
                <div className="text-right hidden sm:block">
                    <div className="font-medium">Available coin: {userDetails?.coin}</div>
                    <div className="text-sm capitalize">
                        {userDetails.role} | {user?.displayName}
                    </div>
                </div>
                <img
                    src={user?.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                />

                {/* Notification Button */}
                <motion.button
                    onClick={(e) => {
                        e.stopPropagation(); // prevent closing on click
                        setIsOpen(!isOpen);
                    }}
                    whileHover={{ scale: 1.2 }}
                    className="text-primary cursor-pointer"
                >
                    <IoNotifications size={24} />
                </motion.button>
            </div>

            {/* Notification Popup */}
            {isOpen && (
                <div
                    ref={popupRef}
                    className="absolute bg-base-300/80 flex flex-col gap-3 items-center shadow-lg backdrop-blur w-sm text-secondary p-6 overflow-y-scroll rounded-2xl h-[70vh] right-16 z-50 top-20"
                >
                    <Fade>
                        {notification.length === 0 ? (
                            <p className="text-2xl text-base-content">No Notification</p>
                        ) : (
                            notification.map((n, index) => (
                                <Notification key={index} n={n} />
                            ))
                        )}
                    </Fade>
                </div>
            )}
        </header>
    );
};

export default Header;
