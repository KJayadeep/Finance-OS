import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import moment from "moment";

import { transactions } from "../data/transactions";
import { useGlobalContext } from "../context/useGlobalContext";

const RecentHistory = () => {

  const {transactionHistory} = useGlobalContext();

  const [...history] = transactionHistory().slice(0,6);


  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Activity
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Recent History
          </h2>
        </div>
      </div>

      <div className="space-y-5">
        {history.map((transaction) => {
          const income = transaction.type === "Income";

          return (
            <div key={transaction._id} className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  income
                    ? "bg-green-100 text-green-600"
                    : "bg-rose-100 text-rose-500"
                }`}
              >
                {income ? (
                  <ArrowUpRight size={18} />
                ) : (
                  <ArrowDownRight size={18} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {transaction.title}
                </p>

                <p className="text-xs text-slate-400">
                  {transaction.category} · {moment(transaction.date).fromNow()}
                </p>
              </div>

              <p
                className={`text-sm font-bold ${
                  income ? "text-green-500" : "text-rose-500"
                }`}
              >
                {income ? "+" : "-"}₹{transaction.amount}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentHistory;
