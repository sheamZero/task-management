import { useState } from "react";
import { Outlet } from "react-router";
import Header from "../Component/DashboardComponent/Header";
import DashboardFooter from "../Component/DashboardComponent/DashboardFooter";
import BuyerSidebar from "../Component/DashboardComponent/BuyerSidebar";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import useAuth from "../Hook/useAuth";
import Loading from "../Shared/Loading";

const BuyerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  if (!user) return <Loading />;

  return (
    <div className="flex min-h-screen bg-base-100 relative overflow-x-hidden">
      {/* Sidebar */}
      <BuyerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content (scrollable) */}
      <div className="flex flex-col flex-1 ml-0 lg:ml-64 min-h-screen overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-primary/20 bg-base-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-primary focus:outline-none"
          >
            <HiMiniBars3BottomLeft size={28} />
          </button>
          <span className="font-bold text-xl text-primary truncate">
            ZenTask
          </span>
        </div>

        {/* Page content */}
        <main className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-4">
            <Header />
            <Outlet />
          </div>
          <DashboardFooter />
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;
