import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md h-screen p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <a
            href="/dashboard"
            className="block text-gray-700 hover:text-blue-600"
          >
            Dashboard
          </a>
          <a href="/users" className="block text-gray-700 hover:text-blue-600">
            Manage Users
          </a>
          <a href="/jobs" className="block text-gray-700 hover:text-blue-600">
            Manage Jobs
          </a>
          <a
            href="/settings"
            className="block text-gray-700 hover:text-blue-600"
          >
            Settings
          </a>
          <a
            href="/logout"
            className="block text-red-500 hover:text-red-700 mt-6"
          >
            Logout
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Welcome, Admin
        </h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">1234</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700">Active Jobs</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">54</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700">
              New Applications
            </h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">210</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Activities
          </h2>
          <div className="bg-white rounded-xl shadow p-4 space-y-3">
            <p className="text-sm text-gray-700">
              👤 John Doe applied for Software Engineer.
            </p>
            <p className="text-sm text-gray-700">
              ⚙️ Admin updated job posting for UI Designer.
            </p>
            <p className="text-sm text-gray-700">
              🗑️ User Jane was removed from the system.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default AdminDashboard;
