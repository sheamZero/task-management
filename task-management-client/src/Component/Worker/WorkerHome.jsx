import React, { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth";
import axios from "axios";
import { useNavigate } from "react-router";

const WorkerHome = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const email = user?.email;
  const navigate = useNavigate();
  let totalEarning = 0;

  useEffect(() => {
    document.title = "Worker Dashboard";
    if (!user?.accessToken) return;

    if (email) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/my-submitted-task/${email}`, {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        })
        .then((res) => {
          setSubmissions(res.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          const status = error.response?.status;
          if (status === 401 || status === 400) {
            logout();
            navigate("/login");
          } else if (status === 403) {
            navigate("/forbidden");
          } else {
            console.error("Unexpected error", error);
          }
        });
    }
  }, [email, user?.accessToken, logout, navigate]);

  const totalSubmission = submissions.length;
  const pendingSubmission = submissions.filter((s) => s.status === "pending");
  const approvedSubmissions = submissions.filter(
    (s) => s.status === "approved"
  );

  approvedSubmissions.forEach((s) => {
    totalEarning += parseInt(s.payable_amount);
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 md:px-8 lg:px-16 bg-gray-50">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="bg-white py-6 rounded-xl border border-primary/50 shadow text-center">
          <h3 className="text-base md:text-lg font-medium text-gray-600">
            Total Submissions
          </h3>
          <p className="text-2xl md:text-3xl text-[#5a716b] font-bold mt-2">
            {totalSubmission}
          </p>
        </div>

        <div className="bg-white py-6 rounded-xl border border-primary/50 shadow text-center">
          <h3 className="text-base md:text-lg font-medium text-gray-600">
            Pending Submissions
          </h3>
          <p className="text-2xl md:text-3xl text-yellow-500 font-bold mt-2">
            {pendingSubmission.length}
          </p>
        </div>

        <div className="bg-white py-6 rounded-xl border border-primary/50 shadow text-center">
          <h3 className="text-base md:text-lg font-medium text-gray-600">
            Total Earnings ($)
          </h3>
          <p className="text-2xl md:text-3xl text-green-600 font-bold mt-2">
            ${(totalEarning / 20).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div className="bg-white shadow border border-primary/50 rounded-xl p-4 md:p-6 overflow-x-auto">
        <h3 className="text-lg md:text-xl font-semibold text-primary mb-4">
          Approved Submissions
        </h3>

        {approvedSubmissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full table-auto text-left text-sm md:text-base border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-2 px-3 md:py-3 md:px-4">Task Title</th>
                  <th className="py-2 px-3 md:py-3 md:px-4">Payable Amount</th>
                  <th className="py-2 px-3 md:py-3 md:px-4">Buyer</th>
                  <th className="py-2 px-3 md:py-3 md:px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedSubmissions.map((sub) => (
                  <tr
                    key={sub._id}
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="py-1 px-2 md:py-2 md:px-4">{sub.task_title}</td>
                    <td className="py-1 px-2 md:py-2 md:px-4">${sub.payable_amount}</td>
                    <td className="py-1 px-2 md:py-2 md:px-4">{sub.buyerName}</td>
                    <td className="py-1 px-2 md:py-2 md:px-4 text-green-600 font-semibold capitalize">
                      {sub.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center my-6 md:my-10">
            No approved submissions yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default WorkerHome;
