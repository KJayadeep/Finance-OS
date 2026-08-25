import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TransactionItem from "../components/TransactionItem.jsx";

import { useGlobalContext } from "../context/useGlobalContext.jsx";

const Transactions = () => {
  const {transactionHistory} = useGlobalContext()
  const [...history] = transactionHistory()
  const [date, setDate] = useState(null);

  const filteredTransactions = date
    ? history.filter(
        (transaction) => transaction.date === date.toISOString().split("T")[0],
      )
    : history;

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-lime-600">FINANCE OS</p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Transactions
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            View all your financial activity.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            placeholderText="Filter by date"
            dateFormat="DD/MM/YYYY"
            isClearable
            className="w-full text-sm outline-none"
          />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionItem key={transaction._id} transaction={transaction} />
          ))
        ) : (
          <div className="py-16 text-center text-sm text-slate-400">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
