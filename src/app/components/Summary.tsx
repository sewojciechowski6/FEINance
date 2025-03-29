import { getSummary } from "../lib/transactions";

export default async function Summary() {
  const { totalIncome, totalExpense, balance } = await getSummary();

  return (
    <div className="border border-gray-300 grid grid-cols-2 grid-rows-2">
      <div className="border-b border-b-gray-300 col-span-2 p-2 text-center content-center">
        {totalIncome}
      </div>
      <div className="border-r border-r-gray-300 p-2 text-center content-center">
        {totalExpense}
      </div>
      <div className="p-2 text-center content-center">{balance}</div>
    </div>
  );
}
