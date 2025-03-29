import { getSummary } from "../lib/transactions";

export default async function Summary() {
  const { totalIncome, totalExpense, balance } = await getSummary();

  return (
    <div className="border border-slate-800 grid grid-cols-2 grid-rows-2">
      <div className="border-b border-b-slate-800 col-span-2 p-2 text-center content-center bg-teal-200">
        {balance}
      </div>
      <div className="border-r border-r-slate-800 p-2 text-center content-center bg-lime-200">
        {totalIncome}
      </div>
      <div className="p-2 text-center content-center bg-fuchsia-200">
        {totalExpense}
      </div>
    </div>
  );
}
