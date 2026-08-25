import {
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
} from "lucide-react";

import moment from "moment";
import { useGlobalContext } from "../context/useGlobalContext";
const TransactionItem = ({ transaction }) => {

  const income = transaction.type === "Income";
  
  const {
    deleteIncome,
    deleteExpense,
  } = useGlobalContext();

  const handleDelete = () => {
    if (income) {
      deleteIncome(transaction._id);
    } else {
      deleteExpense(transaction._id);
    }
  };

  return (
    <div className="group flex items-center gap-4 border-b border-slate-100 py-5 last:border-0">

      {/* Icon */}
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          income
            ? "bg-green-100 text-green-600"
            : "bg-rose-100 text-rose-500"
        }`}
      >
        {income ? (
          <ArrowUpRight size={19} />
        ) : (
          <ArrowDownRight size={19} />
        )}
      </div>


      {/* Transaction information */}
      <div className="min-w-0 flex-1">

        <h3 className="truncate text-sm font-semibold text-slate-800">
          {transaction.title}
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          {transaction.category} ·{" "}
          {moment(transaction.date).format("DD MMM YYYY")}
        </p>

      </div>


      {/* Amount */}
      <p
        className={`shrink-0 font-bold ${
          income
            ? "text-green-500"
            : "text-rose-500"
        }`}
      >
        {income ? "+" : "-"}₹{transaction.amount}
      </p>


      {/* Delete button */}
      <button
        type="button"
        onClick={handleDelete}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-300 opacity-0 transition-all hover:bg-rose-50 hover:text-rose-500 group-hover:opacity-100"
        title="Delete transaction"
      >
        <Trash2 size={17} />
      </button>

    </div>
  );
};

export default TransactionItem;