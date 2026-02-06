import React, { useEffect, useState } from 'react';
import useAuth from '../Hook/useAuth';
import Loading from '../Shared/Loading';
import axios from 'axios';
import BuyerDashboard from '../Layouts/BuyerDashboard.';
import WorkerDashboard from '../Layouts/WorkerDashboard';
import AdminDashboard from '../Layouts/AdminDashboard';
import { useNavigate } from 'react-router';

const Dashboard = () => {


    const { user, loading, setLoading, logout } = useAuth()
    const [userDetails, setUserDetails] = useState({})
    const role = userDetails.role
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.accessToken) return;
        axios.get(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then((res) => {
                setUserDetails(res.data)
                setLoading(false)
            })
            .catch((error) => {
                const status = error.response?.status;

                if (status === 401 || status === 400) {
                    logout();
                    navigate('/login');
                } else if (status === 403) {
                    navigate('/forbidden');
                } else {
                    console.error("Unexpected error", error);
                }
            })


    }, [user?.email, setLoading, user?.accessToken, logout, navigate])


    if (!user || loading) {
        return <Loading />
    }



    if (role === 'buyer') {
        return <BuyerDashboard />
    }
    else if (role === 'worker') {
        return <WorkerDashboard />
    }
    else if (role === 'admin') {
        return <AdminDashboard />
    }
};

export default Dashboard;