import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserSideBar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    // Remove token from localStorage (if using JWT)
    localStorage.removeItem("token");
    //API call
    await axios.post("http://localhost:5001/api/logout");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white shadow-md h-screen p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">User Panel</h2>
      <nav className="space-y-4">
        <a href="/users" className="block text-gray-700 hover:text-blue-600">
          Applied Jobs
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

export default UserSideBar;
