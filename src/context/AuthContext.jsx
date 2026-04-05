import { createContext, useState, useEffect } from "react";

import useAPI from "../hooks/useAPI";

import { saveToken, removeToken, getToken } from "../utils/tokenUtils";
import { saveUser, removeUser, getUser } from "../utils/userUtils";
import { removeCart } from "../utils/cartUtils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Hook to consume API
  const { data, loading, error, executeFetch } = useAPI(API_BASE_URL);

  useEffect(() => {
    keepSession();
  }, []);


  const login = async (credentials, keepSessionFlag = false) => {
    const response = await executeFetch(
      "/api/v1/vg-hc-store/authentication/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }
    );

    const token = response?.headers?.authorization;
    if (token) {
      saveToken(token.replace("Bearer ", ""), keepSessionFlag);
    }

    if (response?.data?.data) {
      saveUser(JSON.stringify(response?.data?.data), keepSessionFlag);
      setUser(response.data);
    }
  };


  const logout = async () => {
    //await executeFetch("/api/v1/auth/logout", { method: "POST" });
    removeToken();
    removeUser();
    removeCart();
    setUser(null);
    setToken(null);
  };

  const keepSession = () => {
    const storedToken = getToken();
    const storedUser = getUser();

    if (storedToken) {
      setToken(storedToken)
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, keepSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;