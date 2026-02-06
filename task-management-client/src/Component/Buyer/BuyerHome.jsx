import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const BuyerHome = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [myTask, setMyTask] = useState([]);
  const [pendingTaskSubmitted, setPendingTaskSubmitted] = useState([]);
  const { user } = useAuth();
  const email = user?.email;

  // Loading states
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  let totalPayment = 0;
  let totalReqWorker = 0;

  useEffect(() => {
    document.title = "Buyer Dashboard";
        if (!user?.accessToken) return; 
    if (email) {
      setLoadingTasks(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/my-tasks/${encodeURIComponent(email)}`, {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        })
        .then((res) => {
          setMyTask(res.data);
          setLoadingTasks(false);
        })
        .catch((err) => {
          console.error(err);
          setLoadingTasks(false);
        });
    }
  }, [email, user?.accessToken]);

  useEffect(() => {
        if (!user?.accessToken) return; 
    if (email) {
      setLoadingSubmissions(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/submitted-task?buyerEmail=${email}`, {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        })
        .then((res) => {
          const task = res.data.filter((t) => t.status === "pending");
          setPendingTaskSubmitted(task);
          setLoadingSubmissions(false);
        })
        .catch((err) => {
          console.error(err);
          setLoadingSubmissions(false);
        });
    }
  }, [email, user?.accessToken]);

  myTask.forEach((t) => {
    totalPayment += t.totalPayable;
    totalReqWorker += parseInt(t.required_workers);
  });

  const updateTask = (id, newStatus) => {
    setUpdatingTaskId(id);
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/update-submitted-task/${id}`,
        { newStatus: newStatus },
        {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      .then(() => {
        const newTask = pendingTaskSubmitted.filter((t) => t._id !== id);
        setPendingTaskSubmitted(newTask);
        setUpdatingTaskId(null);

        Swal.fire({
          position: "center",
          icon: newStatus === "approved" ? "success" : "error",
          title: newStatus === "approved" ? "Task Approved" : "Task Rejected",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        toast.error("Task Update Failed");
        setUpdatingTaskId(null);
      });
  };

  return (
    <div className="p-6  mx-auto space-y-10">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-primary bg-base-200 shadow-sm p-10 text-center">
            <h3 className="text-gray-600 text-2xl font-bold">Total Tasks</h3>
            {loadingTasks ? (
              <p className="text-center text-gray-500"><span className="loading loading-bars loading-xs"></span></p>
            ) : (
              <p className="text-5xl font-bold text-primary">{myTask.length}</p>
            )}
          </div>
          <div className="rounded-xl border border-primary bg-base-200 shadow-sm p-10 text-center">
            <h3 className="text-gray-600 text-2xl font-bold">Pending Task</h3>
            {loadingTasks ? (
              <p className="text-center text-gray-500"><span className="loading loading-bars loading-xs"></span></p>
            ) : (
              <>
                <p className="text-5xl font-bold text-secondary">{totalReqWorker}</p>
                <small className="text-primary/50">
                  (sum of all required_workers count of added Tasks)
                </small>
              </>
            )}
          </div>
          <div className="rounded-xl border border-primary bg-base-200 shadow-sm p-10 text-center">
            <h3 className="text-gray-600 text-2xl font-bold">Total Payments</h3>
            {loadingTasks ? (
              <p className="text-center text-gray-500"><span className="loading loading-bars loading-xs"></span></p>
            ) : (
              <p className="text-5xl font-bold text-accent">${(totalPayment / 10).toFixed(2)}</p>
            )}
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold text-primary mb-4">Tasks to Review</h3>

        <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
          <table className="table table-zebra w-full min-w-[600px]">
            <thead className="bg-primary text-center text-primary-content">
              <tr>
                <th scope="col">Worker Name</th>
                <th scope="col">Task Title</th>
                <th scope="col">Payable Amount</th>
                <th scope="col">Submission Details</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {loadingSubmissions ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500 font-medium">
                    <span className="loading loading-bars loading-xs"></span>
                  </td>
                </tr>
              ) : pendingTaskSubmitted.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500 font-medium">
                    No tasks available for review.
                  </td>
                </tr>
              ) : (
                pendingTaskSubmitted.map((task) => (
                  <tr key={task._id} className="hover:bg-base-200">
                    <td className="font-bold">{task.worker_name}</td>
                    <td className="font-bold">{task.task_title}</td>
                    <td className="font-bold text-center">{task.payable_amount}</td>
                    <td className="font-bold">
                      <button
                        type="button"
                        onClick={() => setSelectedSubmission(task)}
                        className="px-4 py-1.5 font-semibold rounded-lg bg-primary text-primary-content btn-sm"
                      >
                        View Submission
                      </button>
                    </td>
                    <td className="flex gap-2 justify-center">
                      <button
                        type="button"
                        aria-label={`Accept submission for task: ${task.task_title}`}
                        onClick={() => updateTask(task._id, "approved")}
                        disabled={updatingTaskId === task._id}
                        className="px-4 py-1.5 font-semibold rounded-lg bg-secondary text-secondary-content btn-sm disabled:opacity-50"
                      >
                        {updatingTaskId === task._id ? "Processing..." : "Accept"}
                      </button>
                      <button
                        type="button"
                        aria-label={`Reject submission for task: ${task.task_title}`}
                        onClick={() => updateTask(task._id, "rejected")}
                        disabled={updatingTaskId === task._id}
                        className="px-4 py-1.5 font-semibold rounded-lg bg-error text-white btn-sm disabled:opacity-50"
                      >
                        {updatingTaskId === task._id ? "Processing..." : "Reject"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-8 shadow-lg space-y-4 relative">
            <button
              onClick={() => setSelectedSubmission(null)}
              className="absolute top-6 right-6 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              <RxCross2 size={25} />
            </button>
            <h3 className="text-xl font-semibold text-primary">Submission Details</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium text-gray-700">Task:</span> {selectedSubmission.task_title}
              </p>
              <p>
                <span className="font-medium text-gray-700">Worker:</span> {selectedSubmission.worker_name}
              </p>
            </div>
            <div className="divider"></div>
            <div className="space-y-2">
              <h4 className="font-medium">Submission Details:</h4>
              <div className="text-gray-600 text-sm">{selectedSubmission.submissionDetails}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerHome;
