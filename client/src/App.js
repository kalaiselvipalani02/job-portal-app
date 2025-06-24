import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import UserNavbar from "./components/UserNavBar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Jobs from "./pages/Jobs";

function App() {
  const location = useLocation();

  const isAuthPage = ["/signup", "/login", "/"].includes(location.pathname);

  return (
    <>
      {isAuthPage ? <Navbar /> : <UserNavbar />}

      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/jobs" element={<Jobs />}></Route>
        <Route path="/adminDashboard" element={<AdminDashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
