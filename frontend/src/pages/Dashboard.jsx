import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-800 mb-3">User Information</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {user?.name}</p>
                <p><span className="font-medium">Email:</span> {user?.email}</p>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-green-800 mb-3">Quick Actions</h2>
              <div className="space-y-3">
                <a
                  href="/items"
                  className="block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-center transition"
                >
                  View Items
                </a>
                <a
                  href="/items/new"
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center transition"
                >
                  Create New Item
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;