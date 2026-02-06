import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import { useNavigate } from "react-router";

const Withdrawals = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [withdrawCoin, setWithdrawCoin] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [paymentSystem, setPaymentSystem] = useState("Bkash");
    const [accountNumber, setAccountNumber] = useState("");
    const [loading, setLoading] = useState(true); // ✅ loading state
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { email, displayName } = user;

    useEffect(() => {
        document.title = "Withdraw Earnings";
        if (!user?.accessToken) return;
        if (email) {
            setLoading(true);
            axios
                .get(`${import.meta.env.VITE_API_URL}/users/${email}`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`,
                    },
                })
                .then((res) => {
                    setCurrentUser(res.data);
                    setLoading(false); // end loading
                })
                .catch((error) => {
                    setLoading(false)
                    const status = error.response?.status;

                    if (status === 401 || status === 400) {
                        // No token or invalid token
                        logout();
                        navigate('/login');
                    } else if (status === 403) {
                        navigate('/forbidden');
                    } else {
                        console.error("Unexpected error", error);
                    }
                }); // handle error
        }
    }, [email, user?.accessToken, logout, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const withdrawData = {
            worker_email: email,
            worker_name: displayName,
            withdrawal_coin: withdrawCoin,
            withdrawal_amount: withdrawAmount,
            payment_system: paymentSystem,
            account_number: accountNumber,
            withdraw_date: new Date().toISOString(),
            status: "pending",
        };

        axios
            .post(
                "${import.meta.env.VITE_API_URL}/withdraw-request",
                { withdrawData: withdrawData },
                {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`,
                    },
                }
            )
            .then((res) => {
                if (res.data) {
                    Swal.fire({
                        position: "center",
                        title: "Withdraw request success",
                        text: "Wait for review",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };

    return (
        <div className="mx-auto h-[calc(100vh-100px)] p-6 space-y-6">
            <h2 className="text-2xl font-bold text-primary text-center">
                Withdraw Earnings
            </h2>

            {loading ? (
                <div className="flex justify-center mt-10">
                    <span className="loading loading-bars loading-lg text-primary"></span>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto mb-10 space-y-6">
                    <div className="bg-base-200 shadow border border-primary/50 rounded-xl py-10 px-6 space-y-3">
                        <p className="text-base-content/80 text-2xl font-medium">
                            <span className="text-accent">Available Coins:</span>{" "}
                            {currentUser.coin}
                        </p>
                        <p className="text-gray-700 text-xl font-medium">
                            <span className="text-[#3b82f6]">Equivalent USD:</span>{" "}
                            ${(parseFloat(currentUser.coin) / 20).toFixed(2)}
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="shadow mx-auto border border-primary/80 rounded-xl  p-5 space-y-5"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Coin to Withdraw
                            </label>
                            <input
                                type="number"
                                max={currentUser.coin}
                                min={200}
                                placeholder="00"
                                required
                                onChange={(e) => {
                                    setWithdrawCoin(Number(e.target.value));
                                    setWithdrawAmount(
                                        (e.target.value / 20).toFixed(2)
                                    );
                                }}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a716b]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Withdraw Amount ($)
                            </label>
                            <input
                                type="number"
                                value={withdrawAmount}
                                disabled
                                className="w-full px-4 py-2 border bg-gray-100 rounded-md text-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Select Payment System
                            </label>
                            <select
                                onChange={(e) => setPaymentSystem(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a716b]"
                            >
                                <option value="Bkash">Bkash</option>
                                <option value="Nagad">Nagad</option>
                                <option value="Rocket">Rocket</option>
                                <option value="Bank">Bank</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Account Number
                            </label>
                            <input
                                type="text"
                                required
                                onChange={(e) => setAccountNumber(e.target.value)}
                                placeholder="Enter your account number"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a716b]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={withdrawCoin > currentUser.coin}
                            className={`w-full ${withdrawCoin > currentUser.coin ? "hidden" : "block"
                                } bg-primary hover:bg-[#4c5e59] text-primary-content font-semibold py-3 rounded-md transition`}
                        >
                            Request Withdrawal
                        </button>
                        <p
                            className={
                                withdrawCoin > currentUser.coin
                                    ? "block text-xl text-center text-error font-bold"
                                    : "hidden"
                            }
                        >
                            Insufficient coin
                        </p>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Withdrawals;
