const SummaryCard = ({
  title,
  amount,
  type,
}) => {

  const amountColor = {
    income: "text-[#8c8ab3]",
    expense: "text-[#8c8ab3]",
    balance: "text-[#a3d66e]",
  };

  return (
    <div
      className={`
        rounded-[18px]
        border
        border-white
        bg-white/70
        px-5
        py-4
        shadow-sm

        ${
          type === "balance"
            ? "w-full max-w-[350px] text-center"
            : ""
        }
      `}
    >

      <h3 className="text-xl font-semibold text-[#29255d]">
        {title}
      </h3>

      <p
        className={`mt-1 text-5xl font-semibold tracking-tight ${
          amountColor[type]
        }`}
      >
        {amount}
      </p>

    </div>
  );
};

export default SummaryCard;