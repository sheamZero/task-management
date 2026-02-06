import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAuth from '../../../Hook/useAuth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { id } = useParams();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [coinP, setCoinP] = useState({});

    useEffect(() => {
        document.title = "Complete Payment";

        axios.get("/coinPackage.json")
            .then(res => {
                const coinPackage = res.data.find(d => d.id === id);
                setCoinP(coinPackage);
            });
    }, [id]);

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setErrorMsg(error.message);
            setLoading(false);
            return;
        } else {
            setErrorMsg('');
        }

        const amountInCents = parseInt(coinP.price) * 100;

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`,
                { amountInCents },
                {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                });

                console.log("response", res);
            const clientSecret = res.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                toast.error(result.error.message || "Payment failed.");
                setLoading(false);
            } else if (result.paymentIntent.status === 'succeeded') {
                axios.post(`${import.meta.env.VITE_API_URL}/payment`, {
                    coins: coinP.coins,
                    amount: amountInCents,
                    currency: result.paymentIntent.currency,
                    transactionID: result.paymentIntent.id,
                    email: user.email,
                    name: user.displayName
                }, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                }).then(res => {
                    if (res.data) {
                        Swal.fire({
                            title: "Payment Successful!",
                            text: `${coinP.coins} coins are added to your account`,
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    setLoading(false);
                });
            }
        } catch (err) {
            console.log("error", err);
            toast.error("Something went wrong.");
            setLoading(false);
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
        }
    };

    return (
       <div className="min-h-[calc(100vh-11rem)] flex items-center justify-center bg-gray-50 px-4">


            <form
                onSubmit={handlePayment}
                className="w-full max-w-lg p-8 md:p-10 bg-white shadow-xl rounded-2xl space-y-6"
            >

                <h2 className="text-xl font-bold text-center text-primary">Complete Payment</h2>

                <div className="p-4 border rounded-md">
                    <CardElement />
                </div>

                {errorMsg && <p className='text-red-400'>{errorMsg}</p>}

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className={`w-full py-3 rounded-xl bg-primary text-primary-content font-medium flex items-center justify-center gap-2 transition duration-300 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                    {loading && <span className="loading loading-bars loading-xs"></span>}
                    {loading ? "Processing..." : `Pay $${coinP.price}`}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
