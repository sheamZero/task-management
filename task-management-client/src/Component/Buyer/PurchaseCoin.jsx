import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Loading from '../../Shared/Loading';

const PurchaseCoin = () => {
    const [coinPackages, setCoinPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Purchase Coins";
        axios.get("/coinPackage.json")
            .then(res => {
                setCoinPackages(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load coin packages");
                setLoading(false);
            });
    }, []);

    const handlePay = (id) => {
        navigate(`/dashboard/payment/${id}`);
    };


    if (loading) {
        return <Loading />
    }

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold text-primary mb-8">Purchase Coins</h1>


            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {coinPackages.map(({ id, coins, price }) => (
                    <div
                        key={id}
                        className="card shadow-lg bg-base-200 border border-base-300"
                    >
                        <div className="card-body items-center text-center space-y-2">
                            <h3 className="text-2xl font-semibold text-secondary">
                                {coins} Coins
                            </h3>
                            <p className="text-4xl font-bold text-primary">${price}</p>
                            <div className="card-actions mt-3 w-full">
                                <button
                                    onClick={() => handlePay(id)}
                                    className="w-full py-3 bg-accent px-8 rounded-xl font-bold text-lg text-accent-content"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-sm text-center text-neutral mt-6">
                Note: Coins are used to post tasks and pay workers. 1$ = 10 coins.
            </div>
        </div>
    );
};

export default PurchaseCoin;
