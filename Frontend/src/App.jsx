import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState,useContext } from "react";
import FinanceLayout from "./layouts/FinanceLayout";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/Expenses";
import { useGlobalContext } from "./context/useGlobalContext";

const App = () => {
  const globalContext = useGlobalContext();
  return (
    <BrowserRouter>

      <FinanceLayout>

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/transactions"
            element={<Transactions />}
          />

          <Route
            path="/incomes"
            element={<Incomes />}
          />

          <Route
            path="/expenses"
            element={<Expenses />}
          />

        </Routes>

      </FinanceLayout>

    </BrowserRouter>
  );
};

export default App;