import React from "react";
import { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  FileText,
  Tag,
  IndianRupee,
} from "lucide-react";
import { useGlobalContext } from "../context/useGlobalContext";

const FormCard = ({ type }) => {
  const { addIncomes, addExpenses } = useGlobalContext();

  const [inputValue, setInputValue] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: null,
  });

  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "income") {
      addIncomes(inputValue);
    } else {
      addExpenses(inputValue);
    }
  };

  const isIncome = type === "income";

  const theme = isIncome
    ? {
        accent: "text-emerald-600",
        accentBg: "bg-emerald-50",
        accentBorder: "border-emerald-200",
        focus:
          "focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100",
        button: "bg-emerald-600 hover:bg-emerald-700",
        icon: "text-emerald-600",
      }
    : {
        accent: "text-rose-500",
        accentBg: "bg-rose-50",
        accentBorder: "border-rose-200",
        focus:
          "focus:border-rose-400 focus:ring-4 focus:ring-rose-100",
        button: "bg-rose-500 hover:bg-rose-600",
        icon: "text-rose-500",
      };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-7"
    >
      {/* Header */}
      <div className="mb-7 flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${theme.accentBg} ${theme.icon}`}
            >
              {isIncome ? (
                <ArrowUpRight size={19} />
              ) : (
                <ArrowDownLeft size={19} />
              )}
            </div>

            <span
              className={`text-xs font-bold uppercase tracking-[2px] ${theme.accent}`}
            >
              Finance OS
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {isIncome ? "Add Income" : "Add Expense"}
          </h2>

          <p className="mt-1 max-w-md text-sm leading-5 text-slate-400">
            {isIncome
              ? "Record money coming into your account."
              : "Record money going out of your account."}
          </p>
        </div>

        {/* Type indicator */}
        <div
          className={`hidden rounded-full px-3 py-1.5 text-xs font-semibold sm:block ${theme.accentBg} ${theme.accent}`}
        >
          {isIncome ? "MONEY IN" : "MONEY OUT"}
        </div>
      </div>

      {/* Divider */}
      <div className="mb-6 h-px bg-slate-100" />

      {/* Title */}
      <div className="mb-5">
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          {isIncome ? "Income Title" : "Expense Title"}
        </label>

        <div className="relative">
          <FileText
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="title"
            type="text"
            value={inputValue.title}
            name="title"
            placeholder={isIncome ? "e.g. Salary" : "e.g. Groceries"}
            onChange={handleChange}
            className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${theme.focus}`}
          />
        </div>
      </div>

      {/* Amount */}
      <div className="mb-5">
        <label
          htmlFor="amount"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Amount
        </label>

        <div className="relative">
          <IndianRupee
            size={17}
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.icon}`}
          />

          <input
            id="amount"
            type="text"
            value={inputValue.amount}
            name="amount"
            placeholder="0.00"
            onChange={handleChange}
            className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${theme.focus}`}
          />
        </div>
      </div>

      {/* Date + Category */}
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Date */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Date
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
            />

            <DatePicker
              selected={inputValue.date}
              dateFormat="dd/MM/yyyy"
              onChange={(date) =>
                setInputValue({
                  ...inputValue,
                  date: date,
                })
              }
              placeholderText="Select date"
              className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${theme.focus}`}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Category
          </label>

          <div className="relative">
            <Tag
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
            />

            <select
              required
              id="category"
              name="category"
              value={inputValue.category}
              onChange={handleChange}
              className={`w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:bg-white ${theme.focus}`}
            >
              <option value="" disabled>
                Select Category
              </option>

              <option value="salary">Salary</option>
              <option value="freelance">Freelance</option>
              <option value="investments">Investments</option>
              <option value="stocks">Stocks</option>
              <option value="crypto">Crypto</option>
              <option value="bank">Bank</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Description
          <span className="ml-1 font-normal text-slate-400">
            (Optional)
          </span>
        </label>

        <textarea
          id="description"
          name="description"
          value={inputValue.description}
          placeholder={
            isIncome
              ? "Add a note about this income..."
              : "Add a note about this expense..."
          }
          onChange={handleChange}
          rows="3"
          className={`w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${theme.focus}`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.99] ${theme.button}`}
      >
        {isIncome ? (
          <ArrowUpRight size={18} />
        ) : (
          <ArrowDownLeft size={18} />
        )}

        {isIncome ? "Add Income" : "Add Expense"}
      </button>
    </form>
  );
};

export default FormCard;