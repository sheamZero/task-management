import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInWithEmailAndPass, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    document.title = "Login";
  }, []);

  // Email/Password Login
  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPass(data.email, data.password);
      toast.success("Login Successful");
      navigate(state?.from || "/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Invalid Email or Password");
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
  try {
    const res = await googleSignIn();
    const user = res.user;

    // Construct user data for backend
    const userInfo = {
      name: user.displayName,
      email: user.email,
      role: "worker", // default role, you can change as needed
      coin: 10, // default coins
      imageUrl: user.photoURL,
    };

    // Save user in backend if not exists
    await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);

    toast.success("Login Successful");
    navigate(state?.from || "/dashboard");
  } catch (err) {
    console.error(err);
    toast.error("Google Sign-In Failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-10 left-10 opacity-20 text-9xl text-indigo-200 rotate-12 select-none pointer-events-none">⚡</div>
      <div className="absolute bottom-20 right-20 opacity-20 text-8xl text-purple-200 -rotate-12 select-none pointer-events-none">💻</div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-10 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

          <button className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition">
            Login
          </button>
        </form>

        <div className="flex items-center justify-center gap-4 mt-4">
          <span className="text-gray-400">OR</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl hover:bg-indigo-50 transition font-semibold text-gray-700"
        >
          <FaGoogle className="text-red-500" /> Login with Google
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
