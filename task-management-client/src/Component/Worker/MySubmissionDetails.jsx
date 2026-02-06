import React, { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';
import axios from 'axios';
import Loading from '../../Shared/Loading';
import { useNavigate } from 'react-router';

const MySubmissionDetails = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, logout } = useAuth();
    const email = user?.email;
    const navigate = useNavigate();

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 10; // Change this number to display more or fewer per page

    useEffect(() => {
        document.title = "My Submissions";
            if (!user?.accessToken) return; 
        if (!email) return;

        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/my-submitted-task/${email}`, {
            headers: { authorization: `Bearer ${user?.accessToken}` }
        })
            .then(res => {
                setTasks(res.data);
                setCurrentPage(1); // Reset to first page on new data load
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
            })
            .finally(() => setLoading(false));
    }, [email, user?.accessToken, logout, navigate]);

    // Calculate pagination indexes
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    // Total number of pages
    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    // Page number buttons
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Handler for changing page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="overflow-x-auto rounded-xl mt-10  ">
            {loading ? (
                <div className="flex justify-center mt-10">
                    <span className="loading loading-bars loading-lg text-primary"></span>
                </div>
            ) : tasks.length === 0 ? (
                <p className="text-center p-4 text-gray-500">No submissions found.</p>
            ) : (
                <div className='pb-10'>
                    <table className="table table-zebra w-full p-6">
                        <thead className="bg-primary text-primary-content text-center">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Buyer Name</th>
                                <th scope="col">Payable</th>
                                <th scope="col">Submitted Date</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {currentTasks.map((task) => {
                                const date = task.current_Date ? new Date(task.current_Date) : null;
                                const formattedDate = date
                                    ? date.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
                                    : "N/A";

                                return (
                                    <tr key={task._id}>
                                        <td className="font-bold">{task.task_title}</td>
                                        <td>{task.buyerName}</td>
                                        <td>{task.payable_amount}</td>
                                        <td className="text-base-content/70">{formattedDate}</td>
                                        <td>
                                            <p
                                                className={`font-bold capitalize ${task.status === "pending"
                                                    ? "text-secondary"
                                                    : task.status === "rejected"
                                                        ? "text-error"
                                                        : "text-primary"
                                                    }`}
                                            >
                                                {task.status}
                                            </p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Pagination controls */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                onClick={() => handlePageChange(number)}
                                className={`px-3 py-1 rounded ${currentPage === number
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MySubmissionDetails;
