import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoute from "../Shared/PrivateRoute";
import BuyerDashboard from "../Layouts/BuyerDashboard.";
import AddTask from "../Component/Buyer/AddTask";
import MyTask from "../Component/Buyer/Mytask";
import PurchaseCoin from "../Component/Buyer/PurchaseCoin";
import BuyerHome from "../Component/Buyer/BuyerHome";
import Payment from "../Component/Buyer/Payment/Payment";
import PaymentHistory from "../Component/Buyer/PaymentHistory";
import Loading from "../Shared/Loading";
import Dashboard from "../Component/Dashboard";
import DashboardHome from "../Component/DashboardHome";
import ManageUsers from "../Component/Admin/ManageUsers";
import ManageTasks from "../Component/Admin/ManageTasks";
import TaskList from "../Component/Worker/TaskList";
import TaskDetails from "../Component/Worker/TaskDetails";
import MySubmissionDetails from "../Component/Worker/MySubmissionDetails";
import Withdrawals from "../Component/Worker/Withdrawals";
import NotFound from "../Pages/NotFound";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Tasks from "../Pages/Tasks";
import TaskDetail from "../Pages/TaskDetail";
import AdminProfile from "../Component/Admin/AdminProfile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "tasks",
        Component: Tasks,
      },
      {
        path: "taskDetails/:id",
        element: (
          <PrivateRoute>
            <TaskDetail />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "/dashboard/add-task",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-tasks",
        element: (
          <PrivateRoute>
            <MyTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/purchase-coin",
        element: (
          <PrivateRoute>
            <PurchaseCoin />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history/:email",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-tasks",
        element: (
          <PrivateRoute>
            <ManageTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/task-list",
        element: (
          <PrivateRoute>
            <TaskList />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/task-list/:id",
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-submission",
        element: (
          <PrivateRoute>
            <MySubmissionDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/withdraw",
        element: (
          <PrivateRoute>
            <Withdrawals />
          </PrivateRoute>
        ),

      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <AdminProfile />
          </PrivateRoute>
        ),
    }
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

export default router;
