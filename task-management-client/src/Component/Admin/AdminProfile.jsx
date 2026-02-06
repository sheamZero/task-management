import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../Hook/useAuth";

const AdminProfile = () => {
  const [users, setUsers] = useState(null);
  const { user } = useAuth(); // Assuming useAuth is imported from your auth hook

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then(({ data }) => {
        setUsers(data);
      })
  }, [user?.email, user?.accessToken]);

  if (!users) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-base-200 min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-secondary mb-8 text-center">
          My Profile
        </h2>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <img
              src={users.imageUrl || "/default-avatar.png"}
              alt={users.name}
              className="w-32 h-32 object-cover rounded-full border-4 border-primary"
            />
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Name:</span>
              <span className="text-gray-900">{users.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="text-gray-900">{users.email}</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AdminProfile;
