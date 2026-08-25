import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Line } from "react-chartjs-2";
import {formatDate} from "../utils/DateFormat";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);
import {useGlobalContext} from "../context/useGlobalContext";
import { useEffect } from "react";

const TransactionChart = () => {

  const { incomes, expenses } = useGlobalContext();


  const data = {
    labels: incomes.map((income)=>{
      const {date} = income;
      return formatDate(date)
    }),

    datasets: [
      {
        label: "Income",

        data: [...incomes.map((income)=>{
          const {amount} = income;
          return amount
        })],

        borderColor: "#84cc16",

        backgroundColor: "rgba(132,204,22,0.10)",

        borderWidth: 3,

        pointRadius: 3,

        pointBackgroundColor: "#84cc16",

        tension: 0.4,

        fill: true,
      },

      {
        label: "Expenses",

        data: [...expenses.map((expense)=>{
          const {amount} = expense;
          return amount
        })],

        borderColor: "#f43f5e",

        backgroundColor: "rgba(244,63,94,0.05)",

        borderWidth: 2,

        pointRadius: 3,

        pointBackgroundColor: "#f43f5e",

        tension: 0.4,

        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      intersect: false,
      mode: "index",
    },

    plugins: {
      legend: {
        position: "top",
        align: "end",

        labels: {
          usePointStyle: true,
          boxWidth: 8,

          font: {
            family: "DM Sans",
            size: 12,
          },
        },
      },

      tooltip: {
        backgroundColor: "#111827",

        padding: 12,

        cornerRadius: 10,

        titleFont: {
          family: "DM Sans",
        },

        bodyFont: {
          family: "DM Sans",
        },
      },
    },

    scales: {
      x: {
        border: {
          display: false,
        },

        grid: {
          display: false,
        },

        ticks: {
          color: "#94a3b8",
        },
      },

      y: {
        border: {
          display: false,
        },

        grid: {
          color: "#eef0ed",
        },

        ticks: {
          color: "#94a3b8",

          callback: (value) => `₹${value / 1000}k`,
        },
      },
    },
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Cash Flow
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-900">
          Income vs Expenses
        </h2>
      </div>

      <div className="h-[330px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TransactionChart;
