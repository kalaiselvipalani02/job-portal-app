import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AdminSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    // Remove token from localStorage (if using JWT)
    localStorage.removeItem("token");
    //API call
    await axios.post("http://localhost:5001/api/logout");
    navigate("/login");
  };
  return (
    // sidebar
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
        <a href="/settings" className="block text-gray-700 hover:text-blue-600">
          Settings
        </a>
        <button
          onClick={handleLogout}
          className="block text-red-500 hover:text-red-700 mt-6"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
