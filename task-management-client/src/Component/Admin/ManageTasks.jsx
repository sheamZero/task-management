import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAuth from '../../Hook/useAuth';
import { useNavigate } from 'react-router';

const ManageTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Manage Tasks";
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/tasks`)
            .then(res => {
                setTasks(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

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
                axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                })
                    .then(res => {
                        if (res.data.deletedCount) {
                            const afterDelete = tasks.filter(task => task._id !== id);
                            setTasks(afterDelete);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your task has been deleted.",
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
            <h2 className="text-2xl font-bold text-primary mb-6">Manage All Tasks</h2>

            <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
                <table className="table table-zebra w-full">
                    <thead className="bg-primary text-primary-content">
                        <tr>
                            <th className="text-center">Task Title</th>
                            <th className="text-center">Required Worker</th>
                            <th className="text-center">Submission Date</th>
                            <th className="text-center">Total Payable</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5}>
                                    <div className="flex justify-center items-center py-10">
                                        <span className="loading loading-bars loading-xs"></span>
                                    </div>
                                </td>
                            </tr>
                        ) : tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task._id}>
                                    <td className="text-center">{task.task_title}</td>
                                    <td className="text-center">{task.required_workers}</td>
                                    <td className="text-center">{task.completion_date}</td>
                                    <td className="text-center">{task.totalPayable}</td>
                                    <td className="flex items-center gap-3 justify-center">
                                        <button
                                            onClick={() => handleDelete(task._id)}
                                            className="p-2 font-semibold rounded-lg bg-error text-white btn-sm"
                                        >
                                            <MdDelete size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>
                                    <p className="p-6 text-center text-base-content/50 text-2xl font-bold">
                                        No Task Found
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

export default ManageTasks;
