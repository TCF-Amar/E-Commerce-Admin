import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Ensure the token is updated in localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token); // Save token if available
    } else {
      localStorage.removeItem("token"); // Clear token if user logs out
    }
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {/* Show Login if token is not present, otherwise show the main app */}
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Header setToken={setToken} /> {/* Pass the correct setToken prop */}
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)]  text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<Navigate to="/add" />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="*" element={<Navigate to="/add" />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
