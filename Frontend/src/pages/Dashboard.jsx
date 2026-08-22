import StatCard from "../components/StatCard";
import TransactionChart from "../Components/TransactionChart";
import RecentHistory from "../components/RecentHistory";
import RangeCard from "../components/RangeCard";
import { useState, useContext, useEffect } from "react";
import { useGlobalContext } from "../context/useGlobalContext";

const Dashboard = () => {
  const { totalIncome, totalExpenses, totalBalance, transactionHistory ,getIncomes, getExpenses} = useGlobalContext();

  useEffect(()=>{
    getExpenses();
    getIncomes();
  },[])

  return (
    <div className="mx-auto max-w-[1500px]">
      {/* Header */}

      <div className="mb-8">
        <p className="text-sm font-medium text-lime-600">OVERVIEW</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Good morning 👋
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Here's what's happening with your money.
        </p>
      </div>

      {/* Main stats */}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <StatCard
          title="Total Balance"
          amount={`₹${totalBalance().toFixed(2)}`}
          type="balance"
        />

        <StatCard
          title="Total Income"
          amount={`₹${totalIncome().toFixed(2)}`}
          type="income"
        />

        <StatCard
          title="Total Expenses"
          amount={`₹${totalExpenses().toFixed(2)}`}
          type="expense"
        />
      </div>

      {/* Chart + History */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        <TransactionChart />

        <RecentHistory />
      </div>

      {/* Range */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <RangeCard title="Salary" min={1200} max={8000} />

        <RangeCard title="Expense" min={120} max={3000} />
      </div>
    </div>
  );
};

export default Dashboard;
