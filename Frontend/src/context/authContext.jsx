import React, { createContext } from "react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

const AuthContext = createContext(null);
const BaseUrl = `${import.meta.env.VITE_API_URL}/api/`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const { data } = await axios.post(`${BaseUrl}auth/signup`, user);
      toast.success(data.message);
      return ({success: true});
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Signup failed" };
    }
  };

  const verifyEmail = async (email, otp) => {
    try {
      const { data } = await axios.post(`${BaseUrl}auth/verify-email`, { email, otp });
      setUser(data.user);
      toast.success(data.message);
      return ({success: true,user:data.user});
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Email verification failed" };
    }
  };

  const login = async (user) => {
    try {
      const { data } = await axios.post(`${BaseUrl}auth/login`, user);
      setUser(data.user);
      toast.success("Login successful!");
      return ({success: true,user:data.user});
    } catch (error) {
      toast.error("Login failed")
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const logout = async () => {
    await axios.post(`${BaseUrl}auth/logout`);
    setUser(null);
    toast.success("Logout successful!");
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

  const updateProfile = async (updatedData) => {
    try {
      const { data } = await axios.post(`${BaseUrl}auth/update-profile`,updatedData)
      setUser(data.user)
      toast.success(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, login, logout, user, setUser, loading, setLoading, updateProfile, verifyEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
