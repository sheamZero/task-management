import React, { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Zoom } from "react-awesome-reveal";

const MyTask = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const email = user?.email;

  const [myTasks, setMyTasks] = useState([]);
  const [openModal, setOpenModal] = useState(null);

  // Controlled edit fields
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [info, setInfo] = useState("");

  // Loading states
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  // Fetch my tasks
  useEffect(() => {
    document.title = "My Tasks";
    if (!email) return;

    const fetchTasks = async () => {
      try {
        setLoadingTasks(true);
        const res = await axiosSecure.get(
          `/my-tasks/${encodeURIComponent(email)}`
        );
        setMyTasks(res.data);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setLoadingTasks(false);
      }
    };

    fetchTasks();
  }, [email, axiosSecure]);

  // Delete task
  const handleDeleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        setDeletingTaskId(id);
        const res = await axiosSecure.delete(`/my-tasks/${id}`);

        if (res.data.deletedCount) {
          setMyTasks((prev) => prev.filter((task) => task._id !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Failed to delete task",
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        setDeletingTaskId(null);
      }
    });
  };

  // Update task
  const updateMyTask = async (id) => {
    const updatedData = {
      task_title: title || openModal.task_title,
      task_detail: desc || openModal.task_detail,
      submission_info: info || openModal.submission_info,
    };

    try {
      setUpdatingTaskId(id);
      const res = await axiosSecure.put(
        `/update-my-task/${id}`,
        updatedData
      );

      if (res.data.modifiedCount === 1) {
        setMyTasks((prev) =>
          prev.map((task) =>
            task._id === id ? { ...task, ...updatedData } : task
          )
        );

        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setOpenModal(null);
        setTitle("");
        setDesc("");
        setInfo("");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to update task",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setUpdatingTaskId(null);
    }
  };

  // Prefill modal inputs
  useEffect(() => {
    if (openModal) {
      setTitle(openModal.task_title);
      setDesc(openModal.task_detail);
      setInfo(openModal.submission_info);
    }
  }, [openModal]);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-primary mb-6">
        My Posted Tasks
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-primary-content text-center">
            <tr>
              <th>Title</th>
              <th>Workers</th>
              <th>Pay</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {loadingTasks ? (
              <tr>
                <td colSpan={5}>
                  <span className="loading loading-bars loading-xs"></span>
                </td>
              </tr>
            ) : myTasks.length === 0 ? (
              <tr>
                <td colSpan={5}>No tasks available</td>
              </tr>
            ) : (
              myTasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.task_title}</td>
                  <td>{task.required_workers}</td>
                  <td>{task.payable_amount}</td>
                  <td>{task.completion_date}</td>
                  <td className="flex gap-2 justify-center">
                    <button
                      className="btn btn-sm bg-secondary text-secondary-content"
                      onClick={() => setOpenModal(task)}
                      disabled={updatingTaskId || deletingTaskId}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm bg-error text-white"
                      onClick={() => handleDeleteTask(task._id)}
                      disabled={updatingTaskId || deletingTaskId}
                    >
                      {deletingTaskId === task._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <Zoom>
            <div className="bg-base-100 p-6 rounded-xl w-lg space-y-4">
              <h3 className="text-xl font-semibold text-primary">
                Edit Task
              </h3>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
              />

              <input
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                className="input input-bordered w-full"
              />

              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="textarea textarea-bordered w-full"
              />

              <div className="flex justify-end gap-2">
                <button
                  className="btn btn-outline"
                  onClick={() => setOpenModal(null)}
                  disabled={updatingTaskId}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => updateMyTask(openModal._id)}
                  disabled={updatingTaskId}
                >
                  {updatingTaskId ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </Zoom>
        </div>
      )}
    </div>
  );
};

export default MyTask;
