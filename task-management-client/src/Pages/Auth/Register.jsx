import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import axiosCommon from "../../api/axiosCommon";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ criteriaMode: "all" });
    const { registerWithEmailPass } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();

    // console.log("object,", import.meta.env.VITE_API_URL);

    useEffect(() => {
        document.title = "Register";
    }, []);

    const onSubmit = async (data) => {
        const imgData = data.image[0];
        const { name, email, role, password } = data;

        let coin = role === "buyer" ? 50 : 10;

        const imageFormData = new FormData();
        imageFormData.append('image', imgData);
        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBBApiKey}`,
            imageFormData
        );
        const imageUrl = response?.data?.data?.display_url;

        const userInfo = { name, email, role, coin, imageUrl };

        registerWithEmailPass(email, password)
            .then((res) => {
                console.log("Firebase user created:", res.user);
                updateProfile(res.user, { displayName: name, photoURL: imageUrl });
                axiosCommon.post('/users', userInfo).then(() => { });
                // axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo).then(() => { });
                toast.success("Registration Successful");
                navigate(state ? state : '/dashboard');
            })
            .catch((err) => {
                console.error("Firebase registration error:", err);
                toast.error("Something Went Wrong: " + err.message);
            });

    };

    return (
        <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 overflow-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute top-20 left-1/4 opacity-20 text-9xl text-purple-200 rotate-12 select-none pointer-events-none">✨</div>
            <div className="absolute bottom-10 right-1/5 opacity-20 text-8xl text-pink-200 -rotate-12 select-none pointer-events-none">🛠️</div>
            <div className="absolute top-1/4 right-1/3 opacity-10 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/4 opacity-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>

            {/* Register Card */}
            <div className="relative z-10 w-full max-w-md p-10 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl flex flex-col gap-6">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Register</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

                    <input
                        {...register("email", { required: "Email is required" })}
                        type="email"
                        placeholder="name@example.com"
                        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

                    <input
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Password must be at least 8 characters" },
                            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, message: "Include uppercase, lowercase, number & special char" },
                        })}
                        type="password"
                        placeholder="********"
                        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

                    <input
                        {...register("image", { required: "Upload an image" })}
                        type="file"
                        accept="image/*"
                        className="w-full p-3 rounded-xl border border-gray-300"
                    />
                    {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}

                    <select
                        {...register("role", { required: "Select a role" })}
                        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                        <option value="worker">Worker</option>
                        <option value="buyer">Buyer</option>
                    </select>
                    {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}

                    <button className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition">
                        Register
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
