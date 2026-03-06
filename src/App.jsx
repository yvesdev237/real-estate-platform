import React from "react";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./dashboard/Dashboard";
import ProtectedRoute from "./libs/ProtectedRoute";
import DashboardHome from "./dashboard/DashboardHome";
import Explore from "./dashboard/Explore";
import Favorites from "./dashboard/Favorites";
import Profile from "./dashboard/Profile";
import Properties from "./dashboard/Properties";
import AddProperty from "./dashboard/AddProperty";

const App = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-gradient-to-r from-violet-50/10 to-transparent">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
              <ProtectedRoute >
                <Dashboard />
              </ProtectedRoute>
          }
        >
          <Route index element = {<DashboardHome />}/>
          <Route path="explore" element = {<Explore />}/>
          <Route path="properties" element = {<Properties />}/>
          <Route path="favorites" element = {<Favorites />}/>
          <Route path="add" element = {<AddProperty />}/>
          <Route path="profile" element = {<Profile />}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
