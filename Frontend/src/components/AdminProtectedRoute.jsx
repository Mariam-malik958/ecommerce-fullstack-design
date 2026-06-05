import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const adminInfo = localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null;

  if (adminInfo && adminInfo.isAdmin) {
    return <Outlet />;
  } else {
    return <Navigate to="/admin/login" replace />;
  }
};

export default AdminProtectedRoute;
