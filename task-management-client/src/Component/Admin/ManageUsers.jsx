import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import useAuth from '../../Hook/useAuth';
import { useNavigate } from 'react-router';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        document.title = "Manage Users";
        if (!user?.accessToken) return;
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/users`, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(res => setUsers(res.data))
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Failed to load users",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .finally(() => setLoading(false));
    }, [user?.accessToken]);

    const updateRole = (e, id) => {
        const newRole = e.target.value;

        axios.patch(`${import.meta.env.VITE_API_URL}/update-role/${id}`, { role: newRole }, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Role Updated",
                    showConfirmButton: false,
                    timer: 1500
                });
                setUsers(prevUsers =>
                    prevUsers.map(u => (u._id === id ? { ...u, role: newRole } : u))
                );
            })
            .catch((error) => {
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
            })
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5a716b",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                })
                    .then(res => {
                        if (res.data.deletedCount) {
                            setUsers(prev => prev.filter(user => user._id !== id));
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch((error) => {
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
                    })
            }
        });
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold text-primary mb-6">Manage Users</h2>

            <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
                <table className="table table-zebra w-full">
                    <thead className="bg-primary text-primary-content">
                        <tr>
                            <th className="text-left">Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Coins</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-6">
                                    <span className="loading loading-bars loading-xs"></span>
                                </td>
                            </tr>
                        ) : users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <img
                                            src={user.imageUrl}
                                            alt={user.name}
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="capitalize">{user.role}</td>
                                    <td>{user.coin}</td>
                                    <td className="flex items-center gap-3 justify-center">
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="p-2 font-semibold rounded-lg bg-error text-white btn-sm"
                                            aria-label={`Delete user ${user.name}`}
                                        >
                                            <MdDelete size={20} />
                                        </button>
                                        <select
                                            onChange={(e) => updateRole(e, user._id)}
                                            className="py-2 px-4 border border-primary/50 rounded-lg font-semibold"
                                            value={user.role}
                                        >
                                            <option value="buyer">Buyer</option>
                                            <option value="worker">Worker</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>
                                    <p className="text-center text-base-content/50 text-2xl font-bold py-6">
                                        No Users Found
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
