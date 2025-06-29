type Props = {
  isExpense: boolean;
  rows: {
    date: string;
    amount: number;
    purpose?: string | null;
  }[];
  className?: string;
};

export default function MainTable({
  isExpense = false,
  rows = [],
  className,
}: Props) {
  if (rows.length === 0) {
    return (
      <div className={`glass rounded-2xl shadow-xl p-8 text-center ${className}`}>
        <div className="text-white/70 text-xl font-medium">
          {isExpense ? "No expenses yet" : "No income yet"}
        </div>
        <p className="text-white/50 text-sm mt-2">
          {isExpense ? "Add your first expense to get started" : "Add your first income to get started"}
        </p>
      </div>
    );
  }

  return (
    <div className={`glass rounded-2xl shadow-xl overflow-hidden ${className}`}>
      <div className="relative">
        <div className="max-h-[25rem] overflow-y-auto custom-scrollbar">
          <div className="divide-y divide-white/10">
            {rows.map((row, index) => (
              <div key={index} className="p-5 hover:bg-white/10 transition-all duration-200 group min-h-[4.5rem] flex items-center">
                <div className="flex justify-between items-center w-full">
                  <div className="flex-1">
                    <div className="text-sm text-white/60 mb-1 font-medium">
                      {row.date}
                    </div>
                    {isExpense && row.purpose && (
                      <div className="text-white/90 font-medium text-base truncate">
                        {row.purpose}
                      </div>
                    )}
                  </div>
                  <div className={`font-bold text-xl transition-all duration-200 group-hover:scale-105 ${
                    isExpense 
                      ? "text-rose-300" 
                      : "text-emerald-300"
                  }`}>
                    {isExpense ? "-" : "+"}${row.amount.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
