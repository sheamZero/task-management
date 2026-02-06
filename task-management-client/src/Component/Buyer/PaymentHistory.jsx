import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';

const PaymentHistory = () => {
    const [wData, setWData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const email = user?.email;

    useEffect(() => {
        document.title = "Payment History";
        if (!user?.accessToken) return;
        if (!email) return;
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_API_URL}/payment-history/${email}`, {
                headers: {
                    authorization: `Bearer ${user?.accessToken}`,
                },
            })
            .then(({ data }) => {
                setWData(data);
                setLoading(false);
            })
            .catch(() => {
                setWData([]);
                setLoading(false);
            });
    }, [email, user?.accessToken]);

    return (
        <div className="mx-auto p-6">
            <h2 className="text-2xl font-bold text-[#5a716b] mb-6">Payment History</h2>

            <div className="overflow-x-auto rounded-lg shadow-sm">
                <table className="min-w-full table table-zebra text-sm">
                    <thead className="bg-primary text-primary-content text-center ">
                        <tr>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Currency</th>
                            <th className="px-4 py-3">Transaction ID</th>
                            <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-base-200 divide-y text-center">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="p-6 text-center text-gray-500 font-medium">
                                    <span className="loading loading-bars loading-xs"></span>
                                </td>
                            </tr>
                        ) : wData.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-6 text-center text-gray-500 font-medium">
                                    No payment history available.
                                </td>
                            </tr>
                        ) : (
                            wData.map((payment) => (
                                <tr key={payment._id}>
                                    <td className="px-4 py-3 font-bold text-base-content">{payment.email}</td>
                                    <td className="px-4 py-3 text-green-700 font-semibold">
                                        ${(payment.amount / 100).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3 uppercase text-base-content">{payment.currency}</td>
                                    <td className="px-4 py-3 text-base-content truncate max-w-[180px]">
                                        {payment.transactionID}
                                    </td>
                                    <td className="px-4 py-3 text-base-content">
                                        {new Date(payment.paidAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
