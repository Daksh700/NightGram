import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        const handleNavigation = () => {
            if (authentication) {
                // Protected route - user must be logged in
                if (!authStatus) {
                    navigate('/login');
                    return;
                }
            } else {
                // Public route (login/signup) - redirect if already logged in
                if (authStatus) {
                    navigate('/');
                    return;
                }
            }
            setLoader(false);
        };

        handleNavigation();
    }, [authStatus, authentication, navigate]);

    if (loader) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0d1117] text-[#e6edf3]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-lg font-medium">Loading...</div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

export default AuthLayout;
