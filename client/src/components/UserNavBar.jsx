import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Navbar.css";

const UserNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    // Remove token from localStorage (if using JWT)
    localStorage.removeItem("token");
    //API call
    await axios.post("http://localhost:5001/api/logout");
    navigate("/login");
  };
  return (
    <div>
      <nav className="bg-white shadow p-4 flex justify-between">
        <div className="font-bold text-blue-700 ">Job Portal</div>
        {/* <ul className="flex gap-4">
          <li>
            <Link to="/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-blue-600 hover:underline">
              Profile
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </li>
        </ul> */}
      </nav>
    </div>
  );
};

export default UserNavbar;
