import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: null,
    user: null,
    loading: true,
  });

  useEffect(() => {
    fetch("/api/check-auth", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setAuth({ ...data, loading: false }))
      .catch((err) => {
        setAuth({ isAuthenticated: false, user: null, loading: false });
        console.log("Error in auth", err);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
