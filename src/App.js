// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        {/* Default route shows Login */}
        <Route path="/" element={<Login />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Commented other routes */}
        {/*
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/settings" element={<Settings user={user} />} />
        */}
        
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>

      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
