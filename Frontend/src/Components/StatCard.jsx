import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
} from "lucide-react";

const StatCard = ({ title, amount, type }) => {

  const styles = {
    balance: {
      icon: Wallet,
      iconBg: "bg-slate-700",
      value: "text-white",
    },

    income: {
      icon: ArrowUpRight,
      iconBg: "bg-green-100",
      value: "text-slate-900",
    },

    expense: {
      icon: ArrowDownRight,
      iconBg: "bg-rose-100",
      value: "text-slate-900",
    },
  };

  const config = styles[type];

  const Icon = config.icon;

  if (type === "balance") {
    return (
      <div className="rounded-3xl bg-[#111827] p-6 text-white">

        <div className="flex items-center justify-between">

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <div className="rounded-xl bg-slate-700 p-2">
            <Icon size={18} />
          </div>

        </div>

        <p className="mt-5 text-4xl font-bold tracking-tight">
          {amount}
        </p>

        <div className="mt-4 flex items-center gap-2">

          <span className="rounded-full bg-lime-400/15 px-2 py-1 text-xs font-semibold text-lime-400">
            +12.8%
          </span>

          <span className="text-xs text-slate-500">
            vs last month
          </span>

        </div>

      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">

      <div className="flex items-center justify-between">

        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div className={`rounded-xl p-2 ${config.iconBg}`}>
          <Icon size={18} />
        </div>

      </div>

      <p className="mt-5 text-3xl font-bold text-slate-900">
        {amount}
      </p>

      <p
        className={`mt-2 text-xs font-semibold ${
          type === "income"
            ? "text-green-500"
            : "text-rose-500"
        }`}
      >
        {type === "income" ? "↑ 8.4%" : "↓ 4.2%"} this month
      </p>

    </div>
  );
};

export default StatCard;