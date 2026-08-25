import { useState } from "react";

const RangeCard = ({
  title,
  min,
  max,
}) => {

  const [value, setValue] = useState(
    Math.floor((min + max) / 2)
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Range
          </p>

          <h3 className="mt-1 text-xl font-bold text-slate-900">
            {title}
          </h3>

        </div>

        <p className="text-2xl font-bold text-slate-900">
          ₹{value}
        </p>

      </div>

      <div className="mt-7">

        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full accent-[#84cc16]"
        />

        <div className="mt-2 flex justify-between text-xs text-slate-400">

          <span>
            ₹{min}
          </span>

          <span>
            ₹{max}
          </span>

        </div>

      </div>

    </div>
  );
};

export default RangeCard;