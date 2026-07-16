import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const {
    loading,

    user,

    isAuthenticated,
  } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;
