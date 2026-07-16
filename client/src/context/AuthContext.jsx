import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user
  const getCurrentUser = async () => {
    try {
      const { data } = await api.get("/auth/me");

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  // Login/Register Success
  const login = (userData) => {
    setUser(userData);
  };

  // Logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log(error);
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
