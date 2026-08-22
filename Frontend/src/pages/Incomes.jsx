import StatCard from "../components/StatCard";
import TransactionItem from "../components/TransactionItem";
import { useState, useContext, useEffect } from "react";
import { transactions } from "../data/transactions";
import { useGlobalContext } from "../context/useGlobalContext";
import FormCard from "../Components/FormCard";

const Incomes = () => {
  const global = useGlobalContext();

  const { incomes, getIncomes, totalIncome } = global;

  useEffect(() => {
    getIncomes();
  }, [incomes]);


  return (
    <div className="mx-auto max-w-[1200px]">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold tracking-wide text-green-500">
          MONEY IN
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Incomes
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Track everything coming into your account.
        </p>
      </div>

      {/* Income Overview + Form */}
      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        {/* Total Income */}
        <div className="h-fit">
          <StatCard
            title="Total Income"
            amount={`₹ ${totalIncome().toFixed(2)}`}
            type="income"
          />
        </div>

        {/* Add Income Form */}
        <div>
          <FormCard type="income" />
        </div>
      </div>

      {/* Income History */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* History Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[1.5px] text-slate-400">
              Activity
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Income History
            </h2>
          </div>

          <div className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
            {incomes.length} Transactions
          </div>
        </div>

        {/* Transactions */}
        {incomes.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {incomes.map((income) => (
              <TransactionItem key={income._id} transaction={income} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[180px] items-center justify-center">
            <p className="text-sm text-slate-400">
              No income transactions found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Incomes;
