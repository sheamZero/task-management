import React from 'react';
import useAuth from '../Hook/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from './Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()


    if (loading) {
        return <Loading />
    }
    if (!user) {
        <Navigate state={location.pathname} to='/login' />
    }
    return children
};

export default PrivateRoute;