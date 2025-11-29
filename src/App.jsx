import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./vendorDashboard/pages/LandingPage";
import AdminPage from "./vendorDashboard/pages/AdminPage";
import "./App.css";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
};

export default App;
