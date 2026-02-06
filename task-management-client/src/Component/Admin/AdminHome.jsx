import axios from "axios";
import  { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import { useNavigate } from "react-router";

const AdminHome = () => {
    const { user, logout } = useAuth();

    const [withdrawals, setWithdrawals] = useState([]);
    const [userDB, setUserDB] = useState([]);
    const [buyer, setBuyer] = useState([]);
    const [worker, setWorker] = useState([]);
    const [approved, setApproved] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    let totalCoin = 0;
    let totalPayment = 0;

    userDB.forEach(u => totalCoin += parseInt(u.coin));
    approved.forEach(w => totalPayment += Number(w.withdrawal_amount));

    useEffect(() => {

        document.title = "Admin Dashboard"; 
        const fetchData = async () => {
            try {
                const userRes = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
                setUserDB(userRes.data);
                setBuyer(userRes.data.filter(b => b.role === 'buyer'));
                setWorker(userRes.data.filter(w => w.role === 'worker'));

                const withdrawRes = await axios.get(`${import.meta.env.VITE_API_URL}/withdraw-request`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                });

                setWithdrawals(withdrawRes.data.filter(w => w.status !== "approved"));
                setApproved(withdrawRes.data.filter(w => w.status === "approved"));
            } catch (error) {
                console.error("Error fetching data:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while loading!',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.accessToken]);

    const handleApprove = (id) => {
        axios.patch(`${import.meta.env.VITE_API_URL}/approveWithdraw/${id}`, {}, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(({ data }) => {
                if (data.modifiedCount) {
                    setWithdrawals(prev => prev.filter(w => w._id !== id));
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Withdrawal Approved Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch((error) => {
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
            })
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="mx-auto p-6 space-y-10 mt-10">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="rounded-xl bg-base-200 flex gap-3 flex-col items-center justify-center shadow py-10 border border-primary/50">
                    <p className="text-base-content text-xl font-bold">Total Workers</p>
                    <h3 className="text-5xl font-bold text-[#10b981]">{worker.length}</h3>
                </div>
                <div className="rounded-xl bg-base-200 flex gap-3 flex-col items-center justify-center shadow py-10 border border-primary/50">
                    <p className="text-base-content text-xl font-bold">Total Buyer</p>
                    <h3 className="text-5xl font-bold text-[#3b82f6]">{buyer.length}</h3>
                </div>
                <div className="rounded-xl bg-base-200 flex gap-3 flex-col items-center justify-center shadow py-10 border border-primary/50">
                    <p className="text-base-content text-xl font-bold">Total Coin</p>
                    <h3 className="text-5xl font-bold text-[#f59e0b]">{totalCoin}</h3>
                </div>
                <div className="rounded-xl bg-base-200 flex gap-3 flex-col items-center justify-center shadow py-10 border border-primary/50">
                    <p className="text-base-content text-xl font-bold">Total Payment</p>
                    <h3 className="text-5xl font-bold text-[#ef4444]">${totalPayment}</h3>
                </div>
            </div>

            {/* Withdraw Request Table */}
            <div>
                <h3 className="text-xl font-semibold text-secondary mb-4">Pending Withdrawals</h3>
                <div className="overflow-x-auto rounded-lg shadow-sm">
                    <table className="min-w-full text-sm table-zebra">
                        <thead className="bg-secondary text-center text-secondary-content/90">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Coins</th>
                                <th className="p-3">Amount ($)</th>
                                <th className="p-3">Payment System</th>
                                <th className="p-3">Account</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center bg-base-200 text-base-content">
                            {withdrawals.map((w) => (
                                <tr key={w._id}>
                                    <td className="p-3">{w.worker_name}</td>
                                    <td className="p-3">{w.worker_email}</td>
                                    <td className="text-yellow-600 font-semibold">{w.withdrawal_coin}</td>
                                    <td className="text-green-600 font-bold">${w.withdrawal_amount}</td>
                                    <td className="p-3">{w.payment_system}</td>
                                    <td className="p-3">{w.account_number}</td>
                                    <td className={`${w.status === "pending" ? "text-secondary" : "text-base-content"}`}>
                                        {w.status}
                                    </td>
                                    <td className="text-base-content/50">{new Date(w.withdraw_date).toLocaleString()}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleApprove(w._id)}
                                            className="px-3 py-2 bg-[#5a716b] hover:bg-[#4c5e59] text-white rounded-md text-sm transition"
                                        >
                                            Mark as Paid
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {withdrawals.length === 0 && (
                                <tr>
                                    <td colSpan="9" className="text-center py-6 text-gray-500">
                                        All withdrawals are approved.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
