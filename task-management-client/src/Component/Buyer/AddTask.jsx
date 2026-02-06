import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import axios from "axios"; // for image upload to imgbb
import Swal from "sweetalert2";

const AddTask = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userDetails, setUserDetails] = useState({});
  const buyerEmail = user?.email;
  const buyerName = user?.displayName;

  useEffect(() => {
    document.title = "Add New Task";
    if (!user?.accessToken || !buyerEmail) return;

    const fetchUserDetails = async () => {
      try {
        const res = await axiosSecure.get(`/users/${encodeURIComponent(buyerEmail)}`);
        setUserDetails(res.data);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };

    fetchUserDetails();
  }, [buyerEmail, user?.accessToken, axiosSecure]);

  const onSubmit = async (data) => {
    const totalPayable = parseInt(data.required_workers) * parseInt(data.payable_amount);
    const task_image = data.task_image[0];

    if (!task_image) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Task image is required",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (userDetails.coin < totalPayable) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You don't have enough coin to add this task",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      setLoading(true);

      // Upload task image to imgbb using regular axios
      const imageFormData = new FormData();
      imageFormData.append("image", task_image);
      const imgResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBBApiKey}`,
        imageFormData
      );
      const imageUrl = imgResponse?.data?.data?.display_url;

      // Prepare task details
      const taskDetails = {
        ...data,
        task_image: imageUrl,
        totalPayable,
        buyerEmail,
        buyerName
      };

      // Add task via backend using axiosSecure
      const res = await axiosSecure.post("/add-task", { task: taskDetails });

      if (res.data?.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Task has been added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Failed to add task:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Task adding Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 lg:px-10 mx-auto mt-6 rounded-lg">
      <h2 className="text-2xl font-bold text-primary mb-6">Add New Task</h2>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block mb-1 font-medium text-base-content">Task Title</label>
          <input
            {...register("task_title", { required: "Task title is required" })}
            type="text"
            className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full"
            placeholder="e.g., Watch my YouTube video and comment"
          />
          {errors.task_title && <p className="text-error mt-1">{errors.task_title.message}</p>}
        </div>

        <div className="md:flex gap-2">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-base-content">Required Workers</label>
            <input
              {...register("required_workers", {
                required: "Required Workers is required",
                min: { value: 1, message: "Must be at least 1" },
              })}
              type="number"
              className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full"
              placeholder="e.g., 100"
            />
            {errors.required_workers && (
              <p className="text-error mt-1">{errors.required_workers.message}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium text-base-content">Payable Amount</label>
            <input
              {...register("payable_amount", {
                required: "Payable amount is required",
                min: { value: 1, message: "Must be at least 1" },
              })}
              type="number"
              className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full"
              placeholder="e.g., 10"
            />
            {errors.payable_amount && (
              <p className="text-error mt-1">{errors.payable_amount.message}</p>
            )}
          </div>
        </div>

        <div className="md:flex gap-2">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-base-content">Completion Date</label>
            <input
              {...register("completion_date", { required: "Completion date is required" })}
              type="date"
              className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full"
            />
            {errors.completion_date && (
              <p className="text-error mt-1">{errors.completion_date.message}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium text-base-content">Submission Info</label>
            <input
              {...register("submission_info", { required: "Submission info is required" })}
              type="text"
              className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full"
              placeholder="e.g., Screenshot / Proof link"
            />
            {errors.submission_info && (
              <p className="text-error mt-1">{errors.submission_info.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-base-content">Task Image</label>
          <input
            {...register("task_image")}
            type="file"
            className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-base-content">Task Detail</label>
          <textarea
            {...register("task_detail", { required: "Task detail is required" })}
            rows="4"
            className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full resize-none"
            placeholder="Detailed description of the task"
          ></textarea>
          {errors.task_detail && (
            <p className="text-error mt-1">{errors.task_detail.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="py-3 border-2 bg-primary px-3 rounded-xl w-full text-primary-content font-medium"
        >
          {loading ? <span className="loading loading-bars loading-xs"></span> : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
