import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const GlobalContext = React.createContext();

const BaseUrl = `${import.meta.env.VITE_API_URL}/api/`;

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = React.useState([]);
  const [expenses, setExpenses] = React.useState([]);

  const addIncomes = async (incomeData) => {
    try {
      const response = await axios.post(
        `${BaseUrl}transactions/add-income`,
        incomeData,
      );
      setIncomes((prev)=>[...prev, response.data.income]);
      toast.success(response.data.message)
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  const addExpenses = async (expenseData) => {
    try {
      const response = await axios.post(
        `${BaseUrl}transactions/add-expense`,
        expenseData,
      );
      setExpenses((prev)=>[...prev, response.data.expense]);
      toast.success(response.data.message)
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BaseUrl}transactions/get-incomes`);
      setIncomes(response.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BaseUrl}transactions/get-expenses`);
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const deleteIncome = async (incomeId) => {
    try {
      await axios.delete(`${BaseUrl}transactions/delete-income/${incomeId}`);
      setIncomes(incomes.filter((income) => income._id !== incomeId));
      toast.success("Income deleted successfully!")
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
      await axios.delete(`${BaseUrl}transactions/delete-expense/${expenseId}`);
      setExpenses(expenses.filter((expense) => expense._id !== expenseId));
      toast.success("Expense deleted successfully!")
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += parseFloat(income.amount);
    });
    return totalIncome;
  };
  const totalExpenses = () => {
    let totalExpenses = 0;
    expenses.forEach((expense) => {
      totalExpenses += parseFloat(expense.amount);
    });
    return totalExpenses;
  };

  const totalBalance = ()=>{
    return totalIncome() - totalExpenses();
  }

  const transactionHistory = () =>{
    const history = [...incomes,...expenses]
    history.sort((a,b)=>{
        return new Date(b.createdAt) - new Date(a.createdAt);
    })
    return history
  }

  return (
    <GlobalContext.Provider
      value={{
        addIncomes,
        addExpenses,
        getIncomes,
        incomes,
        getExpenses,
        expenses,
        deleteIncome,
        deleteExpense,
        totalIncome,
        totalExpenses,
        totalBalance,
        transactionHistory
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

