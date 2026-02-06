import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import axios from "axios";
import useAuth from "../Hook/useAuth";

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        headers: { authorization: `Bearer ${user?.accessToken}` },
      })
      .then(({ data }) => setTask(data));
  }, [id, user?.accessToken]);

  return (
    <div className="container mx-auto px-6 py-30">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row bg-white border border-primary/50 rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Task Image */}
        <div className="lg:w-1/2 relative">
          <img
            src={task.task_image}
            alt={task.task_title}
            className="w-full h-full object-cover lg:h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <h2 className="absolute bottom-6 left-6 text-3xl lg:text-4xl font-bold text-white">
            {task.task_title}
          </h2>
        </div>

        {/* Details */}
        <div className="lg:w-1/2 p-8 space-y-6">
          {/* Payment & Timeline */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-primary/10 rounded-xl">
              <p className="text-sm text-gray-600">Payable Amount</p>
              <p className="font-bold text-primary">${task.payable_amount}</p>
            </div>
            <div className="p-4 bg-secondary/10 rounded-xl">
              <p className="text-sm text-gray-600">Total Payable</p>
              <p className="font-bold text-secondary">${task.totalPayable}</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-xl">
              <p className="text-sm text-gray-600">Required Workers</p>
              <p className="font-bold text-primary">{task.required_workers}</p>
            </div>
            <div className="p-4 bg-secondary/10 rounded-xl">
              <p className="text-sm text-gray-600">Completion Date</p>
              <p className="font-bold text-secondary">{task.completion_date}</p>
            </div>
          </div>

          {/* Submission Info */}
          <div className="p-4 bg-gray-50 rounded-xl border border-primary/30">
            <p className="text-gray-700 font-semibold">Submission Info</p>
            <p className="text-gray-600">{task.submission_info}</p>
          </div>

          {/* Buyer Info */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-primary">Buyer Info</h3>
            <p><span className="font-bold">Name:</span> {task.buyerName}</p>
            <p><span className="font-bold">Email:</span> {task.buyerEmail}</p>
            <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition">
              Contact Buyer
            </button>
          </div>

          {/* Task Detail */}
          <div className="p-4 rounded-xl bg-gray-50 border border-primary/30">
            <p className="text-gray-700 font-semibold">Task Detail</p>
            <p className="text-gray-600">{task.task_detail}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskDetail;