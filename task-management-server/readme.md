# Micro-Task and Earning Platform - Server

This is the backend API server for the Micro-Task and Earning Platform, built with Node.js, Express, and MongoDB. It handles authentication, user management, task operations, payments, notifications, and role-based authorization.

## Live Server AP   I

Base URL:  
https://microtaskserver.vercel.app/

---

## Technologies Used

- Node.js  
- Express.js  
- MongoDB with Mongoose  
- Firebase Admin SDK (for token verification)  
- JSON Web Tokens (JWT)  
- Stripe (for payment processing)  
- Cors  
- dotenv (for environment variables)  
- Nodemailer / other email services (optional for notifications)  

---

## Features

1. User registration and login with Firebase Authentication verification  
2. Role-based authorization middleware for Admin, Buyer, and Worker  
3. CRUD APIs for tasks, submissions, withdrawals, payments, and users  
4. Secure coin-based transaction system integrating payment and withdrawal logic  
5. Notification system updating users on task approvals, rejections, and withdrawals  
6. Pagination support on submission listings  
7. Image upload support via imgBB integration  
8. Stripe payment gateway integration for coin purchases  
9. Admin controls for managing users, tasks, and withdrawal approvals  
10. Error handling and input validation on all routes  

---

## API Endpoints Overview

- `/api/auth/` — User authentication endpoints  
- `/api/users/` — User management (list, update roles, delete)  
- `/api/tasks/` — Task creation, update, delete, and retrieval  
- `/api/submissions/` — Worker submissions for tasks  
- `/api/payments/` — Payment processing and history  
- `/api/withdrawals/` — Worker withdrawal requests and approvals  
- `/api/notifications/` — Notification retrieval and management  

---

---

## Setup Instructions

1. Clone the repository  
2. Run `npm install` to install dependencies  
3. Create a `.env` file with the following variables:

- PORT=your_port
- MONGODB_URI=your_mongodb_connection_string
- FIREBASE_ADMIN_SDK_PRIVATE_KEY=your_firebase_private_key
- STRIPE_SECRET_KEY=your_stripe_secret_key


4. Run `npm start` or `node server.js` to start the server  
5. Use Postman or any API client to test the endpoints

---

## Important Notes

- All sensitive credentials and API keys are secured using environment variables  
- The server verifies Firebase tokens for secure authentication  
- Role-based middleware ensures authorized access for Admin, Buyer, and Worker routes  
- Proper HTTP status codes and messages are returned for error handling  
- Pagination implemented for endpoints with potentially large datasets  
- Notifications are stored and retrieved based on user email  
- Stripe integration is configured for coin purchases and payments  
- Image uploading support via imgBB API for tasks and profile images

---

## Server Repository

https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-SazidSifat

---

If you have any questions or need support running the server, please contact me.


