import React, { createContext } from "react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const AuthContext = createContext(null);
const BaseUrl = "http://localhost:8000/api/";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const { data } = await axios.post(`${BaseUrl}auth/signup`, user);
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const login = async (user) => {
    try {
      const { data } = await axios.post(`${BaseUrl}auth/login`, user);
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const logout = async () => {
    await axios.post(`${BaseUrl}auth/logout`);
    setUser(null);
  };

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}auth/check-auth`);
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, login, logout, user, setUser, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
