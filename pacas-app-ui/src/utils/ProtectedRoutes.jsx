import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth.loading) {
    return <p>Loading...</p>;
  }

  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
