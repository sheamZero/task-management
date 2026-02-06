import React from 'react';
import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content px-4 text-center">
            <h1 className="text-[10rem] font-extrabold leading-none text-primary drop-shadow-lg">
                404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Page Not Found</h2>
            <p className="mt-3 max-w-md text-base-content/70">
                The page you’re looking for doesn’t exist or has been moved. Please check the URL or go back to the homepage.
            </p>

            <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all"
            >
                <FaArrowLeft />
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
