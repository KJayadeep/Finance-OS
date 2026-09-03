import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import FinanceLayout from "./layouts/FinanceLayout";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/Expenses";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useGlobalContext } from "./context/useGlobalContext";
import { useAuthContext } from "./context/authContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  const globalContext = useGlobalContext();
  const { user,loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  
  return (
    <>
      <Toaster
          position="top-right"
          reverseOrder={false}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!user?<Login />:<Navigate to='/'/>} />
          <Route path="/signup" element={!user?<Signup />:<Navigate to='/'/>} />
          <Route
            path="/*"
            element={
              <FinanceLayout>
                <Routes>
                  <Route path="/" element={user?<Dashboard />:<Navigate to="/login"/>} />
                  <Route path="/transactions" element={user?<Transactions />:<Navigate to="/login"/>} />
                  <Route path="/incomes" element={user?<Incomes />:<Navigate to="/login"/>} />
                  <Route path="/expenses" element={user?<Expenses />:<Navigate to="/login"/>} />
                </Routes>
              </FinanceLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
