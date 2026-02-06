import { useState } from "react";
import { Outlet } from "react-router";
import Header from "../Component/DashboardComponent/Header";
import DashboardFooter from "../Component/DashboardComponent/DashboardFooter";
import AdminSidebar from "../Component/DashboardComponent/AdminSidebar";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import useAuth from "../Hook/useAuth";
import Loading from "../Shared/Loading";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      <div className="flex flex-col flex-1 h-screen min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 p-4 border-b">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-primary"
            type="button"
          >
            <HiMiniBars3BottomLeft size={30} />
          </button>

          <span className="font-bold text-xl text-primary">
            ZenTask
          </span>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden min-w-0">
          <div className="p-4 max-w-full overflow-x-hidden">
            <Header />
            <Outlet />
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  );
};

export default AdminDashboard;
