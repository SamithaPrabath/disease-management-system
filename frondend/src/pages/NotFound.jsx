import React from "react";
import { Link } from "react-router-dom"; // For navigation back to home

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        {/* 404 Heading */}
        <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
        {/* Page Not Found Message */}
        <p className="text-2xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        {/* Back to Home Button */}
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;