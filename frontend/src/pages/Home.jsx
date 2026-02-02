import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            MERN Stack Authentication & CRUD
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Complete authentication system with JWT, Context API, and full CRUD operations.
            Built with modern tools like Vite, Tailwind CSS, and industry best practices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-lg text-lg border-2 border-blue-600 transition duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-lg hover:shadow-xl"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">🔐</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Authentication</h3>
            <p className="text-gray-600">
              JWT-based authentication with secure password hashing using bcrypt.
              Complete login, register, and logout functionality.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Full CRUD Operations</h3>
            <p className="text-gray-600">
              Create, Read, Update, and Delete operations with proper validation
              and user-specific data isolation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">⚛️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Modern Stack</h3>
            <p className="text-gray-600">
              Built with React, Vite, Tailwind CSS, and Context API. 
              Clean code structure following industry best practices.
            </p>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            How to Use This Application
          </h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Register & Login</h4>
                <p className="text-gray-600">
                  Create a new account or login with existing credentials. Your data is securely stored
                  with password hashing.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Access Dashboard</h4>
                <p className="text-gray-600">
                  After authentication, access your personal dashboard to manage your profile
                  and navigate to different features.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Manage Items</h4>
                <p className="text-gray-600">
                  Create, view, edit, and delete items. All operations are protected and
                  user-specific.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Ready to explore the complete MERN stack?
          </h3>
          <Link
            to={isAuthenticated ? "/items" : "/register"}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-full text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {isAuthenticated ? "Manage Your Items" : "Start Your Journey"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;