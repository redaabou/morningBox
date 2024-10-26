import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ allowedRoles }) {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        // If there's no user, redirect to login
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.includes(user.role)) {
        // If user's role is allowed, render the child routes
        return <Outlet />;
    }

    // Redirect based on user role
    if (user.role === 'gerant') {
        return <Navigate to="/dashboard-gerant" replace />;
    }

    // Default redirect for unauthorized access
    return <Navigate to="/dashboard" replace />;
}

export default PrivateRoute;