# Task Management Platform

A full-stack web application for efficient task management, connecting buyers and workers with a seamless experience. Features include intuitive dashboards, task creation, submissions, payments, and admin controls.

## Live Site

- **Production Website**: [https://task-management-website-4fb15.web.app](https://task-management-website-4fb15.web.app)
- **Frontend Repo**: (https://github.com/sheamZero/task-management/tree/main/task-management-client)
- **Backend Repo**: (https://github.com/sheamZero/task-management/tree/main/task-management-server)

---

## Admin Access

- **Email**: admin@admin.com
- **Password**: 123456@admin
> Admin roles are assigned manually in the database.

## Key Features

### Buyer Features
- **Task Creation** – Post tasks with requirements and budgets
- **Dashboard** – Track posted tasks, submissions, and payments
- **Coin Purchase** – Buy coins for platform transactions
- **Payment History** – View all payments and purchases

### Worker Features
- **Task List** – Browse available tasks and submit work
- **Submission Details** – Track submissions and withdrawal requests
- **Withdrawals** – Request payouts for completed tasks

### Admin Features
- **Admin Dashboard** – Manage users, tasks, and platform analytics
- **User Management** – Approve, block, or edit user roles
- **Task Management** – Review, approve, or reject tasks

### Security & Authentication
- Firebase Authentication (Email/Password, Google Sign-in)
- JWT-based API security
- Role-based access control (Admin/Buyer/Worker)
- Secure password handling

## Technology Stack

### Frontend
- **React 18+** – Modern UI library
- **Vite** – Fast build tool
- **Tailwind CSS** – Utility-first styling
- **React Router** – Client-side routing
- **TanStack Query** – Data fetching and caching
- **Firebase** – Auth & hosting
- **Framer Motion** – Animations
- **React Hook Form** – Form management
- **SweetAlert2** – Alerts
- **Axios** – API requests

### Backend
- **Node.js & Express** – RESTful API
- **MongoDB** – Database
- **JWT** – Token authentication
- **Stripe API** – Payments
- **Nodemailer** – Email notifications
- **CORS** – Cross-origin
- **Environment Variables** – Secure config

## Installation & Local Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Firebase project
- Stripe account (test mode)

### Frontend Setup

Clone this repo and install dependencies:

```
git clone <your-repo-url>
cd task-management-client
npm install
npm run dev
```

Create a `.env` file in the root directory:

```
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
```

### Backend Setup

Go to `task-management-server` folder and install dependencies:

```
cd task-management-server
npm install
npm run dev
```

Create a `.env` file in the server root:

```
PORT=9000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

## Author

[Md. Sheam Hossain](https://github.com/sheamZero)

## Contact & Support

- Email: support@task-management.com

---

**Happy coding! 🚀** Built with ❤️ for task management excellence
