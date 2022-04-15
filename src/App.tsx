import React from "react";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Rooms from "./page/Rooms";
import RoomDetail from "./page/RoomDetail";
import Host from "./page/Host";
import NewHomeStay from "./page/NewHomeStay";
import UserProfile from "./page/UserProfile";
import Layout from "./page/Layout";
import AdminDashboard from "./page/AdminDashboard";
import ProtectedRoutes from "./components/protectedRoutes";
import Snackbar from "./components/SnackBarNotice";

function App() {
  return (
    <>
      <Snackbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home/*" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="rooms/:address" element={<Rooms />} />
            <Route path="roomsDetail/:id" element={<RoomDetail />} />
          </Route>

          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/host" element={<Host />} />
            <Route path="/newhomestay" element={<NewHomeStay />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
