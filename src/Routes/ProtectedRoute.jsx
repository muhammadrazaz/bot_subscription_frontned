import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

export const ProtectedRoute = () => {
    const { token,userDetail } = useAuth();
  
    // Check if the user is authenticated
    if (!token || !userDetail) {
      // If not authenticated, redirect to the login page
      return <Navigate to="/" />;
    }
  
    // If authenticated, render the child routes
    return <Outlet />;
  };