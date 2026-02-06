import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        document.title = "Available Tasks";
        axios
            .get(`${import.meta.env.VITE_API_URL}/tasks`)
            .then(res => setTasks(res.data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Available Tasks</h2>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="loading loading-bars loading-lg text-primary"></span>
                </div>
            ) : tasks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {tasks.map((task) => (
                        <div
                            key={task._id}
                            className="rounded-xl border border-primary/50 bg-white shadow hover:shadow-md transition p-5 flex flex-col justify-between gap-3"
                        >
                            <div>
                                <img src={task.task_image} alt="" className="rounded-lg h-48 w-full object-cover" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-primary">{task.task_title}</h3>
                                <p className="text-sm font-semibold">
                                    Buyer: <span className="font-medium">{task.buyerName}</span>
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Deadline:</span>{" "}
                                    {new Date(task.completion_date).toLocaleDateString()}
                                </p>
                                <div className="divider my-1"></div>
                                <div className="flex items-center justify-between text-sm">
                                    <p className="font-semibold">Payment: {task.payable_amount} coins</p>
                                    <p><span className="font-semibold">Needed:</span> {task.required_workers}</p>
                                </div>
                            </div>

                            <Link
                                to={`/dashboard/task-list/${task._id}`}
                                className="mt-4 px-4 py-3 text-center bg-primary text-primary-content rounded-lg text-sm font-medium transition"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No tasks available right now.</p>
            )}
        </div>
    );
};

export default TaskList;
