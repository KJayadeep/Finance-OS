import StatCard from "../components/StatCard";
import TransactionItem from "../components/TransactionItem";
import { useState, useContext, useEffect } from "react";

import { transactions } from "../data/transactions";
import { useGlobalContext } from "../context/useGlobalContext";
import FormCard from "../components/FormCard";

const Expenses = () => {
  const { expenses, getExpenses, totalExpenses } = useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);


  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="mb-8">
        <p className="text-sm font-medium text-rose-500">MONEY OUT</p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">Expenses</h1>

        <p className="mt-1 text-sm text-slate-400">
          Keep track of where your money goes.
        </p>
      </div>

      <div className="mb-5 max-w-md">
        <StatCard
          title="Total Expenses"
          amount={`₹${totalExpenses().toFixed(2)}`}
          type="expense"
        />
      </div>
      <div className="mb-6">
        <FormCard type="expense" />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[1.5px] text-slate-400">
              Activity
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Expense History
            </h2>
          </div>

          <div className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-500">
            {expenses.length} Transactions
          </div>
        </div>
        {expenses.length > 0 ? (
          <div>
            {expenses.map((transaction) => (
              <TransactionItem
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-sm text-slate-400">
            No expenses found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;
