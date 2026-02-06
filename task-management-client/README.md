
# Micro-Task & Earning Platform

![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38BDF8?logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-9.x-FFCA28?logo=firebase)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

A modern, responsive web platform where users can complete micro-tasks to earn rewards or create tasks to get work done. Built with React, Tailwind CSS, Firebase, and more.


## 🚀 Live Demo

[🌐 Visit the Live Site](https://mircotask-c344d.web.app/)


## 🛠️ Admin Access (Demo)

- **Email:** `admin@admin.com`
- **Password:** `Admin@123`

> ⚠️ Replace these credentials and the demo URL with your actual admin info and deployment link for production.

---


## 🧰 Technologies Used

- React.js
- React Router DOM
- Tailwind CSS
- Firebase Authentication
- Axios
- SwiperJS (sliders)
- React Hook Form + YUP validation
- imgBB API (image uploading)
- Stripe (payments)
- JWT (Firebase tokens)
- Responsive design (mobile, tablet, desktop)

---


## ✨ Key Features

1. **Role-based Authentication:** Worker, Buyer, and Admin roles with secure access control
2. **Task Management:** Buyers can create, update, and delete tasks
3. **Coin-based Reward System:**
   - Buyers spend coins to post tasks
   - Workers earn coins by completing tasks
4. **Withdrawals:** Workers can withdraw coins (20 Coins = 1 USD)
5. **Stripe Payments:** Secure coin purchases for Buyers
6. **Real-time Notifications:** Task status and payment updates
7. **Custom Dashboards:** Unique dashboards for each user role
8. **Payment History & Reviews:** Track payments and review tasks
9. **Image Uploads:** imgBB integration for profile/task images
10. **Fully Responsive UI:** Optimized for all devices

---

---


## ⚡ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd task-management-client
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env` file in the root directory
   - Add your Firebase config, Stripe keys, and any other required variables
   - **Never commit your `.env` file**
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Build for production:**
   ```bash
   npm run build
   ```
   Deploy the contents of the `dist/` folder to your hosting provider

---


## 📌 Notes & Best Practices

- All sensitive keys and credentials are stored in environment variables
- User sessions persist after login (no forced re-login on refresh)
- No placeholder or Lorem Ipsum text anywhere in the app
- “Join as Developer” button links to this GitHub repo
- UI and dashboards are fully responsive

---


---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📧 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/your-username/your-repo/issues) or contact the maintainer.
