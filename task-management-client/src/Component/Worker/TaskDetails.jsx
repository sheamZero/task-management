import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import Loading from "../../Shared/Loading";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const TaskDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user, setLoading, logout } = useAuth();
    const { email, displayName } = user
    const navigate = useNavigate();

    const [task, setTask] = useState([]);
    useEffect(() => {
        document.title = "Task Details";
        if (!user?.accessToken) return;

        axiosSecure.get(`/tasks/${id}`)
            .then(res => {
                setTask(res.data)
            })
            .catch(error => {
                const status = error.response?.status;

                if (status === 401 || status === 400) {
                    // No token or invalid token
                    logout();
                    navigate('/login');
                } else if (status === 403) {
                    navigate('/forbidden');
                }
            });

    }, [id, setLoading, user?.accessToken, logout, axiosSecure, navigate]);


    const { buyerEmail, buyerName, payable_amount, task_title, _id } = task


    const handleSubmit = async (e) => {

        e.preventDefault();

        const submissionDetails = e.target.submission_Details.value
        const submittedTask = {
            task_id: _id,
            task_title,
            payable_amount,
            submissionDetails,
            buyerName,
            buyerEmail,
            worker_name: displayName,
            worker_email: email,
            status: "pending"
        }

        if (submissionDetails !== "") {
            axiosSecure.post('/submitted-task', { submittedTask })
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Task Submitted Successfully",
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Something went wrong",
                        showConfirmButton: false,
                        timer: 1500
                    })

                    const status = error.response?.status;
                    if (status === 401 || status === 400) {
                        // No token or invalid token
                        logout();
                        navigate('/login');
                    } else if (status === 403) {
                        navigate('/forbidden');
                    }
                })
        }

    };


    if (!user) {
        return <Loading />
    }

    if (!task) return <p className="text-center py-10 text-2xl font-bold text-base-content/70 flex items-center justify-center">
        No Task Found !
    </p>;

    return (
        <div className=" mx-auto p-6 space-y-8">
            <h2 className="text-3xl font-bold text-primary">Task Details</h2>

            <div className=" shadow-lg rounded-xl border border-primary/50 flex flex-col-reverse lg:flex-row-reverse items-center gap-10 p-10">
                <div className="space-y-3 flex-1">
                    <div>
                        <h3 className="text-2xl font-semibold text-[#2e3d39]">{task.task_title}</h3>
                        <p><strong>Buyer:</strong> {task.buyerName} ({task.buyerEmail})</p>
                    </div>
                    <div className="divider"></div>
                    <div className="space-y-1">
                        <p><strong>Deadline:</strong> {new Date(task.completion_date).toLocaleDateString()}</p>
                        <p><strong>Payment:</strong> {task.payable_amount} coins</p>
                        <p><strong>Required Workers:</strong> {task.required_workers}</p>
                        <p><strong>Submission Info:</strong> {task.submission_info}</p>
                    </div>
                    <div className="divider"></div>
                    <div><strong>Details: <br /> </strong> <p className="text-base-content/80">{task.task_detail}</p></div>
                </div>
                <div>
                    {task.task_image && (
                        <img
                            src={task.task_image}
                            alt="Task"
                            className=" rounded"
                        />
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="shadow rounded-xl p-6 space-y-4 border border-primary/50">
                <h3 className="text-xl font-medium text-primary">Submit Task</h3>
                <textarea
                    required
                    name="submission_Details"
                    placeholder="Enter your submission details (e.g., proof link or explanation)"
                    className="w-full border border-gray-300 px-4 py-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                />
                <button
                    type="submit"
                    className="bg-primary hover:bg-[#4e625d] text-white px-6 py-2 rounded-md transition"
                >
                    Submit Task
                </button>
            </form>
        </div>
    );
};

export default TaskDetails;
