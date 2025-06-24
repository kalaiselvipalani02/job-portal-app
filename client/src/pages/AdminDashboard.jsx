import React from "react";
import AdminSidebar from "../components/AdminSidebar";

const AdminDashboard = () => {
  return (
    <>
      <div className="min-h-screen flex bg-gray-100">
        <AdminSidebar />

        <main className="flex-1 p-10">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Welcome, Admin
          </h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">1234</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Active Jobs
              </h3>
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
    </>
  );
};
export default AdminDashboard;
